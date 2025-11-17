# Xinterest - 视觉发现社交平台

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

一个现代化的视觉发现和分享平台，灵感来自 Pinterest 和小红书。使用 React、Node.js、Material-UI 打造，采用莫奈风格的印象派配色方案。

![Xinterest Platform](https://img.shields.io/badge/Status-Ready-success)

## ✨ 特性

### 🎨 设计特色
- **莫奈配色方案** - 受克劳德·莫奈印象派画作启发的柔和配色
- **Material Design** - 现代化的 Google Material Design 设计语言
- **响应式布局** - 完美适配桌面、平板和移动设备
- **瀑布流展示** - Pinterest 风格的动态瀑布流图片墙

### 🚀 核心功能
- **用户认证系统** - 注册、登录、JWT 令牌认证
- **内容创建** - 上传图片、添加标题、描述和标签
- **社交互动** - 点赞、收藏、评论功能
- **分类浏览** - 时尚、美食、旅行、艺术等多个分类
- **搜索功能** - 按标题、描述和标签搜索内容
- **个人主页** - 展示用户发布的所有内容

### 🛠️ 技术栈

#### 前端
- **React 18** - 现代化的前端框架
- **Material-UI (MUI) 5** - React UI 组件库
- **React Router v6** - 单页应用路由
- **Axios** - HTTP 客户端
- **React Masonry CSS** - 瀑布流布局

#### 后端
- **Node.js** - JavaScript 运行环境
- **Express.js** - Web 应用框架
- **MongoDB** - NoSQL 数据库
- **Mongoose** - MongoDB ODM
- **JWT** - 用户认证
- **Multer** - 文件上传处理
- **Bcrypt** - 密码加密

## 📋 系统要求

- Node.js 16.x 或更高版本
- MongoDB 5.x 或更高版本
- npm 或 yarn 包管理器

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd Xinterest
```

### 2. 安装依赖

#### 方式一：一键安装所有依赖
```bash
npm run install:all
```

#### 方式二：分别安装
```bash
# 安装根目录依赖
npm install

# 安装服务器端依赖
cd server
npm install

# 安装客户端依赖
cd ../client
npm install
```

### 3. 配置环境变量

在 `server` 目录下创建 `.env` 文件：

```bash
cd server
cp .env.example .env
```

编辑 `.env` 文件，配置以下变量：

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/xinterest
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

### 4. 启动 MongoDB

确保 MongoDB 服务正在运行：

```bash
# macOS (使用 Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 5. 运行应用

#### 开发模式（同时启动前后端）
```bash
npm run dev
```

这将同时启动：
- 后端服务器：http://localhost:7666
- 前端应用：http://localhost:3000

#### 分别启动

**启动后端：**
```bash
cd server
npm run dev
```

**启动前端：**
```bash
cd client
npm start
```

### 6. 访问应用

在浏览器中打开：http://localhost:3000

---

## 🐳 Docker 部署（推荐）

使用 Docker 可以快速启动整个应用栈（包括 MongoDB），无需单独安装依赖。

### 前置要求

- Docker 20.x 或更高版本
- Docker Compose 2.x 或更高版本

### 快速启动

#### 方式一：使用 Makefile（推荐）

```bash
# 查看所有可用命令
make help

# 构建并启动所有服务
make build
make up

# 查看日志
make logs

# 停止服务
make down
```

#### 方式二：使用 Docker Compose

```bash
# 构建镜像
docker-compose build

# 启动所有服务（后台运行）
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down

# 完全清理（包括数据卷）
docker-compose down -v
```

### Docker 端口配置

Docker 部署使用以下端口：

- **前端应用**: `http://localhost:7667`
- **后端 API**: `http://localhost:7666`
- **MongoDB**: `localhost:27017`

### 环境变量配置

复制 `.env.docker` 到 `.env` 并根据需要修改：

```bash
cp .env.docker .env
```

重要：在生产环境中，请务必修改 `JWT_SECRET`！

### Docker 服务说明

#### 服务组成

1. **mongodb** - MongoDB 7.0 数据库
   - 自动创建数据库和持久化存储
   - 健康检查确保服务可用

2. **backend** - Node.js API 服务器
   - 端口：7666
   - 自动连接到 MongoDB
   - 包含文件上传持久化卷

3. **frontend** - React Web 应用
   - 端口：7667
   - 使用 Nginx 提供静态文件
   - 自动代理 API 请求到后端

#### 数据持久化

项目使用 Docker volumes 保存数据：

- `xinterest-mongodb-data`: MongoDB 数据
- `xinterest-uploads`: 用户上传的图片

查看数据卷：
```bash
docker volume ls | grep xinterest
```

### Makefile 命令参考

```bash
make help       # 显示帮助信息
make build      # 构建所有镜像
make up         # 启动所有服务（后台）
make down       # 停止所有服务
make logs       # 查看服务日志
make restart    # 重启所有服务
make clean      # 清理所有数据（谨慎使用！）
make dev-up     # 开发模式启动（前台显示日志）
make status     # 查看服务状态
```

### 故障排查

#### 端口冲突

如果端口 7666 或 7667 已被占用：

```bash
# 检查端口占用
lsof -i :7666
lsof -i :7667

# 或者修改 docker-compose.yml 中的端口映射
```

#### 查看容器日志

```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

#### 重新构建镜像

如果代码更新后需要重新构建：

```bash
docker-compose build --no-cache
docker-compose up -d
```

---

## 📁 项目结构

```
Xinterest/
├── client/                 # React 前端应用
│   ├── public/            # 静态资源
│   ├── src/
│   │   ├── components/    # React 组件
│   │   │   ├── Navbar.js
│   │   │   ├── PinCard.js
│   │   │   └── MasonryGrid.js
│   │   ├── pages/         # 页面组件
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── CreatePin.js
│   │   │   └── PinDetail.js
│   │   ├── contexts/      # React Context
│   │   │   └── AuthContext.js
│   │   ├── utils/         # 工具函数
│   │   │   └── api.js
│   │   ├── theme.js       # MUI 主题配置（莫奈配色）
│   │   ├── App.js         # 应用主组件
│   │   └── index.js       # 入口文件
│   └── package.json
│
├── server/                 # Node.js 后端服务
│   ├── src/
│   │   ├── models/        # Mongoose 数据模型
│   │   │   ├── User.js
│   │   │   └── Pin.js
│   │   ├── controllers/   # 控制器
│   │   │   ├── authController.js
│   │   │   └── pinController.js
│   │   ├── routes/        # API 路由
│   │   │   ├── auth.js
│   │   │   └── pins.js
│   │   ├── middleware/    # 中间件
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   ├── utils/         # 工具函数
│   │   │   └── jwt.js
│   │   └── index.js       # 服务器入口
│   ├── uploads/           # 上传的图片存储
│   ├── .env.example       # 环境变量示例
│   └── package.json
│
├── package.json           # 根配置文件
└── README.md             # 项目文档
```

## 🎨 莫奈配色方案

项目采用受印象派大师克劳德·莫奈作品启发的配色方案：

- **Water Lily Blue** (#7B9FAB) - 主色调，来自睡莲系列
- **Pond Green** (#A8C5B5) - 池塘的绿色
- **Morning Blue** (#A4C4D4) - 清晨的天空
- **Sunset Peach** (#F4C2B5) - 日落的桃色
- **Rose Accent** (#F2B8C6) - 玫瑰强调色
- **Soft Lavender** (#CDB4DB) - 柔和的薰衣草色

这些颜色创造出柔和、艺术性的视觉体验，与平台的创意分享主题完美契合。

## 📱 功能说明

### 用户功能
1. **注册/登录**
   - 邮箱和密码注册
   - JWT 令牌认证
   - 安全的密码加密存储

2. **浏览内容**
   - 瀑布流布局展示所有内容
   - 按分类筛选
   - 搜索功能
   - 无限滚动加载

3. **创建内容**
   - 上传图片（最大 5MB）
   - 添加标题和描述
   - 选择分类
   - 添加标签（最多 10 个）

4. **社交互动**
   - 点赞内容
   - 收藏到个人收藏夹
   - 评论和讨论
   - 查看内容详情

5. **个人主页**
   - 展示发布的内容
   - 管理收藏
   - 编辑个人资料

## 🔒 安全特性

- JWT 令牌认证
- 密码 Bcrypt 加密
- 输入验证和清理
- CORS 配置
- Helmet 安全头
- 文件上传类型和大小限制

## 🚀 部署

### 前端部署（Vercel/Netlify）

```bash
cd client
npm run build
# 上传 build 目录到 Vercel 或 Netlify
```

### 后端部署（Heroku/Railway/Render）

1. 设置环境变量
2. 确保 MongoDB 数据库可访问
3. 部署到云平台

```bash
cd server
# 按照平台指南部署
```

## 🤝 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 设计灵感来自 [Pinterest](https://www.pinterest.com/) 和 [小红书](https://www.xiaohongshu.com/)
- 配色灵感来自克劳德·莫奈的印象派画作
- 使用 [Material-UI](https://mui.com/) 组件库
- 图标来自 [Material Icons](https://mui.com/material-ui/material-icons/)

## 📧 联系方式

如有问题或建议，请开启 Issue 或 Pull Request。

---

**享受创作和分享的乐趣！** 🎨✨
