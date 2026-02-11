# 飞书多维表格签字插件

一个用于飞书多维表格的边栏签字插件，支持在表格中选中记录后直接手写签名，签名图片自动回写到对应记录的附件字段中。

## 功能特性

- 选中表格记录后自动展示签字界面，无需手动选择
- 手写签名画布，支持自定义笔画颜色（黑/蓝/红）和粗细（细/中/粗）
- 签名自动保存为 PNG 图片并写入「签字图片」附件字段
- 已签名记录展示签名图片预览，支持重新签名和清除签名
- 当前记录信息多行展示（字段名 + 值），方便确认签字对象
- 插件首次运行自动创建所需字段
- 适配深色/浅色主题，响应式布局

## 截图

<!-- 在此处添加插件截图 -->

## 使用方式

1. 在飞书多维表格中打开插件面板
2. 添加自定义插件，填入部署地址
3. 在表格中点击选中一条记录
4. 在右侧插件面板中手写签名
5. 点击「确认签字」完成签名

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

启动后将 `localhost:5173` 填入多维表格自定义插件的运行地址即可预览。

## 部署

### GitHub Pages

项目已配置 GitHub Actions 自动部署，push 到 `main` 分支后会自动构建并发布到 GitHub Pages。

1. 在 GitHub 仓库 Settings → Pages → Source 中选择 **GitHub Actions**
2. push 代码到 `main` 分支
3. 部署完成后访问 `https://<username>.github.io/<repo-name>/`

### 飞书插件中心

1. 执行 `npm run build` 生成 `dist` 目录
2. 确保 `package.json` 中 `"output": "dist"` 已配置
3. 提交代码到 GitHub 仓库（包含 `dist` 目录）
4. 填写[插件发布表单](https://feishu.feishu.cn/share/base/form/shrcnwTXnFVAbMPOSeaOFwIAnbf)提交审核

## 技术栈

- React 18 + TypeScript
- [Base JS SDK](https://lark-base-team.github.io/js-sdk-docs/zh/) — 飞书多维表格前端 SDK
- [react-signature-canvas](https://www.npmjs.com/package/react-signature-canvas) — 手写签名画布
- Vite — 构建工具

## 项目结构

```
src/
├── App.tsx                          # 主界面
├── main.tsx                         # 入口
├── components/
│   ├── SignatureCanvas.tsx           # 签名画布（颜色/粗细选择）
│   ├── SignaturePreview.tsx          # 签名图片预览
│   └── ActionButtons.tsx            # 操作按钮
└── hooks/
    ├── useFieldInitialization.ts     # 字段自动创建
    ├── useSelectionChange.ts         # 监听记录选中
    ├── useRecordSignStatus.ts        # 签名状态检查
    ├── useRecordSummary.ts           # 记录摘要读取
    ├── useSignatureSave.ts           # 签名保存
    └── useSignaturePreview.ts        # 签名图片预览
```

## 许可证

MIT
