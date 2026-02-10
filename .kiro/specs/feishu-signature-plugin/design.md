# 设计文档

## 概述

飞书多维表格签字插件是一个前端侧边栏插件，允许用户在多维表格中进行电子签名。插件会自动创建"签字确认链接"（URL字段）和"签字图片"（附件字段）两个字段，并将签名图片保存到"签字图片"字段中。插件使用 HTML5 Canvas 技术实现签名绘制，通过飞书多维表格 JS SDK 与多维表格进行数据交互。

## 架构

### 技术栈

- **前端框架**: React + TypeScript
- **SDK**: @lark-base-open/js-sdk
- **签名组件**: react-signature-canvas
- **构建工具**: Vite

### 架构图

```
┌─────────────────────────────────────────┐
│         飞书多维表格插件容器              │
│  ┌───────────────────────────────────┐  │
│  │      签字插件 UI 层                │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  初始化提示                  │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  记录选择器                  │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  签名画布                    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  操作按钮组                  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │      业务逻辑层                    │  │
│  │  - 字段初始化                      │  │
│  │  - 记录管理                        │  │
│  │  - 签名处理                        │  │
│  │  - 链接生成                        │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │      SDK 交互层                    │  │
│  │  - Base JS SDK                    │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│       飞书多维表格数据层                  │
│  - 数据表（Table）                       │
│  - 字段（Field）                         │
│    - 签字确认链接（URL）                 │
│    - 签字图片（Attachment）              │
│  - 记录（Record）                        │
└─────────────────────────────────────────┘
```

## 组件和接口

### 核心组件

#### 1. App 组件
主应用组件，负责整体布局和状态管理

**Props**: 无

**State**:
- `currentTable`: 当前选中的数据表
- `urlFieldId`: 签字确认链接字段 ID
- `attachmentFieldId`: 签字图片字段 ID
- `records`: 记录列表
- `selectedRecordId`: 选中的记录 ID
- `isInitialized`: 字段是否已初始化

#### 2. RecordSelector 组件
记录选择器组件

**Props**:
- `records`: 记录列表
- `selectedRecordId`: 当前选中的记录 ID
- `onRecordChange`: 记录变更回调函数
- `attachmentFieldId`: 签字图片字段 ID

**功能**:
- 显示记录列表
- 显示记录的签名状态（已签名/未签名）
- 处理记录选择事件

#### 3. SignatureCanvas 组件
签名画布组件

**Props**:
- `onSignatureChange`: 签名变更回调
- `ref`: Canvas 引用

**功能**:
- 提供签名绘制功能
- 自适应画布尺寸
- 导出签名为 PNG 图片

#### 4. ActionButtons 组件
操作按钮组

**Props**:
- `onClear`: 清除回调
- `onConfirm`: 确认回调
- `clearDisabled`: 清除按钮是否禁用
- `confirmDisabled`: 确认按钮是否禁用

**功能**:
- 提供"清除"和"确认签字"按钮
- 处理按钮点击事件

### 数据接口

#### Table 接口
```typescript
interface ITable {
  id: string;
  name: string;
}
```

#### Field 接口
```typescript
interface IAttachmentField {
  id: string;
  name: string;
  type: FieldType.Attachment;
}

interface IUrlField {
  id: string;
  name: string;
  type: FieldType.Url;
}
```

#### Record 接口
```typescript
interface IRecord {
  recordId: string;
  fields: Record<string, any>;
}
```

#### Signature 接口
```typescript
interface ISignature {
  dataUrl: string;  // Base64 编码的图片数据
  blob: Blob;       // 图片 Blob 对象
  fileName: string; // 文件名（格式：signature_时间戳.png）
}
```

### SDK 接口使用

#### 获取当前表
```typescript
const table = await bitable.base.getActiveTable();
```

#### 创建 URL 字段
```typescript
const urlFieldId = await table.addField({
  type: FieldType.Url,
  name: '签字确认链接'
});
```

#### 创建附件字段
```typescript
const attachmentFieldId = await table.addField({
  type: FieldType.Attachment,
  name: '签字图片'
});
```

#### 检查字段是否存在
```typescript
const fieldMetaList = await table.getFieldMetaList();
const urlField = fieldMetaList.find(f => f.name === '签字确认链接');
const attachmentField = fieldMetaList.find(f => f.name === '签字图片');
```

#### 获取记录列表
```typescript
const recordIdList = await table.getRecordIdList();
```

#### 获取字段实例
```typescript
const attachmentField = await table.getField<IAttachmentField>(attachmentFieldId);
const urlField = await table.getField<IUrlField>(urlFieldId);
```

#### 获取记录的附件值
```typescript
const attachments = await attachmentField.getValue(recordId);
```

#### 设置记录的附件值
```typescript
await attachmentField.setValue(recordId, file);
```

#### 设置记录的 URL 值
```typescript
await urlField.setValue(recordId, {
  text: '点击签字',
  link: signatureUrl
});
```

## 数据模型

### 字段元数据模型
```typescript
interface IFieldMeta {
  id: string;
  name: string;
  type: FieldType;
}
```

### 记录数据模型
```typescript
interface IRecordData {
  recordId: string;
  fields: {
    [fieldId: string]: any;
  };
}
```

### 附件数据模型
```typescript
interface IAttachment {
  name: string;
  size: number;
  type: string;
  token: string;
  timeStamp: number;
  url: string;
}
```

### URL 数据模型
```typescript
interface IUrlValue {
  text: string;  // 显示文本
  link: string;  // 链接地址
}
```

### 签名状态模型
```typescript
interface ISignatureStatus {
  recordId: string;
  hasSigned: boolean;
  signatureUrl?: string;
}
```

## 正确性属性

*属性是一个特征或行为，应该在系统的所有有效执行中保持为真。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性 1: 字段初始化完整性
*对于任意* 数据表，当插件初始化时，如果"签字确认链接"字段不存在，则初始化后该字段必须存在且类型为URL
**验证需求: 1.1, 1.2**

### 属性 2: 附件字段初始化完整性
*对于任意* 数据表，当插件初始化时，如果"签字图片"字段不存在，则初始化后该字段必须存在且类型为附件
**验证需求: 1.3, 1.4**

### 属性 3: 记录列表完整性
*对于任意* 数据表，插件获取的记录列表应该包含该表的所有记录
**验证需求: 2.1**

### 属性 4: 签名状态判断正确性
*对于任意* 记录，如果该记录的"签字图片"字段包含附件，则系统应判断为已签名状态
**验证需求: 2.3, 7.1**

### 属性 5: 画布绘制功能
*对于任意* 签名操作，当用户在画布上绘制后，画布应包含非空内容
**验证需求: 3.2**

### 属性 6: 签名内容保持
*对于任意* 签名内容，在用户未执行清除操作前，签名内容应保持在画布上
**验证需求: 3.3**

### 属性 7: 清除功能完整性
*对于任意* 包含签名内容的画布，执行清除操作后，画布应为空
**验证需求: 4.1**

### 属性 8: 清除按钮状态正确性
*对于任意* 画布状态，当画布为空时，清除按钮应被禁用
**验证需求: 4.2**

### 属性 9: 清除后画布可用性
*对于任意* 画布，执行清除操作后，画布应保持可用状态（可以继续绘制）
**验证需求: 4.3**

### 属性 10: 签名图片格式正确性
*对于任意* 非空画布，转换生成的图片格式应为PNG
**验证需求: 5.1**

### 属性 11: 签名上传完整性
*对于任意* 记录和有效签名图片，上传成功后，该记录的"签字图片"字段应包含该签名图片
**验证需求: 5.2**

### 属性 12: 上传失败时内容保留
*对于任意* 上传失败的情况，画布上的签名内容应被保留
**验证需求: 5.4**

### 属性 13: 确认按钮状态正确性
*对于任意* 画布状态，当画布为空时，确认按钮应被禁用
**验证需求: 5.5**

### 属性 14: 签字链接生成有效性
*对于任意* 记录，生成的签字确认链接应包含该记录的唯一标识
**验证需求: 6.1**

### 属性 15: 签字链接保存正确性
*对于任意* 记录，生成的签字确认链接应正确保存到该记录的"签字确认链接"字段
**验证需求: 6.2**

### 属性 16: 签名替换正确性
*对于任意* 已签名的记录，重新签名后，新签名应替换原有签名（字段中只包含最新的签名图片）
**验证需求: 7.3**

## 错误处理

### 字段创建失败
- 捕获字段创建异常
- 显示错误提示："字段创建失败，请检查权限"
- 阻止后续操作直到字段创建成功

### 记录获取失败
- 捕获记录获取异常
- 显示错误提示："记录加载失败，请刷新重试"
- 提供重试按钮

### 签名上传失败
- 捕获上传异常
- 显示错误提示："签名保存失败，请重试"
- 保留画布上的签名内容
- 提供重试按钮

### 链接生成失败
- 捕获链接生成异常
- 显示错误提示："链接生成失败"
- 允许用户重新尝试

### 网络异常
- 检测网络连接状态
- 显示网络异常提示
- 提供重试机制

## 测试策略

### 单元测试
使用 Jest + React Testing Library 进行单元测试

**测试范围**:
- 组件渲染测试
- 用户交互测试
- 状态管理测试
- 错误处理测试

**测试用例示例**:
- 测试字段初始化逻辑
- 测试记录选择功能
- 测试签名画布绘制
- 测试清除功能
- 测试签名保存功能

### 属性测试
使用 fast-check 进行属性测试，每个属性测试运行至少 100 次迭代

**测试框架**: fast-check
**最小迭代次数**: 100

**属性测试用例**:
- 属性 1-16 的所有正确性属性
- 每个属性测试应标注对应的属性编号

**测试标注格式**:
```typescript
// Feature: feishu-signature-plugin, Property 1: 字段初始化完整性
```

### 集成测试
- 测试插件与多维表格 SDK 的集成
- 测试完整的签名流程
- 测试字段创建和数据保存流程

### 手动测试
- UI 交互测试
- 不同浏览器兼容性测试
- 移动端触摸操作测试
- 边界情况测试（如画布尺寸自适应）

