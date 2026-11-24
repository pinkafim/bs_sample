'use strict';

/* Встроенный SVG-фолбэк на случай офлайна */
function garmentSvg(kind, fill, accent, label) {
  const shape = kind === 'jeans'
    ? `<path d="M126 76h108l14 316h-48l-20-182-20 182h-48z" fill="${fill}" stroke="#cbd5e1" stroke-width="4"/><path d="M130 112h100" stroke="${accent}" stroke-width="4" stroke-dasharray="8 6"/>`
    : `<path d="M126 112c16-24 92-24 108 0l44 26 24 114-42 16-14-64v178H114V204l-14 64-42-16 24-114z" fill="${fill}" stroke="#cbd5e1" stroke-width="4"/><path d="M142 114c12 34 64 34 76 0" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/><path d="M138 278h84v54c0 10-8 18-18 18h-48c-10 0-18-8-18-18z" fill="${accent}" opacity="0.28"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480">
    <rect width="360" height="480" fill="#eef2f7"/>
    ${shape}
    <text x="180" y="442" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="700" fill="#475569">${label}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

const imageUrls = {
  // Джинсы (локальные)
  classic: 'images/classic.webp',
  washed: 'images/washed.webp',
  straight: 'images/straight.webp',
  shirt: 'images/shirt.webp',
  socks: 'images/socks.webp',
  ivory: 'images/ivory.webp',
  navy: 'images/navy.webp',
  towel: 'images/towel.webp',
  mug: 'images/mug.webp',
  gel: 'images/gel.webp',
  notebook: 'images/notebook.webp',
  cable: 'images/cable.webp',
  sneakers: 'images/sneakers.webp',
  denim: 'images/denim.webp',
  // Новые джинсы
  j_bigar: 'https://ir.ozone.ru/s3/multimedia-1-6/wc500/7448512362.jpg',
  j_marcopolo: 'https://ir.ozone.ru/s3/multimedia-1-m/wc500/14907470350.jpg',
  j_diagonal: 'https://ir.ozone.ru/s3/multimedia-1-7/wc500/12922119691.jpg',
  j_justdenim: garmentSvg('jeans', '#1e293b', '#60a5fa', 'JUST DENIM ЗИМА'),

  // Толстовки и худи
  h_veneziani: 'https://ir.ozone.ru/s3/multimedia-1-b/wc500/21229350275.jpg',
  h_club: 'https://ir.ozone.ru/s3/multimedia-1-p/wc500/20684084317.jpg',
  h_hoodie_dv: 'https://ir.ozone.ru/s3/multimedia-1-m/wc500/20946362998.jpg',
  h_milk: 'https://ir.ozone.ru/s3/multimedia-1-v/wc500/21154828207.jpg',
  h_tvoe: 'https://ir.ozone.ru/s3/multimedia-1-1/wc500/14284553221.jpg',
  h_hood_cap: 'https://ir.ozone.ru/s3/multimedia-1-j/wc500/14223854323.jpg',
  h_naches: 'https://ir.ozone.ru/s3/multimedia-1-l/wc500/15303800397.jpg',
  h_champion: 'https://ir.ozone.ru/s3/multimedia-r/wc500/6367229187.jpg',
  h_zip: garmentSvg('hoodie', '#1e293b', '#64748b', 'ЗИП-ХУДИ'),
  h_oversize: garmentSvg('hoodie', '#94a3b8', '#475569', 'ХУДИ ОВЕРСАЙЗ'),
  h_sand: garmentSvg('hoodie', '#d6cbb8', '#8b7d6b', 'СВИТШОТ БАЗОВЫЙ'),
  h_navy: garmentSvg('hoodie', '#1e3a5f', '#60a5fa', 'ТОЛСТОВКА ФЛИС'),
};

const fallbackImgByKey = {
  j_bigar: garmentSvg('jeans', '#334155', '#94a3b8', 'BIGAR БАНАНЫ'),
  j_marcopolo: garmentSvg('jeans', '#1e3a5f', '#93c5fd', 'MARC O POLO'),
  j_diagonal: garmentSvg('jeans', '#18181b', '#71717a', 'ДИАГОНАЛЬ'),
  h_veneziani: garmentSvg('hoodie', '#18181b', '#52525b', 'DON VENEZIANI'),
  h_club: garmentSvg('hoodie', '#111827', '#4b5563', 'CLUB HOODIE'),
  h_hoodie_dv: garmentSvg('hoodie', '#334155', '#94a3b8', 'ХУДИ ОВЕРСАЙЗ'),
  h_milk: garmentSvg('hoodie', '#f3efe6', '#c8bfa8', 'ХУДИ МОЛОЧНЫЙ'),
  h_tvoe: garmentSvg('hoodie', '#1f2937', '#6b7280', 'ХУДИ ТВОЕ'),
  h_hood_cap: garmentSvg('hoodie', '#475569', '#94a3b8', 'ТОЛСТОВКА'),
  h_naches: garmentSvg('hoodie', '#27272a', '#a1a1aa', 'ХУДИ С НАЧЁСОМ'),
  h_champion: garmentSvg('hoodie', '#1d4ed8', '#93c5fd', 'CHAMPION'),
};

const points = {
  mira: 'проспект Мира, 182',
  yara: 'Ярославская улица, 21А',
};

const categories = {
  jeans: 'Джинсы',
  hoodies: 'Толстовки и худи',
};

/* Модель CPO Ozon: процент от цены товара списывается только при заказе (0 ₽ авансом) */
const PROMO_TIERS = {
  1: {
    tier: 1, rank: 1,
    rate: 0.12, ratePct: 12,
    code: '1 класс · 12%', shortCode: '1 класс',
    name: 'Топ-выдача (CPO)',
    subtitle: 'Максимальный приоритет как в комбо-ставке Ozon',
    boostLabel: '+300% к показам',
    viewsMult: 4.0, ctr: 0.068, cr: 0.095,
    stars: '★★★', badge: '1 класс · 12%', colorClass: 'tier-1',
    perks: [
      'Топ выдачи внутри своей группы релевантности',
      'Премиум-корона на кнопке карточки у покупателей',
      '0 ₽ предоплаты — 12% списывается только с заказа',
    ],
  },
  2: {
    tier: 2, rank: 2,
    rate: 0.09, ratePct: 9,
    code: '2 класс · 9%', shortCode: '2 класс',
    name: 'Усиленный буст (CPO)',
    subtitle: 'Уверенный вывод выше 3 класса и органики',
    boostLabel: '+130% к показам',
    viewsMult: 2.3, ctr: 0.052, cr: 0.082,
    stars: '★★', badge: '2 класс · 9%', colorClass: 'tier-2',
    perks: [
      'Приоритет выше 3 класса и карточек без буста',
      'Оптимальный ДРР 9% для категорий с высокой конкуренцией',
      '0 ₽ предоплаты — списание только после оформления заказа',
    ],
  },
  3: {
    tier: 3, rank: 3,
    rate: 0.06, ratePct: 6,
    code: '3 класс · 6%', shortCode: '3 класс',
    name: 'Базовый старт (CPO)',
    subtitle: 'Минимальная ставка Ozon для поднятия над органикой',
    boostLabel: '+55% к показам',
    viewsMult: 1.55, ctr: 0.041, cr: 0.072,
    stars: '★', badge: '3 класс · 6%', colorClass: 'tier-3',
    perks: [
      'Вывод выше всех товаров без продвижения',
      'Щадящий ДРР 6% — безопасно для недорогих товаров и новинок',
      '0 ₽ предоплаты — платите только за реальный заказ',
    ],
  },
  0: {
    tier: 0, rank: 4,
    rate: 0, ratePct: 0,
    code: 'Органика · 0%', shortCode: 'Без продвижения',
    name: 'Органика',
    subtitle: 'Базовая выдача без рекламной комиссии',
    boostLabel: 'Базовые показы',
    viewsMult: 1.0, ctr: 0.031, cr: 0.062,
    stars: '—', badge: 'Органика', colorClass: 'tier-0',
    perks: ['Обычное размещение после товаров 1, 2 и 3 класса'],
  },
};

const defaultProducts = [
  // КАТЕГОРИЯ: ДЖИНСЫ
  { id: 'classic', sku: '601284101', category: 'jeans', name: 'Джинсы утеплённые с флисом', color: 'Серые', sizes: ['S', 'M', 'L', 'XL'], price: 2590, oldPrice: 6990, cheap: 2290, recent: 1, rating: 4.8, reviews: 735, left: 14, verified: true, seller: 'Denim Store', tags: ['джинсы', 'брюки', 'утепленные', 'флис'], promoTier: 2 },
  { id: 'washed', sku: '601284102', category: 'jeans', name: 'Джинсы широкие свободного кроя', color: 'Графитовые', sizes: ['S', 'M', 'L', 'XL'], price: 3190, oldPrice: 8400, cheap: 2790, recent: 2, rating: 4.9, reviews: 2140, left: 9, verified: true, seller: 'Denim Store', tags: ['джинсы', 'оверсайз', 'широкие'], promoTier: 1 },
  { id: 'straight', sku: '601284103', category: 'jeans', name: 'Джинсы прямые классические', color: 'Синие', sizes: ['S', 'M', 'L', 'XL'], price: 3590, oldPrice: 7800, cheap: 3290, recent: 3, rating: 4.9, reviews: 1660, left: 24, verified: true, seller: 'Denim Store', tags: ['джинсы', 'прямые'], promoTier: 2 },
  { id: 'j_bigar', sku: '200817351', category: 'jeans', name: 'Джинсы BIGAR мужские бананы', color: 'Синие', sizes: ['S', 'M', 'L', 'XL'], price: 2863, oldPrice: 5490, cheap: 2650, recent: 23, rating: 4.9, reviews: 28631, left: 11, verified: true, seller: 'BIGAR Official', tags: ['джинсы', 'бананы', 'мужские'], promoTier: 1 },
  { id: 'j_diagonal', sku: '518567521', category: 'jeans', name: 'Джинсы Диагональ широкие', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 3199, oldPrice: 23433, cheap: 2950, recent: 24, rating: 4.9, reviews: 1692, left: 15, verified: true, seller: 'Диагональ', tags: ['джинсы', 'черные', 'широкие'], promoTier: 2 },
  { id: 'j_justdenim', sku: '575476478', category: 'jeans', name: 'Джинсы JUST DENIM зимние утеплённые', color: 'Тёмно-синие', sizes: ['S', 'M', 'L', 'XL'], price: 3490, oldPrice: 7990, cheap: 3190, recent: 25, rating: 4.8, reviews: 840, left: 8, verified: true, seller: 'JUST DENIM', tags: ['джинсы', 'утепленные', 'зимние', 'флис'], promoTier: 3 },
  { id: 'j_marcopolo', sku: '575126166', category: 'jeans', name: "Джинсы Marc O'Polo Sjöbo Shaped Fit", color: 'Индиго', sizes: ['M', 'L', 'XL'], price: 16480, oldPrice: 16990, cheap: 15900, recent: 26, rating: 5.0, reviews: 2, left: 2, verified: true, seller: "Marc O'Polo", tags: ['джинсы', 'прямые', 'премиум'], promoTier: 0 },
  { id: 'shirt', sku: '601284104', category: 'jeans', name: 'Джинсы багги из плотного денима', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2490, oldPrice: 6700, cheap: 2190, recent: 4, rating: 4.8, reviews: 985, left: 31, verified: true, seller: 'Denim Store', tags: ['джинсы', 'багги', 'черные', 'оверсайз'], promoTier: 3 },
  { id: 'socks', sku: '601284105', category: 'jeans', name: 'Джинсы свободные с потёртостями', color: 'Голубые', sizes: ['S', 'M', 'L', 'XL'], price: 2890, oldPrice: 6200, cheap: 2590, recent: 5, rating: 4.9, reviews: 520, left: 45, verified: false, seller: 'Denim Store', tags: ['джинсы', 'свободные'], promoTier: 0 },
  { id: 'ivory', sku: '601284106', category: 'jeans', name: 'Джинсы бананы', color: 'Светло-голубые', sizes: ['S', 'M', 'L', 'XL'], price: 2690, oldPrice: 6500, cheap: 2390, recent: 6, rating: 4.9, reviews: 4120, left: 19, verified: true, seller: 'Denim Store', tags: ['джинсы', 'бананы'], promoTier: 3 },
  { id: 'navy', sku: '601284107', category: 'jeans', name: 'Джинсы прямого кроя', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2790, oldPrice: 5550, cheap: 2490, recent: 7, rating: 4.8, reviews: 531, left: 27, verified: false, seller: 'Denim Store', tags: ['джинсы', 'черные'], promoTier: 0 },
  { id: 'towel', sku: '601284108', category: 'jeans', name: 'Джинсы широкие на каждый день', color: 'Серые', sizes: ['S', 'M', 'L', 'XL'], price: 2290, oldPrice: 4990, cheap: 2090, recent: 8, rating: 4.9, reviews: 291, left: 62, verified: false, seller: 'Denim Store', tags: ['джинсы', 'широкие'], promoTier: 0 },
  { id: 'mug', sku: '601284109', category: 'jeans', name: 'Джинсы зауженного кроя', color: 'Тёмно-синие', sizes: ['S', 'M', 'L', 'XL'], price: 2390, oldPrice: 5990, cheap: 2190, recent: 9, rating: 4.9, reviews: 1020, left: 18, verified: true, seller: 'Denim Store', tags: ['джинсы'], promoTier: 0 },
  { id: 'gel', sku: '601284110', category: 'jeans', name: 'Джинсы широкие из тяжёлого денима', color: 'Тёмно-синие', sizes: ['S', 'M', 'L', 'XL'], price: 3290, oldPrice: 8050, cheap: 2990, recent: 10, rating: 4.8, reviews: 1396, left: 11, verified: true, seller: 'Denim Store', tags: ['джинсы', 'широкие'], promoTier: 2 },
  { id: 'notebook', sku: '601284111', category: 'jeans', name: 'Джинсы багги', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2590, oldPrice: 6360, cheap: 2290, recent: 11, rating: 4.9, reviews: 596, left: 52, verified: false, seller: 'Denim Store', tags: ['джинсы', 'багги', 'черные'], promoTier: 0 },
  { id: 'cable', sku: '601284112', category: 'jeans', name: 'Джинсы стрейч', color: 'Синие', sizes: ['S', 'M', 'L', 'XL'], price: 2190, oldPrice: 5400, cheap: 1990, recent: 12, rating: 4.9, reviews: 171, left: 33, verified: true, seller: 'Denim Store', tags: ['джинсы', 'стрейч'], promoTier: 3 },
  { id: 'sneakers', sku: '601284113', category: 'jeans', name: 'Джинсы стрейч классические', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2290, oldPrice: 5490, cheap: 2090, recent: 13, rating: 4.8, reviews: 842, left: 29, verified: false, seller: 'Denim Store', tags: ['джинсы', 'черные'], promoTier: 0 },
  { id: 'denim', sku: '601284114', category: 'jeans', name: 'Джинсы широкие с высокой посадкой', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2990, oldPrice: 9200, cheap: 2690, recent: 14, rating: 4.9, reviews: 5401, left: 6, verified: true, seller: 'Denim Store', tags: ['джинсы', 'черные', 'широкие'], promoTier: 1 },

  // КАТЕГОРИЯ: ТОЛСТОВКИ И ХУДИ
  { id: 'h_tvoe', sku: '352473808', category: 'hoodies', name: 'Худи ТВОЕ Базовая', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 1229, oldPrice: 3699, cheap: 1150, recent: 27, rating: 4.8, reviews: 3071, left: 108, verified: true, seller: 'ТВОЕ', tags: ['толстовка', 'худи', 'черные', 'базовая'], promoTier: 1 },
  { id: 'h_naches', sku: '555626988', category: 'hoodies', name: 'Худи с начесом и капюшоном', color: 'Графитовые', sizes: ['S', 'M', 'L', 'XL'], price: 1908, oldPrice: 6890, cheap: 1790, recent: 28, rating: 4.9, reviews: 6023, left: 27, verified: true, seller: 'Street Base', tags: ['толстовка', 'худи', 'начес', 'утепленные', 'флис'], promoTier: 1 },
  { id: 'h_champion', sku: '150132617', category: 'hoodies', name: 'Худи Champion классический', color: 'Синие', sizes: ['S', 'M', 'L', 'XL'], price: 3490, oldPrice: 7490, cheap: 3190, recent: 29, rating: 4.9, reviews: 942, left: 9, verified: true, seller: 'Champion Brand', tags: ['толстовка', 'худи', 'спорт'], promoTier: 2 },
  { id: 'h_hood_cap', sku: '557085669', category: 'hoodies', name: 'Толстовка с капюшоном свободная', color: 'Серые', sizes: ['S', 'M', 'L', 'XL'], price: 1283, oldPrice: 2490, cheap: 1190, recent: 30, rating: 5.0, reviews: 2, left: 14, verified: false, seller: 'Denim Store', tags: ['толстовка', 'худи', 'свободные'], promoTier: 3 },
  { id: 'h_veneziani', sku: '702481372', category: 'hoodies', name: 'Толстовка DON VENEZIANI с капюшоном', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2190, oldPrice: 7900, cheap: 1990, recent: 15, rating: 4.9, reviews: 148, left: 8, verified: true, seller: 'Denim Store', tags: ['толстовка', 'худи', 'черные', 'кофта'], promoTier: 2 },
  { id: 'h_milk', sku: '702481373', category: 'hoodies', name: 'Худи мужской оверсайз с начёсом молочный', color: 'Молочный', sizes: ['S', 'M', 'L', 'XL'], price: 2590, oldPrice: 5900, cheap: 2390, recent: 16, rating: 4.9, reviews: 864, left: 12, verified: true, seller: 'Denim Store', tags: ['толстовка', 'худи', 'оверсайз', 'утепленные', 'флис', 'начес'], promoTier: 2 },
  { id: 'h_hoodie_dv', sku: '702481374', category: 'hoodies', name: 'Худи DON VENEZIANI утеплённый', color: 'Графитовые', sizes: ['S', 'M', 'L', 'XL'], price: 2390, oldPrice: 5200, cheap: 2150, recent: 17, rating: 4.8, reviews: 503, left: 17, verified: true, seller: 'Denim Store', tags: ['толстовка', 'худи', 'утепленные'], promoTier: 3 },
  { id: 'h_club', sku: '702481375', category: 'hoodies', name: 'Толстовка Club BB Hoodie базовая', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 3290, oldPrice: 6490, cheap: 2990, recent: 18, rating: 4.7, reviews: 412, left: 26, verified: true, seller: 'Denim Store', tags: ['толстовка', 'худи', 'черные'], promoTier: 0 },
  { id: 'h_zip', sku: '702481376', category: 'hoodies', name: 'Толстовка на молнии зип-худи оверсайз', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2890, oldPrice: 6100, cheap: 2590, recent: 19, rating: 4.9, reviews: 629, left: 15, verified: true, seller: 'Denim Store', tags: ['толстовка', 'худи', 'зип', 'оверсайз', 'черные'], promoTier: 1 },
  { id: 'h_oversize', sku: '702481377', category: 'hoodies', name: 'Худи свободного кроя плотный футер', color: 'Серые', sizes: ['S', 'M', 'L', 'XL'], price: 2490, oldPrice: 4990, cheap: 2290, recent: 20, rating: 4.8, reviews: 318, left: 40, verified: false, seller: 'Denim Store', tags: ['толстовка', 'худи', 'свободные', 'оверсайз'], promoTier: 0 },
  { id: 'h_sand', sku: '702481378', category: 'hoodies', name: 'Толстовка свитшот базовый хлопковый', color: 'Бежевый', sizes: ['S', 'M', 'L', 'XL'], price: 1990, oldPrice: 4200, cheap: 1790, recent: 21, rating: 4.8, reviews: 214, left: 34, verified: false, seller: 'Denim Store', tags: ['толстовка', 'свитшот'], promoTier: 3 },
  { id: 'h_navy', sku: '702481379', category: 'hoodies', name: 'Толстовка утеплённая с флисом', color: 'Тёмно-синие', sizes: ['S', 'M', 'L', 'XL'], price: 2690, oldPrice: 5400, cheap: 2450, recent: 22, rating: 4.9, reviews: 390, left: 22, verified: true, seller: 'Denim Store', tags: ['толстовка', 'худи', 'утепленные', 'флис'], promoTier: 0 },
];

let products = defaultProducts.map(p => ({ ...p }));

/* Склад ПВЗ («Товары рядом») */
const stock = [
  // ПВЗ: проспект Мира, 182
  { id: 'M-J-01', product: 'j_bigar', point: 'mira', size: 'M', price: 2863 },
  { id: 'M-J-02', product: 'j_bigar', point: 'mira', size: 'L', price: 2863 },
  { id: 'M-J-03', product: 'j_diagonal', point: 'mira', size: 'M', price: 3199 },
  { id: 'M-J-04', product: 'j_marcopolo', point: 'mira', size: 'L', price: 16480 },
  { id: 'M-J-05', product: 'j_justdenim', point: 'mira', size: 'L', price: 3490 },
  { id: 'M-J-06', product: 'classic', point: 'mira', size: 'M', price: 2590 },
  { id: 'M-J-07', product: 'washed', point: 'mira', size: 'L', price: 3190 },
  { id: 'M-H-08', product: 'h_tvoe', point: 'mira', size: 'M', price: 1229 },
  { id: 'M-H-09', product: 'h_tvoe', point: 'mira', size: 'L', price: 1229 },
  { id: 'M-H-10', product: 'h_naches', point: 'mira', size: 'M', price: 1908 },
  { id: 'M-H-11', product: 'h_champion', point: 'mira', size: 'L', price: 3490 },
  { id: 'M-H-12', product: 'h_hood_cap', point: 'mira', size: 'M', price: 1283 },
  { id: 'M-H-13', product: 'h_milk', point: 'mira', size: 'M', price: 2590 },
  { id: 'M-H-14', product: 'h_veneziani', point: 'mira', size: 'L', price: 2190 },

  // ПВЗ: Ярославская улица, 21А
  { id: 'Y-J-01', product: 'j_bigar', point: 'yara', size: 'L', price: 2863 },
  { id: 'Y-J-02', product: 'j_diagonal', point: 'yara', size: 'S', price: 3199 },
  { id: 'Y-J-03', product: 'j_justdenim', point: 'yara', size: 'M', price: 3490 },
  { id: 'Y-J-04', product: 'classic', point: 'yara', size: 'L', price: 2590 },
  { id: 'Y-J-05', product: 'washed', point: 'yara', size: 'S', price: 3190 },
  { id: 'Y-J-06', product: 'denim', point: 'yara', size: 'M', price: 2990 },
  { id: 'Y-H-07', product: 'h_tvoe', point: 'yara', size: 'S', price: 1229 },
  { id: 'Y-H-08', product: 'h_naches', point: 'yara', size: 'L', price: 1908 },
  { id: 'Y-H-09', product: 'h_champion', point: 'yara', size: 'M', price: 3490 },
  { id: 'Y-H-10', product: 'h_zip', point: 'yara', size: 'M', price: 2890 },
];

const app = document.querySelector('#app');
const queryInput = document.querySelector('#query');
const notice = document.querySelector('#notice');
const fxLayer = document.querySelector('#fxLayer');

const state = {
  mode: 'buyer',
  page: 'home',
  from: 'home',
  q: '',
  category: '',
  nearbyCategory: '',
  sort: 'relevance',
  only: false,
  verifiedOnly: false,
  priceMin: '',
  priceMax: '',
  point: 'mira',
  product: 'classic',
  size: 'M',
  offer: 'fast',
  unit: '',
  tab: 'fast',
  // Состояние кабинета Селлера
  sellerTab: 'promo',
  sellerSelectedProduct: 'h_tvoe',
  sellerCatFilter: 'all',
  sellerBalance: 5000,
  sellerSpent: 0,
  cpoEvents: [], // реальные списания CPO после заказов покупателя
  liveQuery: '',
  liveCategory: '',
  liveTierFilter: 'all',
  lastUpgraded: null,
  // Покупательские данные
  favorites: new Set(),
  cart: [],
  reserved: new Set(),
  completed: new Set(),
  order: [],
  orders: [],
};

const currency = new Intl.NumberFormat('ru-RU');
const rub = n => `${currency.format(Math.round(n))}\u2009₽`;
const clean = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const discountPct = p => p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
const productById = id => products.find(p => p.id === id);
const unitById = id => stock.find(x => x.id === id);
const isFree = x => !state.reserved.has(x.id) && !state.completed.has(x.id);
const unitsFor = (p, size = null) => stock.filter(x => x.product === p.id && x.point === state.point && (!size || x.size === size) && isFree(x));
const nearbyProducts = (cat = '') => rankProducts(
  products.filter(p => unitsFor(p).length > 0 && (!cat || p.category === cat)),
  '',
  'relevance'
).map(x => x.p);
const tierRank = tier => (PROMO_TIERS[tier]?.rank ?? 4);
const cpoFee = (p, tier = p.promoTier || 0) => Math.round(p.price * (PROMO_TIERS[tier]?.rate || 0));
const imgFor = p => imageUrls[p.imgKey || p.id] || imageUrls.classic;
const imgFallbackAttr = p => {
  const fb = fallbackImgByKey[p.imgKey || p.id];
  return fb ? `referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${fb}'"` : '';
};

const totalCartUnits = () => state.cart.reduce((s, item) => s + (item.qty || 1), 0);
const cartItemForProduct = (productId, size = null) =>
  state.cart.find(item => item.product === productId && (!size || item.size === size));

const offerTabs = [['fast', 'Быстрее доставка'], ['cheap', 'Ниже цена'], ['local', 'Уже в ПВЗ']];
const storageKey = 'ozon-mvp-v8-cpo';

function saveSession() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      mode: state.mode,
      cart: state.cart,
      order: state.order,
      orders: state.orders,
      favorites: [...state.favorites],
      reserved: [...state.reserved],
      completed: [...state.completed],
      point: state.point,
      sellerBalance: state.sellerBalance,
      sellerSpent: state.sellerSpent,
      cpoEvents: state.cpoEvents,
      sellerSelectedProduct: state.sellerSelectedProduct,
      products,
    }));
  } catch { /* ignore */ }
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (Array.isArray(saved.products) && saved.products.length) products = saved.products;
    if (saved.mode === 'buyer' || saved.mode === 'seller') state.mode = saved.mode;
    for (const k of ['cart', 'order', 'orders', 'cpoEvents']) if (Array.isArray(saved[k])) state[k] = saved[k];
    for (const k of ['favorites', 'reserved', 'completed']) if (Array.isArray(saved[k])) state[k] = new Set(saved[k]);
    if (points[saved.point]) state.point = saved.point;
    if (typeof saved.sellerBalance === 'number') state.sellerBalance = saved.sellerBalance;
    if (typeof saved.sellerSpent === 'number') state.sellerSpent = saved.sellerSpent;
    if (saved.sellerSelectedProduct && productById(saved.sellerSelectedProduct)) {
      state.sellerSelectedProduct = saved.sellerSelectedProduct;
    }
  } catch { /* fresh state */ }
}

/* =========================================================
   АЛГОРИТМ РАНЖИРОВАНИЯ:
   Релевантность -> 1 класс (12%) -> 2 класс (9%) -> 3 класс (6%) -> Органика (0%)
   ========================================================= */
function normalizeTerm(word) {
  const w = word.toLocaleLowerCase('ru').replace(/ё/g, 'е');
  const map = {
    толстовка: 'толстовк', толстовки: 'толстовк', толстовок: 'толстовк',
    джинсы: 'джинс', джинс: 'джинс',
    черные: 'черн', черный: 'черн', черная: 'черн',
    широкие: 'широк', широкая: 'широк',
    прямые: 'прям', прямой: 'прям',
    утепленные: 'утепл', утепленный: 'утепл',
    свободные: 'свободн', свободного: 'свободн',
    молочный: 'молочн', молочная: 'молочн',
    начесом: 'начес', начес: 'начес',
    флисом: 'флис', флис: 'флис',
  };
  return map[w] || w;
}

function relevanceScore(p, rawQuery) {
  const q = rawQuery.trim();
  if (!q) return 1;
  const norm = s => String(s || '').toLocaleLowerCase('ru').replace(/ё/g, 'е');
  const name = norm(p.name);
  const color = norm(p.color);
  const sku = norm(p.sku);
  const tags = (p.tags || []).map(norm).join(' ');
  const full = `${name} ${color} ${sku} ${tags}`;
  const terms = q.split(/\s+/).filter(Boolean).map(normalizeTerm);

  if (!terms.every(t => full.includes(t))) return 0;

  let score = 0;
  const qNorm = norm(q);
  if (sku === qNorm || name === qNorm) return 100;

  const words = name.split(/[^а-яa-z0-9]+/i).filter(Boolean);
  for (const t of terms) {
    if (words.some(w => w === t || w.startsWith(t))) score += 4;
    else if (name.includes(t)) score += 3;
    else if (color.includes(t)) score += 2;
    else if (tags.includes(t)) score += 1;
  }
  return Math.max(1, score);
}

function rankProducts(list, rawQuery = '', sortMode = 'relevance') {
  const scored = list
    .map(p => ({ p, rel: relevanceScore(p, rawQuery) }))
    .filter(item => !rawQuery.trim() || item.rel > 0);

  scored.sort((a, b) => {
    if (sortMode === 'cheap') return a.p.price - b.p.price || tierRank(a.p.promoTier) - tierRank(b.p.promoTier);
    if (sortMode === 'dear') return b.p.price - a.p.price || tierRank(a.p.promoTier) - tierRank(b.p.promoTier);
    if (sortMode === 'new') return b.p.recent - a.p.recent || tierRank(a.p.promoTier) - tierRank(b.p.promoTier);

    if (b.rel !== a.rel) return b.rel - a.rel;
    const tr = tierRank(a.p.promoTier) - tierRank(b.p.promoTier);
    if (tr !== 0) return tr;
    if (sortMode === 'popular') return b.p.reviews - a.p.reviews || b.p.rating - a.p.rating;
    return b.p.rating - a.p.rating || b.p.reviews - a.p.reviews;
  });

  return scored;
}

/* =========================================================
   МАРШРУТИЗАЦИЯ
   ========================================================= */
function routeURL(page, changes = {}) {
  const r = { ...state, ...changes };
  if (r.mode === 'seller') {
    const sp = new URLSearchParams();
    if (r.sellerTab && r.sellerTab !== 'promo') sp.set('tab', r.sellerTab);
    return '#/seller' + (sp.size ? '?' + sp : '');
  }
  const paths = {
    home: '/', catalog: '/search', nearby: '/nearby',
    favorites: '/favorites', orders: '/orders', cart: '/cart',
    checkout: '/checkout', result: '/orders/confirmation',
    bought: '/orders/completed', declined: '/orders/declined',
  };
  let path = paths[page] || '/';
  const params = new URLSearchParams();
  if (page === 'product' || page === 'offers') {
    path = '/product/' + encodeURIComponent(r.product);
    if (page === 'offers') path += '/offers';
    if (r.size) params.set('size', r.size);
    if (r.offer && r.offer !== 'fast') params.set('offer', r.offer);
    if (r.offer === 'local' && r.unit) params.set('unit', r.unit);
  }
  if (page === 'catalog') {
    if (r.q) params.set('text', r.q);
    if (r.category) params.set('category', r.category);
    if (r.sort && r.sort !== 'relevance') params.set('sort', r.sort);
    if (r.only) params.set('nearby', '1');
  }
  return '#' + path + (params.size ? '?' + params : '');
}

function readRoute() {
  const rawHash = location.hash.replace(/^#/, '') || '/';
  const [pathPart, searchPart] = rawHash.split('?');
  const path = pathPart.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(searchPart || '');

  if (path === '/seller') {
    state.mode = 'seller';
    const t = params.get('tab');
    state.sellerTab = ['promo', 'live', 'analytics', 'products'].includes(t) ? t : 'promo';
    return;
  }

  state.mode = 'buyer';
  const pages = {
    '/': 'home', '/search': 'catalog', '/nearby': 'nearby',
    '/favorites': 'favorites', '/orders': 'orders', '/cart': 'cart',
    '/checkout': 'checkout', '/orders/confirmation': 'result',
    '/orders/completed': 'bought', '/orders/declined': 'declined',
  };
  const productRoute = path.match(/^\/product\/([^/]+)(\/offers)?$/);
  state.page = pages[path] || 'home';
  if (state.page === 'catalog') {
    state.q = params.get('text') || '';
    state.category = categories[params.get('category')] ? params.get('category') : '';
    state.sort = ['relevance', 'popular', 'new', 'cheap', 'dear'].includes(params.get('sort')) ? params.get('sort') : 'relevance';
    state.only = params.get('nearby') === '1';
  }
  if (productRoute) {
    const p = productById(decodeURIComponent(productRoute[1]));
    if (p) {
      state.product = p.id;
      state.size = p.sizes.includes(params.get('size')) ? params.get('size') : p.sizes[0];
      state.offer = ['fast', 'cheap', 'local'].includes(params.get('offer')) ? params.get('offer') : 'fast';
      state.unit = params.get('unit') || '';
      state.page = productRoute[2] ? 'offers' : 'product';
    } else {
      state.page = 'catalog';
    }
  }
  if (state.page === 'checkout' && !state.cart.length) state.page = 'cart';
  if (['result', 'bought', 'declined'].includes(state.page) && !state.order.length) state.page = 'orders';
}

function go(page) {
  const prev = state.page;
  state.page = page;
  const targetHash = routeURL(page);
  if (location.hash !== targetHash) history.pushState(null, '', targetHash);
  render();
  if (page !== 'offers' && prev !== 'offers') scrollTo(0, 0);
}

addEventListener('hashchange', () => { readRoute(); render(); });

function say(message) {
  notice.textContent = message;
  notice.hidden = false;
  clearTimeout(say.timer);
  say.timer = setTimeout(() => { notice.hidden = true; }, 2600);
}

/* =========================================================
   ЭФФЕКТЫ ПОДКЛЮЧЕНИЯ CPO-СТАВКИ (SELLER)
   ========================================================= */
function triggerTierPurchaseFX(tier, product) {
  const info = PROMO_TIERS[tier];
  if (!info || tier === 0) return;
  const fee = cpoFee(product, tier);

  const palettes = {
    1: ['#f1117e', '#7c3aed', '#005bff', '#ffb800', '#ffffff'],
    2: ['#005bff', '#3b82f6', '#60a5fa', '#ffffff'],
    3: ['#00a6a6', '#10c44c', '#34d399', '#ffffff'],
  };
  const colors = palettes[tier] || palettes[2];
  const count = tier === 1 ? 52 : tier === 2 ? 26 : 14;

  const ring = document.createElement('div');
  ring.className = 'fx-ring';
  ring.style.setProperty('--ring-color', colors[0]);
  fxLayer.appendChild(ring);
  setTimeout(() => ring.remove(), 800);

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.42;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'fx-particle';
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const dist = (tier === 1 ? 250 : 160) + Math.random() * 190;
    el.style.left = `${cx}px`;
    el.style.top = `${cy}px`;
    el.style.background = colors[i % colors.length];
    el.style.width = `${6 + Math.random() * 7}px`;
    el.style.height = `${6 + Math.random() * 9}px`;
    el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * dist + 110}px`);
    el.style.setProperty('--rot', `${(Math.random() - 0.5) * 720}deg`);
    el.style.setProperty('--dur', `${0.85 + Math.random() * 0.65}s`);
    fxLayer.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }

  const banner = document.createElement('div');
  banner.className = `fx-banner t${tier}`;
  banner.innerHTML = `
    <span style="font-size:20px">${tier === 1 ? '👑' : tier === 2 ? '⚡' : '🚀'}</span>
    <div>
      <div>Активна ставка ${info.ratePct}% с заказа (${info.shortCode}) · 0 ₽ авансом</div>
      <div style="font-size:12px;font-weight:500;opacity:.92">${clean(product.name)} · ≈ ${rub(fee)} при продаже</div>
    </div>
  `;
  document.body.appendChild(banner);
  setTimeout(() => {
    banner.style.transition = 'opacity .3s, transform .3s';
    banner.style.opacity = '0';
    banner.style.transform = 'translate(-50%, -14px)';
    setTimeout(() => banner.remove(), 320);
  }, 2600);
}

/* =========================================================
   ИКОНКИ И КАРТОЧКИ
   ========================================================= */
const svgHeart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
const svgCheck = '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 2c3.723 0 6 2.277 6 6s-2.277 6-6 6-6-2.277-6-6 2.277-6 6-6m2.707 4.293a1 1 0 0 0-1.414 0L7.5 8.086l-.793-.793a1 1 0 1 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.414 0l2.5-2.5a1 1 0 0 0 0-1.414"/></svg>';
const svgCrownSmall = '<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 8c-1.11 0-1 3.563-1 6.375C3 18.125 4.501 20 12.001 20s9-1.875 9-5.625C21 11.563 21.11 8 20 8c-1 0-1.824 2.425-2.57 3.39-.43.556-.622.641-.961-.171C15.8 9.619 14 5 12 5s-3.8 4.619-4.469 6.219c-.34.812-.531.726-.96.172C5.824 10.425 5 8 4 8"/></svg>';
const svgBag = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M10.19 1.393a.834.834 0 0 1 1.084.465L12.73 5.5h.842c.896 0 1.345 0 1.594.288s.185.732.056 1.619l-.227 1.553c-.396 2.721-.593 4.082-1.532 4.895s-2.315.812-5.065.812H7.6c-2.75 0-4.126 0-5.065-.812S1.4 11.68 1.003 8.96L.777 7.407C.648 6.52.584 6.077.833 5.788c.25-.288.698-.288 1.594-.288h.842l1.457-3.642a.834.834 0 0 1 1.547.618L5.063 5.5h5.873l-1.21-3.024a.834.834 0 0 1 .464-1.083"/></svg>';

function buyerCard(p, forceLocal = false) {
  const found = unitsFor(p);
  const liked = state.favorites.has(p.id);
  const isLocal = found.length > 0;
  const unit = (forceLocal || state.page === 'nearby' || state.only || isLocal) ? found[0] : null;
  const size = found[0]?.size || (p.sizes.includes('M') ? 'M' : p.sizes[0]);
  const offer = unit ? 'local' : 'fast';
  const href = routeURL('product', { product: p.id, size, offer, unit: unit?.id || '' });
  const target = `href="${href}" data-action="product" data-id="${p.id}" data-size="${size}" data-offer="${offer}" data-unit="${unit?.id || ''}"`;
  const pct = discountPct(p);
  const inCart = cartItemForProduct(p.id);
  const isPremiumCrown = (p.promoTier || 0) === 1;
  const availSizes = [...new Set(found.map(u => u.size))].join(', ');

  return `<article class="oz-card">
    <div class="oz-card-visual">
      <a ${target} aria-label="Открыть ${clean(p.name)}">
        <img src="${imgFor(p)}" ${imgFallbackAttr(p)} alt="${clean(p.name)}" loading="lazy">
      </a>
      <button type="button" class="oz-fav-btn" data-action="favorite" data-id="${p.id}" aria-pressed="${liked}" aria-label="В избранное">${svgHeart}</button>
      <div class="oz-card-badges-bottom">
        ${isLocal ? `<span class="oz-pill local">В ПВЗ сегодня${availSizes ? ` · ${availSizes}` : ''}</span>` : pct >= 60 ? '<span class="oz-pill wow">✦ Вау-цены</span>' : ''}
      </div>
    </div>
    <div class="oz-card-body">
      <div class="oz-price-row">
        <span class="oz-price ${pct ? '' : 'regular'}">${rub(p.price)}</span>
        ${pct ? `<span class="oz-old-price">${rub(p.oldPrice)}</span><span class="oz-discount">−${pct}%</span>` : ''}
      </div>
      ${p.left && p.left <= 15 ? `<div class="oz-stock-left">${p.left} ед. осталось</div>` : ''}
      ${p.verified ? `<div class="oz-verified">${svgCheck}<span>Бренд проверен</span></div>` : ''}
      <a class="oz-card-title" ${target}>${clean(p.name)}</a>
      <div class="oz-rating-row">
        <span class="oz-rating-star">★ <b>${p.rating.toLocaleString('ru-RU')}</b></span>
        <span>•</span>
        <span>${currency.format(p.reviews)} отзывов</span>
      </div>
      <div class="oz-card-cta-wrap">
        ${inCart ? `
          <div class="oz-incart-row">
            <button type="button" class="oz-incart-go" data-action="cart">В корзине</button>
            <div class="oz-qty-stepper">
              <button type="button" class="oz-qty-btn" data-action="qtyDelta" data-id="${inCart.key}" data-delta="-1" aria-label="Уменьшить">−</button>
              <span class="oz-qty-val">${inCart.qty || 1}</span>
              <button type="button" class="oz-qty-btn" data-action="qtyDelta" data-id="${inCart.key}" data-delta="1" aria-label="Увеличить">+</button>
            </div>
          </div>
        ` : `
          <button type="button" class="oz-card-cta ${isLocal ? 'is-nearby-cta' : ''}" data-action="quickAdd" data-id="${p.id}" data-size="${size}">
            ${svgBag}
            <span>${isLocal ? 'Сегодня в ПВЗ' : 'Завтра'}</span>
          </button>
        `}
        ${isPremiumCrown ? `<div class="oz-corner-crown" title="Премиум-продавец"><span>${svgCrownSmall}</span></div>` : ''}
      </div>
    </div>
  </article>`;
}

function inspectorCard(p, position, relScore) {
  const tier = p.promoTier || 0;
  const tierMeta = PROMO_TIERS[tier];
  const pct = discountPct(p);
  const nextTier = tier === 1 ? 0 : tier === 2 ? 1 : tier === 3 ? 2 : 3;
  const nextMeta = PROMO_TIERS[nextTier];
  const nextFee = cpoFee(p, nextTier);

  return `<article class="oz-card ${tier ? 'inspector-tier-' + tier : ''}">
    <div class="oz-card-visual">
      <img src="${imgFor(p)}" ${imgFallbackAttr(p)} alt="${clean(p.name)}" loading="lazy">
      <div class="oz-card-badges-top">
        <span class="oz-pill pos">#${position} в выдаче</span>
        <span class="oz-pill ${tierMeta.colorClass}">${tier === 1 ? '👑 ' : tier === 2 ? '⚡ ' : ''}${tierMeta.badge}</span>
      </div>
      <div class="oz-card-badges-bottom">
        <span class="oz-pill" style="background:rgba(255,255,255,0.92);color:#001a34">${categories[p.category]}</span>
      </div>
    </div>
    <div class="oz-card-body">
      <div class="oz-price-row">
        <span class="oz-price ${pct ? '' : 'regular'}">${rub(p.price)}</span>
        ${pct ? `<span class="oz-discount">−${pct}%</span>` : ''}
      </div>
      <div class="oz-card-title" style="font-weight:600">${clean(p.name)}</div>
      <div class="inspector-meta-strip">
        <span>Релев.: <strong>${relScore}</strong></span>
        <span>CPO: <strong>${tier ? `${rub(cpoFee(p))}/зак.` : '0 ₽'}</strong></span>
      </div>
      <div class="oz-card-cta-wrap" style="display:flex;gap:6px">
        ${tier !== 1 ? `
          <button type="button" class="oz-card-cta" style="height:36px;font-size:12px" data-action="buyTier" data-id="${p.id}" data-tier="${nextTier}">
            ↑ ${nextMeta.ratePct}% (${rub(nextFee)}/зак.)
          </button>
        ` : `
          <button type="button" class="oz-card-cta" style="height:36px;font-size:12px;background:var(--tier1-grad)" data-action="buyTier" data-id="${p.id}" data-tier="0">
            👑 12% Максимум · Снять
          </button>
        `}
      </div>
    </div>
  </article>`;
}

/* =========================================================
   СТРАНИЦЫ ПОКУПАТЕЛЯ
   ========================================================= */
function storefront() {
  const ranked = rankProducts(products, '', 'relevance').map(x => x.p);
  const localItems = nearbyProducts('');
  const jeansCount = products.filter(p => p.category === 'jeans').length;
  const hoodiesCount = products.filter(p => p.category === 'hoodies').length;

  return `
    <section class="oz-hero">
      <div>
        <span class="oz-hero-tag">✦ Новая коллекция · Деним и трикотаж</span>
        <h1>Джинсы и толстовки<br>на каждый день.</h1>
        <p>Доставка завтра или примерка сегодня в ближайшем ПВЗ. Добавляйте в корзину в один клик или оформляйте сразу.</p>
        <div class="oz-hero-actions">
          <a href="#/nearby" class="oz-hero-btn" data-action="nearby">Товары рядом сегодня (${localItems.length})</a>
          <a href="#/search?category=jeans" class="oz-hero-btn-alt" data-action="category" data-id="jeans">Джинсы (${jeansCount})</a>
          <a href="#/search?category=hoodies" class="oz-hero-btn-alt" data-action="category" data-id="hoodies">Толстовки и худи (${hoodiesCount})</a>
        </div>
      </div>
      <div class="oz-hero-photos">
        <img src="${imageUrls.j_bigar}" ${imgFallbackAttr({ id: 'j_bigar' })} alt="Джинсы">
        <img src="${imageUrls.h_tvoe}" ${imgFallbackAttr({ id: 'h_tvoe' })} alt="Худи ТВОЕ">
        <img src="${imageUrls.h_naches}" ${imgFallbackAttr({ id: 'h_naches' })} alt="Худи с начёсом">
      </div>
    </section>

    <section class="oz-cat-cards">
      <a href="#/nearby" class="oz-cat-banner is-nearby-banner" data-action="nearby">
        <div>
          <strong>Товары рядом · ${localItems.length} шт.</strong>
          <span>Уже на ${points[state.point]} — примерка сегодня</span>
        </div>
        <span class="oz-cat-emoji">📍</span>
      </a>
      <a href="#/search?category=jeans" class="oz-cat-banner" data-action="category" data-id="jeans">
        <div><strong>Джинсы</strong><span>${jeansCount} моделей · бананы, багги, прямые, зимние</span></div>
        <span class="oz-cat-emoji">👖</span>
      </a>
      <a href="#/search?category=hoodies" class="oz-cat-banner" data-action="category" data-id="hoodies">
        <div><strong>Толстовки и худи</strong><span>${hoodiesCount} моделей · базовые, с начёсом, оверсайз</span></div>
        <span class="oz-cat-emoji">🧥</span>
      </a>
    </section>

    <section class="oz-nearby-shelf">
      <div class="oz-nearby-shelf-head">
        <div class="oz-nearby-title-wrap">
          <h2>Уже в вашем ПВЗ</h2>
          <span class="oz-nearby-chip"><span class="nearby-live-dot"></span>Забрать и примерить сегодня</span>
        </div>
        <div class="oz-nearby-controls">
          <select id="point" class="oz-nearby-point-select" aria-label="Выбрать ПВЗ">
            ${Object.entries(points).map(([k, v]) => `<option value="${k}" ${state.point === k ? 'selected' : ''}>ПВЗ: ${v}</option>`).join('')}
          </select>
          <a href="#/nearby" class="linkbtn" data-action="nearby">Все товары рядом (${localItems.length}) →</a>
        </div>
      </div>
      <div class="grid home-grid">
        ${localItems.slice(0, 5).map(p => buyerCard(p, true)).join('')}
      </div>
    </section>

    <div class="section-head">
      <h2>Рекомендуем для вас</h2>
      <a href="#/search" class="linkbtn" data-action="category" data-id="">Смотреть весь каталог (${products.length}) →</a>
    </div>
    <section class="grid home-grid">${ranked.map(p => buyerCard(p)).join('')}</section>
  `;
}

function catalog() {
  const minP = state.priceMin !== '' ? Number(state.priceMin) : null;
  const maxP = state.priceMax !== '' ? Number(state.priceMax) : null;

  const filtered = products.filter(p => {
    if (state.category && p.category !== state.category) return false;
    if (state.only && !unitsFor(p).length) return false;
    if (state.verifiedOnly && !p.verified) return false;
    if (minP !== null && !Number.isNaN(minP) && p.price < minP) return false;
    if (maxP !== null && !Number.isNaN(maxP) && p.price > maxP) return false;
    return true;
  });

  const ranked = rankProducts(filtered, state.q, state.sort);

  return `
    <div class="oz-breadcrumbs">
      <a href="#/" class="linkbtn" data-action="home">Главная</a>
      <span>•</span>
      <span>${state.category ? categories[state.category] : 'Все категории'}</span>
      ${state.q ? `<span>•</span><strong>${clean(state.q)}</strong>` : ''}
    </div>

    <div class="result-layout">
      <aside class="oz-sidebar">
        <div class="oz-filter-group">
          <h3>Категория</h3>
          <div class="oz-cat-list">
            <a href="#/search" class="oz-cat-link ${!state.category ? 'is-active' : ''}" data-action="category" data-id="">Все товары (${products.length})</a>
            <a href="#/search?category=jeans" class="oz-cat-link ${state.category === 'jeans' ? 'is-active' : ''}" data-action="category" data-id="jeans">Джинсы (${products.filter(p => p.category === 'jeans').length})</a>
            <a href="#/search?category=hoodies" class="oz-cat-link ${state.category === 'hoodies' ? 'is-active' : ''}" data-action="category" data-id="hoodies">Толстовки и худи (${products.filter(p => p.category === 'hoodies').length})</a>
          </div>
        </div>

        <div class="oz-filter-group">
          <h3>Товары рядом</h3>
          <label class="oz-switch-row">
            <span>Уже в ПВЗ<small>Забрать сегодня</small></span>
            <input id="only" type="checkbox" ${state.only ? 'checked' : ''}>
          </label>
        </div>

        <div class="oz-filter-group">
          <h3>Пункт выдачи</h3>
          <select id="point" class="oz-select">
            ${Object.entries(points).map(([k, v]) => `<option value="${k}" ${state.point === k ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
        </div>

        <div class="oz-filter-group">
          <h3>Цена, ₽</h3>
          <div class="oz-range-inputs">
            <input id="priceMin" class="oz-input" type="number" min="0" placeholder="от" value="${clean(state.priceMin)}">
            <input id="priceMax" class="oz-input" type="number" min="0" placeholder="до" value="${clean(state.priceMax)}">
          </div>
        </div>

        <div class="oz-filter-group">
          <label class="oz-switch-row">
            <span>Бренд проверен<small>Оригинальный товар</small></span>
            <input id="verifiedOnly" type="checkbox" ${state.verifiedOnly ? 'checked' : ''}>
          </label>
        </div>

        <button type="button" class="btn subtle" data-action="resetFilter">Сбросить фильтры</button>
      </aside>

      <section>
        <div class="oz-sort-bar">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
            <select id="sort" class="oz-sort-select" aria-label="Сортировка">
              ${[
                ['relevance', 'Популярные'],
                ['cheap', 'Сначала дешёвые'],
                ['dear', 'Сначала дорогие'],
                ['new', 'Новинки'],
              ].map(([k, v]) => `<option value="${k}" ${state.sort === k ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
            <span class="muted small">Найдено товаров: <strong>${ranked.length}</strong></span>
          </div>
        </div>

        ${ranked.length
          ? `<div class="grid">${ranked.map(({ p }) => buyerCard(p)).join('')}</div>`
          : `<div class="empty-box"><h3>Ничего не нашлось</h3><p class="muted">Попробуйте изменить запрос или сбросить фильтры.</p><button type="button" class="btn primary" data-action="resetFilter">Сбросить фильтры</button></div>`}
      </section>
    </div>
  `;
}

function nearby() {
  const allLocal = nearbyProducts('');
  const jeansLocal = nearbyProducts('jeans');
  const hoodiesLocal = nearbyProducts('hoodies');
  const items = state.nearbyCategory ? nearbyProducts(state.nearbyCategory) : allLocal;

  return `
    <div class="oz-breadcrumbs">
      <a href="#/" class="linkbtn" data-action="home">Главная</a>
      <span>•</span>
      <strong>Товары рядом</strong>
    </div>

    <section class="nearby-hero-strip">
      <div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
          <h1 style="margin:0">Товары рядом</h1>
          <span class="oz-nearby-chip"><span class="nearby-live-dot"></span>${allLocal.length} моделей в наличии сегодня</span>
        </div>
        <p class="muted" style="margin:0">Эти джинсы и толстовки уже находятся в выбранном ПВЗ — можно прийти, примерить и выкупить без ожидания доставки.</p>
      </div>
      <div style="min-width:260px">
        <select id="point" class="oz-nearby-point-select" style="width:100%;height:42px">
          ${Object.entries(points).map(([k, v]) => `<option value="${k}" ${state.point === k ? 'selected' : ''}>ПВЗ: ${v}</option>`).join('')}
        </select>
      </div>
    </section>

    <div class="nearby-filter-row">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="offer-tab" data-action="nearbyCategory" data-id="" aria-pressed="${state.nearbyCategory === ''}">Все (${allLocal.length})</button>
        <button type="button" class="offer-tab" data-action="nearbyCategory" data-id="jeans" aria-pressed="${state.nearbyCategory === 'jeans'}">👖 Джинсы (${jeansLocal.length})</button>
        <button type="button" class="offer-tab" data-action="nearbyCategory" data-id="hoodies" aria-pressed="${state.nearbyCategory === 'hoodies'}">🧥 Толстовки и худи (${hoodiesLocal.length})</button>
      </div>
      <span class="muted small">Оплата после примерки в ПВЗ</span>
    </div>

    ${items.length
      ? `<section class="grid home-grid">${items.map(p => buyerCard(p, true)).join('')}</section>`
      : `<div class="empty-box">В этом ПВЗ пока нет свободных товаров выбранной категории. Выберите другой пункт выдачи.</div>`}
  `;
}

function selectedProductOffer(p) {
  const local = unitsFor(p, state.size);
  const unit = local.find(item => item.id === state.unit) || local[0];
  if (state.offer === 'local' && unit) {
    return { kind: 'local', unit, price: unit.price, seller: p.seller, delivery: 'Забрать сегодня', note: 'Уже в выбранном пункте выдачи' };
  }
  if (state.offer === 'cheap') {
    return { kind: 'cheap', price: p.cheap, seller: 'Мир одежды', delivery: 'Доставим через 3 дня', note: 'Со склада в пункт выдачи' };
  }
  return { kind: 'fast', price: p.price, seller: p.seller, delivery: 'Доставим завтра', note: 'Со склада Ozon в пункт выдачи' };
}

function getProductOffers(p) {
  const nearbyUnits = stock.filter(u => u.point === state.point && isFree(u) && productById(u.product)?.category === p.category);
  const local = nearbyUnits.map(u => ({
    key: u.id, product: u.product, size: u.size, kind: 'local', unit: u.id,
    price: u.price, seller: productById(u.product).seller, point: u.point,
    delivery: 'Забрать сегодня', slot: 'Уже в выбранном ПВЗ', speed: 0,
  }));
  const warehouse = (item, kind) => ({
    key: `${item.id}-${state.size}-${state.point}-${kind}`, product: item.id, size: state.size,
    kind, unit: '', price: kind === 'cheap' ? item.cheap : item.price,
    seller: kind === 'cheap' ? 'Мир одежды' : item.seller, point: state.point,
    delivery: kind === 'cheap' ? 'Через 3 дня' : 'Завтра',
    slot: kind === 'cheap' ? 'Доставка через 3 дня' : 'Доставка завтра', speed: kind === 'cheap' ? 2 : 1,
  });
  const similar = rankProducts(
    products.filter(item => item.id !== p.id && item.category === p.category && item.sizes.includes(state.size)),
    '', 'relevance'
  ).slice(0, 3).map(x => x.p);
  return [...local, warehouse(p, 'fast'), warehouse(p, 'cheap'), ...similar.map(item => warehouse(item, 'fast'))];
}

function visibleProductOffers(p) {
  const pool = getProductOffers(p);
  const matchRank = item => item.product === p.id && item.size === state.size ? 0 : item.size === state.size ? 1 : 2;
  if (state.tab === 'local') return pool.filter(i => i.kind === 'local').sort((a, b) => matchRank(a) - matchRank(b) || a.price - b.price);
  if (state.tab === 'cheap') return pool.sort((a, b) => a.price - b.price || a.speed - b.speed);
  return pool.sort((a, b) => a.speed - b.speed || tierRank(productById(a.product).promoTier) - tierRank(productById(b.product).promoTier) || matchRank(a) - matchRank(b));
}

function offerMiniCard(item) {
  const p = productById(item.product);
  const href = routeURL('product', { product: item.product, size: item.size, offer: item.kind, unit: item.unit });
  return `<article class="offer-mini-card">
    <a href="${href}" data-action="product" data-id="${p.id}" data-offer="${item.kind}" data-unit="${item.unit}" data-size="${item.size}">
      <img src="${imgFor(p)}" ${imgFallbackAttr(p)} alt="${clean(p.name)}">
      <strong>${rub(item.price)}</strong>
      <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${clean(p.name)}</div>
      <div class="muted">${item.delivery} · ${item.size}</div>
    </a>
    <button type="button" class="btn primary" style="padding:7px 10px;font-size:12.5px" data-action="addOffer" data-id="${item.key}">В корзину</button>
  </article>`;
}

function productPage() {
  const p = productById(state.product);
  const offer = selectedProductOffer(p);
  const liked = state.favorites.has(p.id);
  const pct = discountPct(p);
  const ozonCardPrice = Math.round(offer.price * 0.92);
  const offersList = visibleProductOffers(p);
  const inCart = cartItemForProduct(p.id, state.size);

  return `
    <div class="pdp-top">
      <div class="oz-breadcrumbs" style="margin:0">
        <a href="#/search" class="linkbtn" data-action="backListing">← Назад</a>
        <span>•</span>
        <a href="#/search?category=${p.category}" class="linkbtn" data-action="category" data-id="${p.category}">${categories[p.category]}</a>
        <span>•</span>
        <span>${clean(p.seller)}</span>
      </div>
      <div class="muted small">Артикул: <strong>${p.sku}</strong></div>
    </div>

    <section class="pdp-layout">
      <div class="pdp-gallery">
        <div class="pdp-gallery-main">
          <img src="${imgFor(p)}" ${imgFallbackAttr(p)} alt="${clean(p.name)}">
        </div>
        <div class="pdp-labels">
          <span class="pdp-label">Примерка и оплата при получении</span>
          ${p.verified ? `<span class="pdp-label is-green">${svgCheck} Бренд проверен</span>` : ''}
          ${offer.kind === 'local' ? '<span class="pdp-label is-green">📍 Уже в ПВЗ сегодня</span>' : ''}
        </div>
      </div>

      <div class="pdp-info">
        <h1>${clean(p.name)}</h1>
        <div class="pdp-meta">
          <span class="oz-rating-star">★ <b>${p.rating.toLocaleString('ru-RU')}</b></span>
          <span>${currency.format(p.reviews)} отзывов</span>
          <span>•</span>
          <span>Цвет: ${clean(p.color)}</span>
        </div>

        <div class="pdp-section-title">Размер</div>
        <div class="sizes">
          ${p.sizes.map(sz => {
            const hasLocal = unitsFor(p, sz).length > 0;
            return `<button type="button" class="size-btn" data-action="size" data-id="${sz}" aria-pressed="${state.size === sz}" title="${hasLocal ? 'Есть в ПВЗ сегодня' : ''}">${sz}${hasLocal ? ' •' : ''}</button>`;
          }).join('')}
        </div>
        ${unitsFor(p).length ? '<div class="small" style="color:#0b8a36;margin-top:6px">• Размеры с точкой уже лежат в выбранном ПВЗ</div>' : ''}

        <div class="pdp-section-title">Характеристики</div>
        <dl class="pdp-specs">
          <div><dt>Категория</dt><dd>${categories[p.category]}</dd></div>
          <div><dt>Цвет</dt><dd>${clean(p.color)}</dd></div>
          <div><dt>Выбранный размер</dt><dd>${state.size}</dd></div>
          <div><dt>Состав</dt><dd>${p.category === 'hoodies' ? 'Хлопок 80%, полиэстер 20%' : 'Хлопок 98%, эластан 2%'}</dd></div>
          <div><dt>Продавец</dt><dd>${clean(p.seller)}</dd></div>
        </dl>
      </div>

      <aside class="pdp-side">
        <div class="oz-sale-card">
          <div class="oz-bank-price-box">
            <div>
              <div class="oz-bank-price">${rub(ozonCardPrice)}</div>
              <div class="oz-bank-caption">С Ozon Картой</div>
            </div>
            ${pct ? `<span class="oz-pill" style="background:var(--oz-magenta);color:#fff">−${pct}%</span>` : ''}
          </div>
          <div class="oz-regular-price-row">
            <strong>${rub(offer.price)}</strong>
            ${pct ? `<span class="oz-old-price">${rub(p.oldPrice)}</span>` : ''}
            <span class="muted small">без карты</span>
          </div>

          <div class="pdp-cart-stack">
            <div class="pdp-buy-row">
              ${inCart ? `
                <div class="pdp-incart-box">
                  <button type="button" class="pdp-incart-link" data-action="cart">
                    <span>В корзине</span>
                    <small>Перейти</small>
                  </button>
                  <div class="pdp-qty-stepper">
                    <button type="button" class="oz-qty-btn" data-action="qtyDelta" data-id="${inCart.key}" data-delta="-1" aria-label="Уменьшить">−</button>
                    <span class="oz-qty-val">${inCart.qty || 1}</span>
                    <button type="button" class="oz-qty-btn" data-action="qtyDelta" data-id="${inCart.key}" data-delta="1" aria-label="Увеличить">+</button>
                  </div>
                </div>
              ` : offer.kind === 'local' ? `
                <button type="button" class="pdp-buy-btn" style="background:#0ea64b" data-action="addLocal" data-id="${offer.unit.id}">
                  <span>Добавить в корзину</span>
                  <small>${offer.delivery}</small>
                </button>
              ` : `
                <button type="button" class="pdp-buy-btn" data-action="addRemote" data-id="${offer.kind}">
                  <span>Добавить в корзину</span>
                  <small>${offer.delivery}</small>
                </button>
              `}
              <button type="button" class="pdp-fav-square" data-action="favorite" data-id="${p.id}" aria-pressed="${liked}" aria-label="В избранное">${svgHeart}</button>
            </div>
            <button type="button" class="pdp-buy-now-btn" data-action="buyNow" data-id="${p.id}">
              Купить сейчас · ${rub(offer.price)}
            </button>
          </div>

          <div class="muted small">${offer.note} · ${points[state.point]}</div>
        </div>

        <div class="block" style="padding:16px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong>Другие предложения</strong>
            <button type="button" class="linkbtn small" data-action="offers">Все (${offersList.length}) ›</button>
          </div>
          <div class="offer-tabs">
            ${offerTabs.map(([k, l]) => `<button type="button" class="offer-tab" data-action="tab" data-id="${k}" aria-pressed="${state.tab === k}">${l}</button>`).join('')}
          </div>
          <div class="offer-preview-grid">
            ${offersList.slice(0, 2).map(offerMiniCard).join('') || '<p class="muted small">В этом ПВЗ пока нет вариантов.</p>'}
          </div>
        </div>

        <div class="oz-seller-mini">
          <div style="display:flex;align-items:center;gap:12px">
            <div class="oz-seller-avatar">${clean(p.seller[0] || 'D')}</div>
            <div>
              <div style="display:flex;align-items:center;gap:6px;font-weight:700">
                <span>${clean(p.seller)}</span>
                ${p.promoTier === 1 ? `<span style="color:var(--oz-marketing)" title="Премиум-продавец">${svgCrownSmall}</span>` : ''}
              </div>
              <div class="muted small">★ ${p.rating} · 15 дней на возврат</div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  `;
}

function offersModal() {
  const p = productById(state.product);
  const items = visibleProductOffers(p);
  return `
    <div>${productPage()}</div>
    <div class="shade" data-action="dismiss">
      <section class="dialog" role="dialog" aria-modal="true">
        <div class="dialog-top">
          <h2>Другие предложения</h2>
          <button type="button" class="close-btn" data-action="backProduct" aria-label="Закрыть">×</button>
        </div>
        <div class="offer-tabs">
          ${offerTabs.map(([k, l]) => `<button type="button" class="offer-tab" data-action="tab" data-id="${k}" aria-pressed="${state.tab === k}">${l}</button>`).join('')}
        </div>
        <div style="margin:12px 0">
          <select id="point" class="oz-select">
            ${Object.entries(points).map(([k, v]) => `<option value="${k}" ${state.point === k ? 'selected' : ''}>ПВЗ: ${v}</option>`).join('')}
          </select>
        </div>
        <div class="grid" style="grid-template-columns:repeat(3,minmax(0,1fr))">
          ${items.map(offerMiniCard).join('') || '<p class="muted">Нет предложений в этом ПВЗ.</p>'}
        </div>
      </section>
    </div>
  `;
}

/* =========================================================
   РЕЖИМ ПРОДАВЦА (OZON SELLER — МОДЕЛЬ CPO 6% / 9% / 12%)
   ========================================================= */
function simulatePosition(targetId, hypotheticalTier, categoryScope = '') {
  const copy = products
    .filter(p => !categoryScope || p.category === categoryScope)
    .map(p => (p.id === targetId ? { ...p, promoTier: hypotheticalTier } : p));
  const ranked = rankProducts(copy, '', 'relevance');
  const idx = ranked.findIndex(x => x.p.id === targetId);
  return idx >= 0 ? idx + 1 : copy.length;
}

function productEconomics(p) {
  const tier = p.promoTier || 0;
  const meta = PROMO_TIERS[tier];
  const baseViews = 420 + Math.round((p.rating - 4.5) * 300) + Math.min(350, Math.round(p.reviews / 12));
  const views = Math.round(baseViews * meta.viewsMult);
  const clicks = Math.round(views * meta.ctr);
  const orders = Math.max(1, Math.round(clicks * meta.cr));
  const revenue = orders * p.price;
  const feePerOrder = cpoFee(p, tier);
  const cost = orders * feePerOrder;
  const drr = meta.ratePct;
  return { views, clicks, orders, revenue, feePerOrder, cost, drr };
}

function sellerPromoView() {
  const selectedProd = productById(state.sellerSelectedProduct) || products[0];
  const curCatPos = simulatePosition(selectedProd.id, selectedProd.promoTier || 0, selectedProd.category);
  const curAllPos = simulatePosition(selectedProd.id, selectedProd.promoTier || 0, '');
  const curTier = selectedProd.promoTier || 0;

  const visibleRows = products.filter(p => state.sellerCatFilter === 'all' || p.category === state.sellerCatFilter);
  const allRankMap = new Map(rankProducts(products, '', 'relevance').map((x, i) => [x.p.id, i + 1]));

  return `
    <section class="target-picker-card">
      <img class="target-picker-thumb" src="${imgFor(selectedProd)}" ${imgFallbackAttr(selectedProd)} alt="">
      <div>
        <span class="target-picker-step">Модель CPO · Оплата % только за заказ</span>
        <div style="font-size:19px;font-weight:800;line-height:1.25">${clean(selectedProd.name)}</div>
        <div class="target-picker-meta">
          <span class="oz-pill ${PROMO_TIERS[curTier].colorClass}">${PROMO_TIERS[curTier].code}</span>
          <span>Цена: <strong>${rub(selectedProd.price)}</strong></span>
          <span>•</span>
          <span>Комиссия за 1 заказ: <strong>${curTier ? rub(cpoFee(selectedProd)) : '0 ₽'}</strong></span>
          <span>•</span>
          <span>Место в категории: <strong>#${curCatPos}</strong> (в общем: #${curAllPos})</span>
        </div>
      </div>
      <div class="target-select-wrap">
        <label class="target-select-label" for="sellerTargetProduct">Выберите товар — ставки ниже автоматически пересчитаются в рублях:</label>
        <div class="target-select-box">
          <select id="sellerTargetProduct" class="target-select-fancy">
            <optgroup label="👖 Джинсы">
              ${products.filter(p => p.category === 'jeans').map(p => `<option value="${p.id}" ${p.id === selectedProd.id ? 'selected' : ''}>${clean(p.name)} (${rub(p.price)}) — ${PROMO_TIERS[p.promoTier || 0].ratePct}%</option>`).join('')}
            </optgroup>
            <optgroup label="🧥 Толстовки и худи">
              ${products.filter(p => p.category === 'hoodies').map(p => `<option value="${p.id}" ${p.id === selectedProd.id ? 'selected' : ''}>${clean(p.name)} (${rub(p.price)}) — ${PROMO_TIERS[p.promoTier || 0].ratePct}%</option>`).join('')}
            </optgroup>
          </select>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px;gap:8px;flex-wrap:wrap">
          <button type="button" class="linkbtn small" data-action="simOrder" data-id="${selectedProd.id}">🧪 Тест: симулировать 1 заказ</button>
          <button type="button" class="linkbtn small" data-action="openLiveFor" data-id="${selectedProd.category}">Проверить в живой выдаче →</button>
        </div>
      </div>
    </section>

    <div class="tiers-grid">
      ${[3, 2, 1].map(t => {
        const meta = PROMO_TIERS[t];
        const isCurrent = curTier === t;
        const projPos = simulatePosition(selectedProd.id, t, selectedProd.category);
        const fee = cpoFee(selectedProd, t);
        return `<article class="tier-card level-${t}">
          <div class="tier-head">
            <span class="tier-level-tag">${t === 1 ? '👑 ' : t === 2 ? '⚡ ' : '🚀 '}${meta.shortCode}</span>
            <span class="tier-stars">${meta.stars}</span>
          </div>
          <div>
            <h3>${meta.name}</h3>
            <p class="muted small" style="margin:4px 0 0">${meta.subtitle}</p>
          </div>
          <div>
            <div class="tier-price">${meta.ratePct}% <small>с цены заказа</small></div>
            <div class="small" style="color:var(--oz-blue);font-weight:700;margin-top:3px">≈ ${rub(fee)} за 1 продажу этого товара · 0 ₽ авансом</div>
          </div>
          <div class="tier-forecast-pill">
            <span>Прогноз в «${categories[selectedProd.category]}»:</span>
            <strong>#${curCatPos} → #${projPos}</strong>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--oz-text-secondary);margin-bottom:5px">
              <span>Сила буста</span><strong>${meta.boostLabel}</strong>
            </div>
            <div class="tier-bar"><div class="tier-bar-fill"></div></div>
          </div>
          <ul class="tier-perks">
            ${meta.perks.map(pk => `<li><span>${pk}</span></li>`).join('')}
          </ul>
          <div class="tier-card-footer">
            <button type="button" class="tier-buy-btn" data-action="buyTier" data-id="${selectedProd.id}" data-tier="${t}" ${isCurrent ? 'disabled style="opacity:.65;cursor:default"' : ''}>
              ${isCurrent ? `✓ Активна ставка ${meta.ratePct}%` : `Подключить ${meta.ratePct}% (${rub(fee)}/заказ)`}
            </button>
          </div>
        </article>`;
      }).join('')}
    </div>

    <div class="seller-table-wrap">
      <div class="section-head" style="margin-top:0">
        <div>
          <h2 style="font-size:18px">Управление ставками CPO по всем товарам (${visibleRows.length})</h2>
          <p class="muted small" style="margin:2px 0 0">Подключение бесплатно — процент списывается только при реальном заказе покупателя</p>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button type="button" class="offer-tab" data-action="sellerCatFilter" data-id="all" aria-pressed="${state.sellerCatFilter === 'all'}">Все (${products.length})</button>
          <button type="button" class="offer-tab" data-action="sellerCatFilter" data-id="jeans" aria-pressed="${state.sellerCatFilter === 'jeans'}">👖 Джинсы</button>
          <button type="button" class="offer-tab" data-action="sellerCatFilter" data-id="hoodies" aria-pressed="${state.sellerCatFilter === 'hoodies'}">🧥 Толстовки</button>
        </div>
      </div>
      ${visibleRows.map(p => {
        const tier = p.promoTier || 0;
        const pos = allRankMap.get(p.id);
        const fee = cpoFee(p, tier);
        const fxClass = state.lastUpgraded && state.lastUpgraded.id === p.id ? `just-upgraded-${state.lastUpgraded.tier}` : '';
        return `<div class="seller-product-row ${fxClass}">
          <img class="seller-thumb" src="${imgFor(p)}" ${imgFallbackAttr(p)} alt="">
          <div>
            <div style="font-weight:700">${clean(p.name)}</div>
            <div class="muted small">${categories[p.category]} · ${clean(p.color)} · Общая выдача: <strong>#${pos}</strong></div>
          </div>
          <div>
            <strong>${rub(p.price)}</strong>
            <div class="muted small">${tier ? `${rub(fee)} / зак.` : '0 ₽ / зак.'}</div>
          </div>
          <div><span class="oz-pill ${PROMO_TIERS[tier].colorClass}">${PROMO_TIERS[tier].code}</span></div>
          <div class="tier-switcher">
            <button type="button" class="tier-chip-btn ${tier === 0 ? 'active-0' : ''}" data-action="buyTier" data-id="${p.id}" data-tier="0">0%</button>
            <button type="button" class="tier-chip-btn ${tier === 3 ? 'active-3' : ''}" data-action="buyTier" data-id="${p.id}" data-tier="3">3 кл · 6%</button>
            <button type="button" class="tier-chip-btn ${tier === 2 ? 'active-2' : ''}" data-action="buyTier" data-id="${p.id}" data-tier="2">2 кл · 9%</button>
            <button type="button" class="tier-chip-btn ${tier === 1 ? 'active-1' : ''}" data-action="buyTier" data-id="${p.id}" data-tier="1">👑 1 кл · 12%</button>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

function sellerLiveView() {
  const filtered = products.filter(p => {
    if (state.liveCategory && p.category !== state.liveCategory) return false;
    if (state.liveTierFilter !== 'all' && String(p.promoTier || 0) !== state.liveTierFilter) return false;
    return true;
  });
  const ranked = rankProducts(filtered, state.liveQuery, 'relevance');

  return `
    <section class="inspector-bar">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <div>
          <h2 style="margin:0;font-size:20px">Инспектор живой выдачи (вид для селлера)</h2>
          <p class="muted small" style="margin:3px 0 0">Показывает позиции, релевантность и ставки CPO (6% / 9% / 12%) — покупатели эти плашки не видят.</p>
        </div>
        <button type="button" class="btn subtle" data-action="setMode" data-id="buyer">Посмотреть глазами покупателя →</button>
      </div>

      <div class="oz-rank-chain">
        <strong>Формула выдачи:</strong>
        <span class="oz-pill" style="background:#eef4ff;color:#005bff">Релевантность запроса</span>
        <span>›</span>
        <span class="oz-pill tier-1">👑 1 класс (12% CPO)</span>
        <span>›</span>
        <span class="oz-pill tier-2">⚡ 2 класс (9% CPO)</span>
        <span>›</span>
        <span class="oz-pill tier-3">🚀 3 класс (6% CPO)</span>
        <span>›</span>
        <span class="oz-pill tier-0">Органика (0%)</span>
      </div>

      <div class="inspector-search-row">
        <input id="liveQuery" class="oz-input" style="max-width:320px" value="${clean(state.liveQuery)}" placeholder="Запрос: худи, толстовка, джинсы, чёрные...">
        <select id="liveCategory" class="oz-select" style="width:auto;min-width:170px">
          <option value="" ${!state.liveCategory ? 'selected' : ''}>Все категории</option>
          <option value="jeans" ${state.liveCategory === 'jeans' ? 'selected' : ''}>👖 Джинсы</option>
          <option value="hoodies" ${state.liveCategory === 'hoodies' ? 'selected' : ''}>🧥 Толстовки и худи</option>
        </select>
        <select id="liveTierFilter" class="oz-select" style="width:auto;min-width:165px">
          <option value="all" ${state.liveTierFilter === 'all' ? 'selected' : ''}>Все классы</option>
          <option value="1" ${state.liveTierFilter === '1' ? 'selected' : ''}>1 класс (12%)</option>
          <option value="2" ${state.liveTierFilter === '2' ? 'selected' : ''}>2 класс (9%)</option>
          <option value="3" ${state.liveTierFilter === '3' ? 'selected' : ''}>3 класс (6%)</option>
          <option value="0" ${state.liveTierFilter === '0' ? 'selected' : ''}>Органика (0%)</option>
        </select>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${['', 'худи', 'толстовка', 'джинсы', 'чёрные', 'утеплённые'].map(q => `<button type="button" class="offer-tab" data-action="setLiveQuery" data-id="${q}" aria-pressed="${state.liveQuery === q}">${q || 'Все'}</button>`).join('')}
        </div>
      </div>
    </section>

    ${ranked.length
      ? `<section class="grid">${ranked.map(({ p, rel }, idx) => inspectorCard(p, idx + 1, rel)).join('')}</section>`
      : `<div class="empty-box">По этому фильтру товаров не найдено.</div>`}
  `;
}

function sellerAnalyticsView() {
  const rows = products.map(p => ({ p, eco: productEconomics(p) }));
  const totalViews = rows.reduce((s, r) => s + r.eco.views, 0);
  const totalOrders = rows.reduce((s, r) => s + r.eco.orders, 0);
  const totalRev = rows.reduce((s, r) => s + r.eco.revenue, 0);
  const totalAdCost = rows.reduce((s, r) => s + r.eco.cost, 0);
  const avgDRR = totalRev > 0 ? ((totalAdCost / totalRev) * 100).toFixed(1) : '0.0';

  const byTier = [1, 2, 3, 0].map(t => {
    const group = rows.filter(r => (r.p.promoTier || 0) === t);
    return {
      tier: t, meta: PROMO_TIERS[t], count: group.length,
      orders: group.reduce((s, r) => s + r.eco.orders, 0),
      revenue: group.reduce((s, r) => s + r.eco.revenue, 0),
    };
  });
  const maxTierRev = Math.max(1, ...byTier.map(x => x.revenue));

  const dayWeights = [0.84, 0.91, 0.96, 1.04, 1.12, 1.08, 1.18];
  const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const dailyViews = dayWeights.map(w => Math.round((totalViews / 7) * w));
  const maxDayV = Math.max(1, ...dailyViews);
  const pts = dailyViews.map((v, i) => ({
    x: 40 + i * 86,
    y: 170 - Math.round((v / maxDayV) * 130),
    v,
    label: dayLabels[i],
  }));
  const polyPoints = pts.map(pt => `${pt.x},${pt.y}`).join(' ');
  const areaPoints = `40,180 ${polyPoints} ${pts[pts.length - 1].x},180`;

  const catStats = Object.entries(categories).map(([key, title]) => {
    const grp = rows.filter(r => r.p.category === key);
    return {
      key, title, count: grp.length,
      promoted: grp.filter(r => (r.p.promoTier || 0) > 0).length,
      revenue: grp.reduce((s, r) => s + r.eco.revenue, 0),
      orders: grp.reduce((s, r) => s + r.eco.orders, 0),
    };
  });

  return `
    <section class="seller-kpis">
      <div class="seller-kpi">
        <small>Прогноз выручки (7 дней)</small>
        <strong>${rub(totalRev)}</strong>
        <span class="kpi-sub">${totalOrders} заказов по прогнозу</span>
      </div>
      <div class="seller-kpi">
        <small>Показов карточек (7 дней)</small>
        <strong>${currency.format(totalViews)}</strong>
        <span class="kpi-sub">Средний CTR ${(rows.reduce((s, r) => s + r.eco.clicks, 0) / Math.max(1, totalViews) * 100).toFixed(1)}%</span>
      </div>
      <div class="seller-kpi">
        <small>Прогноз расхода CPO (7 дней)</small>
        <strong>${rub(totalAdCost)}</strong>
        <span class="kpi-sub">Факт списано с заказов: ${rub(state.sellerSpent)}</span>
      </div>
      <div class="seller-kpi">
        <small>Средний ДРР по магазину</small>
        <strong>${avgDRR}%</strong>
        <span class="kpi-sub">${Number(avgDRR) <= 10 ? 'Эффективнее рынка Ozon (10–15%)' : 'В пределах нормы Ozon'}</span>
      </div>
    </section>

    <section class="analytics-grid">
      <div class="chart-card">
        <h3>Динамика показов за 7 дней</h3>
        <p class="muted small" style="margin:0 0 12px">Пересчитывается автоматически при изменении ставок 6% / 9% / 12%</p>
        <svg viewBox="0 0 600 210" style="width:100%;height:auto;display:block">
          <defs>
            <linearGradient id="ozAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#005bff" stop-opacity="0.28"/>
              <stop offset="100%" stop-color="#005bff" stop-opacity="0.02"/>
            </linearGradient>
          </defs>
          <line x1="35" y1="180" x2="575" y2="180" stroke="#e2e8f0" stroke-width="1"/>
          <line x1="35" y1="115" x2="575" y2="115" stroke="#f1f5f9" stroke-dasharray="4 4"/>
          <line x1="35" y1="50" x2="575" y2="50" stroke="#f1f5f9" stroke-dasharray="4 4"/>
          <polygon points="${areaPoints}" fill="url(#ozAreaGrad)"/>
          <polyline points="${polyPoints}" fill="none" stroke="#005bff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          ${pts.map(pt => `
            <circle cx="${pt.x}" cy="${pt.y}" r="5.5" fill="#fff" stroke="#005bff" stroke-width="3"/>
            <text x="${pt.x}" y="${pt.y - 12}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#001a34">${currency.format(pt.v)}</text>
            <text x="${pt.x}" y="200" text-anchor="middle" font-size="12" fill="#64748b">${pt.label}</text>
          `).join('')}
        </svg>
      </div>

      <div class="chart-card">
        <h3>Вклад уровней CPO в выручку</h3>
        <p class="muted small" style="margin:0">Сравнение эффективности ставок 12%, 9%, 6% и органики</p>
        <div class="bar-list">
          ${byTier.map(b => {
            const pct = Math.round((b.revenue / maxTierRev) * 100);
            const bg = b.tier === 1 ? 'var(--tier1-grad)' : b.tier === 2 ? 'var(--tier2-grad)' : b.tier === 3 ? 'var(--tier3-grad)' : '#94a3b8';
            return `<div>
              <div class="bar-item-head">
                <span><strong>${b.meta.code}</strong> (${b.count} SKU · ${b.orders} зак.)</span>
                <strong>${rub(b.revenue)}</strong>
              </div>
              <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, pct)}%;background:${bg}"></div></div>
            </div>`;
          }).join('')}
        </div>

        <div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--oz-border);display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${catStats.map(c => `<div style="background:var(--oz-surface-soft);padding:10px 12px;border-radius:12px">
            <div class="small muted">${c.title}</div>
            <strong style="font-size:16px">${rub(c.revenue)}</strong>
            <div class="small" style="color:var(--oz-blue)">${c.promoted} из ${c.count} на CPO · ${c.orders} зак.</div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="block">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px">
        <div>
          <h3 style="margin:0;font-size:16px">Реальные списания CPO с заказов покупателей (${state.cpoEvents.length})</h3>
          <span class="muted small">Оформите заказ в режиме покупателя или нажмите «Симулировать заказ» — комиссия спишется автоматически</span>
        </div>
        <button type="button" class="btn subtle" style="padding:7px 12px;font-size:12.5px" data-action="setMode" data-id="buyer">Сделать заказ как покупатель →</button>
      </div>
      ${state.cpoEvents.length ? `
        <table class="sku-analytics-table">
          <thead><tr><th>Время</th><th>Товар</th><th>Сумма заказа</th><th>Ставка CPO</th><th>Списано с баланса</th></tr></thead>
          <tbody>
            ${state.cpoEvents.slice(0, 6).map(ev => `<tr>
              <td class="muted">${clean(ev.time)}</td>
              <td><strong>${clean(ev.product)}</strong> × ${ev.qty}</td>
              <td>${rub(ev.orderSum)}</td>
              <td><span class="oz-pill tier-${ev.tier}">${ev.ratePct}%</span></td>
              <td style="color:var(--oz-magenta);font-weight:700">−${rub(ev.fee)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      ` : '<p class="muted small" style="margin:6px 0 0">Пока нет фактических списаний — баланс <strong>' + rub(state.sellerBalance) + '</strong> не расходуется, пока нет заказов.</p>'}
    </section>

    <section class="seller-table-wrap">
      <div class="section-head" style="margin-top:0">
        <h2 style="font-size:18px">Юнит-экономика CPO и рекомендации по SKU</h2>
        <span class="muted small">Сортировка по прогнозу выручки</span>
      </div>
      <table class="sku-analytics-table">
        <thead>
          <tr>
            <th>Товар</th>
            <th>Категория</th>
            <th>Ставка CPO</th>
            <th>За 1 заказ</th>
            <th>Прогноз заказов</th>
            <th>Расход CPO (7 дн.)</th>
            <th>Прогноз выручки</th>
            <th>Рекомендация</th>
          </tr>
        </thead>
        <tbody>
          ${rows.sort((a, b) => b.eco.revenue - a.eco.revenue).map(({ p, eco }) => {
            const tier = p.promoTier || 0;
            const rec = tier === 0
              ? `<button type="button" class="btn" style="padding:5px 10px;font-size:12px" data-action="buyTier" data-id="${p.id}" data-tier="3">Подключить 6%</button>`
              : tier > 1 && p.rating >= 4.9
                ? `<button type="button" class="btn primary" style="padding:5px 10px;font-size:12px" data-action="buyTier" data-id="${p.id}" data-tier="1">В Топ · 12%</button>`
                : '<span class="roi-good">✓ Оптимально</span>';
            return `<tr>
              <td><strong>${clean(p.name)}</strong></td>
              <td class="muted">${categories[p.category]}</td>
              <td><span class="oz-pill ${PROMO_TIERS[tier].colorClass}">${PROMO_TIERS[tier].code}</span></td>
              <td>${tier ? rub(eco.feePerOrder) : '0 ₽'}</td>
              <td><strong>${eco.orders}</strong></td>
              <td>${rub(eco.cost)} <span class="muted">(${eco.drr}%)</span></td>
              <td><strong>${rub(eco.revenue)}</strong></td>
              <td>${rec}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </section>
  `;
}

function sellerProductsView() {
  return `
    <div class="block">
      <h2 style="margin:0 0 14px;font-size:18px">Добавить новый товар в каталог</h2>
      <form id="addProductForm" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:12px;align-items:end">
        <label class="small muted">Категория
          <select class="oz-select" name="category">
            <option value="hoodies">🧥 Толстовки и худи</option>
            <option value="jeans">👖 Джинсы</option>
          </select>
        </label>
        <label class="small muted">Название товара<input class="oz-input" name="name" required placeholder="Худи оверсайз с капюшоном"></label>
        <label class="small muted">Цвет<input class="oz-input" name="color" required placeholder="Чёрные"></label>
        <label class="small muted">Цена, ₽<input class="oz-input" name="price" type="number" min="100" value="2590" required></label>
        <label class="small muted">Стартовая ставка CPO
          <select class="oz-select" name="promoTier">
            <option value="0">Органика (0% с заказа)</option>
            <option value="3">3 класс · Старт (6% с заказа)</option>
            <option value="2">2 класс · Буст (9% с заказа)</option>
            <option value="1">1 класс · Топ (12% с заказа)</option>
          </select>
        </label>
        <button type="submit" class="btn primary" style="height:38px">Опубликовать SKU</button>
      </form>
    </div>

    <div class="seller-table-wrap">
      <h2 style="margin:0 0 12px;font-size:18px">Все товары магазина (${products.length} SKU)</h2>
      ${products.map(p => {
        const tier = p.promoTier || 0;
        return `<div class="seller-product-row">
          <img class="seller-thumb" src="${imgFor(p)}" ${imgFallbackAttr(p)} alt="">
          <div>
            <strong>${clean(p.name)}</strong>
            <div class="muted small">${categories[p.category]} · Арт. ${p.sku} · CPO: ${tier ? `${PROMO_TIERS[tier].ratePct}% (${rub(cpoFee(p))}/зак.)` : '0%'}</div>
          </div>
          <div><input class="oz-input" style="height:34px" type="number" min="100" value="${p.price}" data-price-edit="${p.id}"></div>
          <div><span class="oz-pill ${PROMO_TIERS[tier].colorClass}">${PROMO_TIERS[tier].code}</span></div>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <button type="button" class="btn" style="padding:7px 12px;font-size:12.5px" data-action="savePrice" data-id="${p.id}">Сохранить цену</button>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

function sellerApp() {
  const views = {
    promo: sellerPromoView,
    live: sellerLiveView,
    analytics: sellerAnalyticsView,
    products: sellerProductsView,
  };
  return `<div class="seller-shell">${(views[state.sellerTab] || sellerPromoView)()}</div>`;
}

/* =========================================================
   КОРЗИНА, ИЗБРАННОЕ, ОФОРМЛЕНИЕ, ЗАКАЗЫ
   ========================================================= */
function favorites() {
  const items = products.filter(p => state.favorites.has(p.id));
  return `<div class="section-head"><h1>Избранное</h1></div>
    ${items.length ? `<section class="grid home-grid">${items.map(p => buyerCard(p)).join('')}</section>`
      : `<div class="empty-box"><h3>В избранном пока пусто</h3><p class="muted">Нажимайте на сердечко, чтобы сохранить понравившиеся товары.</p><a href="#/search" class="btn primary" data-action="category" data-id="">Перейти в каталог</a></div>`}`;
}

const entryLocal = unit => ({ key: unit.id, id: unit.id, product: unit.product, size: unit.size, point: unit.point, price: unit.price, slot: 'Уже в выбранном ПВЗ', qty: 1 });

function addCart(item, silent = false) {
  const existing = state.cart.find(x => x.key === item.key || (x.product === item.product && x.size === item.size && !x.id && !item.id));
  if (existing) {
    existing.qty = (existing.qty || 1) + (item.qty || 1);
  } else {
    state.cart.push({ ...item, qty: item.qty || 1 });
  }
  render();
  if (!silent) say('Добавлено в корзину');
}

function updateCartQty(key, delta) {
  const item = state.cart.find(x => x.key === key);
  if (!item) return;
  const next = (item.qty || 1) + delta;
  if (next <= 0) {
    state.cart = state.cart.filter(x => x.key !== key);
    say('Товар удалён из корзины');
  } else {
    item.qty = next;
  }
  render();
}

const cartTotalNum = items => items.reduce((s, r) => s + r.price * (r.qty || 1), 0);
const cartTotal = items => rub(cartTotalNum(items));

function cartItemRow(item, editable) {
  const p = productById(item.product);
  const qty = item.qty || 1;
  return `<div class="cart-row">
    <div class="cart-row-left">
      <img src="${imgFor(p)}" ${imgFallbackAttr(p)} alt="">
      <div>
        <strong>${clean(p.name)} · ${item.size}</strong>
        <div class="muted small">${points[item.point]} · ${item.slot}</div>
        <div class="muted small">${rub(item.price)} × ${qty} шт.</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:14px">
      ${editable ? `
        <div class="oz-qty-stepper">
          <button type="button" class="oz-qty-btn" data-action="qtyDelta" data-id="${item.key}" data-delta="-1">−</button>
          <span class="oz-qty-val">${qty}</span>
          <button type="button" class="oz-qty-btn" data-action="qtyDelta" data-id="${item.key}" data-delta="1">+</button>
        </div>
      ` : ''}
      <div style="text-align:right;min-width:84px">
        <strong style="font-size:17px">${rub(item.price * qty)}</strong>
        ${editable ? `<div><button type="button" class="linkbtn small" data-action="remove" data-id="${item.key}">Удалить</button></div>` : ''}
      </div>
    </div>
  </div>`;
}

function orderSummary(items, action, label) {
  const totalQty = items.reduce((s, x) => s + (x.qty || 1), 0);
  return `<aside class="block">
    <h2 style="margin:0 0 14px;font-size:18px">Ваш заказ</h2>
    <div class="summary-line"><span>Товары (${totalQty} шт.)</span><span>${cartTotal(items)}</span></div>
    <div class="summary-line"><span>Доставка в ПВЗ</span><span style="color:var(--oz-green-dark);font-weight:600">Бесплатно</span></div>
    <div class="summary-line" style="font-size:19px;font-weight:800;padding-top:10px;border-top:1px solid var(--oz-border)"><span>Итого</span><span>${cartTotal(items)}</span></div>
    <button type="button" class="btn green" style="width:100%;height:48px;margin-top:8px;font-size:15px" data-action="${action}">${label}</button>
  </aside>`;
}

function cart() {
  return `<div class="section-head"><h1>Корзина</h1><a href="#/" class="linkbtn" data-action="home">Продолжить покупки</a></div>
    ${state.cart.length ? `<div class="order-page"><section class="block">${state.cart.map(x => cartItemRow(x, true)).join('')}</section>${orderSummary(state.cart, 'checkout', 'Перейти к оформлению')}</div>`
      : `<div class="empty-box"><h3>Корзина пуста</h3><p class="muted">Добавляйте джинсы и толстовки в один клик.</p><a href="#/search" class="btn primary" data-action="category" data-id="">Перейти в каталог</a></div>`}`;
}

function checkout() {
  return `<div class="oz-breadcrumbs"><a href="#/cart" class="linkbtn" data-action="cart">← Корзина</a><span>•</span><strong>Оформление заказа</strong></div>
    <div class="order-page">
      <div class="stack">
        <section class="block">
          <h2 style="margin:0 0 8px;font-size:18px">Пункт выдачи Ozon</h2>
          <p class="muted" style="margin:0 0 14px">${points[state.point]}</p>
          ${state.cart.map(x => cartItemRow(x, false)).join('')}
        </section>
        <section class="block">
          <h2 style="margin:0 0 6px;font-size:17px">Оплата · Ozon Карта (безлимитный демо-баланс)</h2>
          <p class="muted small" style="margin:0">Одежду можно примерить в ПВЗ перед выкупом.</p>
        </section>
      </div>
      ${orderSummary(state.cart, 'confirm', 'Оплатить и оформить')}
    </div>`;
}

function result() {
  const onSite = state.order.some(x => x.id);
  return `<section class="block" style="max-width:720px;margin:0 auto">
    <span class="oz-pill local" style="margin-bottom:10px">Заказ оформлен</span>
    <h1 style="margin:0 0 12px">Спасибо за заказ!</h1>
    ${state.order.map(x => cartItemRow(x, false)).join('')}
    <p class="muted">${onSite ? 'Заказ уже в пункте выдачи. Можно прийти и примерить сегодня.' : 'Мы сообщим, когда заказ приедет в пункт выдачи.'}</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
      ${onSite ? `<button type="button" class="btn primary" data-action="buy">Забрать заказ</button><button type="button" class="btn subtle" data-action="decline">Отказаться</button>` : `<a href="#/orders" class="btn primary" data-action="orders">Мои заказы</a><a href="#/" class="btn subtle" data-action="home">На главную</a>`}
    </div>
  </section>`;
}

function finish(declined) {
  return `<section class="empty-box" style="max-width:600px;margin:0 auto">
    <h1>${declined ? 'Отказ зарегистрирован' : 'Выкуп завершён'}</h1>
    <p class="muted">${declined ? 'Экземпляр скрыт до повторного осмотра в ПВЗ.' : 'Спасибо за покупку на Ozon!'}</p>
    <a href="#/" class="btn primary" data-action="home">На главную</a>
  </section>`;
}

function orders() {
  return `<div class="section-head"><h1>Мои заказы</h1></div>
    <div class="stack">
      ${state.orders.length ? state.orders.map((o, idx) => `<section class="block">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <span class="oz-pill local">${o.status}</span>
          <strong class="muted small">Заказ №${10420 + state.orders.length - idx} · ${cartTotal(o.items)}</strong>
        </div>
        ${o.items.map(x => cartItemRow(x, false)).join('')}
      </section>`).join('')
        : `<div class="empty-box"><h3>Заказов пока нет</h3><p class="muted">Оформите заказ в корзине или нажмите «Купить сейчас» на товаре.</p><a href="#/search" class="btn primary" data-action="category" data-id="">К покупкам</a></div>`}
    </div>`;
}

/* =========================================================
   СПИСАНИЕ CPO ПРИ ЗАКАЗЕ + РЕНДЕР
   ========================================================= */
function chargeCpoForItems(items) {
  let totalCharged = 0;
  const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  for (const item of items) {
    const prod = productById(item.product);
    if (!prod) continue;
    const tier = prod.promoTier || 0;
    const meta = PROMO_TIERS[tier];
    if (!meta || !meta.rate) continue;
    const qty = item.qty || 1;
    const orderSum = item.price * qty;
    const fee = Math.round(orderSum * meta.rate);
    state.sellerBalance = Math.max(0, state.sellerBalance - fee);
    state.sellerSpent += fee;
    totalCharged += fee;
    state.cpoEvents.unshift({
      product: prod.name,
      qty,
      orderSum,
      tier,
      ratePct: meta.ratePct,
      fee,
      time: now,
    });
  }
  return totalCharged;
}

function render() {
  saveSession();
  const isSeller = state.mode === 'seller';

  document.body.classList.toggle('mode-seller', isSeller);
  document.body.classList.toggle('checkout-mode', !isSeller && state.page === 'checkout');

  document.querySelector('#buyerHeader').hidden = isSeller;
  document.querySelector('#buyerMobileBar').hidden = isSeller;
  document.querySelector('#sellerHeader').hidden = !isSeller;

  document.querySelector('#modeBuyerBtn').setAttribute('aria-selected', String(!isSeller));
  document.querySelector('#modeSellerBtn').setAttribute('aria-selected', String(isSeller));
  document.querySelector('#modeHint').textContent = isSeller
    ? 'Кабинет продавца: модель CPO (6% / 9% / 12% с заказа), инспектор выдачи и аналитика'
    : 'Вы смотрите витрину глазами покупателя (без служебных меток продвижения)';

  if (isSeller) {
    app.innerHTML = sellerApp();
    document.querySelector('#sellerHeaderBalance').textContent = rub(state.sellerBalance);
    for (const btn of document.querySelectorAll('.seller-nav-btn')) {
      btn.setAttribute('aria-pressed', String(btn.dataset.id === state.sellerTab));
    }
    document.title = 'Ozon Seller · Кабинет продавца';
    return;
  }

  const pages = {
    home: storefront, catalog, nearby,
    product: productPage, offers: offersModal,
    favorites, orders, cart, checkout, result,
    bought: () => finish(false), declined: () => finish(true),
  };
  app.innerHTML = (pages[state.page] || storefront)();

  queryInput.value = state.q;
  document.querySelector('.oz-search-clear').hidden = !state.q;
  document.querySelector('#searchScope').value = state.category;

  const nearbyCountEl = document.querySelector('#nearbyNavCount');
  if (nearbyCountEl) nearbyCountEl.textContent = String(nearbyProducts('').length);

  const totalUnits = totalCartUnits();
  const cartBadge = document.querySelector('#count');
  cartBadge.textContent = String(totalUnits);
  cartBadge.hidden = totalUnits === 0;
  document.querySelector('#mobileCount').textContent = String(totalUnits);

  const favBadge = document.querySelector('#favCount');
  favBadge.textContent = String(state.favorites.size);
  favBadge.hidden = state.favorites.size === 0;

  const ordBadge = document.querySelector('#ordersCount');
  ordBadge.textContent = String(state.orders.length);
  ordBadge.hidden = state.orders.length === 0;

  document.querySelector('#pointLink').textContent = `Москва • ${points[state.point]}`;

  for (const el of document.querySelectorAll('#buyerHeader a[data-action], #buyerMobileBar a[data-action]')) {
    const match = (el.dataset.action === state.page) || (el.dataset.action === 'category' && state.page === 'catalog' && el.dataset.id === state.category);
    if (match) el.setAttribute('aria-current', 'page');
    else el.removeAttribute('aria-current');
  }

  const titles = {
    home: 'Ozon — маркетплейс',
    catalog: state.q ? `${state.q} — купить на Ozon` : (categories[state.category] || 'Каталог') + ' — Ozon',
    nearby: 'Товары рядом · Ozon',
    favorites: 'Избранное · Ozon',
    cart: 'Корзина · Ozon',
    checkout: 'Оформление заказа · Ozon',
    orders: 'Заказы · Ozon',
  };
  document.title = titles[state.page] || `${productById(state.product)?.name || 'Товар'} · Ozon`;
}

function purchaseTier(productId, newTier) {
  const p = productById(productId);
  if (!p) return;
  if ((p.promoTier || 0) === newTier) return;

  p.promoTier = newTier;
  state.sellerSelectedProduct = p.id;
  state.lastUpgraded = newTier > 0 ? { id: p.id, tier: newTier } : null;
  render();

  if (newTier > 0) triggerTierPurchaseFX(newTier, p);
  else say(`Ставка CPO отключена (0%) для «${p.name}»`);
  setTimeout(() => { state.lastUpgraded = null; }, 1200);
}

/* =========================================================
   ОБРАБОТЧИКИ СОБЫТИЙ
   ========================================================= */
document.querySelector('#search').addEventListener('submit', e => {
  e.preventDefault();
  state.mode = 'buyer';
  state.q = queryInput.value.trim();
  state.category = document.querySelector('#searchScope').value;
  state.sort = 'relevance';
  go('catalog');
});

queryInput.addEventListener('input', () => {
  document.querySelector('.oz-search-clear').hidden = !queryInput.value;
});

document.addEventListener('input', e => {
  if (e.target.id === 'liveQuery') {
    state.liveQuery = e.target.value;
    render();
    const el = document.querySelector('#liveQuery');
    if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  }
});

document.addEventListener('change', e => {
  const { id, value, checked } = e.target;
  if (id === 'point') state.point = value;
  else if (id === 'sort') state.sort = value;
  else if (id === 'only') state.only = checked;
  else if (id === 'verifiedOnly') state.verifiedOnly = checked;
  else if (id === 'priceMin') state.priceMin = value;
  else if (id === 'priceMax') state.priceMax = value;
  else if (id === 'sellerTargetProduct') state.sellerSelectedProduct = value;
  else if (id === 'liveCategory') state.liveCategory = value;
  else if (id === 'liveTierFilter') state.liveTierFilter = value;
  else return;
  render();
});

document.addEventListener('submit', e => {
  if (e.target.id === 'addProductForm') {
    e.preventDefault();
    const f = new FormData(e.target);
    const tier = Number(f.get('promoTier')) || 0;
    const category = String(f.get('category') || 'hoodies');
    const price = Math.max(100, Number(f.get('price')) || 2490);
    const id = 'custom-' + Date.now();
    const newProd = {
      id,
      imgKey: category === 'hoodies' ? 'h_oversize' : 'classic',
      sku: String(709000 + products.length),
      category,
      name: String(f.get('name')).trim(),
      color: String(f.get('color')).trim(),
      sizes: ['S', 'M', 'L', 'XL'],
      price,
      oldPrice: Math.round(price * 2.1),
      cheap: Math.round(price * 0.9),
      recent: products.length + 1,
      rating: 5.0,
      reviews: 1,
      left: 20,
      verified: true,
      seller: 'Denim Store',
      tags: category === 'hoodies' ? ['толстовка', 'худи'] : ['джинсы'],
      promoTier: tier,
    };
    products.unshift(newProd);
    state.sellerSelectedProduct = id;
    render();
    if (tier > 0) triggerTierPurchaseFX(tier, newProd);
    else say(`Товар «${newProd.name}» опубликован`);
  }
});

document.addEventListener('click', e => {
  const b = e.target.closest('[data-action]');
  if (!b) return;
  if (b.tagName === 'A' && (e.metaKey || e.ctrlKey || e.shiftKey)) return;
  if (b.tagName === 'A') e.preventDefault();
  const { action, id } = b.dataset;
  const p = productById(state.product);

  switch (action) {
    case 'setMode':
      state.mode = id === 'seller' ? 'seller' : 'buyer';
      if (state.mode === 'buyer' && !['home', 'catalog', 'nearby', 'product', 'favorites', 'orders', 'cart'].includes(state.page)) {
        state.page = 'home';
      }
      history.pushState(null, '', routeURL(state.page));
      render();
      scrollTo(0, 0);
      break;
    case 'resetDemo':
      localStorage.removeItem(storageKey);
      location.hash = '#/';
      location.reload();
      break;
    case 'clearQuery':
      queryInput.value = '';
      state.q = '';
      queryInput.focus();
      document.querySelector('.oz-search-clear').hidden = true;
      break;
    case 'home': state.mode = 'buyer'; state.q = ''; state.category = ''; state.only = false; go('home'); break;
    case 'nearby': state.mode = 'buyer'; state.q = ''; state.category = ''; state.only = false; go('nearby'); break;
    case 'nearbyCategory': state.nearbyCategory = id || ''; render(); break;
    case 'sellerTab':
      state.mode = 'seller';
      state.sellerTab = id;
      history.pushState(null, '', routeURL('seller'));
      render();
      scrollTo(0, 0);
      break;
    case 'sellerCatFilter': state.sellerCatFilter = id; render(); break;
    case 'openLiveFor':
      state.mode = 'seller';
      state.sellerTab = 'live';
      state.liveCategory = id || '';
      state.liveQuery = '';
      history.pushState(null, '', routeURL('seller'));
      render();
      scrollTo(0, 0);
      break;
    case 'setLiveQuery': state.liveQuery = id; render(); break;
    case 'topup': state.sellerBalance += 500; render(); say('Баланс пополнен на 500 ₽'); break;
    case 'buyTier': purchaseTier(id, Number(b.dataset.tier)); break;
    case 'simOrder': {
      const targetProd = productById(id);
      if (!targetProd) break;
      const tier = targetProd.promoTier || 0;
      const charged = chargeCpoForItems([{ product: targetProd.id, price: targetProd.price, qty: 1 }]);
      render();
      if (charged > 0) say(`Симуляция заказа: списано ${rub(charged)} (${PROMO_TIERS[tier].ratePct}% CPO)`);
      else say('Симуляция заказа: органика (0 ₽ списания CPO)');
      break;
    }
    case 'savePrice': {
      const inp = document.querySelector(`[data-price-edit="${id}"]`);
      const targetProd = productById(id);
      if (inp && targetProd) {
        targetProd.price = Math.max(100, Number(inp.value) || targetProd.price);
        render();
        say(`Цена обновлена: ${rub(targetProd.price)}`);
      }
      break;
    }
    case 'category': state.mode = 'buyer'; state.q = ''; state.category = id; state.only = false; go('catalog'); break;
    case 'point': go('nearby'); document.querySelector('#point')?.focus(); break;
    case 'backListing': go(state.from || 'catalog'); break;
    case 'resetFilter':
      state.q = ''; state.only = false; state.verifiedOnly = false;
      state.priceMin = ''; state.priceMax = '';
      go('catalog');
      break;
    case 'product': {
      const sel = productById(id);
      if (!sel) break;
      if (!['product', 'offers'].includes(state.page)) state.from = state.page;
      state.product = id;
      state.offer = b.dataset.offer || 'fast';
      state.unit = b.dataset.unit || '';
      state.size = sel.sizes.includes(b.dataset.size) ? b.dataset.size : (unitsFor(sel)[0]?.size || 'M');
      state.tab = state.offer === 'local' ? 'local' : 'fast';
      go('product');
      break;
    }
    case 'quickAdd': {
      const prod = productById(id);
      if (!prod) break;
      const sz = b.dataset.size || 'M';
      const localUnit = unitsFor(prod, sz)[0];
      if (localUnit) addCart(entryLocal(localUnit));
      else addCart({ key: `${prod.id}-${sz}-${state.point}-fast`, product: prod.id, size: sz, point: state.point, price: prod.price, slot: 'Доставка завтра', qty: 1 });
      break;
    }
    case 'qtyDelta':
      updateCartQty(id, Number(b.dataset.delta));
      break;
    case 'buyNow': {
      const prod = productById(id);
      if (!prod) break;
      const offer = selectedProductOffer(prod);
      const already = cartItemForProduct(prod.id, state.size);
      if (!already) {
        if (offer.kind === 'local' && offer.unit && isFree(offer.unit)) addCart(entryLocal(offer.unit), true);
        else addCart({ key: `${prod.id}-${state.size}-${state.point}-${offer.kind}`, product: prod.id, size: state.size, point: state.point, price: offer.price, slot: offer.delivery, qty: 1 }, true);
      }
      go('checkout');
      break;
    }
    case 'favorite':
      if (state.favorites.has(id)) state.favorites.delete(id);
      else state.favorites.add(id);
      render();
      break;
    case 'favorites': go('favorites'); break;
    case 'orders': go('orders'); break;
    case 'offers': go('offers'); break;
    case 'backProduct': go('product'); break;
    case 'dismiss': if (e.target === b) go('product'); break;
    case 'tab': state.tab = id; render(); break;
    case 'size':
      state.size = id;
      const localInSize = unitsFor(p, id)[0];
      if (localInSize) {
        state.offer = 'local';
        state.unit = localInSize.id;
      } else if (state.offer === 'local') {
        state.unit = '';
        state.offer = 'fast';
      }
      render();
      break;
    case 'addLocal': {
      const u = unitById(id);
      if (u && isFree(u)) addCart(entryLocal(u));
      else say('Экземпляр больше недоступен');
      break;
    }
    case 'addOffer': {
      const item = getProductOffers(p).find(x => x.key === id);
      if (!item) break;
      if (item.kind === 'local') {
        const u = unitById(item.unit);
        if (u && isFree(u)) addCart(entryLocal(u));
      } else {
        addCart({ key: item.key, product: item.product, size: item.size, point: item.point, price: item.price, slot: item.slot, qty: 1 });
      }
      break;
    }
    case 'addRemote':
      addCart({ key: `${p.id}-${state.size}-${state.point}-${id}`, product: p.id, size: state.size, point: state.point, price: id === 'fast' ? p.price : p.cheap, slot: id === 'fast' ? 'Доставка завтра' : 'Доставка через 3 дня', qty: 1 });
      break;
    case 'remove': state.cart = state.cart.filter(x => x.key !== id); render(); break;
    case 'cart': go('cart'); break;
    case 'checkout': if (state.cart.length) go('checkout'); break;
    case 'confirm':
      if (state.cart.length) {
        chargeCpoForItems(state.cart);
        state.order = state.cart.map(x => ({ ...x }));
        state.orders.unshift({ items: state.cart.map(x => ({ ...x })), status: 'Заказ оформлен' });
        for (const x of state.cart) if (x.id) state.reserved.add(x.id);
        state.cart = [];
        go('result');
      }
      break;
    case 'buy':
    case 'decline':
      for (const x of state.order) if (x.id) { state.reserved.delete(x.id); state.completed.add(x.id); }
      if (state.orders[0]) state.orders[0].status = action === 'buy' ? 'Выкуп завершён' : 'Отказ зарегистрирован';
      go(action === 'buy' ? 'bought' : 'declined');
      break;
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && state.page === 'offers') go('product');
});

restoreSession();
readRoute();
render();

