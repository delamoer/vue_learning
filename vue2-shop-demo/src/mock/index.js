/**
 * Mock 商品数据 - 模拟后端返回
 * 类目：手机数码 / 服装鞋包 / 家居厨具 / 运动户外
 */

export const categories = [
  { id: 1, name: '手机数码', icon: '📱', sub: ['手机', '笔记本', '平板', '耳机', '智能手表'] },
  { id: 2, name: '服装鞋包', icon: '👗', sub: ['男装', '女装', '运动鞋', '休闲鞋', '箱包'] },
  { id: 3, name: '家居厨具', icon: '🏠', sub: ['厨具', '床上用品', '收纳', '灯具', '装饰'] },
  { id: 4, name: '运动户外', icon: '⚽', sub: ['健身器材', '户外装备', '球类', '骑行', '游泳'] }
]

export const products = [
  // ── 手机数码 ──────────────────────────────────────
  {
    id: 101, categoryId: 1, category: '手机数码', subCategory: '手机',
    name: 'ProPhone 15 Pro 旗舰手机',
    brand: 'ProPhone',
    price: 5999, originalPrice: 6499,
    sales: 12800, rating: 4.8, reviewCount: 3264,
    stock: 200,
    images: [
      'https://picsum.photos/seed/phone1/600/600',
      'https://picsum.photos/seed/phone1b/600/600',
      'https://picsum.photos/seed/phone1c/600/600'
    ],
    specs: {
      颜色: ['曜石黑', '星空白', '山峰蓝'],
      存储: ['128GB', '256GB', '512GB']
    },
    tags: ['热销', '限时优惠'],
    description: '搭载最新旗舰芯片，超强三摄系统，6.1英寸 ProMotion 自适应刷新率屏幕，全天候续航保障。'
  },
  {
    id: 102, categoryId: 1, category: '手机数码', subCategory: '耳机',
    name: 'SoundPro 降噪无线耳机',
    brand: 'SoundPro',
    price: 899, originalPrice: 1099,
    sales: 8500, rating: 4.7, reviewCount: 1820,
    stock: 500,
    images: [
      'https://picsum.photos/seed/earphone1/600/600',
      'https://picsum.photos/seed/earphone1b/600/600'
    ],
    specs: {
      颜色: ['哑光黑', '珍珠白', '薄雾蓝'],
      版本: ['标准版', '专业版']
    },
    tags: ['好评如潮'],
    description: '行业领先主动降噪，30小时超长续航，Hi-Res 高分辨率音质认证，折叠便携设计。'
  },
  {
    id: 103, categoryId: 1, category: '手机数码', subCategory: '笔记本',
    name: 'UltraBook Pro 14 轻薄本',
    brand: 'UltraBook',
    price: 7299, originalPrice: 7999,
    sales: 4320, rating: 4.9, reviewCount: 986,
    stock: 80,
    images: [
      'https://picsum.photos/seed/laptop1/600/600',
      'https://picsum.photos/seed/laptop1b/600/600'
    ],
    specs: {
      颜色: ['深空灰', '星光银'],
      配置: ['i5/16GB/512GB', 'i7/16GB/1TB', 'i7/32GB/1TB']
    },
    tags: ['爆款', '新品'],
    description: '搭载第13代 Intel Core i7，14英寸 2.8K OLED 触控屏，仅1.2kg超轻机身，雷电4接口全覆盖。'
  },
  {
    id: 104, categoryId: 1, category: '手机数码', subCategory: '智能手表',
    name: 'FitWatch Pro 智能运动手表',
    brand: 'FitWatch',
    price: 1299, originalPrice: 1599,
    sales: 6700, rating: 4.6, reviewCount: 2105,
    stock: 320,
    images: [
      'https://picsum.photos/seed/watch1/600/600',
      'https://picsum.photos/seed/watch1b/600/600'
    ],
    specs: {
      颜色: ['黑色', '银色', '金色'],
      表带: ['橡胶表带', '金属表带', '皮革表带']
    },
    tags: ['热销'],
    description: '全天候健康监测，血氧/心率/睡眠全覆盖，GPS轨迹记录，18天超长续航，IP68防水。'
  },

  // ── 服装鞋包 ──────────────────────────────────────
  {
    id: 201, categoryId: 2, category: '服装鞋包', subCategory: '男装',
    name: '商务休闲修身西装套装',
    brand: 'StyleMen',
    price: 599, originalPrice: 899,
    sales: 5200, rating: 4.5, reviewCount: 1340,
    stock: 400,
    images: [
      'https://picsum.photos/seed/suit1/600/600',
      'https://picsum.photos/seed/suit1b/600/600'
    ],
    specs: {
      颜色: ['经典黑', '深灰色', '藏青色'],
      尺码: ['S', 'M', 'L', 'XL', 'XXL']
    },
    tags: ['爆款'],
    description: '精选高品质毛纺面料，修身版型设计，内附细节口袋，适合商务会议和正式场合。'
  },
  {
    id: 202, categoryId: 2, category: '服装鞋包', subCategory: '女装',
    name: '法式轻熟风连衣裙',
    brand: 'ElegantWear',
    price: 329, originalPrice: 499,
    sales: 9800, rating: 4.7, reviewCount: 3016,
    stock: 600,
    images: [
      'https://picsum.photos/seed/dress1/600/600',
      'https://picsum.photos/seed/dress1b/600/600'
    ],
    specs: {
      颜色: ['奶油白', '浅蓝色', '淡粉色', '墨绿色'],
      尺码: ['XS', 'S', 'M', 'L', 'XL']
    },
    tags: ['新品', '好评如潮'],
    description: '法式复古设计，V领收腰显瘦，天丝混纺面料轻盈透气，春夏通勤首选。'
  },
  {
    id: 203, categoryId: 2, category: '服装鞋包', subCategory: '运动鞋',
    name: 'AirRun Pro 专业跑步鞋',
    brand: 'AirRun',
    price: 459, originalPrice: 599,
    sales: 14000, rating: 4.8, reviewCount: 4520,
    stock: 800,
    images: [
      'https://picsum.photos/seed/shoes1/600/600',
      'https://picsum.photos/seed/shoes1b/600/600'
    ],
    specs: {
      颜色: ['全黑', '白灰', '蓝橙', '荧光绿'],
      尺码: ['38', '39', '40', '41', '42', '43', '44', '45']
    },
    tags: ['热销', '限时优惠'],
    description: '专业马拉松缓震大底，碳板推进系统，透气针织鞋面，适合长距离跑步训练。'
  },
  {
    id: 204, categoryId: 2, category: '服装鞋包', subCategory: '箱包',
    name: '轻奢真皮通勤手提包',
    brand: 'LuxBag',
    price: 899, originalPrice: 1299,
    sales: 3400, rating: 4.6, reviewCount: 875,
    stock: 150,
    images: [
      'https://picsum.photos/seed/bag1/600/600',
      'https://picsum.photos/seed/bag1b/600/600'
    ],
    specs: {
      颜色: ['驼色', '黑色', '红棕'],
      尺寸: ['小号', '中号', '大号']
    },
    tags: ['好评如潮'],
    description: '头层牛皮材质，五金配件全部采用锌合金镀金处理，内部多功能分隔，A4文件轻松放入。'
  },

  // ── 家居厨具 ──────────────────────────────────────
  {
    id: 301, categoryId: 3, category: '家居厨具', subCategory: '厨具',
    name: '不锈钢多功能炒锅套装',
    brand: 'CookMaster',
    price: 299, originalPrice: 399,
    sales: 7600, rating: 4.7, reviewCount: 2340,
    stock: 900,
    images: [
      'https://picsum.photos/seed/pan1/600/600',
      'https://picsum.photos/seed/pan1b/600/600'
    ],
    specs: {
      尺寸: ['28cm', '30cm', '32cm'],
      类型: ['单锅', '套装(锅+铲+盖)']
    },
    tags: ['爆款'],
    description: '食品级304不锈钢，四层复底均匀导热，可用于电磁炉/燃气灶/电陶炉，洗碗机可清洗。'
  },
  {
    id: 302, categoryId: 3, category: '家居厨具', subCategory: '床上用品',
    name: '酒店级长绒棉四件套',
    brand: 'DreamSleep',
    price: 399, originalPrice: 599,
    sales: 11200, rating: 4.9, reviewCount: 5680,
    stock: 1200,
    images: [
      'https://picsum.photos/seed/bedding1/600/600',
      'https://picsum.photos/seed/bedding1b/600/600'
    ],
    specs: {
      颜色: ['象牙白', '浅灰', '莫兰迪蓝', '淡樱粉'],
      尺寸: ['1.5m床', '1.8m床', '2.0m床']
    },
    tags: ['热销', '好评如潮'],
    description: '100支新疆长绒棉，贡缎织法，密度越高越光滑，抗菌防螨处理，亲肤透气。'
  },

  // ── 运动户外 ──────────────────────────────────────
  {
    id: 401, categoryId: 4, category: '运动户外', subCategory: '健身器材',
    name: '智能动感单车家用健身车',
    brand: 'FitRide',
    price: 1899, originalPrice: 2599,
    sales: 4100, rating: 4.7, reviewCount: 1560,
    stock: 200,
    images: [
      'https://picsum.photos/seed/bike1/600/600',
      'https://picsum.photos/seed/bike1b/600/600'
    ],
    specs: {
      颜色: ['哑光黑', '银白'],
      配置: ['标准版', '升级版(带显示屏)']
    },
    tags: ['新品'],
    description: '磁控阻力系统，32档无极调节，内置心率传感器，APP互联实时数据同步，低噪静音设计。'
  },
  {
    id: 402, categoryId: 4, category: '运动户外', subCategory: '户外装备',
    name: '专业徒步登山背包 55L',
    brand: 'OutdoorPro',
    price: 649, originalPrice: 899,
    sales: 2800, rating: 4.8, reviewCount: 920,
    stock: 350,
    images: [
      'https://picsum.photos/seed/backpack1/600/600',
      'https://picsum.photos/seed/backpack1b/600/600'
    ],
    specs: {
      颜色: ['军绿', '藏青', '橘红'],
      容量: ['45L', '55L', '65L']
    },
    tags: ['爆款'],
    description: '防泼水600D牛津布，铝合金支架，人体工学背负系统，可拆卸腰托，夜间反光条安全设计。'
  }
]

/**
 * 根据条件过滤商品
 * @param {object} params - { categoryId, subCategory, keyword, sortBy, page, pageSize }
 */
export function getProductList(params = {}) {
  const { categoryId, subCategory, keyword, sortBy = 'default', page = 1, pageSize = 8 } = params
  let list = [...products]

  if (categoryId) list = list.filter(p => p.categoryId === Number(categoryId))
  if (subCategory) list = list.filter(p => p.subCategory === subCategory)
  if (keyword) {
    const kw = keyword.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(kw) ||
      p.brand.toLowerCase().includes(kw) ||
      p.category.includes(keyword)
    )
  }

  if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
  else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
  else if (sortBy === 'sales') list.sort((a, b) => b.sales - a.sales)
  else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)

  const total = list.length
  const start = (page - 1) * pageSize
  const data = list.slice(start, start + pageSize)

  return { data, total, page, pageSize }
}

/**
 * 根据 id 获取单个商品
 */
export function getProductById(id) {
  return products.find(p => p.id === Number(id)) || null
}

/**
 * 获取推荐商品（各分类取一个）
 */
export function getRecommended() {
  return [101, 202, 302, 401].map(id => getProductById(id))
}

/**
 * 获取热销商品（按销量前6）
 */
export function getHotSales() {
  return [...products].sort((a, b) => b.sales - a.sales).slice(0, 6)
}

/**
 * 模拟登录接口
 */
export function mockLogin(username, password) {
  if (username === 'admin' && password === '123456') {
    return {
      success: true,
      token: 'mock-token-' + Date.now(),
      userInfo: { id: 1, username: 'admin', nickname: '测试用户', avatar: 'https://picsum.photos/seed/avatar/80/80' }
    }
  }
  return { success: false, message: '用户名或密码错误' }
}

/**
 * 模拟地址列表
 */
export const mockAddresses = [
  { id: 1, name: '张三', phone: '138****8888', province: '北京市', city: '北京市', district: '朝阳区', detail: '望京街道某某大厦 1001室', isDefault: true },
  { id: 2, name: '李四', phone: '159****9999', province: '上海市', city: '上海市', district: '浦东新区', detail: '陆家嘴金融中心 2808室', isDefault: false }
]
