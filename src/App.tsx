import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useFieldInitialization } from './hooks/useFieldInitialization';
import { useRecords } from './hooks/useRecords';
import { useSignatureSave } from './hooks/useSignatureSave';
import { useSignatureLink } from './hooks/useSignatureLink';
import { useSignaturePreview } from './hooks/useSignaturePreview';
import RecordSelector from './components/RecordSelector';
import SignatureCanvas, { SignatureCanvasHandle } from './components/SignatureCanvas';
import ActionButtons from './components/ActionButtons';
import SignaturePreview from './components/SignaturePreview';

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // 网络异常检测
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

  const {
    records,
    selectedRecordId,
    selectRecord,
    loading: recordsLoading,
    error: recordsError,
    refresh: refreshRecords,
  } = useRecords(attachmentFieldId);

  const { saveSignature, saving, error: saveError, success: saveSuccess, clearMessages } =
    useSignatureSave();

  const { generateLink, error: linkError, clearError: clearLinkError } = useSignatureLink();

  const {
    previewUrls,
    loading: previewLoading,
    error: previewError,
    refresh: refreshPreview,
  } = useSignaturePreview(selectedRecordId, attachmentFieldId);

  const canvasRef = useRef<SignatureCanvasHandle>(null);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);

  // 需求 7.2, 7.3: 控制是否显示签名画布（已签名记录默认显示预览）
  const [showCanvas, setShowCanvas] = useState(false);

  const selectedRecord = records.find((r) => r.recordId === selectedRecordId);
  const hasSigned = selectedRecord?.hasSigned ?? false;

  // 当选择新记录时，重置画布显示状态
  const handleRecordChange = useCallback(
    (recordId: string) => {
      selectRecord(recordId);
      setShowCanvas(false);
      setIsCanvasEmpty(true);
      clearMessages();
      clearLinkError();
      canvasRef.current?.clear();
    },
    [selectRecord, clearMessages, clearLinkError]
  );

  const handleSignatureChange = useCallback((isEmpty: boolean) => {
    setIsCanvasEmpty(isEmpty);
  }, []);

  const handleClear = useCallback(() => {
    canvasRef.current?.clear();
    setIsCanvasEmpty(true);
  }, []);

  // 需求 7.3: 重新签名 — 显示画布以替换原有签名
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
      // 保存成功后生成链接、刷新记录列表和预览
      if (urlFieldId) {
        await generateLink(selectedRecordId, urlFieldId);
      }
      await refreshRecords();
      await refreshPreview();
      canvasRef.current?.clear();
      setIsCanvasEmpty(true);
      setShowCanvas(false);
    }
    // 需求 5.4: 上传失败时保留签名内容（不清空画布）
  }, [
    selectedRecordId,
    attachmentFieldId,
    urlFieldId,
    saveSignature,
    generateLink,
    refreshRecords,
    refreshPreview,
  ]);

  // 签名上传失败重试
  const handleRetrySave = useCallback(() => {
    clearMessages();
    handleConfirm();
  }, [clearMessages, handleConfirm]);

  // 网络异常提示
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

  // 字段初始化中 / 失败
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

  // 决定是否显示签名画布：未签名记录直接显示，已签名记录点击"重新签名"后显示
  const shouldShowCanvas = selectedRecordId && (!hasSigned || showCanvas);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>签字插件</h3>

      <RecordSelector
        records={records}
        selectedRecordId={selectedRecordId}
        onRecordChange={handleRecordChange}
        loading={recordsLoading}
        error={recordsError}
        onRetry={refreshRecords}
      />

      {/* 需求 7.2: 已签名记录显示签名预览 */}
      {selectedRecordId && hasSigned && !showCanvas && (
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

      {/* Loading: 保存中 */}
      {saving && (
        <div style={styles.loadingWrapper}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>保存中...</p>
        </div>
      )}

      {/* 签名上传失败 — 带重试 */}
      {saveError && (
        <div style={styles.bannerError}>
          <p style={styles.errorText}>{saveError}</p>
          <button style={styles.retryButton} onClick={handleRetrySave}>
            重试
          </button>
        </div>
      )}

      {/* 链接生成失败 */}
      {linkError && (
        <div style={styles.bannerError}>
          <p style={styles.errorText}>{linkError}</p>
        </div>
      )}

      {/* 成功提示 */}
      {saveSuccess && <p style={styles.successText}>{saveSuccess}</p>}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: 16,
    minWidth: 410,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1f2329',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#f54a45',
    margin: 0,
  },
  successText: {
    fontSize: 14,
    color: '#34c724',
    marginTop: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#8f959e',
    margin: 0,
  },
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    justifyContent: 'center',
  },
  spinner: {
    width: 16,
    height: 16,
    border: '2px solid #dee0e3',
    borderTopColor: '#3370ff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  bannerError: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 12px',
    marginTop: 8,
    backgroundColor: '#fef0f0',
    borderRadius: 6,
    border: '1px solid #fde2e2',
    flexWrap: 'wrap' as const,
  },
  bannerIcon: {
    fontSize: 16,
  },
  retryButton: {
    marginLeft: 'auto',
    padding: '4px 12px',
    fontSize: 13,
    borderRadius: 4,
    border: '1px solid #dee0e3',
    backgroundColor: '#fff',
    color: '#1f2329',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
};

export default App;
