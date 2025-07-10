# Brevo每日邮件发送设置指南

## 🚀 功能概述

已成功为HistAI项目添加了Brevo每日邮件发送功能，具体包括：

1. **定时任务**：每天8点（北京时间）自动发送当日新增提交数据
2. **手动触发**：通过API手动触发邮件发送
3. **邮件历史**：查看邮件发送历史记录
4. **测试功能**：测试邮件发送是否正常工作

## 📋 新增的Cloud Functions

### 1. 定时任务
- **函数名**: `dailyReportScheduler`
- **触发方式**: 每天8点自动执行
- **功能**: 自动查询当天新增数据并发送邮件

### 2. 手动触发邮件
- **函数名**: `sendDailyReportManually`
- **URL**: `http://127.0.0.1:5003/test/us-central1/sendDailyReportManually`
- **方法**: POST
- **功能**: 手动触发发送今日邮件报告

### 3. 邮件发送历史
- **函数名**: `getEmailHistory`
- **URL**: `http://127.0.0.1:5003/test/us-central1/getEmailHistory`
- **方法**: GET
- **功能**: 查看邮件发送历史记录

### 4. 测试邮件发送
- **函数名**: `testEmailSending`
- **URL**: `http://127.0.0.1:5003/test/us-central1/testEmailSending`
- **方法**: POST
- **功能**: 发送测试邮件验证功能

## ⚙️ 环境变量配置

在部署到生产环境之前，需要配置以下环境变量：

### 必需的环境变量

```bash
# Brevo API密钥（必需）
BREVO_API_KEY=your_brevo_api_key_here

# 邮件发送者信息（可选，有默认值）
DAILY_REPORT_SENDER_NAME=HistAI Team
DAILY_REPORT_SENDER_EMAIL=noreply@histai.com

# 收件人邮箱列表（可选，有默认值）
DAILY_REPORT_RECIPIENTS=admin@histai.com,manager@histai.com
```

### 设置环境变量的方法

#### 方法1：使用Firebase CLI
```bash
# 设置Brevo API密钥
firebase functions:config:set brevo.api_key="your_brevo_api_key_here"

# 设置邮件发送者信息
firebase functions:config:set email.sender_name="HistAI Team"
firebase functions:config:set email.sender_email="noreply@histai.com"

# 设置收件人列表
firebase functions:config:set email.recipients="admin@histai.com,manager@histai.com"
```

#### 方法2：创建.env文件（开发环境）
在`functions/`目录下创建`.env`文件：
```
BREVO_API_KEY=your_brevo_api_key_here
DAILY_REPORT_SENDER_NAME=HistAI Team
DAILY_REPORT_SENDER_EMAIL=noreply@histai.com
DAILY_REPORT_RECIPIENTS=admin@histai.com,manager@histai.com
```

## 🔧 如何获取Brevo API密钥

1. 访问 [Brevo官网](https://www.brevo.com/)
2. 注册或登录账户
3. 进入Dashboard → Account Settings → API Keys
4. 创建新的API Key
5. 复制API Key并配置到环境变量中

## 📧 邮件内容特点

- **完整数据**：包含当天所有新增提交的完整信息
- **美观样式**：使用HTML模板，响应式设计
- **详细信息**：每条提交包含所有字段（问题、答案、解释、来源等）
- **统计数据**：显示新增总数、各状态数量
- **附件支持**：显示文件附件信息

## 🧪 测试步骤

### 1. 测试邮件发送功能
```bash
curl -X POST http://127.0.0.1:5003/test/us-central1/testEmailSending \
  -H "Content-Type: application/json"
```

### 2. 手动触发今日报告
```bash
curl -X POST http://127.0.0.1:5003/test/us-central1/sendDailyReportManually \
  -H "Content-Type: application/json"
```

### 3. 查看邮件历史
```bash
curl -X GET http://127.0.0.1:5003/test/us-central1/getEmailHistory
```

## 📊 数据存储

### 邮件发送历史
所有邮件发送记录都会保存在Firestore的`emailHistory`集合中，包含：
- 发送日期
- 提交数量
- 收件人列表
- 发送状态（成功/失败/跳过）
- 错误信息（如果有）

## 🔄 工作流程

1. **每天8点**：定时任务自动触发
2. **查询数据**：获取当天新增的所有提交
3. **判断条件**：
   - 有新增数据 → 生成邮件内容 → 发送邮件
   - 无新增数据 → 跳过发送
4. **记录历史**：保存发送结果到数据库

## 🚨 注意事项

1. **API密钥安全**：请妥善保管Brevo API密钥
2. **邮件大小**：如果单日提交过多，邮件可能很大
3. **发送频率**：避免频繁测试发送，可能触发API限制
4. **时区设置**：定时任务设置为北京时间（Asia/Shanghai）

## 🔧 故障排除

### 常见错误及解决方案

1. **API密钥错误**
   - 检查环境变量是否正确配置
   - 确认API密钥是否有效

2. **邮件发送失败**
   - 检查网络连接
   - 确认Brevo账户状态
   - 查看邮件历史记录中的错误信息

3. **定时任务不执行**
   - 确保Functions已部署
   - 检查Cloud Scheduler是否启用

## 📈 后续优化建议

1. **邮件模板**：支持自定义邮件模板
2. **批量发送**：大量数据时分批发送
3. **通知设置**：支持不同类型的通知
4. **统计分析**：添加邮件发送统计分析

---

## 🎯 部署检查清单

- [ ] 配置Brevo API密钥
- [ ] 设置发送者邮箱信息
- [ ] 配置收件人邮箱列表
- [ ] 测试邮件发送功能
- [ ] 验证定时任务设置
- [ ] 检查邮件历史记录功能

完成以上配置后，系统将自动在每天8点发送包含当天所有新增提交数据的邮件报告！ 