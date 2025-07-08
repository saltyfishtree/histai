#!/bin/bash

# 设置Java环境变量
export JAVA_HOME=/opt/homebrew/opt/openjdk@11
export PATH=$JAVA_HOME/bin:$PATH

# 检查Java版本
echo "Java version:"
java -version

# 启动Firebase模拟器
echo "Starting Firebase emulators..."
firebase emulators:start 