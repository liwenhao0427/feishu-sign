import { useState, useEffect, useCallback } from 'react';
import { bitable, IAttachmentField } from '@lark-base-open/js-sdk';

export interface RecordItem {
  recordId: string;
  hasSigned: boolean;
}

export interface UseRecordsResult {
  records: RecordItem[];
  selectedRecordId: string | null;
  selectRecord: (recordId: string) => void;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * 判断记录是否已签名（检查"签字图片"字段是否包含附件）
 * 需求: 2.3, 7.1
 */
export function checkHasSigned(attachmentValue: unknown): boolean {
  if (attachmentValue == null) return false;
  if (Array.isArray(attachmentValue)) return attachmentValue.length > 0;
  return false;
}

/**
 * 记录管理 Hook
 * 需求: 2.1, 2.2, 2.3, 2.4
 */
export function useRecords(attachmentFieldId: string | null): UseRecordsResult {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    if (!attachmentFieldId) return;

    setLoading(true);
    setError(null);

    try {
      const table = await bitable.base.getActiveTable();
      const recordIdList = await table.getRecordIdList();

      // 需求 2.4: 空记录列表情况由调用方处理
      if (recordIdList.length === 0) {
        setRecords([]);
        setSelectedRecordId(null);
        setLoading(false);
        return;
      }

      // 获取附件字段实例，用于检查签名状态
      const attachmentField = await table.getField<IAttachmentField>(attachmentFieldId);

      // 需求 2.1: 获取所有记录并判断签名状态
      const items: RecordItem[] = await Promise.all(
        recordIdList.map(async (recordId) => {
          let hasSigned = false;
          try {
            const value = await attachmentField.getValue(recordId);
            hasSigned = checkHasSigned(value);
          } catch {
            // 获取单条记录附件值失败时，默认未签名
          }
          return { recordId, hasSigned };
        })
      );

      setRecords(items);

      // 如果当前选中的记录不在新列表中，清除选择
      if (selectedRecordId && !recordIdList.includes(selectedRecordId)) {
        setSelectedRecordId(null);
      }
    } catch {
      setError('记录加载失败，请刷新重试');
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [attachmentFieldId, selectedRecordId]);

  // 需求 2.2: 记录选择
  const selectRecord = useCallback((recordId: string) => {
    setSelectedRecordId(recordId);
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    records,
    selectedRecordId,
    selectRecord,
    loading,
    error,
    refresh: fetchRecords,
  };
}
