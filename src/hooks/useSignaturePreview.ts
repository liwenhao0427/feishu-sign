import { useState, useEffect, useCallback } from 'react';
import { bitable, IAttachmentField } from '@lark-base-open/js-sdk';

export interface SignaturePreviewResult {
  previewUrls: string[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * 从附件值中尽可能提取可用的 URL
 */
function extractUrlsFromValue(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const urls: string[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const v = item as any;
    // 尝试各种可能的 URL 字段名
    const url = v.url || v.tmp_url || v.tmpUrl || v.src || '';
    if (url) {
      urls.push(url);
    }
  }
  return urls;
}

/**
 * 从附件值中提取 token 列表，用于 getAttachmentUrls
 */
function extractTokens(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item: any) => item && typeof item === 'object' && (item.token || item.file_token))
    .map((item: any) => item.token || item.file_token);
}

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

      if (!value || (Array.isArray(value) && value.length === 0)) {
        setPreviewUrls([]);
        setLoading(false);
        return;
      }

      // 方法 1: 尝试用 getAttachmentUrls 获取临时访问 URL
      const tokens = extractTokens(value);
      if (tokens.length > 0) {
        try {
          const urlMap = await (attachmentField as any).getAttachmentUrls(recordId);
          if (urlMap && typeof urlMap === 'object') {
            const urls = Object.values(urlMap).filter((u) => typeof u === 'string' && (u as string).length > 0) as string[];
            if (urls.length > 0) {
              setPreviewUrls(urls);
              setLoading(false);
              return;
            }
          }
        } catch {
          // getAttachmentUrls 不可用，继续尝试其他方式
        }
      }

      // 方法 2: 直接从 value 中提取 URL
      const directUrls = extractUrlsFromValue(value);
      if (directUrls.length > 0) {
        setPreviewUrls(directUrls);
        setLoading(false);
        return;
      }

      // 方法 3: 如果 value 有内容但提取不到 URL，打印调试信息
      console.log('[签字插件] 附件值结构:', JSON.stringify(value, null, 2));
      setPreviewUrls([]);
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

  return { previewUrls, loading, error, refresh: fetchPreview };
}
