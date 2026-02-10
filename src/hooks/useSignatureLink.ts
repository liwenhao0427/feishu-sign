import { useState, useCallback } from 'react';
import { bitable, IUrlField, IOpenSegmentType } from '@lark-base-open/js-sdk';

export interface UseSignatureLinkResult {
  /** 生成并保存签字确认链接 */
  generateLink: (recordId: string, urlFieldId: string) => Promise<boolean>;
  /** 是否正在生成 */
  generating: boolean;
  /** 错误信息（需求 6.4: 链接生成失败时显示） */
  error: string | null;
  /** 清除提示信息 */
  clearError: () => void;
}

/**
 * 生成签字确认链接
 * 需求 6.1: 链接包含记录ID和表ID
 */
export function buildSignatureUrl(tableId: string, recordId: string): string {
  return `${window.location.origin}${window.location.pathname}?tableId=${encodeURIComponent(tableId)}&recordId=${encodeURIComponent(recordId)}`;
}

/**
 * 签字确认链接生成 Hook
 * 需求: 6.1, 6.2, 6.3, 6.4
 */
export function useSignatureLink(): UseSignatureLinkResult {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const generateLink = useCallback(
    async (recordId: string, urlFieldId: string): Promise<boolean> => {
      setGenerating(true);
      setError(null);

      try {
        const table = await bitable.base.getActiveTable();
        const tableId = table.id;

        // 需求 6.1: 生成包含记录ID和表ID的签字确认链接
        const signatureUrl = buildSignatureUrl(tableId, recordId);

        // 需求 6.2: 将链接保存到"签字确认链接"字段
        const urlField = await table.getField<IUrlField>(urlFieldId);
        await urlField.setValue(recordId, {
          type: IOpenSegmentType.Url,
          text: '点击签字',
          link: signatureUrl,
        });

        setGenerating(false);
        return true;
      } catch (e) {
        // 需求 6.4: 链接生成失败的错误处理
        const message = e instanceof Error ? e.message : '链接生成失败';
        setError(message);
        setGenerating(false);
        return false;
      }
    },
    []
  );

  return {
    generateLink,
    generating,
    error,
    clearError,
  };
}
