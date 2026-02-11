import { useState, useEffect, useCallback } from 'react';
import { bitable, IAttachmentField } from '@lark-base-open/js-sdk';

export interface RecordSignStatus {
  /** 当前记录是否已签名 */
  hasSigned: boolean;
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
  /** 刷新状态 */
  refresh: () => Promise<void>;
}

/**
 * 判断记录是否已签名（检查"签字图片"字段是否包含附件）
 * 需求: 7.1
 */
export function checkHasSigned(attachmentValue: unknown): boolean {
  if (attachmentValue == null) return false;
  if (Array.isArray(attachmentValue)) return attachmentValue.length > 0;
  return false;
}

/**
 * 检查单条记录的签名状态
 * 需求: 3.3, 3.4, 7.1
 */
export function useRecordSignStatus(
  recordId: string | null,
  attachmentFieldId: string | null
): RecordSignStatus {
  const [hasSigned, setHasSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!recordId || !attachmentFieldId) {
      setHasSigned(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const table = await bitable.base.getActiveTable();
      const attachmentField = await table.getField<IAttachmentField>(attachmentFieldId);
      const value = await attachmentField.getValue(recordId);
      setHasSigned(checkHasSigned(value));
    } catch {
      setError('获取签名状态失败');
      setHasSigned(false);
    } finally {
      setLoading(false);
    }
  }, [recordId, attachmentFieldId]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { hasSigned, loading, error, refresh: fetchStatus };
}
