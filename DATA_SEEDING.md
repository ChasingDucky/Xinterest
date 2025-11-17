# 🌱 数据初始化指南

## 快速开始

为了让您更好地体验 Xinterest 平台，我们提供了丰富的示例数据。

### 🚀 自动初始化数据

#### 方式一：Docker 环境

```bash
# 进入后端容器
docker-compose exec backend sh

# 运行 seed 脚本
npm run seed

# 退出容器
exit
```

#### 方式二：本地开发环境

```bash
# 确保 MongoDB 正在运行
# 进入 server 目录
cd server

# 运行 seed 脚本
npm run seed
```

## 📦 包含的示例数据

### 👥 测试用户（5个）

1. **monet_lover** - 艺术爱好者
   - 邮箱: monet@xinterest.com
   - 密码: password123
   - 简介: 热爱印象派艺术，分享生活中的美好瞬间 🎨

2. **foodie_chan** - 美食探索者
   - 邮箱: foodie@xinterest.com
   - 密码: password123
   - 简介: 美食探索者 | 分享美味时刻 🍜

3. **travel_wanderer** - 旅行达人
   - 邮箱: travel@xinterest.com
   - 密码: password123
   - 简介: 世界那么大，我想去看看 ✈️

4. **design_master** - 设计师
   - 邮箱: design@xinterest.com
   - 密码: password123
   - 简介: UI/UX设计师 | 追求完美的视觉体验

5. **photo_artist** - 摄影师
   - 邮箱: photo@xinterest.com
   - 密码: password123
   - 简介: 用镜头记录生活 📷

### 📌 示例内容（16+ Pins）

涵盖多个分类：

#### 🎨 艺术类
- 莫奈的睡莲
- 抽象艺术之美
- 街头涂鸦艺术

#### 🍜 美食类
- 日式料理的艺术
- 意式浓缩咖啡
- 法式甜点

#### ✈️ 旅行类
- 巴黎埃菲尔铁塔
- 日本京都古寺
- 冰岛极光

#### 🎯 设计类
- 极简主义室内设计
- 现代建筑之美

#### 📷 摄影类
- 黑白人像摄影
- 自然风光摄影

#### 👗 时尚类
- 春季时尚穿搭
- 配饰的艺术

#### 🧘 生活类
- 温馨的阅读角
- 瑜伽生活

### ✨ 互动数据

- 随机的点赞
- 随机的收藏
- 真实的浏览次数

## 🔍 数据详情

### 图片来源

所有图片来自 [Unsplash](https://unsplash.com/) - 免费高质量图片库
- 真实的高清图片
- 多样化的内容主题
- 适合展示瀑布流效果

### 用户头像

使用 [Pravatar](https://pravatar.cc/) - 随机头像生成器
- 多样化的头像
- 快速加载
- 适合演示

## 📊 使用场景

### 开发测试
```bash
# 快速生成测试数据
npm run seed

# 开始开发
npm run dev
```

### 演示展示
```bash
# 在演示前初始化数据
npm run seed

# 使用测试账号登录
# 用户名: monet_lover
# 密码: password123
```

### UI/UX 测试
```bash
# 测试瀑布流布局
npm run seed

# 测试不同类型的内容展示
```

## ⚠️ 注意事项

### 数据清理

**警告**：运行 seed 脚本会清空现有数据！

```javascript
// seed.js 会执行以下操作：
await User.deleteMany({});  // 删除所有用户
await Pin.deleteMany({});   // 删除所有内容
```

### 生产环境

**不要在生产环境运行 seed 脚本！**

只在开发和测试环境使用：
- ✅ 本地开发
- ✅ 测试环境
- ✅ 演示环境
- ❌ 生产环境

## 🎯 执行流程

seed 脚本执行的操作：

1. **连接数据库** ✅
2. **清空现有数据** 🗑️
3. **创建示例用户** 👥
4. **创建示例内容** 📌
5. **添加互动数据** ❤️
6. **显示统计信息** 📊
7. **关闭数据库连接** 👋

### 输出示例

```
🌱 开始初始化数据库...

✅ 已连接到 MongoDB

🗑️  清空现有数据...
✅ 已清空数据

👥 创建示例用户...
   ✓ 创建用户: monet_lover
   ✓ 创建用户: foodie_chan
   ✓ 创建用户: travel_wanderer
   ✓ 创建用户: design_master
   ✓ 创建用户: photo_artist
✅ 成功创建 5 个用户

📌 创建示例内容...
   ✓ 创建内容: 莫奈的睡莲
   ✓ 创建内容: 抽象艺术之美
   ...
✅ 成功创建 16 个内容

🔖 添加用户收藏...
   ✓ monet_lover 收藏了 5 个内容
   ✓ foodie_chan 收藏了 3 个内容
   ...
✅ 收藏数据添加完成

📊 数据统计:
   用户总数: 5
   内容总数: 16
   总点赞数: 25
   总浏览数: 456

🎉 数据初始化完成！

📝 测试账号信息:
   用户名: monet_lover
   邮箱: monet@xinterest.com
   密码: password123

👋 数据库连接已关闭
```

## 🔧 自定义数据

### 修改用户数据

编辑 `server/src/seed.js` 中的 `mockUsers` 数组：

```javascript
const mockUsers = [
  {
    username: 'your_username',
    email: 'your@email.com',
    password: 'your_password',
    bio: '你的简介',
    avatar: 'https://your-avatar-url.com/image.jpg'
  },
  // 添加更多用户...
];
```

### 修改内容数据

编辑 `mockPins` 数组：

```javascript
const mockPins = [
  {
    title: '你的标题',
    description: '你的描述',
    image: 'https://your-image-url.com/image.jpg',
    category: 'art', // 分类
    tags: ['标签1', '标签2'],
    imageWidth: 800,
    imageHeight: 600
  },
  // 添加更多内容...
];
```

## 🌐 图片资源

### Unsplash 使用

```javascript
// Unsplash 图片 URL 格式
'https://images.unsplash.com/photo-{photo-id}?w=800'

// 参数说明:
// w=800  - 宽度800px
// h=600  - 高度600px (可选)
// q=80   - 质量80% (可选)
```

### 本地图片

如果要使用本地图片：

```javascript
image: '/uploads/your-image.jpg'
```

确保图片已上传到 `server/uploads` 目录。

## 📚 相关命令

```bash
# 运行 seed 脚本
npm run seed

# 查看数据库内容（MongoDB Shell）
mongosh
use xinterest
db.users.find()
db.pins.find()

# 清空特定集合
db.users.deleteMany({})
db.pins.deleteMany({})
```

## 🎓 学习资源

- [MongoDB CRUD 操作](https://docs.mongodb.com/manual/crud/)
- [Mongoose 模型](https://mongoosejs.com/docs/models.html)
- [Unsplash API](https://unsplash.com/developers)

---

**享受测试和开发！** 🚀
