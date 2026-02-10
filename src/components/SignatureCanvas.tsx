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
  /** 获取签名的 base64 dataURL (PNG) */
  getDataURL(): string;
  /** 获取签名的 Blob 对象 (PNG) */
  getBlob(): Promise<Blob>;
  /** 清空画布 */
  clear(): void;
  /** 判断画布是否为空 */
  isEmpty(): boolean;
}

export interface SignatureCanvasProps {
  /** 签名内容变更回调（绘制/清除时触发） */
  onSignatureChange?: (isEmpty: boolean) => void;
}

const MIN_WIDTH = 410;
const CANVAS_HEIGHT = 200;

/**
 * 签名画布组件
 * 需求: 3.1, 3.2, 3.3, 3.4
 */
const SignatureCanvas = forwardRef<SignatureCanvasHandle, SignatureCanvasProps>(
  ({ onSignatureChange }, ref) => {
    const sigCanvasRef = useRef<ReactSignatureCanvas | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [canvasWidth, setCanvasWidth] = useState(MIN_WIDTH);

    // 需求 3.4: 画布尺寸自适应（最小宽度410px）
    const updateWidth = useCallback(() => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        setCanvasWidth(Math.max(parentWidth, MIN_WIDTH));
      }
    }, []);

    useEffect(() => {
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, [updateWidth]);

    // 需求 3.2 & 3.3: 绘制结束时通知外部签名状态
    const handleEnd = useCallback(() => {
      if (onSignatureChange && sigCanvasRef.current) {
        onSignatureChange(sigCanvasRef.current.isEmpty());
      }
    }, [onSignatureChange]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      getDataURL(): string {
        if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
          return '';
        }
        return sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
      },

      async getBlob(): Promise<Blob> {
        return new Promise((resolve, reject) => {
          if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
            reject(new Error('画布为空'));
            return;
          }
          sigCanvasRef.current.getTrimmedCanvas().toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('无法生成图片'));
            }
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
        <div style={{ ...styles.canvasWrapper, width: canvasWidth }}>
          <ReactSignatureCanvas
            ref={sigCanvasRef}
            penColor="#000"
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
  container: {
    width: '100%',
    minWidth: MIN_WIDTH,
    marginBottom: 12,
  },
  canvasWrapper: {
    border: '1px solid #dee0e3',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  canvas: {
    display: 'block',
    cursor: 'crosshair',
  },
};

export default SignatureCanvas;
