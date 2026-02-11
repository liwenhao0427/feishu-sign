import React, { useRef, useState, useCallback, useEffect } from 'react';
import { bitable } from '@lark-base-open/js-sdk';
import { useFieldInitialization } from './hooks/useFieldInitialization';
import { useSelectionChange } from './hooks/useSelectionChange';
import { useRecordSignStatus } from './hooks/useRecordSignStatus';
import { useSignatureSave } from './hooks/useSignatureSave';
import { useSignatureLink } from './hooks/useSignatureLink';
import { useSignaturePreview } from './hooks/useSignaturePreview';
import SignatureCanvas, { SignatureCanvasHandle } from './components/SignatureCanvas';
import ActionButtons from './components/ActionButtons';
import SignaturePreview from './components/SignaturePreview';

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const {
    urlFieldId,
    attachmentFieldId,
    isInitialized,
    error: initError,
    retry: retryInit,
  } = useFieldInitialization();

  const selectedRecordId = useSelectionChange();

  const {
    hasSigned,
    loading: statusLoading,
    refresh: refreshStatus,
  } = useRecordSignStatus(selectedRecordId, attachmentFieldId);

  const { saveSignature, saving, error: saveError, success: saveSuccess, clearMessages } =
    useSignatureSave();

  const { generateLink, generateLinksForAll, generating, error: linkError, clearError: clearLinkError } =
    useSignatureLink();

  const {
    previewUrls,
    loading: previewLoading,
    error: previewError,
    refresh: refreshPreview,
  } = useSignaturePreview(selectedRecordId, attachmentFieldId);

  const canvasRef = useRef<SignatureCanvasHandle>(null);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [linksGenerated, setLinksGenerated] = useState(false);

  // 插件初始化完成后，自动为所有记录批量生成签字确认链接
  useEffect(() => {
    if (isInitialized && urlFieldId && !linksGenerated) {
      generateLinksForAll(urlFieldId).then(() => {
        setLinksGenerated(true);
      });
    }
  }, [isInitialized, urlFieldId, linksGenerated, generateLinksForAll]);

  // 监听新增记录事件，自动为新记录生成签字链接
  useEffect(() => {
    if (!isInitialized || !urlFieldId) return;

    let off: (() => void) | undefined;
    const setup = async () => {
      try {
        const table = await bitable.base.getActiveTable();
        off = table.onRecordAdd(async (event: any) => {
          const data = event?.data;
          const recordIds: string[] = Array.isArray(data)
            ? data.map((r: any) => r.recordId || r)
            : data?.recordId
              ? [data.recordId]
              : [];
          for (const rid of recordIds) {
            if (rid) {
              await generateLink(rid, urlFieldId!);
            }
          }
        }) as any;
      } catch {
        // 监听失败不阻塞
      }
    };
    setup();

    return () => {
      if (typeof off === 'function') off();
    };
  }, [isInitialized, urlFieldId, generateLink]);

  // 当选中记录变化时，重置画布状态
  useEffect(() => {
    setShowCanvas(false);
    setIsCanvasEmpty(true);
    clearMessages();
    clearLinkError();
    canvasRef.current?.clear();
  }, [selectedRecordId, clearMessages, clearLinkError]);

  const handleSignatureChange = useCallback((isEmpty: boolean) => {
    setIsCanvasEmpty(isEmpty);
  }, []);

  const handleClear = useCallback(() => {
    canvasRef.current?.clear();
    setIsCanvasEmpty(true);
  }, []);

  const handleResign = useCallback(() => {
    setShowCanvas(true);
    setIsCanvasEmpty(true);
    clearMessages();
    clearLinkError();
    canvasRef.current?.clear();
  }, [clearMessages, clearLinkError]);

  const handleConfirm = useCallback(async () => {
    if (!selectedRecordId || !attachmentFieldId || !canvasRef.current) return;

    const ok = await saveSignature(
      selectedRecordId,
      attachmentFieldId,
      () => canvasRef.current!.getBlob()
    );

    if (ok) {
      if (urlFieldId) {
        await generateLink(selectedRecordId, urlFieldId);
      }
      await refreshStatus();
      await refreshPreview();
      canvasRef.current?.clear();
      setIsCanvasEmpty(true);
      setShowCanvas(false);
    }
  }, [
    selectedRecordId,
    attachmentFieldId,
    urlFieldId,
    saveSignature,
    generateLink,
    refreshStatus,
    refreshPreview,
  ]);

  const handleRetrySave = useCallback(() => {
    clearMessages();
    handleConfirm();
  }, [clearMessages, handleConfirm]);

  if (!isOnline) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>签字插件</h3>
        <div style={styles.bannerError}>
          <span style={styles.bannerIcon}>⚠️</span>
          <span>网络连接已断开，请检查网络后重试</span>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>签字插件</h3>
        {initError ? (
          <div style={styles.bannerError}>
            <p style={styles.errorText}>{initError}</p>
            <button style={styles.retryButton} onClick={retryInit}>
              重试
            </button>
          </div>
        ) : (
          <div style={styles.loadingWrapper}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>初始化中...</p>
          </div>
        )}
      </div>
    );
  }

  if (!selectedRecordId) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>签字插件</h3>
        {generating && (
          <div style={styles.loadingWrapper}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>正在为记录生成签字链接...</p>
          </div>
        )}
        <div style={styles.hintBox}>
          <p style={styles.hintText}>
            👈 请在表格中选中一条记录，或点击「签字确认链接」列中的链接来进行签字
          </p>
        </div>
      </div>
    );
  }

  const shouldShowCanvas = !hasSigned || showCanvas;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>签字插件</h3>

      <div style={styles.recordInfo}>
        <span style={styles.recordLabel}>当前记录：</span>
        <span style={styles.recordId}>{selectedRecordId}</span>
        {statusLoading ? (
          <span style={styles.statusLoading}>检查中...</span>
        ) : (
          <span style={hasSigned ? styles.statusSigned : styles.statusUnsigned}>
            {hasSigned ? '✅ 已签名' : '⬜ 未签名'}
          </span>
        )}
      </div>

      {hasSigned && !showCanvas && (
        <>
          <SignaturePreview
            previewUrls={previewUrls}
            loading={previewLoading}
            onResign={handleResign}
          />
          {previewError && (
            <div style={styles.bannerError}>
              <p style={styles.errorText}>{previewError}</p>
              <button style={styles.retryButton} onClick={refreshPreview}>
                重试
              </button>
            </div>
          )}
        </>
      )}

      {shouldShowCanvas && (
        <>
          <SignatureCanvas ref={canvasRef} onSignatureChange={handleSignatureChange} />
          <ActionButtons
            onClear={handleClear}
            onConfirm={handleConfirm}
            clearDisabled={isCanvasEmpty}
            confirmDisabled={isCanvasEmpty || saving}
          />
        </>
      )}

      {saving && (
        <div style={styles.loadingWrapper}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>保存中...</p>
        </div>
      )}

      {saveError && (
        <div style={styles.bannerError}>
          <p style={styles.errorText}>{saveError}</p>
          <button style={styles.retryButton} onClick={handleRetrySave}>
            重试
          </button>
        </div>
      )}

      {linkError && (
        <div style={styles.bannerError}>
          <p style={styles.errorText}>{linkError}</p>
        </div>
      )}

      {saveSuccess && <p style={styles.successText}>{saveSuccess}</p>}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: 16, minWidth: 410 },
  title: { fontSize: 18, fontWeight: 600, color: '#1f2329', marginBottom: 16 },
  hintBox: {
    padding: '20px 16px',
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    border: '1px solid #d0deff',
    textAlign: 'center' as const,
  },
  hintText: { fontSize: 14, color: '#3370ff', margin: 0, lineHeight: 1.6 },
  recordInfo: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 12px', marginBottom: 16,
    backgroundColor: '#f5f6f7', borderRadius: 6, flexWrap: 'wrap' as const,
  },
  recordLabel: { fontSize: 14, fontWeight: 500, color: '#1f2329' },
  recordId: { fontSize: 13, color: '#646a73', fontFamily: 'monospace' },
  statusLoading: { fontSize: 12, color: '#8f959e', marginLeft: 'auto' },
  statusSigned: { fontSize: 12, color: '#34c724', marginLeft: 'auto' },
  statusUnsigned: { fontSize: 12, color: '#8f959e', marginLeft: 'auto' },
  errorText: { fontSize: 14, color: '#f54a45', margin: 0 },
  successText: { fontSize: 14, color: '#34c724', marginTop: 8 },
  loadingText: { fontSize: 14, color: '#8f959e', margin: 0 },
  loadingWrapper: {
    display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, justifyContent: 'center',
  },
  spinner: {
    width: 16, height: 16, border: '2px solid #dee0e3',
    borderTopColor: '#3370ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
  },
  bannerError: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 12px', marginTop: 8,
    backgroundColor: '#fef0f0', borderRadius: 6, border: '1px solid #fde2e2',
    flexWrap: 'wrap' as const,
  },
  bannerIcon: { fontSize: 16 },
  retryButton: {
    marginLeft: 'auto', padding: '4px 12px', fontSize: 13,
    borderRadius: 4, border: '1px solid #dee0e3',
    backgroundColor: '#fff', color: '#1f2329', cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
};

export default App;
