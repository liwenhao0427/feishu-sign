import { useState, useEffect } from 'react';
import { bitable } from '@lark-base-open/js-sdk';

/**
 * 监听多维表格中用户选中记录的变化
 * 需求 3.1, 3.2: 通过 onSelectionChange 检测选中的记录ID
 */
export function useSelectionChange() {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  useEffect(() => {
    const off = bitable.base.onSelectionChange(({ data }) => {
      const recordId = data?.recordId ?? null;
      setSelectedRecordId(recordId);
    });

    // 获取初始选中状态
    bitable.base.getSelection().then((sel) => {
      if (sel?.recordId) {
        setSelectedRecordId(sel.recordId);
      }
    });

    return () => {
      if (typeof off === 'function') {
        off();
      }
    };
  }, []);

  return selectedRecordId;
}
