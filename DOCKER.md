# 🐳 Xinterest Docker 部署指南

完整的 Docker 容器化部署指南，让您快速启动 Xinterest 平台。

## 📦 包含的服务

- **Frontend** (React + Nginx) - 端口 7667
- **Backend** (Node.js + Express) - 端口 7666
- **MongoDB** (数据库) - 端口 27017

## 🚀 快速开始

### 1. 检查 Docker 环境

```bash
# 检查 Docker 版本
docker --version
docker-compose --version

# 建议版本
# Docker: 20.x+
# Docker Compose: 2.x+
```

### 2. 启动服务

#### 使用 Makefile (推荐)

```bash
# 构建所有镜像
make build

# 启动服务
make up

# 查看日志
make logs
```

#### 使用 Docker Compose

```bash
# 一键启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps
```

### 3. 访问应用

- 🌐 **前端**: http://localhost:7667
- 🔌 **后端 API**: http://localhost:7666/api/health
- 📊 **MongoDB**: localhost:27017

## 📋 Makefile 命令

```bash
make help       # 显示所有可用命令
make build      # 构建 Docker 镜像
make up         # 启动所有服务（后台）
make down       # 停止所有服务
make logs       # 实时查看日志
make restart    # 重启服务
make status     # 查看服务状态
make clean      # 清理所有数据（危险！）
make dev-up     # 开发模式（前台日志）
```

## 🔧 环境变量配置

### 使用默认配置

默认配置已经可以直接使用，无需额外配置。

### 自定义配置

```bash
# 1. 复制环境变量模板
cp .env.docker .env

# 2. 编辑配置
vim .env

# 3. 重启服务使配置生效
docker-compose down
docker-compose up -d
```

### 重要的环境变量

```env
# JWT 密钥（生产环境必须修改！）
JWT_SECRET=your-super-secret-key-here

# Node 环境
NODE_ENV=production
```

## 🏗️ 架构说明

### 服务依赖关系

```
frontend (7667)
    ↓
backend (7666)
    ↓
mongodb (27017)
```

### 网络配置

所有服务运行在 `xinterest-network` 网络中，可以通过服务名相互访问：

- `mongodb:27017` - 数据库
- `backend:7666` - API 服务
- `frontend:7667` - Web 应用

### 数据持久化

```bash
# 查看所有 volumes
docker volume ls | grep xinterest

# 三个主要的 volumes:
# - xinterest-mongodb-data: 数据库数据
# - xinterest-mongodb-config: 数据库配置
# - xinterest-uploads: 用户上传的图片
```

## 🔍 监控和调试

### 查看日志

```bash
# 所有服务日志
docker-compose logs -f

# 特定服务日志
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongodb

# 最近 100 行日志
docker-compose logs --tail=100 backend
```

### 进入容器

```bash
# 进入后端容器
docker-compose exec backend sh

# 进入前端容器
docker-compose exec frontend sh

# 进入数据库容器
docker-compose exec mongodb mongosh
```

### 健康检查

```bash
# 检查所有服务健康状态
docker-compose ps

# 手动检查健康端点
curl http://localhost:7666/api/health
curl http://localhost:7667
```

## 🛠️ 常见问题

### 端口被占用

**问题**: `Error: port 7666 is already allocated`

**解决方案**:

```bash
# 查找占用端口的进程
lsof -i :7666
lsof -i :7667

# 停止占用进程或修改 docker-compose.yml 中的端口
```

### 容器无法启动

**问题**: 容器一直重启

**解决方案**:

```bash
# 查看完整日志
docker-compose logs backend

# 检查环境变量是否正确
docker-compose config

# 重新构建镜像
docker-compose build --no-cache
docker-compose up -d
```

### MongoDB 连接失败

**问题**: `MongoNetworkError: failed to connect to server`

**解决方案**:

```bash
# 检查 MongoDB 是否健康
docker-compose ps mongodb

# 查看 MongoDB 日志
docker-compose logs mongodb

# 等待健康检查完成
# backend 服务会等待 mongodb 健康后才启动
```

### 图片上传失败

**问题**: 上传的图片无法显示

**解决方案**:

```bash
# 检查 uploads volume 是否正确挂载
docker volume inspect xinterest-uploads

# 检查后端容器的上传目录权限
docker-compose exec backend ls -la uploads
```

## 🔄 更新和维护

### 更新代码

```bash
# 1. 拉取最新代码
git pull

# 2. 重新构建镜像
make build

# 3. 重启服务
make restart
```

### 备份数据

```bash
# 备份 MongoDB
docker-compose exec mongodb mongodump --out=/data/backup

# 备份上传的图片
docker run --rm \
  -v xinterest-uploads:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/uploads-backup.tar.gz -C /data .
```

### 恢复数据

```bash
# 恢复 MongoDB
docker-compose exec mongodb mongorestore /data/backup

# 恢复上传的图片
docker run --rm \
  -v xinterest-uploads:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/uploads-backup.tar.gz -C /data
```

### 清理资源

```bash
# 停止并删除容器（保留数据）
make down

# 完全清理（删除所有数据）
make clean

# 手动清理未使用的镜像
docker system prune -a
```

## 🌐 生产部署建议

### 1. 安全配置

```bash
# 修改 JWT 密钥
JWT_SECRET=$(openssl rand -base64 32)
echo "JWT_SECRET=$JWT_SECRET" > .env

# 使用强密码保护 MongoDB
# 在 docker-compose.yml 中添加：
# MONGO_INITDB_ROOT_USERNAME=admin
# MONGO_INITDB_ROOT_PASSWORD=secure-password
```

### 2. 性能优化

- 增加 MongoDB 内存限制
- 配置 Nginx 缓存
- 使用 CDN 托管静态资源

### 3. 监控

建议添加：
- Prometheus + Grafana 监控
- ELK Stack 日志收集
- Sentry 错误追踪

### 4. 反向代理

在生产环境中，建议使用 Nginx 或 Traefik 作为反向代理：

```nginx
# 示例 Nginx 配置
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:7667;
    }

    location /api {
        proxy_pass http://localhost:7666;
    }
}
```

## 📊 性能指标

### 资源使用

典型配置下的资源使用情况：

- **Frontend**: ~50MB RAM
- **Backend**: ~100-200MB RAM
- **MongoDB**: ~500MB-1GB RAM

### 扩展性

如需扩展：

```bash
# 运行多个 backend 实例
docker-compose up -d --scale backend=3

# 需要配置负载均衡器
```

## 🆘 获取帮助

- 📖 [项目主文档](./README.md)
- 🐛 [报告问题](https://github.com/your-repo/issues)
- 💬 查看日志: `make logs`
- 📝 检查配置: `docker-compose config`

---

**快乐部署！** 🚀
