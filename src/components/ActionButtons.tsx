import React from 'react';

export interface ActionButtonsProps {
  /** 清除回调 */
  onClear: () => void;
  /** 确认签字回调 */
  onConfirm: () => void;
  /** 清除按钮是否禁用（需求 4.2: 画布为空时禁用） */
  clearDisabled: boolean;
  /** 确认按钮是否禁用（需求 5.5: 画布为空时禁用） */
  confirmDisabled: boolean;
}

/**
 * 操作按钮组组件
 * 需求: 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 5.4, 5.5
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  onClear,
  onConfirm,
  clearDisabled,
  confirmDisabled,
}) => {
  return (
    <div style={styles.container}>
      {/* 需求 4.1: 清除按钮 — 清空画布签名内容 */}
      {/* 需求 4.2: 画布为空时禁用清除按钮 */}
      <button
        style={{
          ...styles.button,
          ...styles.clearButton,
          ...(clearDisabled ? styles.disabledButton : {}),
        }}
        onClick={onClear}
        disabled={clearDisabled}
      >
        清除
      </button>

      {/* 需求 5.1-5.4: 确认签字按钮 — 转换并上传签名 */}
      {/* 需求 5.5: 画布为空时禁用确认按钮 */}
      <button
        style={{
          ...styles.button,
          ...styles.confirmButton,
          ...(confirmDisabled ? styles.disabledButton : {}),
        }}
        onClick={onConfirm}
        disabled={confirmDisabled}
      >
        确认签字
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
    padding: '10px 0',
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  clearButton: {
    backgroundColor: '#f0f1f5',
    color: '#1f2329',
  },
  confirmButton: {
    backgroundColor: '#3370ff',
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
};

export default ActionButtons;
