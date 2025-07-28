#!/bin/bash
echo "🚀 开始部署 HistAI 项目..."

# 构建前端
echo "📦 构建前端项目..."
npm run build

# 构建 Functions
echo "⚙️ 构建 Functions..."
cd functions
npm run build
cd ..

# 部署到 Firebase
echo "🌐 部署到 Firebase..."
firebase deploy

echo "✅ 部署完成！"
echo "🌍 网站地址: https://histai.web.app"
echo "🔧 控制台: https://console.firebase.google.com/project/histai/overview"