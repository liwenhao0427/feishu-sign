import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';

export interface SignatureCanvasHandle {
  getDataURL(): string;
  getBlob(): Promise<Blob>;
  clear(): void;
  isEmpty(): boolean;
}

export interface SignatureCanvasProps {
  onSignatureChange?: (isEmpty: boolean) => void;
}

const MIN_WIDTH = 410;
const CANVAS_HEIGHT = 200;

const PEN_COLORS = [
  { label: '黑', value: '#000000' },
  { label: '蓝', value: '#1a56db' },
  { label: '红', value: '#e02424' },
];

const PEN_SIZES = [
  { label: '细', value: 1 },
  { label: '中', value: 2.5 },
  { label: '粗', value: 4.5 },
];

const SignatureCanvas = forwardRef<SignatureCanvasHandle, SignatureCanvasProps>(
  ({ onSignatureChange }, ref) => {
    const sigCanvasRef = useRef<ReactSignatureCanvas | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [canvasWidth, setCanvasWidth] = useState(MIN_WIDTH);
    const [penColor, setPenColor] = useState(PEN_COLORS[0].value);
    const [penSize, setPenSize] = useState(PEN_SIZES[1].value);

    const updateWidth = useCallback(() => {
      if (containerRef.current) {
        setCanvasWidth(Math.max(containerRef.current.offsetWidth, MIN_WIDTH));
      }
    }, []);

    useEffect(() => {
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, [updateWidth]);

    const handleEnd = useCallback(() => {
      if (onSignatureChange && sigCanvasRef.current) {
        onSignatureChange(sigCanvasRef.current.isEmpty());
      }
    }, [onSignatureChange]);

    useImperativeHandle(ref, () => ({
      getDataURL(): string {
        if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) return '';
        return sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
      },
      async getBlob(): Promise<Blob> {
        return new Promise((resolve, reject) => {
          if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
            reject(new Error('画布为空'));
            return;
          }
          sigCanvasRef.current.getTrimmedCanvas().toBlob((blob) => {
            blob ? resolve(blob) : reject(new Error('无法生成图片'));
          }, 'image/png');
        });
      },
      clear(): void {
        sigCanvasRef.current?.clear();
        onSignatureChange?.(true);
      },
      isEmpty(): boolean {
        return sigCanvasRef.current?.isEmpty() ?? true;
      },
    }));

    return (
      <div ref={containerRef} style={styles.container}>
        {/* 工具栏：颜色 + 粗细 */}
        <div style={styles.toolbar}>
          <div style={styles.toolGroup}>
            <span style={styles.toolLabel}>颜色</span>
            {PEN_COLORS.map((c) => (
              <button
                key={c.value}
                title={c.label}
                onClick={() => setPenColor(c.value)}
                style={{
                  ...styles.colorButton,
                  backgroundColor: c.value,
                  ...(penColor === c.value ? styles.colorButtonActive : {}),
                }}
              />
            ))}
          </div>
          <div style={styles.toolGroup}>
            <span style={styles.toolLabel}>粗细</span>
            {PEN_SIZES.map((s) => (
              <button
                key={s.value}
                onClick={() => setPenSize(s.value)}
                style={{
                  ...styles.sizeButton,
                  ...(penSize === s.value ? styles.sizeButtonActive : {}),
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: Math.max(s.value * 2.5, 4),
                  height: Math.max(s.value * 2.5, 4),
                  borderRadius: '50%',
                  backgroundColor: penColor,
                }} />
              </button>
            ))}
          </div>
        </div>

        <div style={{ ...styles.canvasWrapper, width: canvasWidth }}>
          <ReactSignatureCanvas
            ref={sigCanvasRef}
            penColor={penColor}
            minWidth={penSize * 0.6}
            maxWidth={penSize * 1.2}
            canvasProps={{
              width: canvasWidth,
              height: CANVAS_HEIGHT,
              style: styles.canvas,
            }}
            onEnd={handleEnd}
          />
        </div>
      </div>
    );
  }
);

SignatureCanvas.displayName = 'SignatureCanvas';

const styles: Record<string, React.CSSProperties> = {
  container: { width: '100%', minWidth: MIN_WIDTH, marginBottom: 12 },
  toolbar: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '6px 8px', marginBottom: 6,
    backgroundColor: '#f5f6f7', borderRadius: 6,
    flexWrap: 'wrap' as const,
  },
  toolGroup: { display: 'flex', alignItems: 'center', gap: 6 },
  toolLabel: { fontSize: 12, color: '#8f959e', marginRight: 2 },
  colorButton: {
    width: 22, height: 22, borderRadius: '50%',
    border: '2px solid transparent', cursor: 'pointer',
    padding: 0, outline: 'none',
  },
  colorButtonActive: {
    border: '2px solid #3370ff',
    boxShadow: '0 0 0 2px rgba(51,112,255,0.2)',
  },
  sizeButton: {
    width: 28, height: 28, borderRadius: 6,
    border: '1px solid #dee0e3', backgroundColor: '#fff',
    cursor: 'pointer', display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: 0,
  },
  sizeButtonActive: {
    border: '1px solid #3370ff',
    backgroundColor: '#f0f4ff',
  },
  canvasWrapper: {
    border: '1px solid #dee0e3', borderRadius: 6,
    overflow: 'hidden', backgroundColor: '#fff',
  },
  canvas: { display: 'block', cursor: 'crosshair' },
};

export default SignatureCanvas;
