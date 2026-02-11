import React, { useRef, useState, useCallback, useEffect } from 'react';
import { bitable, IAttachmentField } from '@lark-base-open/js-sdk';
import { useFieldInitialization } from './hooks/useFieldInitialization';
import { useSelectionChange } from './hooks/useSelectionChange';
import { useRecordSignStatus } from './hooks/useRecordSignStatus';
import { useRecordSummary } from './hooks/useRecordSummary';
import { useSignatureSave } from './hooks/useSignatureSave';
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
    attachmentFieldId,
    isInitialized,
    error: initError,
    retry: retryInit,
  } = useFieldInitialization();

  const selectedRecordId = useSelectionChange();
  const { fields: recordFields, loading: summaryLoading } = useRecordSummary(selectedRecordId);

  const {
    hasSigned,
    loading: statusLoading,
    refresh: refreshStatus,
  } = useRecordSignStatus(selectedRecordId, attachmentFieldId);

  const { saveSignature, saving, error: saveError, success: saveSuccess, clearMessages } =
    useSignatureSave();

  const {
    previewUrls,
    loading: previewLoading,
    error: previewError,
    refresh: refreshPreview,
  } = useSignaturePreview(selectedRecordId, attachmentFieldId);

  const canvasRef = useRef<SignatureCanvasHandle>(null);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    setShowCanvas(false);
    setIsCanvasEmpty(true);
    clearMessages();
    canvasRef.current?.clear();
  }, [selectedRecordId, clearMessages]);

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
    canvasRef.current?.clear();
  }, [clearMessages]);

  const handleConfirm = useCallback(async () => {
    if (!selectedRecordId || !attachmentFieldId || !canvasRef.current) return;

    const ok = await saveSignature(
      selectedRecordId,
      attachmentFieldId,
      () => canvasRef.current!.getBlob()
    );

    if (ok) {
      await refreshStatus();
      await refreshPreview();
      canvasRef.current?.clear();
      setIsCanvasEmpty(true);
      setShowCanvas(false);
    }
  }, [selectedRecordId, attachmentFieldId, saveSignature, refreshStatus, refreshPreview]);

  const handleClearSignature = useCallback(async () => {
    if (!selectedRecordId || !attachmentFieldId) return;
    setClearing(true);
    clearMessages();
    try {
      const table = await bitable.base.getActiveTable();
      const field = await table.getField<IAttachmentField>(attachmentFieldId);
      await (field as any).setValue(selectedRecordId, []);
    } catch {
      try {
        const table = await bitable.base.getActiveTable();
        const field = await table.getField<IAttachmentField>(attachmentFieldId);
        await (field as any).setValue(selectedRecordId, null);
      } catch { /* silent */ }
    }
    await refreshStatus();
    await refreshPreview();
    setShowCanvas(false);
    setClearing(false);
  }, [selectedRecordId, attachmentFieldId, refreshStatus, refreshPreview, clearMessages]);

  const handleRetrySave = useCallback(() => {
    clearMessages();
    handleConfirm();
  }, [clearMessages, handleConfirm]);

  if (!isOnline) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>签字插件</h3>
        <div style={styles.bannerError}>
          <span>⚠️ 网络连接已断开，请检查网络后重试</span>
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
            <button style={styles.retryButton} onClick={retryInit}>重试</button>
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
        <div style={styles.hintBox}>
          <p style={styles.hintText}>👈 请在表格中选中一条记录进行签字</p>
        </div>
      </div>
    );
  }

  const shouldShowCanvas = !hasSigned || showCanvas;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>签字插件</h3>

      <div style={styles.recordInfo}>
        <div style={styles.recordHeader}>
          <span style={styles.recordLabel}>当前记录</span>
          {statusLoading ? (
            <span style={styles.statusLoading}>检查中...</span>
          ) : (
            <span style={hasSigned ? styles.statusSigned : styles.statusUnsigned}>
              {hasSigned ? '✅ 已签名' : '⬜ 未签名'}
            </span>
          )}
        </div>
        {summaryLoading ? (
          <p style={styles.fieldLoading}>加载中...</p>
        ) : recordFields.length > 0 ? (
          <div style={styles.fieldList}>
            {recordFields.map((f, i) => (
              <div key={i} style={styles.fieldRow}>
                <span style={styles.fieldName}>{f.name}：</span>
                <span style={styles.fieldValue}>{f.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.fieldLoading}>无文本字段</p>
        )}
      </div>

      {hasSigned && !showCanvas && (
        <>
          <SignaturePreview previewUrls={previewUrls} loading={previewLoading} onResign={handleResign} />
          <button
            style={{ ...styles.clearSignatureButton, ...(clearing ? { opacity: 0.5, cursor: 'not-allowed' } : {}) }}
            onClick={handleClearSignature}
            disabled={clearing}
          >
            {clearing ? '清除中...' : '🗑️ 清除签名'}
          </button>
          {previewError && (
            <div style={styles.bannerError}>
              <p style={styles.errorText}>{previewError}</p>
              <button style={styles.retryButton} onClick={refreshPreview}>重试</button>
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
          <button style={styles.retryButton} onClick={handleRetrySave}>重试</button>
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
    padding: '20px 16px', backgroundColor: '#f0f4ff',
    borderRadius: 8, border: '1px solid #d0deff', textAlign: 'center' as const,
  },
  hintText: { fontSize: 14, color: '#3370ff', margin: 0, lineHeight: 1.6 },
  recordInfo: { padding: 12, marginBottom: 16, backgroundColor: '#f5f6f7', borderRadius: 6 },
  recordHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  recordLabel: { fontSize: 14, fontWeight: 600, color: '#1f2329' },
  fieldList: { display: 'flex', flexDirection: 'column' as const, gap: 4 },
  fieldRow: { display: 'flex', fontSize: 13, lineHeight: 1.5 },
  fieldName: { color: '#8f959e', flexShrink: 0, marginRight: 4 },
  fieldValue: { color: '#1f2329', wordBreak: 'break-all' as const },
  fieldLoading: { fontSize: 13, color: '#8f959e', margin: 0 },
  statusLoading: { fontSize: 12, color: '#8f959e' },
  statusSigned: { fontSize: 12, color: '#34c724' },
  statusUnsigned: { fontSize: 12, color: '#8f959e' },
  clearSignatureButton: {
    width: '100%', padding: '8px 0', fontSize: 13, fontWeight: 500,
    borderRadius: 6, border: '1px solid #fde2e2',
    backgroundColor: '#fef0f0', color: '#f54a45', cursor: 'pointer', marginTop: 8,
  },
  errorText: { fontSize: 14, color: '#f54a45', margin: 0 },
  successText: { fontSize: 14, color: '#34c724', marginTop: 8 },
  loadingText: { fontSize: 14, color: '#8f959e', margin: 0 },
  loadingWrapper: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, justifyContent: 'center' },
  spinner: { width: 16, height: 16, border: '2px solid #dee0e3', borderTopColor: '#3370ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  bannerError: { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', marginTop: 8, backgroundColor: '#fef0f0', borderRadius: 6, border: '1px solid #fde2e2', flexWrap: 'wrap' as const },
  retryButton: { marginLeft: 'auto', padding: '4px 12px', fontSize: 13, borderRadius: 4, border: '1px solid #dee0e3', backgroundColor: '#fff', color: '#1f2329', cursor: 'pointer', whiteSpace: 'nowrap' as const },
};

export default App;
