import React from 'react';
import type { RecordItem } from '../hooks/useRecords';

export interface RecordSelectorProps {
  records: RecordItem[];
  selectedRecordId: string | null;
  onRecordChange: (recordId: string) => void;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

/**
 * 记录选择器组件
 * 需求: 2.1, 2.2, 2.3, 2.4
 */
const RecordSelector: React.FC<RecordSelectorProps> = ({
  records,
  selectedRecordId,
  onRecordChange,
  loading,
  error,
  onRetry,
}) => {
  // 需求 2.4: 空记录列表提示
  if (!loading && !error && records.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>当前数据表没有记录，请先添加记录</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>加载记录中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>{error}</p>
        {onRetry && (
          <button style={styles.retryButton} onClick={onRetry}>
            重试
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <label style={styles.label}>选择记录</label>
      <select
        style={styles.select}
        value={selectedRecordId ?? ''}
        onChange={(e) => {
          if (e.target.value) {
            onRecordChange(e.target.value);
          }
        }}
      >
        <option value="" disabled>
          请选择一条记录
        </option>
        {records.map((record) => (
          <option key={record.recordId} value={record.recordId}>
            {/* 需求 2.3: 显示签名状态标识 */}
            {record.hasSigned ? '✅ ' : '⬜ '}
            {record.recordId}
          </option>
        ))}
      </select>
      {/* 需求 2.2: 高亮显示选中记录的签名状态 */}
      {selectedRecordId && (
        <p style={styles.statusText}>
          {records.find((r) => r.recordId === selectedRecordId)?.hasSigned
            ? '该记录已签名'
            : '该记录未签名'}
        </p>
      )}
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
  select: {
    width: '100%',
    padding: '8px 12px',
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #dee0e3',
    backgroundColor: '#fff',
    color: '#1f2329',
    outline: 'none',
    cursor: 'pointer',
  },
  statusText: {
    marginTop: 6,
    fontSize: 12,
    color: '#646a73',
  },
  emptyContainer: {
    padding: 16,
    textAlign: 'center' as const,
  },
  emptyText: {
    fontSize: 14,
    color: '#8f959e',
  },
  loadingContainer: {
    padding: 16,
    textAlign: 'center' as const,
  },
  loadingText: {
    fontSize: 14,
    color: '#8f959e',
  },
  errorContainer: {
    padding: 16,
    textAlign: 'center' as const,
  },
  errorText: {
    fontSize: 14,
    color: '#f54a45',
    marginBottom: 8,
  },
  retryButton: {
    padding: '6px 16px',
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #dee0e3',
    backgroundColor: '#fff',
    color: '#1f2329',
    cursor: 'pointer',
  },
};

export default RecordSelector;
