require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Pin = require('./models/Pin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xinterest';

// Mock 用户数据
const mockUsers = [
  {
    username: 'monet_lover',
    email: 'monet@xinterest.com',
    password: 'password123',
    bio: '热爱印象派艺术，分享生活中的美好瞬间 🎨',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    username: 'foodie_chan',
    email: 'foodie@xinterest.com',
    password: 'password123',
    bio: '美食探索者 | 分享美味时刻 🍜',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    username: 'travel_wanderer',
    email: 'travel@xinterest.com',
    password: 'password123',
    bio: '世界那么大，我想去看看 ✈️',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    username: 'design_master',
    email: 'design@xinterest.com',
    password: 'password123',
    bio: 'UI/UX设计师 | 追求完美的视觉体验',
    avatar: 'https://i.pravatar.cc/150?img=8'
  },
  {
    username: 'photo_artist',
    email: 'photo@xinterest.com',
    password: 'password123',
    bio: '用镜头记录生活 📷',
    avatar: 'https://i.pravatar.cc/150?img=15'
  }
];

// Mock Pins 数据 (使用 Unsplash API 的图片)
const mockPins = [
  // 艺术类
  {
    title: '莫奈的睡莲',
    description: '印象派大师莫奈的经典作品，柔和的色彩和光影交织，展现了自然之美',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    category: 'art',
    tags: ['印象派', '莫奈', '睡莲', '艺术'],
    imageWidth: 800,
    imageHeight: 600
  },
  {
    title: '抽象艺术之美',
    description: '现代抽象艺术，色彩的碰撞与融合',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    category: 'art',
    tags: ['抽象', '现代艺术', '色彩'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '街头涂鸦艺术',
    description: '充满活力的街头艺术，表达自由与创意',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800',
    category: 'art',
    tags: ['街头艺术', '涂鸦', '创意'],
    imageWidth: 800,
    imageHeight: 1200
  },

  // 美食类
  {
    title: '日式料理的艺术',
    description: '精致的日本料理，每一道菜都是艺术品',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    category: 'food',
    tags: ['日料', '寿司', '美食'],
    imageWidth: 800,
    imageHeight: 600
  },
  {
    title: '意式浓缩咖啡',
    description: '完美的咖啡拉花，开启美好的一天',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    category: 'food',
    tags: ['咖啡', '拉花', '早餐'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '法式甜点',
    description: '精致的马卡龙，五彩缤纷的甜蜜',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    category: 'food',
    tags: ['甜点', '马卡龙', '法式'],
    imageWidth: 800,
    imageHeight: 600
  },

  // 旅行类
  {
    title: '巴黎埃菲尔铁塔',
    description: '浪漫之都的标志性建筑，日落时分格外迷人',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
    category: 'travel',
    tags: ['巴黎', '埃菲尔铁塔', '旅行'],
    imageWidth: 800,
    imageHeight: 1200
  },
  {
    title: '日本京都古寺',
    description: '千年古刹，感受禅意与宁静',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
    category: 'travel',
    tags: ['日本', '京都', '寺庙'],
    imageWidth: 800,
    imageHeight: 600
  },
  {
    title: '冰岛极光',
    description: '大自然最美的光影秀，一生必看的景观',
    image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800',
    category: 'travel',
    tags: ['冰岛', '极光', '自然'],
    imageWidth: 800,
    imageHeight: 1000
  },

  // 设计类
  {
    title: '极简主义室内设计',
    description: '少即是多，简约而不简单的空间美学',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    category: 'design',
    tags: ['室内设计', '极简', '家居'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '现代建筑之美',
    description: '流线型的建筑设计，科技与艺术的完美结合',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800',
    category: 'design',
    tags: ['建筑', '设计', '现代'],
    imageWidth: 800,
    imageHeight: 600
  },

  // 摄影类
  {
    title: '黑白人像摄影',
    description: '去除色彩的干扰，专注于情感的表达',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
    category: 'photography',
    tags: ['人像', '黑白', '摄影'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '自然风光摄影',
    description: '壮丽的山川湖海，大自然的鬼斧神工',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    category: 'photography',
    tags: ['风光', '自然', '山'],
    imageWidth: 800,
    imageHeight: 600
  },

  // 时尚类
  {
    title: '春季时尚穿搭',
    description: '简约优雅的春季look，舒适又时尚',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    category: 'fashion',
    tags: ['时尚', '穿搭', '春季'],
    imageWidth: 800,
    imageHeight: 1200
  },
  {
    title: '配饰的艺术',
    description: '精致的配饰能让整体造型提升一个档次',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    category: 'fashion',
    tags: ['配饰', '时尚', '珠宝'],
    imageWidth: 800,
    imageHeight: 1000
  },

  // 生活类
  {
    title: '温馨的阅读角',
    description: '一杯咖啡，一本好书，享受安静的下午时光',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    category: 'lifestyle',
    tags: ['阅读', '咖啡', '生活'],
    imageWidth: 800,
    imageHeight: 600
  },
  {
    title: '瑜伽生活',
    description: '保持身心健康，享受运动的快乐',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    category: 'lifestyle',
    tags: ['瑜伽', '健康', '运动'],
    imageWidth: 800,
    imageHeight: 1200
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 开始初始化数据库...\n');

    // 连接数据库
    await mongoose.connect(MONGODB_URI);
    console.log('✅ 已连接到 MongoDB\n');

    // 清空现有数据
    console.log('🗑️  清空现有数据...');
    await User.deleteMany({});
    await Pin.deleteMany({});
    console.log('✅ 已清空数据\n');

    // 创建用户
    console.log('👥 创建示例用户...');
    const users = [];
    for (const userData of mockUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
      console.log(`   ✓ 创建用户: ${user.username}`);
    }
    console.log(`✅ 成功创建 ${users.length} 个用户\n`);

    // 创建 Pins
    console.log('📌 创建示例内容...');
    const pins = [];
    for (let i = 0; i < mockPins.length; i++) {
      const pinData = mockPins[i];
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const pin = new Pin({
        ...pinData,
        author: randomUser._id,
        // 随机添加一些点赞
        likes: users
          .filter(() => Math.random() > 0.5)
          .map(u => u._id)
          .slice(0, Math.floor(Math.random() * 5)),
        // 随机保存次数
        saves: Math.floor(Math.random() * 20),
        // 随机浏览次数
        views: Math.floor(Math.random() * 100) + 10
      });

      await pin.save();
      pins.push(pin);
      console.log(`   ✓ 创建内容: ${pin.title}`);
    }
    console.log(`✅ 成功创建 ${pins.length} 个内容\n`);

    // 为用户随机添加保存的内容
    console.log('🔖 添加用户收藏...');
    for (const user of users) {
      const randomPins = pins
        .filter(() => Math.random() > 0.6)
        .map(p => p._id)
        .slice(0, Math.floor(Math.random() * 8));

      user.savedPins = randomPins;
      await user.save();
      console.log(`   ✓ ${user.username} 收藏了 ${randomPins.length} 个内容`);
    }
    console.log('✅ 收藏数据添加完成\n');

    // 显示统计信息
    console.log('📊 数据统计:');
    console.log(`   用户总数: ${users.length}`);
    console.log(`   内容总数: ${pins.length}`);
    console.log(`   总点赞数: ${pins.reduce((sum, p) => sum + p.likes.length, 0)}`);
    console.log(`   总浏览数: ${pins.reduce((sum, p) => sum + p.views, 0)}\n`);

    console.log('🎉 数据初始化完成！\n');
    console.log('📝 测试账号信息:');
    console.log('   用户名: monet_lover');
    console.log('   邮箱: monet@xinterest.com');
    console.log('   密码: password123\n');

  } catch (error) {
    console.error('❌ 错误:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 数据库连接已关闭');
  }
}

// 运行脚本
seedDatabase();
