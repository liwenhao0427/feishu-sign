import { useState, useEffect, useCallback } from 'react';
import { bitable, FieldType } from '@lark-base-open/js-sdk';

const URL_FIELD_NAME = '签字确认链接';
const ATTACHMENT_FIELD_NAME = '签字图片';

export interface FieldInitResult {
  urlFieldId: string | null;
  attachmentFieldId: string | null;
  isInitialized: boolean;
  error: string | null;
  /** 重试初始化 */
  retry: () => void;
}

/**
 * 检查字段是否存在，不存在则自动创建
 * 需求: 1.1, 1.2, 1.3, 1.4, 1.5
 */
export function useFieldInitialization() {
  const [result, setResult] = useState<Omit<FieldInitResult, 'retry'>>({
    urlFieldId: null,
    attachmentFieldId: null,
    isInitialized: false,
    error: null,
  });

  const initialize = useCallback(async () => {
    try {
      const table = await bitable.base.getActiveTable();
      const fieldMetaList = await table.getFieldMetaList();

      // 需求 1.1: 检查"签字确认链接"字段是否存在
      const urlFieldMeta = fieldMetaList.find(
        (f) => f.name === URL_FIELD_NAME && f.type === FieldType.Url
      );

      // 需求 1.3: 检查"签字图片"字段是否存在
      const attachmentFieldMeta = fieldMetaList.find(
        (f) => f.name === ATTACHMENT_FIELD_NAME && f.type === FieldType.Attachment
      );

      // 需求 1.2: 自动创建URL字段
      let urlFieldId = urlFieldMeta?.id ?? null;
      if (!urlFieldId) {
        urlFieldId = await table.addField({
          type: FieldType.Url,
          name: URL_FIELD_NAME,
        });
      }

      // 需求 1.4: 自动创建附件字段
      let attachmentFieldId = attachmentFieldMeta?.id ?? null;
      if (!attachmentFieldId) {
        attachmentFieldId = await table.addField({
          type: FieldType.Attachment,
          name: ATTACHMENT_FIELD_NAME,
        });
      }

      // 需求 1.5: 初始化完成
      setResult({
        urlFieldId,
        attachmentFieldId,
        isInitialized: true,
        error: null,
      });
    } catch (e) {
      setResult({
        urlFieldId: null,
        attachmentFieldId: null,
        isInitialized: false,
        error: e instanceof Error ? e.message : '字段创建失败，请检查权限',
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { ...result, retry: initialize };
}
