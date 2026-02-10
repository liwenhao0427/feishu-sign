import { useState, useEffect, useCallback } from 'react';
import { bitable, IAttachmentField } from '@lark-base-open/js-sdk';

export interface SignaturePreviewResult {
  /** 已有签名图片的 URL 列表 */
  previewUrls: string[];
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
  /** 刷新预览 */
  refresh: () => Promise<void>;
}

/**
 * 从附件字段值中提取预览 URL 列表
 * 需求 7.1: 检查签字图片字段是否包含图片
 */
export function extractPreviewUrls(attachmentValue: unknown): string[] {
  if (!Array.isArray(attachmentValue)) return [];
  return attachmentValue
    .filter((item) => item && typeof item === 'object' && typeof item.url === 'string')
    .map((item) => item.url as string);
}

/**
 * 签名预览 Hook
 * 需求: 7.1, 7.2
 */
export function useSignaturePreview(
  recordId: string | null,
  attachmentFieldId: string | null
): SignaturePreviewResult {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPreview = useCallback(async () => {
    if (!recordId || !attachmentFieldId) {
      setPreviewUrls([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const table = await bitable.base.getActiveTable();
      const attachmentField = await table.getField<IAttachmentField>(attachmentFieldId);
      const value = await attachmentField.getValue(recordId);
      const urls = extractPreviewUrls(value);
      setPreviewUrls(urls);
    } catch {
      setError('获取签名图片失败');
      setPreviewUrls([]);
    } finally {
      setLoading(false);
    }
  }, [recordId, attachmentFieldId]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  return {
    previewUrls,
    loading,
    error,
    refresh: fetchPreview,
  };
}
