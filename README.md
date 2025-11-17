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
- 后端服务器：http://localhost:5000
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
