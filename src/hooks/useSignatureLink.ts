import { useState, useCallback } from 'react';
import { bitable, IUrlField, IOpenSegmentType } from '@lark-base-open/js-sdk';

export interface UseSignatureLinkResult {
  /** 为单条记录生成并保存签字确认链接 */
  generateLink: (recordId: string, urlFieldId: string) => Promise<boolean>;
  /** 为所有空链接记录批量生成签字确认链接 */
  generateLinksForAll: (urlFieldId: string) => Promise<boolean>;
  /** 是否正在生成 */
  generating: boolean;
  /** 错误信息 */
  error: string | null;
  /** 清除提示信息 */
  clearError: () => void;
}

// TODO: 上线后替换为正式的插件 ID
const PLUGIN_ID = 'ou_995328b088836a664c4340dd5b9f7f08';

/**
 * 生成签字确认链接 — 打开多维表格并自动唤起插件侧栏、选中对应记录
 *
 * 格式: https://feishu.cn/base/{appToken}?table={tableId}&view={viewId}&record={recordId}
 *       &extension_market_extension_id={pluginId}&extension_market_spread=1
 */
export function buildSignatureUrl(
  appToken: string,
  tableId: string,
  viewId: string,
  recordId: string
): string {
  const base = `https://feishu.cn/base/${appToken}`;
  const params = new URLSearchParams({
    table: tableId,
    view: viewId,
    record: recordId,
    extension_market_extension_id: PLUGIN_ID,
    extension_market_spread: '1',
  });
  return `${base}?${params.toString()}`;
}

/**
 * 签字确认链接生成 Hook
 */
export function useSignatureLink(): UseSignatureLinkResult {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /** 获取当前多维表格的 appToken、tableId、viewId */
  const getBaseInfo = useCallback(async () => {
    const selection = await bitable.base.getSelection();
    const table = await bitable.base.getActiveTable();
    const tableId = table.id;

    // appToken: selection 中的 baseId
    const appToken: string = (selection as any)?.baseId || '';

    // viewId: 当前激活的视图
    const viewId: string = selection?.viewId || '';

    return { appToken, tableId, viewId };
  }, []);

  const generateLink = useCallback(
    async (recordId: string, urlFieldId: string): Promise<boolean> => {
      setGenerating(true);
      setError(null);

      try {
        const { appToken, tableId, viewId } = await getBaseInfo();
        const signatureUrl = buildSignatureUrl(appToken, tableId, viewId, recordId);

        const table = await bitable.base.getActiveTable();
        const urlField = await table.getField<IUrlField>(urlFieldId);
        await urlField.setValue(recordId, {
          type: IOpenSegmentType.Url,
          text: '点击签字',
          link: signatureUrl,
        });

        setGenerating(false);
        return true;
      } catch (e) {
        const message = e instanceof Error ? e.message : '链接生成失败';
        setError(message);
        setGenerating(false);
        return false;
      }
    },
    [getBaseInfo]
  );

  const generateLinksForAll = useCallback(
    async (urlFieldId: string): Promise<boolean> => {
      setGenerating(true);
      setError(null);

      try {
        const { appToken, tableId, viewId } = await getBaseInfo();
        const table = await bitable.base.getActiveTable();
        const recordIdList = await table.getRecordIdList();

        if (recordIdList.length === 0) {
          setGenerating(false);
          return true;
        }

        const urlField = await table.getField<IUrlField>(urlFieldId);

        for (const recordId of recordIdList) {
          try {
            const currentValue = await urlField.getValue(recordId);
            if (!currentValue) {
              const signatureUrl = buildSignatureUrl(appToken, tableId, viewId, recordId);
              await urlField.setValue(recordId, {
                type: IOpenSegmentType.Url,
                text: '点击签字',
                link: signatureUrl,
              });
            }
          } catch {
            // 单条记录失败不阻塞
          }
        }

        setGenerating(false);
        return true;
      } catch (e) {
        const message = e instanceof Error ? e.message : '批量生成链接失败';
        setError(message);
        setGenerating(false);
        return false;
      }
    },
    [getBaseInfo]
  );

  return {
    generateLink,
    generateLinksForAll,
    generating,
    error,
    clearError,
  };
}
