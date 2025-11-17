# 🔧 故障排查指南

## ❌ 错误: `{"message":"Route not found"}`

### 问题分析

这个错误说明您访问了一个不存在的后端路由。可能的原因：

1. **访问了错误的端口**
   - ❌ `http://localhost:7666/` - 这是后端API（现在会显示API信息）
   - ✅ `http://localhost:7667/` - 这才是前端应用

2. **前端没有正确构建**
3. **容器没有正常运行**

### 🎯 快速解决

#### 步骤 1: 确认您访问的是正确的地址

```bash
# ✅ 正确的前端地址
http://localhost:7667/

# 📊 后端API地址（仅供测试）
http://localhost:7666/api/health
```

#### 步骤 2: 检查服务状态

```bash
# 查看所有容器
docker-compose ps

# 应该看到 3 个运行中的容器:
# xinterest-mongodb    running (healthy)
# xinterest-backend    running (healthy)
# xinterest-frontend   running (healthy)
```

#### 步骤 3: 重启服务

```bash
# 拉取最新代码
git pull origin claude/social-sharing-platform-01Fm3kiy7oHvkbmSdKfsPX3X

# 停止服务
docker-compose down

# 重新构建并启动
docker-compose build
docker-compose up -d

# 查看日志
docker-compose logs -f
```

## 🔍 详细诊断

### 运行诊断脚本

```bash
# 赋予执行权限
chmod +x diagnose.sh

# 运行诊断
./diagnose.sh
```

### 手动检查

#### 1. 检查容器状态

```bash
docker-compose ps
```

**期望输出**：
```
NAME                  STATE     HEALTH
xinterest-mongodb     running   healthy
xinterest-backend     running   healthy
xinterest-frontend    running   healthy
```

#### 2. 测试后端API

```bash
# 测试健康检查
curl http://localhost:7666/api/health

# 应该返回:
# {"status":"OK","message":"Xinterest API is running"}

# 测试根路由
curl http://localhost:7666/

# 应该返回 API 信息
```

#### 3. 测试前端

```bash
# 检查前端是否响应
curl -I http://localhost:7667/

# 应该返回:
# HTTP/1.1 200 OK
```

#### 4. 查看容器日志

```bash
# 查看所有日志
docker-compose logs

# 查看特定服务
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# 实时跟踪日志
docker-compose logs -f
```

## 🐛 常见问题

### 问题 1: 容器没有启动

**症状**：`docker-compose ps` 显示容器退出

**解决方案**：
```bash
# 查看为什么退出
docker-compose logs backend

# 常见原因：MongoDB 未就绪
# 解决：等待30秒后重试
docker-compose up -d
```

### 问题 2: 端口被占用

**症状**：`port is already allocated`

**解决方案**：
```bash
# 检查端口占用
lsof -i :7666
lsof -i :7667

# 停止占用进程或修改 docker-compose.yml 端口
```

### 问题 3: 前端显示空白页

**症状**：页面加载但显示空白

**解决方案**：
```bash
# 重新构建前端
docker-compose build frontend
docker-compose restart frontend

# 检查浏览器控制台错误
# 打开浏览器开发者工具（F12）查看错误
```

### 问题 4: API 请求失败

**症状**：前端显示但无法加载数据

**解决方案**：
```bash
# 检查后端日志
docker-compose logs backend

# 检查 MongoDB 连接
docker-compose logs mongodb

# 重启后端
docker-compose restart backend
```

### 问题 5: 图片无法显示

**症状**：上传的图片显示不出来

**解决方案**：
```bash
# 检查 uploads 目录
docker-compose exec backend ls -la uploads

# 检查文件权限
docker-compose exec backend chmod -R 755 uploads
```

## 📋 逐步排查清单

- [ ] 访问正确的地址 `http://localhost:7667/`
- [ ] 确认容器都在运行 `docker-compose ps`
- [ ] 检查容器健康状态都是 `healthy`
- [ ] 测试后端 API `curl http://localhost:7666/api/health`
- [ ] 测试前端 `curl -I http://localhost:7667/`
- [ ] 查看容器日志 `docker-compose logs`
- [ ] 检查浏览器控制台（F12）
- [ ] 尝试重启服务 `docker-compose restart`

## 🔄 完全重置（最后手段）

如果以上都不行，完全重置：

```bash
# ⚠️ 警告：这会删除所有数据！

# 1. 停止并删除所有容器和卷
docker-compose down -v

# 2. 清理镜像
docker-compose down --rmi all

# 3. 重新构建
docker-compose build --no-cache

# 4. 启动
docker-compose up -d

# 5. 查看日志
docker-compose logs -f
```

## 🌐 正确的访问方式

### 开发/测试环境

```bash
# 前端应用（用户界面）
http://localhost:7667/

# 后端API（仅用于测试）
http://localhost:7666/api/health
http://localhost:7666/api/pins
http://localhost:7666/api/auth
```

### 浏览器访问

1. 打开浏览器
2. 访问 `http://localhost:7667/`
3. 应该看到 Xinterest 的登录/注册页面
4. 如果看到错误，按 `F12` 查看控制台

### API 测试

使用 curl、Postman 或浏览器测试 API：

```bash
# 健康检查
curl http://localhost:7666/api/health

# 获取所有 pins
curl http://localhost:7666/api/pins

# 注册用户
curl -X POST http://localhost:7666/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📞 获取帮助

如果问题仍未解决：

1. **收集信息**：
   ```bash
   # 运行诊断
   ./diagnose.sh > diagnosis.txt

   # 保存日志
   docker-compose logs > docker-logs.txt
   ```

2. **检查日志**：
   - 浏览器控制台错误（F12）
   - Docker 容器日志
   - 网络请求（Network 标签）

3. **提供详细信息**：
   - 您访问的具体 URL
   - 浏览器控制台的错误信息
   - Docker 日志输出
   - 容器状态 `docker-compose ps`

## ✅ 验证修复

修复后验证所有功能：

```bash
# 1. 前端可访问
curl -I http://localhost:7667/
# 期望: HTTP/1.1 200 OK

# 2. 后端健康
curl http://localhost:7666/api/health
# 期望: {"status":"OK",...}

# 3. 获取 pins
curl http://localhost:7666/api/pins
# 期望: {"pins":[],...}

# 4. 浏览器访问
# 打开 http://localhost:7667/
# 期望: 看到 Xinterest 应用界面
```

---

**记住**：大多数情况下，只需要：
1. 确认访问 `http://localhost:7667/`（前端）而不是 7666（后端）
2. 检查容器是否都在运行
3. 重启服务通常能解决问题

🚀 **快速重启**: `docker-compose restart`
