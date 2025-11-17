# 🚀 Xinterest 快速开始指南

最快 5 分钟启动 Xinterest 社交分享平台！

## ⚡ 超快速启动（推荐 - 使用 Docker）

### 前提条件
- ✅ 已安装 Docker 和 Docker Compose

### 三步启动

```bash
# 1️⃣ 克隆项目
git clone <repository-url>
cd Xinterest

# 2️⃣ 构建镜像
make build

# 3️⃣ 启动服务
make up
```

**完成！** 🎉

访问 **http://localhost:7667** 开始使用！

---

## 🐳 Docker 部署详情

### 端口说明
- 🌐 **前端**: http://localhost:7667
- 🔌 **后端 API**: http://localhost:7666
- 🗄️ **MongoDB**: localhost:27017

### 常用命令

```bash
make help      # 查看所有命令
make logs      # 查看日志
make down      # 停止服务
make restart   # 重启服务
make status    # 查看状态
```

### 管理服务

```bash
# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 清理所有数据（小心！）
make clean
```

---

## 💻 本地开发模式（不使用 Docker）

如果您想要在本地开发环境运行：

### 1. 前提条件
- Node.js 16+
- MongoDB 5+
- npm 或 yarn

### 2. 安装依赖

```bash
# 一键安装
npm run install:all

# 或分别安装
npm install          # 根目录
cd server && npm install
cd ../client && npm install
```

### 3. 启动 MongoDB

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 4. 配置环境变量

```bash
cd server
cp .env.example .env
# 编辑 .env 文件（可选）
```

### 5. 启动应用

```bash
# 从根目录同时启动前后端
npm run dev
```

访问：
- 前端: http://localhost:3000
- 后端: http://localhost:7666

---

## 📱 首次使用

### 1. 注册账户
访问 http://localhost:7667/register 创建账户

### 2. 探索内容
浏览首页的瀑布流内容

### 3. 创建第一个 Pin
点击导航栏的 "创建" 按钮，上传你的第一张图片！

### 4. 开始互动
- ❤️ 点赞喜欢的内容
- 🔖 收藏感兴趣的内容
- 💬 在评论区互动

---

## 🎨 平台特色

### 莫奈配色
采用印象派大师克劳德·莫奈画作的柔和配色：
- 🌊 水蓝色 - 主色调
- 🌿 池塘绿 - 辅助色
- 🌅 日落桃 - 强调色
- 💜 薰衣草紫 - 点缀色

### Material Design
- 流畅的动画效果
- 现代化的界面设计
- 直观的用户体验

### 瀑布流布局
- Pinterest 风格的图片墙
- 响应式自适应布局
- 优化的图片加载

---

## 🔧 配置选项

### 修改端口（Docker）

编辑 `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "8080:7667"  # 改为你想要的端口
  backend:
    ports:
      - "8000:7666"  # 改为你想要的端口
```

### 修改 JWT 密钥

**重要：生产环境必须修改！**

```bash
# 生成安全的密钥
openssl rand -base64 32

# 更新 .env 文件
JWT_SECRET=your-generated-secret-key
```

---

## 📚 更多文档

- 📖 [完整文档](./README.md)
- 🐳 [Docker 详细指南](./DOCKER.md)
- 🐛 [问题反馈](https://github.com/your-repo/issues)

---

## 🆘 常见问题

### ❌ 端口被占用

```bash
# 检查占用
lsof -i :7666
lsof -i :7667

# 修改 docker-compose.yml 中的端口
```

### ❌ 无法连接数据库

```bash
# 检查 MongoDB 是否运行
docker-compose ps mongodb

# 查看日志
docker-compose logs mongodb
```

### ❌ 图片无法显示

```bash
# 检查后端是否正常运行
curl http://localhost:7666/api/health

# 查看上传目录权限
docker-compose exec backend ls -la uploads
```

---

## 🎯 下一步

1. ✅ 注册账户
2. ✅ 上传第一张图片
3. ✅ 探索不同分类
4. ✅ 关注感兴趣的用户
5. ✅ 分享给朋友

**开始你的创意之旅！** 🌟

---

## 💡 提示

- 使用 `Ctrl+C` 停止本地开发服务器
- 使用 `make down` 停止 Docker 服务
- 定期备份上传的图片和数据库
- 生产环境部署前务必修改所有密钥

**祝您使用愉快！** 🎨✨
