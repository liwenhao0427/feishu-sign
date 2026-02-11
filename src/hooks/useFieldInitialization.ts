import { useState, useEffect, useCallback, useRef } from 'react';
import { bitable, FieldType } from '@lark-base-open/js-sdk';

const ATTACHMENT_FIELD_NAME = '签字图片';

export interface FieldInitResult {
  attachmentFieldId: string | null;
  isInitialized: boolean;
  error: string | null;
  retry: () => void;
}

export function useFieldInitialization() {
  const [result, setResult] = useState<Omit<FieldInitResult, 'retry'>>({
    attachmentFieldId: null,
    isInitialized: false,
    error: null,
  });
  const retryCount = useRef(0);

  const initialize = useCallback(async () => {
    setResult((prev) => ({ ...prev, error: null }));

    try {
      const table = await bitable.base.getActiveTable();
      const fieldMetaList = await table.getFieldMetaList();

      // 先按名称查找（不限类型），避免 "field name repeated" 错误
      let attachmentFieldMeta = fieldMetaList.find(
        (f) => f.name === ATTACHMENT_FIELD_NAME && f.type === FieldType.Attachment
      );

      let attachmentFieldId = attachmentFieldMeta?.id ?? null;

      if (!attachmentFieldId) {
        // 检查是否有同名但不同类型的字段
        const sameName = fieldMetaList.find((f) => f.name === ATTACHMENT_FIELD_NAME);
        if (sameName) {
          // 同名字段已存在但类型不对，用带后缀的名称创建
          attachmentFieldId = await table.addField({
            type: FieldType.Attachment,
            name: `${ATTACHMENT_FIELD_NAME}_附件`,
          });
        } else {
          attachmentFieldId = await table.addField({
            type: FieldType.Attachment,
            name: ATTACHMENT_FIELD_NAME,
          });
        }
      }

      retryCount.current = 0;
      setResult({ attachmentFieldId, isInitialized: true, error: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : '字段创建失败，请检查权限';

      // 如果是字段重复错误，自动重试（最多 2 次），重新读取字段列表
      if (msg.includes('repeated') && retryCount.current < 2) {
        retryCount.current++;
        // 延迟 500ms 后重试，等待字段列表刷新
        setTimeout(() => initialize(), 500);
        return;
      }

      setResult({
        attachmentFieldId: null,
        isInitialized: false,
        error: msg,
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { ...result, retry: initialize };
}
