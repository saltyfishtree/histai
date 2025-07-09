# HistAI - Historical AI Research Platform

HistAgent是一个基于大语言模型的历史理解与交互代理平台，现已集成Firebase用于数据存储和自动化邮件通知。

## 🚀 新功能

!本地化测试 firebase emulators:start 链接本地数据库

export JAVA_HOME=/opt/homebrew/opt/openjdk@11 && export PATH=$JAVA_HOME/bin:$PATH && firebase emulators:start --project histagent

函数测试例子 % curl -s "http://localhost:5001/histagent/us-central1/helloWorld"

核心是firebase 启动了半个后端服务

Node.js版本（v22.17.0）和firebase-functions v5.1.1的组合

自动发送邮件功能

1. 因此代码使用了生产环境的URL https://us-central1-histagent.cloudfunctions.net
2. 而端口5173（开发服务器）使用的是实时编译，NODE_ENV为undefined，所以使用本地URL

！ 前端编译自带了 环境信息

### ✅ Firebase集成

- **数据持久化**: 用户提交的题目现在会自动保存到Firebase Firestore
- **安全性**: 通过Firestore安全规则保护数据，只允许创建操作
- **自动化邮件**: 每日自动汇总提交的题目并发送到指定邮箱

### ✅ 提交功能增强

- **数据验证**: 完整的客户端和服务器端数据验证
- **错误处理**: 改进的错误处理和用户反馈
- **提交追踪**: 每个提交都有唯一ID便于追踪

## 🛠️ 技术栈

- **前端**: TypeScript + Vite + Tailwind CSS
- **状态管理**: Zustand
- **动画**: Framer Motion
- **后端**: Firebase (Firestore + Cloud Functions + App Hosting)
- **AI集成**: Google Gemini API

## 📦 安装和配置

### 1. 克隆项目

```bash
git clone <repository-url>
cd histai
npm install
```

### 2. Firebase配置

请参阅 `FIREBASE_SETUP.md` 文件获取详细的Firebase配置说明。

简要步骤：

1. 创建Firebase项目
2. 启用Firestore Database和App Hosting
3. 配置环境变量
4. 部署安全规则

### 3. 环境变量

创建 `.env.local` 文件：

```bash
# Firebase配置
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Gemini API
API_KEY=your-gemini-api-key
```

## 🚀 部署

### 本地开发

```bash
npm run dev
```

### Firebase App Hosting部署

1. 安装Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
```

2. 初始化项目:

```bash
firebase init hosting
```

3. 部署:

```bash
firebase deploy
```

### Cloud Functions部署

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

## 📊 数据流程

```
用户提交表单 → 客户端验证 → Firebase Firestore存储 → 
定时Cloud Function → 数据聚合 → 邮件发送 → abc@gmail.com
```

## 🔒 安全特性

- **Firestore规则**: 严格限制只允许创建操作，禁止读取和修改
- **数据验证**: 多层数据验证确保数据完整性
- **环境变量**: 敏感信息通过环境变量管理
- **速率限制**: 通过时间戳验证防止滥用

## 📁 新增文件结构

```
src/
├── config/
│   └── firebase.ts              # Firebase配置
├── services/
│   └── firebase/
│       └── submissionService.ts # 提交服务
functions/
├── src/
│   └── index.ts                 # Cloud Functions
├── package.json
└── tsconfig.json
firestore.rules                  # Firestore安全规则
firestore.indexes.json          # Firestore索引配置
firebase.json                   # Firebase项目配置
FIREBASE_SETUP.md               # Firebase配置指南
```

## 🔧 开发命令

```bash
# 本地开发
npm run dev

# 构建项目
npm run build

# 代码检查
npm run lint
npm run lint:fix

# 格式化代码
npm run format
npm run format:check

# Firebase部署
firebase deploy
firebase deploy --only functions
firebase deploy --only firestore:rules
```

## 📮 邮件功能

### 自动邮件摘要

- **频率**: 每日早上6点UTC
- **内容**: 包含所有新提交的详细信息
- **格式**: HTML格式，按难度级别分类
- **收件人**: abc@gmail.com

### 手动触发邮件

可通过HTTP端点手动触发邮件发送（用于测试）：

```
POST https://your-project.cloudfunctions.net/triggerEmailDigest
```

## 🐛 故障排除

### 常见问题

1. **Permission Denied 错误**

   - 确认Firestore规则已正确部署
   - 检查环境变量是否正确设置
2. **Module Not Found 错误**

   - 运行 `npm install` 确保所有依赖已安装
   - 检查import路径是否正确
3. **网络错误**

   - 验证Firebase项目ID是否正确
   - 确认Firestore已在Firebase控制台中启用

## 📈 监控

- 在Firebase控制台监控使用情况
- 查看Cloud Functions日志排查问题
- 设置警报监控配额限制

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用Apache-2.0许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 作者

HistAI Team

---

**注意**: 首次部署后请确保在Firebase控制台中配置所有必要的环境变量，并测试表单提交功能以确保数据正确保存到Firestore。
