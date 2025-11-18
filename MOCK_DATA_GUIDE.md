# Xinterest Mock Data Guide

## 📊 Mock数据概览

已经为Xinterest平台创建了丰富的测试数据，包括：

- **20个用户账号** - 涵盖各种兴趣爱好者
- **60+个内容** - 分布在8个不同分类
- **随机关注关系** - 用户之间的社交网络
- **随机收藏和点赞** - 模拟真实用户交互

## 🎭 测试账号列表

所有测试账号的密码均为：**password123**

### 主要测试账号

| 用户名 | 邮箱 | 简介 |
|--------|------|------|
| monet_lover | monet@xinterest.com | 热爱印象派艺术，分享生活中的美好瞬间 🎨 |
| foodie_chan | foodie@xinterest.com | 美食探索者 \| 分享美味时刻 🍜 |
| travel_wanderer | travel@xinterest.com | 世界那么大，我想去看看 ✈️ |
| design_master | design@xinterest.com | UI/UX设计师 \| 追求完美的视觉体验 |
| photo_artist | photo@xinterest.com | 用镜头记录生活 📷 |
| fashion_queen | fashion@xinterest.com | 时尚博主 \| 穿搭灵感分享 👗 |
| tech_geek | tech@xinterest.com | 科技爱好者 \| 探索未来 🚀 |
| nature_soul | nature@xinterest.com | 自然摄影师 \| 用镜头捕捉大自然的美 🌿 |
| urban_explorer | urban@xinterest.com | 城市探险家 \| 发现城市之美 🏙️ |
| minimalist_life | minimal@xinterest.com | 极简主义者 \| Less is More ✨ |

### 其他账号

- coffee_addict (coffee@xinterest.com)
- vintage_collector (vintage@xinterest.com)
- plant_parent (plant@xinterest.com)
- workout_warrior (workout@xinterest.com)
- book_worm (book@xinterest.com)
- pet_lover (pet@xinterest.com)
- diy_creator (diy@xinterest.com)
- music_soul (music@xinterest.com)
- night_owl (night@xinterest.com)
- sunrise_chaser (sunrise@xinterest.com)

## 📝 内容分类统计

### 艺术类 (Art) - 15个
- 莫奈的睡莲
- 抽象艺术之美
- 街头涂鸦艺术
- 水彩画的魅力
- 雕塑艺术
- 等等...

### 美食类 (Food) - 15个
- 日式料理的艺术
- 意式浓缩咖啡
- 法式甜点
- 健康沙拉碗
- 意大利披萨
- 等等...

### 旅行类 (Travel) - 15个
- 巴黎埃菲尔铁塔
- 日本京都古寺
- 冰岛极光
- 圣托里尼日落
- 马尔代夫海滩
- 等等...

### 设计类 (Design) - 15个
- 极简主义室内设计
- 现代建筑之美
- 北欧风格家居
- 工业风设计
- 创意办公空间
- 等等...

### 摄影类 (Photography) - 10个
- 黑白人像摄影
- 自然风光摄影
- 城市夜景
- 微距摄影
- 等等...

### 时尚类 (Fashion) - 10个
- 春季时尚穿搭
- 配饰的艺术
- 街头时尚
- 优雅晚装
- 等等...

### 科技类 (Technology) - 8个
- 未来科技感
- 智能家居
- 编程艺术
- 等等...

### 生活类 (Lifestyle) - 10个
- 温馨的阅读角
- 瑜伽生活
- 植物角落
- 宠物日常
- 冥想时刻
- 等等...

## 🚀 如何运行Seed脚本

### 前提条件

确保你已经：
1. 安装了MongoDB并启动服务
2. 配置了`.env`文件（或使用默认连接）

### 运行步骤

1. **进入server目录**
```bash
cd server
```

2. **运行seed脚本**
```bash
npm run seed
```

或者：
```bash
node src/seed.js
```

3. **查看输出**

脚本会显示详细的创建过程：
```
🌱 开始初始化数据库...

✅ 已连接到 MongoDB

🗑️  清空现有数据...
✅ 已清空数据

👥 创建示例用户...
   ✓ 创建用户: monet_lover
   ✓ 创建用户: foodie_chan
   ...
✅ 成功创建 20 个用户

📌 创建示例内容...
   ✓ 创建内容: 莫奈的睡莲
   ✓ 创建内容: 抽象艺术之美
   ...
✅ 成功创建 60+ 个内容

🔖 添加用户收藏...
   ✓ monet_lover 收藏了 8 个内容
   ...
✅ 收藏数据添加完成

👥 添加关注关系...
   ✓ monet_lover 关注了 5 个用户
   ...
✅ 关注关系添加完成

📊 数据统计:
   用户总数: 20
   内容总数: 60+
   总点赞数: xxx
   总浏览数: xxx
   总收藏数: xxx

🎉 数据初始化完成！

📝 测试账号信息:
   用户名: monet_lover
   邮箱: monet@xinterest.com
   密码: password123

   其他账号邮箱格式: foodie@xinterest.com, travel@xinterest.com 等
   所有账号密码均为: password123
```

## 🎨 Mock数据特性

### 1. 真实的用户头像
使用 `pravatar.cc` API 提供随机但固定的用户头像

### 2. 高质量图片
所有内容图片来自 Unsplash，确保高质量和美观

### 3. 随机但合理的数据
- **点赞数**: 每个内容有0-8个随机点赞
- **浏览数**: 20-220次浏览
- **收藏数**: 5-35个收藏
- **关注关系**: 每个用户关注0-10个其他用户

### 4. 丰富的分类
8个不同分类确保测试各种过滤和搜索功能

### 5. 完整的社交网络
- 用户之间的关注/粉丝关系
- 内容的点赞和收藏
- 真实的社交互动数据

## 🔄 重新初始化数据

如果需要重新初始化mock数据（会清空现有数据）：

```bash
cd server
npm run seed
```

**⚠️ 警告**: 这会删除数据库中的所有现有数据！

## 💡 使用建议

1. **测试登录**: 使用 `monet@xinterest.com` / `password123` 快速登录
2. **测试不同用户**: 尝试不同的账号查看各自的内容和收藏
3. **测试社交功能**: 用户之间已经有关注关系，可以测试关注/取消关注
4. **测试分类过滤**: 60+个内容分布在8个分类中
5. **测试搜索**: 每个内容都有标题、描述和标签
6. **测试点赞收藏**: 已有随机的点赞和收藏数据

## 📱 Apple风格UI特性

新的UI已经完全采用Apple WWDC25 Liquid Glass设计：

### 核心特性
- ✅ 真正的多层玻璃结构（5层）
- ✅ 纯黑白alpha透明度设计
- ✅ SF Pro Display字体系统
- ✅ 流畅的动画和过渡
- ✅ 最小化Material UI依赖

### 已更新的页面
- ✅ 登录页面 (Login)
- ✅ 注册页面 (Register)
- ✅ 首页 (Home)
- ✅ 探索页面 (Explore)
- ✅ 搜索页面 (Search)
- ✅ 个人主页 (Profile)

### Apple UI组件库
- GlassButton - 玻璃按钮
- GlassInput - 玻璃输入框
- GlassCard - 玻璃卡片
- GlassChip - 玻璃标签
- GlassTabs - 玻璃标签页
- GlassNavbar - 玻璃导航栏
- LiquidGlassWrapper - 多层玻璃包装器

## 🎯 下一步

有了这些丰富的mock数据，你可以：

1. 测试所有核心功能
2. 体验完整的用户流程
3. 验证UI/UX设计
4. 进行性能测试
5. 准备演示或截图

享受探索Xinterest平台吧！🎉
