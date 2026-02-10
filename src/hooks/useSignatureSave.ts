import { useState, useCallback } from 'react';
import { bitable, IAttachmentField } from '@lark-base-open/js-sdk';

export interface UseSignatureSaveResult {
  /** 保存签名到指定记录的附件字段 */
  saveSignature: (
    recordId: string,
    attachmentFieldId: string,
    getBlob: () => Promise<Blob>
  ) => Promise<boolean>;
  /** 是否正在保存 */
  saving: boolean;
  /** 错误信息（需求 5.4: 上传失败时显示） */
  error: string | null;
  /** 成功信息（需求 5.3: 上传成功后提示） */
  success: string | null;
  /** 清除提示信息 */
  clearMessages: () => void;
}

/**
 * 将 Blob 转换为 File 对象
 * 需求 5.1: 签名转换为 PNG 图片格式
 */
export function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
}

/**
 * 生成签名文件名（格式：signature_时间戳.png）
 */
export function generateFileName(): string {
  return `signature_${Date.now()}.png`;
}

/**
 * 签名保存 Hook
 * 需求: 5.1, 5.2, 5.3, 5.4, 5.5
 */
export function useSignatureSave(): UseSignatureSaveResult {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const saveSignature = useCallback(
    async (
      recordId: string,
      attachmentFieldId: string,
      getBlob: () => Promise<Blob>
    ): Promise<boolean> => {
      setSaving(true);
      setError(null);
      setSuccess(null);

      try {
        // 需求 5.1: 将画布内容转换为 PNG 图片 Blob
        const blob = await getBlob();

        // 将 Blob 转换为 File 对象
        const fileName = generateFileName();
        const file = blobToFile(blob, fileName);

        // 需求 5.2: 上传图片到"签字图片"附件字段
        const table = await bitable.base.getActiveTable();
        const attachmentField = await table.getField<IAttachmentField>(attachmentFieldId);
        await attachmentField.setValue(recordId, file);

        // 需求 5.3: 上传成功后提示
        setSuccess('签名保存成功');
        setSaving(false);
        return true;
      } catch (e) {
        // 需求 5.4: 上传失败时显示错误信息，保留签名内容（画布不清空）
        const message = e instanceof Error ? e.message : '签名保存失败，请重试';
        setError(message);
        setSaving(false);
        return false;
      }
    },
    []
  );

  return {
    saveSignature,
    saving,
    error,
    success,
    clearMessages,
  };
}
