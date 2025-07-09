#!/bin/bash

# 设置Java环境变量
export JAVA_HOME=/opt/homebrew/opt/openjdk@11
export PATH=$JAVA_HOME/bin:$PATH

# 设置Node.js环境变量
export NODE_ENV=development

# 检查Java版本
echo "Java version:"
java -version

# 检查Node.js版本
echo "Node.js version:"
node --version

# 检查Firebase CLI版本
echo "Firebase CLI version:"
firebase --version

# 清理之前的构建
echo "Cleaning previous builds..."
cd functions && npm run build
cd ..

# 启动Firebase模拟器 (包含 functions, firestore, storage)
echo "Starting Firebase emulators..."
firebase emulators:start --only functions,firestore,storage 