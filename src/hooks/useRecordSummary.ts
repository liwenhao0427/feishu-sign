import { useState, useEffect, useCallback } from 'react';
import { bitable, FieldType } from '@lark-base-open/js-sdk';

export interface FieldSummaryItem {
  name: string;
  value: string;
}

/** 读取记录的文本类型字段，返回字段名+值的列表 */
export function useRecordSummary(recordId: string | null) {
  const [fields, setFields] = useState<FieldSummaryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSummary = useCallback(async () => {
    if (!recordId) {
      setFields([]);
      return;
    }
    setLoading(true);
    try {
      const table = await bitable.base.getActiveTable();
      const fieldMetaList = await table.getFieldMetaList();

      // 只取文本类型字段，最多 5 个
      const textFields = fieldMetaList
        .filter((f) => f.type === FieldType.Text)
        .slice(0, 5);

      const items: FieldSummaryItem[] = [];
      for (const meta of textFields) {
        try {
          const field = await table.getField(meta.id);
          const cellValue = await (field as any).getValue(recordId);
          if (cellValue != null) {
            // 文本字段返回 IOpenSegment[] 数组，需要提取 text
            let text = '';
            if (Array.isArray(cellValue)) {
              text = cellValue
                .map((seg: any) => {
                  if (typeof seg === 'string') return seg;
                  if (seg && typeof seg.text === 'string') return seg.text;
                  return '';
                })
                .join('');
            } else if (typeof cellValue === 'string') {
              text = cellValue;
            }
            if (text.trim()) {
              items.push({ name: meta.name, value: text.trim() });
            }
          }
        } catch {
          // 单个字段读取失败跳过
        }
      }

      setFields(items);
    } catch {
      setFields([]);
    } finally {
      setLoading(false);
    }
  }, [recordId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { fields, loading };
}
