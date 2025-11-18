require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Pin = require('./models/Pin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xinterest';

// Mock 用户数据 - 扩展到20个用户
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
  },
  {
    username: 'fashion_queen',
    email: 'fashion@xinterest.com',
    password: 'password123',
    bio: '时尚博主 | 穿搭灵感分享 👗',
    avatar: 'https://i.pravatar.cc/150?img=20'
  },
  {
    username: 'tech_geek',
    email: 'tech@xinterest.com',
    password: 'password123',
    bio: '科技爱好者 | 探索未来 🚀',
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    username: 'nature_soul',
    email: 'nature@xinterest.com',
    password: 'password123',
    bio: '自然摄影师 | 用镜头捕捉大自然的美 🌿',
    avatar: 'https://i.pravatar.cc/150?img=25'
  },
  {
    username: 'urban_explorer',
    email: 'urban@xinterest.com',
    password: 'password123',
    bio: '城市探险家 | 发现城市之美 🏙️',
    avatar: 'https://i.pravatar.cc/150?img=14'
  },
  {
    username: 'minimalist_life',
    email: 'minimal@xinterest.com',
    password: 'password123',
    bio: '极简主义者 | Less is More ✨',
    avatar: 'https://i.pravatar.cc/150?img=42'
  },
  {
    username: 'coffee_addict',
    email: 'coffee@xinterest.com',
    password: 'password123',
    bio: '咖啡爱好者 | 一天三杯不够 ☕',
    avatar: 'https://i.pravatar.cc/150?img=28'
  },
  {
    username: 'vintage_collector',
    email: 'vintage@xinterest.com',
    password: 'password123',
    bio: '复古收藏家 | 旧时光的记忆 📻',
    avatar: 'https://i.pravatar.cc/150?img=36'
  },
  {
    username: 'plant_parent',
    email: 'plant@xinterest.com',
    password: 'password123',
    bio: '植物爱好者 | 城市绿洲 🌱',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    username: 'workout_warrior',
    email: 'workout@xinterest.com',
    password: 'password123',
    bio: '健身达人 | 强健体魄 💪',
    avatar: 'https://i.pravatar.cc/150?img=52'
  },
  {
    username: 'book_worm',
    email: 'book@xinterest.com',
    password: 'password123',
    bio: '阅读爱好者 | 书籍是最好的伙伴 📚',
    avatar: 'https://i.pravatar.cc/150?img=31'
  },
  {
    username: 'pet_lover',
    email: 'pet@xinterest.com',
    password: 'password123',
    bio: '宠物爱好者 | 萌宠日常 🐱',
    avatar: 'https://i.pravatar.cc/150?img=44'
  },
  {
    username: 'diy_creator',
    email: 'diy@xinterest.com',
    password: 'password123',
    bio: '手工达人 | 创意无限 🎨',
    avatar: 'https://i.pravatar.cc/150?img=22'
  },
  {
    username: 'music_soul',
    email: 'music@xinterest.com',
    password: 'password123',
    bio: '音乐爱好者 | 生活需要音乐 🎵',
    avatar: 'https://i.pravatar.cc/150?img=38'
  },
  {
    username: 'night_owl',
    email: 'night@xinterest.com',
    password: 'password123',
    bio: '夜猫子 | 夜晚更有灵感 🌙',
    avatar: 'https://i.pravatar.cc/150?img=49'
  },
  {
    username: 'sunrise_chaser',
    email: 'sunrise@xinterest.com',
    password: 'password123',
    bio: '日出追逐者 | 每天都是新的开始 🌅',
    avatar: 'https://i.pravatar.cc/150?img=56'
  }
];

// Mock Pins 数据 - 扩展到60+个
const mockPins = [
  // 艺术类 (15个)
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
  {
    title: '水彩画的魅力',
    description: '柔和的水彩画，展现梦幻般的色彩',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
    category: 'art',
    tags: ['水彩', '绘画', '艺术'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '雕塑艺术',
    description: '现代雕塑，立体的艺术表现',
    image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800',
    category: 'art',
    tags: ['雕塑', '艺术', '现代'],
    imageWidth: 800,
    imageHeight: 1200
  },

  // 美食类 (15个)
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
  {
    title: '健康沙拉碗',
    description: '色彩丰富的健康沙拉，美味又营养',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    category: 'food',
    tags: ['健康', '沙拉', '素食'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '意大利披萨',
    description: '正宗意式披萨，芝士拉丝的诱惑',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    category: 'food',
    tags: ['披萨', '意大利', '美食'],
    imageWidth: 800,
    imageHeight: 800
  },

  // 旅行类 (15个)
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
  {
    title: '圣托里尼日落',
    description: '爱琴海的蓝白小镇，最美的日落',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    category: 'travel',
    tags: ['希腊', '圣托里尼', '日落'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '马尔代夫海滩',
    description: '碧海蓝天，天堂般的度假胜地',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    category: 'travel',
    tags: ['马尔代夫', '海滩', '度假'],
    imageWidth: 800,
    imageHeight: 600
  },

  // 设计类 (15个)
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
  {
    title: '北欧风格家居',
    description: '温馨舒适的北欧风，自然与简约的完美融合',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    category: 'design',
    tags: ['北欧', '家居', '设计'],
    imageWidth: 800,
    imageHeight: 1200
  },
  {
    title: '工业风设计',
    description: '粗犷与精致并存的工业风格',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
    category: 'design',
    tags: ['工业风', '设计', '室内'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '创意办公空间',
    description: '激发灵感的办公环境设计',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    category: 'design',
    tags: ['办公', '设计', '创意'],
    imageWidth: 800,
    imageHeight: 600
  },

  // 摄影类 (10个)
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
  {
    title: '城市夜景',
    description: '繁华都市的夜晚，灯火璀璨',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
    category: 'photography',
    tags: ['夜景', '城市', '摄影'],
    imageWidth: 800,
    imageHeight: 1200
  },
  {
    title: '微距摄影',
    description: '探索微观世界的奇妙',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
    category: 'photography',
    tags: ['微距', '花卉', '摄影'],
    imageWidth: 800,
    imageHeight: 1000
  },

  // 时尚类 (10个)
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
  {
    title: '街头时尚',
    description: '年轻活力的街头风格',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    category: 'fashion',
    tags: ['街头', '时尚', '穿搭'],
    imageWidth: 800,
    imageHeight: 1200
  },
  {
    title: '优雅晚装',
    description: '精致优雅的晚礼服造型',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800',
    category: 'fashion',
    tags: ['晚装', '优雅', '时尚'],
    imageWidth: 800,
    imageHeight: 1200
  },

  // 科技类 (8个)
  {
    title: '未来科技感',
    description: '科技改变生活，探索未来',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    category: 'technology',
    tags: ['科技', '未来', '创新'],
    imageWidth: 800,
    imageHeight: 600
  },
  {
    title: '智能家居',
    description: '智能设备让生活更便捷',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
    category: 'technology',
    tags: ['智能家居', '科技', '生活'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '编程艺术',
    description: '代码也可以很美',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
    category: 'technology',
    tags: ['编程', '代码', '技术'],
    imageWidth: 800,
    imageHeight: 600
  },

  // 生活类 (10个)
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
  },
  {
    title: '植物角落',
    description: '绿色植物为家增添生机',
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800',
    category: 'lifestyle',
    tags: ['植物', '家居', '生活'],
    imageWidth: 800,
    imageHeight: 1000
  },
  {
    title: '宠物日常',
    description: '可爱的毛孩子，生活的调味剂',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800',
    category: 'lifestyle',
    tags: ['宠物', '猫', '生活'],
    imageWidth: 800,
    imageHeight: 1200
  },
  {
    title: '冥想时刻',
    description: '找到内心的平静',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    category: 'lifestyle',
    tags: ['冥想', '放松', '生活'],
    imageWidth: 800,
    imageHeight: 600
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
          .slice(0, Math.floor(Math.random() * 8)),
        // 随机保存次数
        saves: Math.floor(Math.random() * 30) + 5,
        // 随机浏览次数
        views: Math.floor(Math.random() * 200) + 20
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
        .filter(() => Math.random() > 0.5)
        .map(p => p._id)
        .slice(0, Math.floor(Math.random() * 15));

      user.savedPins = randomPins;
      await user.save();
      console.log(`   ✓ ${user.username} 收藏了 ${randomPins.length} 个内容`);
    }
    console.log('✅ 收藏数据添加完成\n');

    // 添加关注关系
    console.log('👥 添加关注关系...');
    for (const user of users) {
      const randomFollowing = users
        .filter(u => u._id.toString() !== user._id.toString())
        .filter(() => Math.random() > 0.6)
        .map(u => u._id)
        .slice(0, Math.floor(Math.random() * 10));

      user.following = randomFollowing;

      // 同时更新被关注用户的followers
      for (const followedId of randomFollowing) {
        const followedUser = users.find(u => u._id.toString() === followedId.toString());
        if (followedUser && !followedUser.followers) {
          followedUser.followers = [];
        }
        if (followedUser && !followedUser.followers.includes(user._id)) {
          followedUser.followers.push(user._id);
        }
      }

      await user.save();
      console.log(`   ✓ ${user.username} 关注了 ${randomFollowing.length} 个用户`);
    }

    // 保存所有用户的followers更新
    for (const user of users) {
      await user.save();
    }
    console.log('✅ 关注关系添加完成\n');

    // 显示统计信息
    console.log('📊 数据统计:');
    console.log(`   用户总数: ${users.length}`);
    console.log(`   内容总数: ${pins.length}`);
    console.log(`   总点赞数: ${pins.reduce((sum, p) => sum + p.likes.length, 0)}`);
    console.log(`   总浏览数: ${pins.reduce((sum, p) => sum + p.views, 0)}`);
    console.log(`   总收藏数: ${pins.reduce((sum, p) => sum + p.saves, 0)}\n`);

    console.log('🎉 数据初始化完成！\n');
    console.log('📝 测试账号信息:');
    console.log('   用户名: monet_lover');
    console.log('   邮箱: monet@xinterest.com');
    console.log('   密码: password123\n');
    console.log('   其他账号邮箱格式: foodie@xinterest.com, travel@xinterest.com 等');
    console.log('   所有账号密码均为: password123\n');

    return { users, pins };

  } catch (error) {
    console.error('❌ 错误:', error);
    throw error;
  }
}

// 如果直接运行此脚本（npm run seed）
if (require.main === module) {
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      console.log('✅ Connected to MongoDB');
      await seedDatabase();
      await mongoose.connection.close();
      console.log('👋 数据库连接已关闭');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    });
}

// 导出seed函数供其他模块使用
module.exports = seedDatabase;
