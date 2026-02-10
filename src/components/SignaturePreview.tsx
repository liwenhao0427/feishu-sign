import React from 'react';

export interface SignaturePreviewProps {
  /** 签名图片 URL 列表 */
  previewUrls: string[];
  /** 是否正在加载 */
  loading: boolean;
  /** 点击重新签名回调 */
  onResign: () => void;
}

/**
 * 签名预览组件
 * 需求: 7.2 — 显示现有签名图片预览
 */
const SignaturePreview: React.FC<SignaturePreviewProps> = ({
  previewUrls,
  loading,
  onResign,
}) => {
  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.loadingText}>加载签名图片中...</p>
      </div>
    );
  }

  if (previewUrls.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <label style={styles.label}>已有签名</label>
      <div style={styles.imageWrapper}>
        {previewUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`签名图片 ${index + 1}`}
            style={styles.image}
          />
        ))}
      </div>
      <button style={styles.resignButton} onClick={onResign}>
        重新签名
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginBottom: 16,
  },
  label: {
    display: 'block',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 500,
    color: '#1f2329',
  },
  imageWrapper: {
    border: '1px solid #dee0e3',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 4,
  },
  loadingText: {
    fontSize: 14,
    color: '#8f959e',
    textAlign: 'center' as const,
  },
  resignButton: {
    marginTop: 8,
    padding: '6px 16px',
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #dee0e3',
    backgroundColor: '#fff',
    color: '#1f2329',
    cursor: 'pointer',
    width: '100%',
  },
};

export default SignaturePreview;
