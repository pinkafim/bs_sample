'use strict';

const imageUrls = {
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
};

const points = {
  mira: 'проспект Мира, 182',
  yara: 'Ярославская улица, 21А',
};

const categories = {
  clothes: 'Одежда',
  homeware: 'Для дома',
  electronics: 'Электроника',
  office: 'Канцелярия',
  shoes: 'Обувь',
};

/* 3 уровня продвижения + без продвижения */
const PROMO_TIERS = {
  1: {
    tier: 1,
    rank: 1,
    code: '1 класс',
    name: 'Первый класс',
    subtitle: 'Премиум-приоритет в топе выдачи',
    price: 2990,
    boostLabel: '+300% к показам',
    stars: '★★★',
    badge: '1 класс · Топ',
    colorClass: 'tier-1',
    perks: [
      'Максимальный приоритет в выдаче после точной релевантности',
      'Премиум-корона на карточке и в блоке магазина',
      'Голографическая подсветка в кабинете и приоритет в рекомендациях',
    ],
  },
  2: {
    tier: 2,
    rank: 2,
    code: '2 класс',
    name: 'Второй класс',
    subtitle: 'Бизнес-буст выше 3 класса и органики',
    price: 1290,
    boostLabel: '+120% к показам',
    stars: '★★',
    badge: '2 класс · Буст',
    colorClass: 'tier-2',
    perks: [
      'Вывод выше 3 класса и товаров без продвижения',
      'Синяя метка ускорения и выделение карточки в каталоге',
      'Повышенная видимость в модуле «Другие предложения»',
    ],
  },
  3: {
    tier: 3,
    rank: 3,
    code: '3 класс',
    name: 'Третий класс',
    subtitle: 'Стартовое поднятие над органикой',
    price: 490,
    boostLabel: '+45% к показам',
    stars: '★',
    badge: '3 класс · Старт',
    colorClass: 'tier-3',
    perks: [
      'Приоритет над всеми товарами без продвижения',
      'Аккуратная метка продвижения в поисковой выдаче',
      'Оптимально для старта продаж и тестирования карточек',
    ],
  },
  0: {
    tier: 0,
    rank: 4,
    code: 'Без продвижения',
    name: 'Органика',
    subtitle: 'Базовое размещение без буста',
    price: 0,
    boostLabel: 'Базовые показы',
    stars: '—',
    badge: 'Без продвижения',
    colorClass: 'tier-0',
    perks: ['Обычная выдача после товаров 1, 2 и 3 класса'],
  },
};

const defaultProducts = [
  { id: 'classic', sku: '601284101', category: 'clothes', name: 'Джинсы утеплённые с флисом', color: 'Серые', sizes: ['S', 'M', 'L', 'XL'], price: 2590, oldPrice: 8990, cheap: 2290, recent: 1, rating: 4.8, reviews: 735, left: 14, verified: true, seller: 'Denim Store', promoTier: 2 },
  { id: 'washed', sku: '601284102', category: 'clothes', name: 'Джинсы широкие свободного кроя', color: 'Графитовые', sizes: ['S', 'M', 'L', 'XL'], price: 3190, oldPrice: 12400, cheap: 2790, recent: 2, rating: 4.9, reviews: 2140, left: 9, verified: true, seller: 'Denim Store', promoTier: 1 },
  { id: 'straight', sku: '601284103', category: 'clothes', name: 'Джинсы прямые классические', color: 'Синие', sizes: ['S', 'M', 'L', 'XL'], price: 3590, oldPrice: 9800, cheap: 3290, recent: 3, rating: 4.9, reviews: 1660, left: 24, verified: true, seller: 'Denim Store', promoTier: 2 },
  { id: 'shirt', sku: '601284104', category: 'clothes', name: 'Джинсы багги из плотного денима', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2490, oldPrice: 8700, cheap: 2190, recent: 4, rating: 4.8, reviews: 985, left: 31, verified: true, seller: 'Denim Store', promoTier: 3 },
  { id: 'socks', sku: '601284105', category: 'clothes', name: 'Джинсы свободные с потёртостями', color: 'Голубые', sizes: ['S', 'M', 'L', 'XL'], price: 2890, oldPrice: 7900, cheap: 2590, recent: 5, rating: 4.9, reviews: 520, left: 45, verified: false, seller: 'Denim Store', promoTier: 0 },
  { id: 'ivory', sku: '601284106', category: 'clothes', name: 'Джинсы бананы', color: 'Светло-голубые', sizes: ['S', 'M', 'L', 'XL'], price: 2690, oldPrice: 9500, cheap: 2390, recent: 6, rating: 4.9, reviews: 4120, left: 19, verified: true, seller: 'Denim Store', promoTier: 3 },
  { id: 'navy', sku: '601284107', category: 'clothes', name: 'Джинсы прямого кроя', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2790, oldPrice: 6550, cheap: 2490, recent: 7, rating: 4.8, reviews: 531, left: 27, verified: false, seller: 'Denim Store', promoTier: 0 },
  { id: 'towel', sku: '601284108', category: 'clothes', name: 'Джинсы широкие на каждый день', color: 'Серые', sizes: ['S', 'M', 'L', 'XL'], price: 2290, oldPrice: 5190, cheap: 2090, recent: 8, rating: 4.9, reviews: 291, left: 62, verified: false, seller: 'Denim Store', promoTier: 0 },
  { id: 'mug', sku: '601284109', category: 'clothes', name: 'Джинсы зауженного кроя', color: 'Тёмно-синие', sizes: ['S', 'M', 'L', 'XL'], price: 2390, oldPrice: 6990, cheap: 2190, recent: 9, rating: 4.9, reviews: 1020, left: 18, verified: true, seller: 'Denim Store', promoTier: 0 },
  { id: 'gel', sku: '601284110', category: 'clothes', name: 'Джинсы широкие из тяжёлого денима', color: 'Тёмно-синие', sizes: ['S', 'M', 'L', 'XL'], price: 3290, oldPrice: 11050, cheap: 2990, recent: 10, rating: 4.8, reviews: 1396, left: 11, verified: true, seller: 'Denim Store', promoTier: 2 },
  { id: 'notebook', sku: '601284111', category: 'clothes', name: 'Джинсы багги', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2590, oldPrice: 8360, cheap: 2290, recent: 11, rating: 4.9, reviews: 596, left: 52, verified: false, seller: 'Denim Store', promoTier: 0 },
  { id: 'cable', sku: '601284112', category: 'clothes', name: 'Джинсы стрейч', color: 'Синие', sizes: ['S', 'M', 'L', 'XL'], price: 2190, oldPrice: 10000, cheap: 1990, recent: 12, rating: 4.9, reviews: 171, left: 33, verified: true, seller: 'Denim Store', promoTier: 3 },
  { id: 'sneakers', sku: '601284113', category: 'clothes', name: 'Джинсы стрейч классические', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2290, oldPrice: 7490, cheap: 2090, recent: 13, rating: 4.8, reviews: 842, left: 29, verified: false, seller: 'Denim Store', promoTier: 0 },
  { id: 'denim', sku: '601284114', category: 'clothes', name: 'Джинсы широкие с высокой посадкой', color: 'Чёрные', sizes: ['S', 'M', 'L', 'XL'], price: 2990, oldPrice: 15000, cheap: 2690, recent: 14, rating: 4.9, reviews: 5401, left: 6, verified: true, seller: 'Denim Store', promoTier: 1 },
];

let products = defaultProducts.map(p => ({ ...p }));

const stock = [
  { id: 'J-M-01', product: 'classic', point: 'mira', size: 'M', price: 2590, condition: 'Без видимых дефектов' },
  { id: 'J-L-02', product: 'classic', point: 'yara', size: 'L', price: 2590, condition: 'Допущен к повторной продаже' },
  { id: 'J-S-03', product: 'washed', point: 'yara', size: 'S', price: 3190, condition: 'Без видимых дефектов' },
  { id: 'J-M-04', product: 'straight', point: 'mira', size: 'M', price: 3590, condition: 'Без видимых дефектов' },
  { id: 'T-L-05', product: 'shirt', point: 'mira', size: 'L', price: 2490, condition: 'Допущен к повторной продаже' },
  { id: 'T-M-06', product: 'ivory', point: 'mira', size: 'M', price: 2690, condition: 'Допущен к повторной продаже' },
  { id: 'T-L-07', product: 'navy', point: 'yara', size: 'L', price: 2790, condition: 'Допущен к повторной продаже' },
];

const app = document.querySelector('#app');
const queryInput = document.querySelector('#query');
const notice = document.querySelector('#notice');
const fxLayer = document.querySelector('#fxLayer');

const state = {
  page: 'home',
  from: 'home',
  q: '',
  category: '',
  sort: 'relevance',
  only: false,
  verifiedOnly: false,
  tierFilter: 'all',
  priceMin: '',
  priceMax: '',
  point: 'mira',
  product: 'classic',
  size: 'M',
  offer: 'fast',
  unit: '',
  tab: 'fast',
  sellerTab: 'promo',
  sellerSelectedProduct: 'classic',
  sellerBalance: 15000,
  simQuery: 'джинсы',
  promoModalTier: null,
  lastUpgraded: null,
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
const tierRank = tier => (PROMO_TIERS[tier]?.rank ?? 4);

const offerTabs = [['fast', 'Быстрее доставка'], ['cheap', 'Ниже цена'], ['local', 'Уже в ПВЗ']];
const storageKey = 'ozon-mvp-v5-seller';

function saveSession() {
  try {
    const payload = {
      cart: state.cart,
      order: state.order,
      orders: state.orders,
      favorites: [...state.favorites],
      reserved: [...state.reserved],
      completed: [...state.completed],
      point: state.point,
      sellerBalance: state.sellerBalance,
      products,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch { /* ignore storage restrictions */ }
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (Array.isArray(saved.products) && saved.products.length) products = saved.products;
    for (const k of ['cart', 'order', 'orders']) if (Array.isArray(saved[k])) state[k] = saved[k];
    for (const k of ['favorites', 'reserved', 'completed']) if (Array.isArray(saved[k])) state[k] = new Set(saved[k]);
    if (points[saved.point]) state.point = saved.point;
    if (typeof saved.sellerBalance === 'number') state.sellerBalance = saved.sellerBalance;
  } catch { /* fresh state */ }
}

/* =========================================================
   РАНГ И РЕЛЕВАНТНОСТЬ:
   Релевантность > 1 класс > 2 класс > 3 класс > Без продвижения
   ========================================================= */
function tokenize(text) {
  const aliases = { футболки: 'футболк', кружки: 'кружк', полотенца: 'полотенц', носки: 'носк', кроссовки: 'кеды', черные: 'чёрн', чёрные: 'чёрн', утепленные: 'утепл', утеплённые: 'утепл', широкие: 'широк', прямые: 'прям' };
  return text
    .trim()
    .toLocaleLowerCase('ru')
    .replace(/ё/g, 'е')
    .split(/\s+/)
    .filter(Boolean)
    .map(w => (aliases[w] || w).replace(/ё/g, 'е'));
}

function relevanceScore(p, rawQuery) {
  const q = rawQuery.trim();
  if (!q) return 1; // Без текстового запроса все товары категории равнорелевантны
  const norm = s => String(s).toLocaleLowerCase('ru').replace(/ё/g, 'е');
  const name = norm(p.name);
  const color = norm(p.color);
  const sku = norm(p.sku);
  const full = `${name} ${color} ${sku} ${norm(p.seller)}`;
  const terms = tokenize(q);

  if (!terms.every(t => full.includes(t))) return 0;

  let score = 0;
  const qNorm = norm(q);
  if (sku === qNorm || name === qNorm) return 100;

  for (const t of terms) {
    const words = name.split(/[^а-яa-z0-9]+/i).filter(Boolean);
    if (words.some(w => w === t)) score += 3;
    else if (words.some(w => w.startsWith(t))) score += 2;
    else if (name.includes(t)) score += 1;
    else if (color.includes(t)) score += 1;
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

    // Базовое правило: Релевантность > 1 класс > 2 класс > 3 класс > Без продвижения
    if (b.rel !== a.rel) return b.rel - a.rel;
    const tr = tierRank(a.p.promoTier) - tierRank(b.p.promoTier);
    if (tr !== 0) return tr;
    if (sortMode === 'popular') return b.p.reviews - a.p.reviews || b.p.rating - a.p.rating;
    return b.p.rating - a.p.rating || b.p.reviews - a.p.reviews;
  });

  return scored;
}

/* =========================================================
   HASH-МАРШРУТИЗАЦИЯ (работает и на file://, и на http://)
   ========================================================= */
function routeURL(page, changes = {}) {
  const r = { ...state, ...changes };
  const paths = {
    home: '/', catalog: '/search', nearby: '/nearby', seller: '/seller',
    favorites: '/favorites', orders: '/orders', cart: '/cart',
    checkout: '/checkout', result: '/orders/confirmation',
    bought: '/orders/completed', declined: '/orders/declined', ops: '/ops',
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
  if (page === 'seller' && r.sellerTab && r.sellerTab !== 'promo') params.set('tab', r.sellerTab);
  return '#' + path + (params.size ? '?' + params : '');
}

function readRoute() {
  const rawHash = location.hash.replace(/^#/, '') || '/';
  const [pathPart, searchPart] = rawHash.split('?');
  const path = pathPart.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(searchPart || '');

  const pages = {
    '/': 'home', '/search': 'catalog', '/nearby': 'nearby', '/seller': 'seller',
    '/favorites': 'favorites', '/orders': 'orders', '/cart': 'cart',
    '/checkout': 'checkout', '/orders/confirmation': 'result',
    '/orders/completed': 'bought', '/orders/declined': 'declined', '/ops': 'ops',
  };
  const productRoute = path.match(/^\/product\/([^/]+)(\/offers)?$/);
  state.page = pages[path] || 'home';
  if (state.page === 'catalog') {
    state.q = params.get('text') || '';
    state.category = categories[params.get('category')] ? params.get('category') : '';
    state.sort = ['relevance', 'popular', 'new', 'cheap', 'dear'].includes(params.get('sort')) ? params.get('sort') : 'relevance';
    state.only = params.get('nearby') === '1';
  }
  if (state.page === 'seller') {
    const t = params.get('tab');
    if (['promo', 'products', 'simulator'].includes(t)) state.sellerTab = t;
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
   ЭФФЕКТЫ И АНИМАЦИИ ПРИ ПОКУПКЕ УРОВНЯ ПРОДВИЖЕНИЯ
   ========================================================= */
function triggerTierPurchaseFX(tier, productName) {
  const info = PROMO_TIERS[tier];
  if (!info || tier === 0) return;

  const palettes = {
    1: ['#f1117e', '#7c3aed', '#005bff', '#ffb800', '#ffffff'],
    2: ['#005bff', '#3b82f6', '#60a5fa', '#ffffff'],
    3: ['#00a6a6', '#10c44c', '#34d399', '#ffffff'],
  };
  const colors = palettes[tier] || palettes[2];
  const count = tier === 1 ? 56 : tier === 2 ? 28 : 16;

  // Ударная волна
  const ring = document.createElement('div');
  ring.className = 'fx-ring';
  ring.style.setProperty('--ring-color', colors[0]);
  fxLayer.appendChild(ring);
  setTimeout(() => ring.remove(), 800);

  // Частицы / конфетти из центра экрана
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.42;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'fx-particle';
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const dist = (tier === 1 ? 260 : 170) + Math.random() * 200;
    el.style.left = `${cx}px`;
    el.style.top = `${cy}px`;
    el.style.background = colors[i % colors.length];
    el.style.width = `${6 + Math.random() * 8}px`;
    el.style.height = `${6 + Math.random() * 10}px`;
    el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * dist + 110}px`);
    el.style.setProperty('--rot', `${(Math.random() - 0.5) * 720}deg`);
    el.style.setProperty('--dur', `${0.85 + Math.random() * 0.65}s`);
    fxLayer.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }

  // Анимированный баннер уровня
  const banner = document.createElement('div');
  banner.className = `fx-banner t${tier}`;
  banner.innerHTML = `
    <span style="font-size:20px">${tier === 1 ? '👑' : tier === 2 ? '⚡' : '🚀'}</span>
    <div>
      <div>Подключён ${info.name} (${info.code})!</div>
      <div style="font-size:12px;font-weight:500;opacity:.92">${clean(productName)} · ${info.boostLabel}</div>
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
   ИКОНКИ И КОМПОНЕНТЫ
   ========================================================= */
const svgHeart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
const svgCheck = '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 2c3.723 0 6 2.277 6 6s-2.277 6-6 6-6-2.277-6-6 2.277-6 6-6m2.707 4.293a1 1 0 0 0-1.414 0L7.5 8.086l-.793-.793a1 1 0 1 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.414 0l2.5-2.5a1 1 0 0 0 0-1.414"/></svg>';
const svgCrown = '<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 8c-1.11 0-1 3.563-1 6.375C3 18.125 4.501 20 12.001 20s9-1.875 9-5.625C21 11.563 21.11 8 20 8c-1 0-1.824 2.425-2.57 3.39-.43.556-.622.641-.961-.171C15.8 9.619 14 5 12 5s-3.8 4.619-4.469 6.219c-.34.812-.531.726-.96.172C5.824 10.425 5 8 4 8"/></svg>';
const svgBag = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M10.19 1.393a.834.834 0 0 1 1.084.465L12.73 5.5h.842c.896 0 1.345 0 1.594.288s.185.732.056 1.619l-.227 1.553c-.396 2.721-.593 4.082-1.532 4.895s-2.315.812-5.065.812H7.6c-2.75 0-4.126 0-5.065-.812S1.4 11.68 1.003 8.96L.777 7.407C.648 6.52.584 6.077.833 5.788c.25-.288.698-.288 1.594-.288h.842l1.457-3.642a.834.834 0 0 1 1.547.618L5.063 5.5h5.873l-1.21-3.024a.834.834 0 0 1 .464-1.083"/></svg>';

function card(p, showAvailability = true, showPromoTag = true) {
  const found = unitsFor(p);
  const liked = state.favorites.has(p.id);
  const unit = (state.page === 'nearby' || state.only) ? found[0] : null;
  const size = found[0]?.size || (p.sizes.includes('M') ? 'M' : p.sizes[0]);
  const offer = unit ? 'local' : 'fast';
  const href = routeURL('product', { product: p.id, size, offer, unit: unit?.id || '' });
  const target = `href="${href}" data-action="product" data-id="${p.id}" data-size="${size}" data-offer="${offer}" data-unit="${unit?.id || ''}"`;
  const pct = discountPct(p);
  const tier = p.promoTier || 0;
  const tierMeta = PROMO_TIERS[tier];

  return `<article class="oz-card ${tier ? 'is-tier-' + tier : ''}">
    <div class="oz-card-visual">
      <a ${target} aria-label="Открыть ${clean(p.name)}">
        <img src="${imageUrls[p.imgKey || p.id] || imageUrls.classic}" alt="${clean(p.name)}" loading="lazy">
      </a>
      <button type="button" class="oz-fav-btn" data-action="favorite" data-id="${p.id}" aria-pressed="${liked}" aria-label="В избранное">${svgHeart}</button>
      ${showPromoTag && tier > 0 ? `<div class="oz-card-badges-top"><span class="oz-pill ${tierMeta.colorClass}">${tier === 1 ? '👑 ' : tier === 2 ? '⚡ ' : ''}${tierMeta.badge}</span></div>` : ''}
      <div class="oz-card-badges-bottom">
        ${showAvailability && found.length ? '<span class="oz-pill local">Сегодня в ПВЗ</span>' : pct >= 70 ? '<span class="oz-pill wow">✦ Вау-цены</span>' : ''}
      </div>
    </div>
    <div class="oz-card-body">
      <div class="oz-price-row">
        <span class="oz-price ${pct ? '' : 'regular'}">${rub(p.price)}</span>
        ${pct ? `<span class="oz-old-price">${rub(p.oldPrice)}</span><span class="oz-discount">−${pct}%</span>` : ''}
      </div>
      ${p.left && p.left <= 20 ? `<div class="oz-stock-left">${p.left} ед. осталось</div>` : ''}
      ${p.verified ? `<div class="oz-verified">${svgCheck}<span>Бренд проверен</span></div>` : ''}
      <a class="oz-card-title" ${target}>${clean(p.name)}</a>
      <div class="oz-rating-row">
        <span class="oz-rating-star">★ <b>${p.rating.toLocaleString('ru-RU')}</b></span>
        <span>•</span>
        <span>${currency.format(p.reviews || 120)} отзывов</span>
      </div>
      <div class="oz-card-cta-wrap">
        <a class="oz-card-cta ${showAvailability && found.length ? 'is-today' : ''}" ${target}>
          ${svgBag}
          <span>${showAvailability && found.length ? 'Сегодня' : 'Завтра'}</span>
        </a>
        ${tier === 1 ? `<span class="oz-crown-chip" title="Продвижение 1 класс">${svgCrown}</span>` : tier === 2 ? `<span class="oz-crown-chip is-tier2" title="Продвижение 2 класс">⚡</span>` : ''}
      </div>
    </div>
  </article>`;
}

/* =========================================================
   СТРАНИЦЫ ПОКУПАТЕЛЯ
   ========================================================= */
function storefront() {
  const ranked = rankProducts(products, '', 'relevance').map(x => x.p);
  return `
    <section class="oz-hero">
      <div>
        <span class="oz-hero-tag">✦ Новая коллекция · Осень–Зима</span>
        <h1>Своя посадка.<br>Свой деним на Ozon.</h1>
        <p>Выбирайте джинсы с доставкой завтра или забирайте сегодня в ближайшем пункте выдачи.</p>
        <div class="oz-hero-actions">
          <a href="#/search?category=clothes" class="oz-hero-btn" data-action="category" data-id="clothes">Смотреть каталог</a>
          <a href="#/seller" class="oz-hero-btn-alt" data-action="seller">Кабинет селлера · 3 уровня продвижения</a>
        </div>
      </div>
      <div class="oz-hero-photos">
        <img src="${imageUrls.washed}" alt="Джинсы широкие">
        <img src="${imageUrls.denim}" alt="Джинсы с высокой посадкой">
        <img src="${imageUrls.straight}" alt="Джинсы прямые">
      </div>
    </section>

    <div class="oz-season-strip">
      <div>
        <strong>Товары рядом в ПВЗ · Примерка сегодня</strong><br>
        <span>${points[state.point]} — вещи уже ждут на полке без ожидания доставки</span>
      </div>
      <a href="#/nearby" class="oz-hero-btn" data-action="nearby">Открыть «Товары рядом»</a>
    </div>

    <div class="section-head">
      <h2>Рекомендуем для вас</h2>
      <a href="#/search" class="linkbtn" data-action="category" data-id="">Смотреть все (${products.length}) →</a>
    </div>
    <section class="grid home-grid">${ranked.map(p => card(p, true, true)).join('')}</section>
  `;
}

function catalog() {
  const minP = state.priceMin !== '' ? Number(state.priceMin) : null;
  const maxP = state.priceMax !== '' ? Number(state.priceMax) : null;

  const filtered = products.filter(p => {
    if (state.category && (p.category || 'clothes') !== state.category) return false;
    if (state.only && !unitsFor(p).length) return false;
    if (state.verifiedOnly && !p.verified) return false;
    if (state.tierFilter !== 'all' && String(p.promoTier || 0) !== state.tierFilter) return false;
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
            <a href="#/search" class="linkbtn" data-action="category" data-id="">‹ Все категории</a>
            <div class="oz-cat-current">Одежда</div>
            <span class="oz-cat-sub">Мужская одежда</span>
            <span class="oz-cat-sub">Джинсы</span>
          </div>
        </div>

        <div class="oz-filter-group">
          <h3>Доставка</h3>
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
          <h3>Продвижение</h3>
          <select id="tierFilter" class="oz-select">
            <option value="all" ${state.tierFilter === 'all' ? 'selected' : ''}>Все уровни</option>
            <option value="1" ${state.tierFilter === '1' ? 'selected' : ''}>1 класс (Премиум)</option>
            <option value="2" ${state.tierFilter === '2' ? 'selected' : ''}>2 класс (Бизнес)</option>
            <option value="3" ${state.tierFilter === '3' ? 'selected' : ''}>3 класс (Старт)</option>
            <option value="0" ${state.tierFilter === '0' ? 'selected' : ''}>Без продвижения</option>
          </select>
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
          <div class="oz-sort-left">
            <select id="sort" class="oz-sort-select" aria-label="Сортировка">
              ${[
                ['relevance', 'По релевантности и классу'],
                ['popular', 'Популярные'],
                ['cheap', 'Сначала дешёвые'],
                ['dear', 'Сначала дорогие'],
                ['new', 'Новинки'],
              ].map(([k, v]) => `<option value="${k}" ${state.sort === k ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
            <span class="muted small">Найдено: <strong>${ranked.length}</strong></span>
          </div>
          <a href="#/seller" class="btn" data-action="seller">Управлять продвижением →</a>
        </div>

        <div class="oz-rank-banner">
          <div class="oz-rank-chain">
            <strong>Алгоритм выдачи:</strong>
            <span class="oz-pill" style="background:#eef4ff;color:#005bff">Релевантность</span>
            <span class="oz-rank-arrow">›</span>
            <span class="oz-pill tier-1">1 класс</span>
            <span class="oz-rank-arrow">›</span>
            <span class="oz-pill tier-2">2 класс</span>
            <span class="oz-rank-arrow">›</span>
            <span class="oz-pill tier-3">3 класс</span>
            <span class="oz-rank-arrow">›</span>
            <span class="oz-pill tier-0">Без продвижения</span>
          </div>
        </div>

        ${ranked.length
          ? `<div class="grid">${ranked.map(({ p }) => card(p, true, true)).join('')}</div>`
          : `<div class="empty-box"><h3>Ничего не нашлось</h3><p class="muted">Попробуйте ослабить фильтры или изменить поисковый запрос.</p><button type="button" class="btn primary" data-action="resetFilter">Сбросить фильтры</button></div>`}
      </section>
    </div>
  `;
}

function nearby() {
  const items = rankProducts(products.filter(p => unitsFor(p).length), '', 'relevance').map(x => x.p);
  return `
    <div class="section-head">
      <div>
        <h1>Товары рядом</h1>
        <p class="muted" style="margin:4px 0 0">Уже в выбранном пункте выдачи. Можно примерить и забрать сегодня.</p>
      </div>
      <div style="min-width:260px">
        <select id="point" class="oz-select">
          ${Object.entries(points).map(([k, v]) => `<option value="${k}" ${state.point === k ? 'selected' : ''}>ПВЗ: ${v}</option>`).join('')}
        </select>
      </div>
    </div>
    ${items.length
      ? `<section class="grid home-grid">${items.map(p => card(p, true, true)).join('')}</section>`
      : `<div class="empty-box">В этом пункте пока нет свободных товаров. Выберите другой ПВЗ.</div>`}
  `;
}

function selectedProductOffer(p) {
  const local = unitsFor(p, state.size);
  const unit = local.find(item => item.id === state.unit) || local[0];
  if (state.offer === 'local' && unit) {
    return { kind: 'local', unit, price: unit.price, seller: p.seller, delivery: 'Забрать сегодня', note: 'Уже в выбранном пункте выдачи' };
  }
  if (state.offer === 'cheap') {
    return { kind: 'cheap', price: p.cheap, seller: 'Мир денима', delivery: 'Доставим через 3 дня', note: 'Со склада в пункт выдачи' };
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
    seller: kind === 'cheap' ? 'Мир денима' : item.seller, point: state.point,
    delivery: kind === 'cheap' ? 'Через 3 дня' : 'Завтра',
    slot: kind === 'cheap' ? 'Доставка через 3 дня' : 'Доставка завтра', speed: kind === 'cheap' ? 2 : 1,
  });
  const similar = rankProducts(
    products.filter(item => item.id !== p.id && item.category === p.category && item.sizes.includes(state.size)),
    '',
    'relevance'
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
      <img src="${imageUrls[p.imgKey || p.id] || imageUrls.classic}" alt="${clean(p.name)}">
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
  const tierMeta = PROMO_TIERS[p.promoTier || 0];
  const offersList = visibleProductOffers(p);

  return `
    <div class="pdp-top">
      <div class="oz-breadcrumbs" style="margin:0">
        <a href="#/search" class="linkbtn" data-action="backListing">← Назад</a>
        <span>•</span>
        <span>${categories[p.category || 'clothes']}</span>
        <span>•</span>
        <span>${clean(p.seller)}</span>
      </div>
      <div class="pdp-actions-inline">
        <span>Артикул: <strong>${p.sku}</strong></span>
        ${p.promoTier ? `<span class="oz-pill ${tierMeta.colorClass}">${tierMeta.badge}</span>` : ''}
      </div>
    </div>

    <section class="pdp-layout">
      <div class="pdp-gallery">
        <div class="pdp-gallery-main">
          <img src="${imageUrls[p.imgKey || p.id] || imageUrls.classic}" alt="${clean(p.name)}">
        </div>
        <div class="pdp-labels">
          <span class="pdp-label">Постоплата при получении</span>
          ${p.verified ? `<span class="pdp-label is-green">${svgCheck} Товар проверен</span>` : ''}
          ${offer.kind === 'local' ? '<span class="pdp-label is-green">Уже в ПВЗ сегодня</span>' : ''}
        </div>
      </div>

      <div class="pdp-info">
        <h1>${clean(p.name)}</h1>
        <div class="pdp-meta">
          <span class="oz-rating-star">★ <b>${p.rating.toLocaleString('ru-RU')}</b></span>
          <span>${currency.format(p.reviews || 120)} отзывов</span>
          <span>•</span>
          <span>Цвет: ${clean(p.color)}</span>
        </div>

        <div class="pdp-section-title">Размер</div>
        <div class="sizes">
          ${p.sizes.map(sz => `<button type="button" class="size-btn" data-action="size" data-id="${sz}" aria-pressed="${state.size === sz}">${sz}</button>`).join('')}
        </div>

        <div class="pdp-section-title">О товаре</div>
        <dl class="pdp-specs">
          <div><dt>Тип</dt><dd>Джинсы</dd></div>
          <div><dt>Цвет</dt><dd>${clean(p.color)}</dd></div>
          <div><dt>Выбранный размер</dt><dd>${state.size}</dd></div>
          <div><dt>Состав</dt><dd>Хлопок 98%, эластан 2%</dd></div>
          <div><dt>Продавец</dt><dd>${clean(p.seller)}</dd></div>
          <div><dt>Уровень продвижения</dt><dd><span class="oz-pill ${tierMeta.colorClass}">${tierMeta.code}</span></dd></div>
        </dl>
      </div>

      <aside class="pdp-side">
        <div class="oz-sale-card">
          <div class="oz-bank-price-box">
            <div>
              <div class="oz-bank-price">${rub(ozonCardPrice)}</div>
              <div class="oz-bank-caption">С картой Ozon Банка</div>
            </div>
            ${pct ? `<span class="oz-pill" style="background:var(--oz-magenta);color:#fff">−${pct}%</span>` : ''}
          </div>
          <div class="oz-regular-price-row">
            <strong>${rub(offer.price)}</strong>
            ${pct ? `<span class="oz-old-price">${rub(p.oldPrice)}</span>` : ''}
            <span class="muted small">с другими банками</span>
          </div>

          <div class="pdp-buy-row">
            ${offer.kind === 'local'
              ? `<button type="button" class="pdp-buy-btn" data-action="addLocal" data-id="${offer.unit.id}"><span>В корзину</span><small>${offer.delivery}</small></button>`
              : `<button type="button" class="pdp-buy-btn" data-action="addRemote" data-id="${offer.kind}"><span>В корзину</span><small>${offer.delivery}</small></button>`}
            <button type="button" class="pdp-fav-square" data-action="favorite" data-id="${p.id}" aria-pressed="${liked}" aria-label="В избранное">${svgHeart}</button>
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
          <div class="oz-seller-mini-left">
            <div class="oz-seller-avatar">${clean(p.seller[0] || 'D')}</div>
            <div>
              <div style="display:flex;align-items:center;gap:6px;font-weight:700">
                <span>${clean(p.seller)}</span>
                ${p.promoTier === 1 ? `<span style="color:var(--oz-magenta)" title="1 класс">${svgCrown}</span>` : ''}
              </div>
              <div class="muted small">★ ${p.rating} · 15 дней на возврат</div>
            </div>
          </div>
          <a href="#/seller" class="btn subtle" style="padding:8px 12px;font-size:12.5px" data-action="seller">Кабинет</a>
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
        <p class="muted small" style="margin-top:0">${clean(p.name)} и похожие товары в категории</p>
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
   КАБИНЕТ СЕЛЛЕРА И 3 УРОВНЯ ПРОДВИЖЕНИЯ
   ========================================================= */
function sellerPage() {
  const promotedCount = products.filter(p => (p.promoTier || 0) > 0).length;
  const tier1Count = products.filter(p => p.promoTier === 1).length;
  const estViews = products.reduce((sum, p) => sum + ({ 1: 4200, 2: 2300, 3: 1450, 0: 950 }[p.promoTier || 0]), 0);
  const selectedProd = productById(state.sellerSelectedProduct) || products[0];

  // Позиции в выдаче по запросу «джинсы»
  const currentRanking = rankProducts(products, 'джинсы', 'relevance');
  const posMap = new Map(currentRanking.map((item, idx) => [item.p.id, idx + 1]));

  const promoTabView = () => `
    <div class="rank-ladder">
      <div class="rank-ladder-head">
        <h2>Как работает приоритет в поиске Ozon</h2>
        <a href="#/search?text=${encodeURIComponent('джинсы')}" class="linkbtn" data-action="openSearch" data-id="джинсы">Проверить в живой выдаче →</a>
      </div>
      <div class="rank-steps">
        <div class="rank-step step-rel">
          <div class="rank-step-num">Шаг 1 · База</div>
          <strong>Релевантность</strong>
          <small>Точность совпадения с запросом</small>
        </div>
        <div class="rank-step step-t1">
          <div class="rank-step-num">Уровень 1 · Максимум</div>
          <strong>👑 Первый класс</strong>
          <small>Топ-позиции и корона</small>
        </div>
        <div class="rank-step step-t2">
          <div class="rank-step-num">Уровень 2 · Ускорение</div>
          <strong>⚡ 2 класс</strong>
          <small>Выше 3 класса и органики</small>
        </div>
        <div class="rank-step step-t3">
          <div class="rank-step-num">Уровень 3 · Базовый</div>
          <strong>🚀 3 класс</strong>
          <small>Выше обычной выдачи</small>
        </div>
        <div class="rank-step">
          <div class="rank-step-num">Органика</div>
          <strong>Без продвижения</strong>
          <small>Сортировка по рейтингу</small>
        </div>
      </div>
    </div>

    <div class="block" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <div class="muted small">Товар для быстрого подключения тарифа</div>
        <strong style="font-size:16px">${clean(selectedProd.name)}</strong>
        <span class="oz-pill ${PROMO_TIERS[selectedProd.promoTier || 0].colorClass}" style="margin-left:8px">${PROMO_TIERS[selectedProd.promoTier || 0].code}</span>
        <span class="muted small" style="margin-left:8px">Текущее место по «джинсы»: <strong>#${posMap.get(selectedProd.id)}</strong></span>
      </div>
      <select id="sellerTargetProduct" class="oz-select" style="width:auto;min-width:260px">
        ${products.map(p => `<option value="${p.id}" ${p.id === selectedProd.id ? 'selected' : ''}>${clean(p.name)} (${PROMO_TIERS[p.promoTier || 0].code})</option>`).join('')}
      </select>
    </div>

    <div class="tiers-grid">
      ${[3, 2, 1].map(t => {
        const meta = PROMO_TIERS[t];
        const isCurrent = (selectedProd.promoTier || 0) === t;
        return `<article class="tier-card level-${t}">
          <div class="tier-head">
            <span class="tier-level-tag">${t === 1 ? '👑 ' : t === 2 ? '⚡ ' : '🚀 '}Уровень ${t === 1 ? '3 / MAX' : t === 2 ? '2 / PRO' : '1 / START'} · ${meta.code}</span>
            <span class="tier-stars">${meta.stars}</span>
          </div>
          <div>
            <h3>${meta.name}</h3>
            <p class="muted small" style="margin:4px 0 0">${meta.subtitle}</p>
          </div>
          <div class="tier-price">${rub(meta.price)} <small>/ 7 дней</small></div>
          <div>
            <div class="tier-power-label"><span>Сила буста в выдаче</span><strong>${meta.boostLabel}</strong></div>
            <div class="tier-bar"><div class="tier-bar-fill"></div></div>
          </div>
          <ul class="tier-perks">
            ${meta.perks.map(pk => `<li><span>${pk}</span></li>`).join('')}
          </ul>
          <div class="tier-card-footer">
            <button type="button" class="tier-buy-btn" data-action="buyTier" data-id="${selectedProd.id}" data-tier="${t}" ${isCurrent ? 'disabled style="opacity:.65;cursor:default"' : ''}>
              ${isCurrent ? `✓ Активен для этого товара` : `Купить «${meta.code}» за ${rub(meta.price)}`}
            </button>
          </div>
        </article>`;
      }).join('')}
    </div>

    <div class="seller-table-wrap">
      <div class="section-head" style="margin-top:0">
        <h2 style="font-size:18px">Управление уровнями по всем товарам</h2>
        <span class="muted small">Нажмите на уровень — продвижение применится мгновенно</span>
      </div>
      ${products.map(p => {
        const tier = p.promoTier || 0;
        const pos = posMap.get(p.id);
        const fxClass = state.lastUpgraded && state.lastUpgraded.id === p.id ? `just-upgraded-${state.lastUpgraded.tier}` : '';
        return `<div class="seller-product-row ${fxClass}">
          <img class="seller-thumb" src="${imageUrls[p.imgKey || p.id] || imageUrls.classic}" alt="">
          <div>
            <div style="font-weight:700">${clean(p.name)}</div>
            <div class="muted small">Арт. ${p.sku} · ${clean(p.color)} · Место в выдаче: <strong>#${pos}</strong></div>
          </div>
          <div>
            <strong>${rub(p.price)}</strong>
            <div class="muted small">★ ${p.rating}</div>
          </div>
          <div>
            <span class="oz-pill ${PROMO_TIERS[tier].colorClass}">${PROMO_TIERS[tier].code}</span>
          </div>
          <div class="tier-switcher">
            <button type="button" class="tier-chip-btn ${tier === 0 ? 'active-0' : ''}" data-action="buyTier" data-id="${p.id}" data-tier="0">Без</button>
            <button type="button" class="tier-chip-btn ${tier === 3 ? 'active-3' : ''}" data-action="buyTier" data-id="${p.id}" data-tier="3">3 класс</button>
            <button type="button" class="tier-chip-btn ${tier === 2 ? 'active-2' : ''}" data-action="buyTier" data-id="${p.id}" data-tier="2">2 класс</button>
            <button type="button" class="tier-chip-btn ${tier === 1 ? 'active-1' : ''}" data-action="buyTier" data-id="${p.id}" data-tier="1">👑 1 класс</button>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;

  const productsTabView = () => `
    <div class="block">
      <h2 style="margin:0 0 14px;font-size:18px">Добавить новый товар в магазин</h2>
      <form id="addProductForm" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;align-items:end">
        <label class="small muted">Название товара<input class="oz-input" name="name" required placeholder="Например: Джинсы карго утеплённые"></label>
        <label class="small muted">Цвет<input class="oz-input" name="color" required placeholder="Например: Графитовые"></label>
        <label class="small muted">Цена, ₽<input class="oz-input" name="price" type="number" min="100" value="2890" required></label>
        <label class="small muted">Фото (из локальных)<select class="oz-select" name="imgKey">
          ${Object.keys(imageUrls).map(k => `<option value="${k}">${k}.webp</option>`).join('')}
        </select></label>
        <label class="small muted">Уровень продвижения<select class="oz-select" name="promoTier">
          <option value="0">Без продвижения (0 ₽)</option>
          <option value="3">3 класс · Старт (490 ₽)</option>
          <option value="2">2 класс · Бизнес (1 290 ₽)</option>
          <option value="1">1 класс · Премиум (2 990 ₽)</option>
        </select></label>
        <button type="submit" class="btn primary" style="height:38px">Опубликовать товар</button>
      </form>
    </div>

    <div class="seller-table-wrap">
      <h2 style="margin:0 0 12px;font-size:18px">Каталог продавца (${products.length} SKU)</h2>
      ${products.map(p => `
        <div class="seller-product-row">
          <img class="seller-thumb" src="${imageUrls[p.imgKey || p.id] || imageUrls.classic}" alt="">
          <div>
            <strong>${clean(p.name)}</strong>
            <div class="muted small">Арт. ${p.sku} · ${clean(p.color)}</div>
          </div>
          <div><input class="oz-input" style="height:34px" type="number" min="100" value="${p.price}" data-price-edit="${p.id}" aria-label="Цена ${clean(p.name)}"></div>
          <div><span class="oz-pill ${PROMO_TIERS[p.promoTier || 0].colorClass}">${PROMO_TIERS[p.promoTier || 0].code}</span></div>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <a href="${routeURL('product', { product: p.id, size: 'M', offer: 'fast' })}" class="btn subtle" style="padding:7px 12px;font-size:12.5px" data-action="product" data-id="${p.id}">Карточка</a>
            <button type="button" class="btn" style="padding:7px 12px;font-size:12.5px" data-action="savePrice" data-id="${p.id}">Сохранить цену</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const simulatorTabView = () => {
    const simRanked = rankProducts(products, state.simQuery, 'relevance');
    return `
      <div class="sim-box">
        <div class="section-head" style="margin-top:0">
          <div>
            <h2 style="font-size:18px">Симулятор поисковой выдачи</h2>
            <p class="muted small" style="margin:4px 0 0">Введите запрос — таблица покажет итоговый порядок: <strong>Релевантность → 1 класс → 2 класс → 3 класс → Без продвижения</strong></p>
          </div>
          <a href="#/search?text=${encodeURIComponent(state.simQuery)}" class="btn primary" data-action="openSearch" data-id="${clean(state.simQuery)}">Открыть как покупатель</a>
        </div>

        <div class="sim-controls">
          <input id="simQuery" class="oz-input" style="max-width:360px" value="${clean(state.simQuery)}" placeholder="Например: джинсы, широкие, чёрные, флис">
          ${['джинсы', 'широкие', 'чёрные', 'багги', 'стрейч'].map(w => `<button type="button" class="btn subtle" style="padding:6px 12px;font-size:13px" data-action="setSimQuery" data-id="${w}">${w}</button>`).join('')}
        </div>

        ${simRanked.length ? simRanked.map(({ p, rel }, idx) => {
          const tier = p.promoTier || 0;
          const posClass = idx === 0 ? 'top1' : idx === 1 ? 'top2' : idx === 2 ? 'top3' : '';
          return `<div class="sim-row">
            <span class="sim-pos ${posClass}">#${idx + 1}</span>
            <img class="seller-thumb" style="width:40px;height:52px" src="${imageUrls[p.imgKey || p.id] || imageUrls.classic}" alt="">
            <div><strong>${clean(p.name)}</strong><div class="muted small">${clean(p.color)} · ${rub(p.price)}</div></div>
            <div><span class="oz-pill" style="background:#eef4ff;color:#005bff">Релев.: ${rel}</span></div>
            <div><span class="oz-pill ${PROMO_TIERS[tier].colorClass}">${PROMO_TIERS[tier].code}</span></div>
            <div class="muted small">${tier === 1 ? 'Топ в группе релевантности' : tier === 2 ? 'Выше 3 класса и органики' : tier === 3 ? 'Выше органики' : 'Органическая позиция'}</div>
          </div>`;
        }).join('') : '<p class="muted">По этому запросу совпадений нет.</p>'}
      </div>
    `;
  };

  return `
    <div class="seller-shell">
      <section class="seller-topbar">
        <div>
          <span class="seller-badge-pill">OZON SELLER · КАБИНЕТ ПРОДАВЦА</span>
          <h1>Denim Store · Центр продвижения</h1>
          <p>Управляйте 3 уровнями подписки и мгновенно проверяйте позиции в выдаче Ozon.</p>
        </div>
        <div class="seller-wallet">
          <div>
            <small>Баланс продвижения</small>
            <strong>${rub(state.sellerBalance)}</strong>
          </div>
          <button type="button" class="oz-hero-btn" style="padding:10px 14px;font-size:13px" data-action="topup">+ 5 000 ₽</button>
        </div>
      </section>

      <section class="seller-kpis">
        <div class="seller-kpi">
          <small>Товаров в продвижении</small>
          <strong>${promotedCount} из ${products.length}</strong>
          <span class="kpi-sub">${tier1Count} в Первом классе</span>
        </div>
        <div class="seller-kpi">
          <small>Прогноз показов / 7 дн.</small>
          <strong>${currency.format(estViews)}</strong>
          <span class="kpi-sub">↑ Расчёт по тарифам</span>
        </div>
        <div class="seller-kpi">
          <small>Формула ранжирования</small>
          <strong style="font-size:18px;padding-top:4px">Рел. › 1 › 2 › 3 › 0</strong>
          <span class="kpi-sub">Активна в поиске</span>
        </div>
        <div class="seller-kpi">
          <small>Рейтинг магазина</small>
          <strong>4.9 ★</strong>
          <span class="kpi-sub">Премиум-статус доступен</span>
        </div>
      </section>

      <div class="seller-nav" role="tablist">
        <button type="button" class="seller-tab" data-action="sellerTab" data-id="promo" aria-pressed="${state.sellerTab === 'promo'}">🚀 Продвижение (3 уровня)</button>
        <button type="button" class="seller-tab" data-action="sellerTab" data-id="products" aria-pressed="${state.sellerTab === 'products'}">📦 Мои товары (${products.length})</button>
        <button type="button" class="seller-tab" data-action="sellerTab" data-id="simulator" aria-pressed="${state.sellerTab === 'simulator'}">📊 Симулятор выдачи</button>
      </div>

      ${state.sellerTab === 'promo' ? promoTabView() : state.sellerTab === 'products' ? productsTabView() : simulatorTabView()}
    </div>
  `;
}

/* =========================================================
   ИЗБРАННОЕ, КОРЗИНА, ОФОРМЛЕНИЕ, ЗАКАЗЫ, OPS
   ========================================================= */
function favorites() {
  const items = products.filter(p => state.favorites.has(p.id));
  return `<div class="section-head"><h1>Избранное</h1></div>
    ${items.length ? `<section class="grid home-grid">${items.map(p => card(p, true, true)).join('')}</section>`
      : `<div class="empty-box"><h3>В избранном пока пусто</h3><p class="muted">Нажимайте на сердечко на карточках, чтобы сохранить понравившиеся товары.</p><a href="#/search" class="btn primary" data-action="category" data-id="">Перейти в каталог</a></div>`}`;
}

const entryLocal = unit => ({ key: unit.id, id: unit.id, product: unit.product, size: unit.size, point: unit.point, price: unit.price, slot: 'Уже в выбранном ПВЗ' });
function addCart(item) {
  if (state.cart.some(x => x.key === item.key)) { say('Этот товар уже в корзине'); return; }
  state.cart.push(item);
  render();
  say('Добавлено в корзину');
}
const cartTotal = items => rub(items.reduce((s, r) => s + r.price, 0));
function cartItemRow(item, removable) {
  const p = productById(item.product);
  return `<div class="cart-row">
    <div class="cart-row-left">
      <img src="${imageUrls[p.imgKey || p.id] || imageUrls.classic}" alt="">
      <div>
        <strong>${clean(p.name)} · ${item.size}</strong>
        <div class="muted small">${points[item.point]}</div>
        <div class="muted small">${item.slot}</div>
      </div>
    </div>
    <div style="text-align:right">
      <strong style="font-size:17px">${rub(item.price)}</strong>
      ${removable ? `<div><button type="button" class="linkbtn small" data-action="remove" data-id="${item.key}">Удалить</button></div>` : ''}
    </div>
  </div>`;
}
function orderSummary(items, action, label) {
  return `<aside class="block">
    <h2 style="margin:0 0 14px;font-size:18px">Ваш заказ</h2>
    <div class="summary-line"><span>Товары (${items.length})</span><span>${cartTotal(items)}</span></div>
    <div class="summary-line"><span>Доставка в ПВЗ</span><span style="color:var(--oz-green-dark);font-weight:600">Бесплатно</span></div>
    <div class="summary-line" style="font-size:18px;font-weight:800;padding-top:10px;border-top:1px solid var(--oz-border)"><span>Итого</span><span>${cartTotal(items)}</span></div>
    <button type="button" class="btn primary" style="width:100%;height:46px;margin-top:8px" data-action="${action}">${label}</button>
  </aside>`;
}
function cart() {
  return `<div class="section-head"><h1>Корзина</h1><a href="#/" class="linkbtn" data-action="home">На главную</a></div>
    ${state.cart.length ? `<div class="order-page"><section class="block">${state.cart.map(x => cartItemRow(x, true)).join('')}</section>${orderSummary(state.cart, 'checkout', 'Перейти к оформлению')}</div>`
      : `<div class="empty-box"><h3>Корзина пуста</h3><p class="muted">Загляните в каталог или раздел «Товары рядом».</p><a href="#/search" class="btn primary" data-action="category" data-id="">К покупкам</a></div>`}`;
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
          <h2 style="margin:0 0 6px;font-size:17px">Оплата при получении</h2>
          <p class="muted small" style="margin:0">Одежду можно примерить в ПВЗ перед выкупом.</p>
        </section>
      </div>
      ${orderSummary(state.cart, 'confirm', 'Оформить заказ')}
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
      ${onSite ? `<button type="button" class="btn primary" data-action="buy">Забрать заказ</button><button type="button" class="btn subtle" data-action="decline">Отказаться</button>` : `<a href="#/" class="btn primary" data-action="home">Вернуться на главную</a>`}
    </div>
  </section>`;
}
function finish(declined) {
  return `<section class="empty-box" style="max-width:600px;margin:0 auto">
    <h1>${declined ? 'Отказ зарегистрирован' : 'Выкуп завершён'}</h1>
    <p class="muted">${declined ? 'Экземпляр скрыт из подбора до повторного осмотра в ПВЗ.' : 'Экземпляр снят с остатка. Спасибо за покупку на Ozon!'}</p>
    <a href="#/" class="btn primary" data-action="home">На главную</a>
  </section>`;
}
function orders() {
  return `<div class="section-head"><h1>Заказы</h1></div>
    <div class="stack">
      ${state.orders.length ? state.orders.map(o => `<section class="block"><span class="oz-pill local" style="margin-bottom:8px">${o.status}</span>${o.items.map(x => cartItemRow(x, false)).join('')}</section>`).join('')
        : `<div class="empty-box"><h3>Заказов пока нет</h3><p class="muted">Оформите заказ в корзине, и он появится здесь.</p></div>`}
    </div>`;
}
function ops() {
  return `<section class="block" style="max-width:720px;margin:0 auto">
    <h1 style="margin-top:0">Отбор вещей для локальной продажи в ПВЗ</h1>
    <form id="ops" style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <label class="small muted">Заказы за 28 дней<input class="oz-input" name="orders" type="number" min="0" value="14" required></label>
      <label class="small muted">Порог отбора<input class="oz-input" name="limit" type="number" min="0" value="8" required></label>
      <label class="small muted">Экономия логистики, ₽<input class="oz-input" name="savings" type="number" min="0" step="0.01" value="120" required></label>
      <label class="small muted">Операции ПВЗ, ₽<input class="oz-input" name="handling" type="number" min="0" step="0.01" value="25" required></label>
      <button class="btn primary" style="grid-column:1/-1">Рассчитать</button>
    </form>
    <output id="ops-result" style="display:block;margin-top:14px;font-weight:700"></output>
  </section>`;
}

/* =========================================================
   РЕНДЕР И СОБЫТИЯ
   ========================================================= */
function render() {
  saveSession();
  const pages = {
    home: storefront, catalog, nearby, seller: sellerPage,
    product: productPage, offers: offersModal, favorites,
    orders, cart, checkout, result,
    bought: () => finish(false), declined: () => finish(true), ops,
  };
  app.innerHTML = (pages[state.page] || storefront)();
  queryInput.value = state.q;
  document.querySelector('.oz-search-clear').hidden = !state.q;
  document.querySelector('#searchScope').value = state.category;
  document.querySelector('#count').textContent = String(state.cart.length);
  document.querySelector('#mobileCount').textContent = String(state.cart.length);
  const favBadge = document.querySelector('#favCount');
  favBadge.textContent = String(state.favorites.size);
  favBadge.hidden = state.favorites.size === 0;
  document.querySelector('#pointLink').textContent = `Москва • ${points[state.point]}`;
  document.body.classList.toggle('checkout-mode', state.page === 'checkout');

  for (const el of document.querySelectorAll('header a[data-action], .mobile-bar a[data-action]')) {
    const match = (el.dataset.action === state.page) || (el.dataset.action === 'category' && state.page === 'catalog' && el.dataset.id === state.category);
    if (match) el.setAttribute('aria-current', 'page');
    else el.removeAttribute('aria-current');
  }

  const titles = {
    home: 'Ozon — маркетплейс',
    catalog: state.q ? `${state.q} — купить на Ozon` : 'Каталог — Ozon',
    nearby: 'Товары рядом · Ozon',
    seller: 'Ozon Seller · Продвижение (3 уровня)',
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
  const oldTier = p.promoTier || 0;
  if (oldTier === newTier) return;
  const cost = PROMO_TIERS[newTier]?.price || 0;
  if (cost > 0 && state.sellerBalance < cost) {
    say('Недостаточно средств на балансе — нажмите «+ 5 000 ₽»');
    return;
  }
  if (cost > 0) state.sellerBalance -= cost;
  p.promoTier = newTier;
  state.sellerSelectedProduct = p.id;
  state.lastUpgraded = newTier > 0 ? { id: p.id, tier: newTier } : null;
  render();
  if (newTier > 0) {
    triggerTierPurchaseFX(newTier, p.name);
  } else {
    say(`Продвижение отключено для «${p.name}»`);
  }
  setTimeout(() => { state.lastUpgraded = null; }, 1200);
}

document.querySelector('#search').addEventListener('submit', e => {
  e.preventDefault();
  state.q = queryInput.value.trim();
  state.category = document.querySelector('#searchScope').value;
  state.sort = 'relevance';
  go('catalog');
});

queryInput.addEventListener('input', () => {
  document.querySelector('.oz-search-clear').hidden = !queryInput.value;
});

document.addEventListener('input', e => {
  if (e.target.id === 'simQuery') {
    state.simQuery = e.target.value;
    render();
    const el = document.querySelector('#simQuery');
    if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  }
});

document.addEventListener('change', e => {
  const { id, value, checked } = e.target;
  if (id === 'point') state.point = value;
  else if (id === 'sort') state.sort = value;
  else if (id === 'only') state.only = checked;
  else if (id === 'verifiedOnly') state.verifiedOnly = checked;
  else if (id === 'tierFilter') state.tierFilter = value;
  else if (id === 'priceMin') state.priceMin = value;
  else if (id === 'priceMax') state.priceMax = value;
  else if (id === 'sellerTargetProduct') state.sellerSelectedProduct = value;
  else return;
  render();
});

document.addEventListener('submit', e => {
  if (e.target.id === 'ops') {
    e.preventDefault();
    const f = new FormData(e.target);
    const ordersN = Number(f.get('orders'));
    const limit = Number(f.get('limit'));
    const net = Number(f.get('savings')) - Number(f.get('handling'));
    document.querySelector('#ops-result').textContent = `${ordersN >= limit ? 'Проходит порог спроса' : 'Ниже порога'} · ${(ordersN / 28).toFixed(2)} заказа/день · вклад ${rub(net)}`;
  }
  if (e.target.id === 'addProductForm') {
    e.preventDefault();
    const f = new FormData(e.target);
    const tier = Number(f.get('promoTier')) || 0;
    const cost = PROMO_TIERS[tier]?.price || 0;
    if (cost > state.sellerBalance) {
      say('Недостаточно средств на балансе для выбранного класса');
      return;
    }
    if (cost > 0) state.sellerBalance -= cost;
    const price = Math.max(100, Number(f.get('price')) || 2590);
    const id = 'custom-' + Date.now();
    const newProd = {
      id,
      imgKey: String(f.get('imgKey') || 'classic'),
      sku: String(601284200 + products.length),
      category: 'clothes',
      name: String(f.get('name')).trim(),
      color: String(f.get('color')).trim(),
      sizes: ['S', 'M', 'L', 'XL'],
      price,
      oldPrice: Math.round(price * 2.4),
      cheap: Math.round(price * 0.9),
      recent: products.length + 1,
      rating: 5.0,
      reviews: 1,
      left: 15,
      verified: true,
      seller: 'Denim Store',
      promoTier: tier,
    };
    products.unshift(newProd);
    state.sellerSelectedProduct = id;
    render();
    if (tier > 0) triggerTierPurchaseFX(tier, newProd.name);
    else say(`Товар «${newProd.name}» добавлен в каталог`);
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
    case 'clearQuery':
      queryInput.value = '';
      state.q = '';
      queryInput.focus();
      document.querySelector('.oz-search-clear').hidden = true;
      break;
    case 'home': state.q = ''; state.category = ''; state.only = false; go('home'); break;
    case 'nearby': state.q = ''; state.category = ''; state.only = false; go('nearby'); break;
    case 'seller': go('seller'); break;
    case 'sellerTab': state.sellerTab = id; go('seller'); break;
    case 'topup': state.sellerBalance += 5000; render(); say('Баланс пополнен на 5 000 ₽'); break;
    case 'buyTier': purchaseTier(id, Number(b.dataset.tier)); break;
    case 'setSimQuery': state.simQuery = id; render(); break;
    case 'openSearch': state.q = id || ''; state.category = ''; state.sort = 'relevance'; go('catalog'); break;
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
    case 'category': state.q = ''; state.category = id; state.only = false; go('catalog'); break;
    case 'point': go(state.page === 'nearby' ? 'nearby' : 'catalog'); document.querySelector('#point')?.focus(); break;
    case 'backListing': go(state.from || 'catalog'); break;
    case 'resetFilter':
      state.q = ''; state.only = false; state.verifiedOnly = false;
      state.tierFilter = 'all'; state.priceMin = ''; state.priceMax = '';
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
    case 'favorite':
      if (state.favorites.has(id)) state.favorites.delete(id);
      else state.favorites.add(id);
      render();
      break;
    case 'favorites': go('favorites'); break;
    case 'orders': go('orders'); break;
    case 'ops': go('ops'); break;
    case 'offers': go('offers'); break;
    case 'backProduct': go('product'); break;
    case 'dismiss': if (e.target === b) go('product'); break;
    case 'tab': state.tab = id; render(); break;
    case 'size':
      state.size = id;
      if (state.offer === 'local') {
        const u = unitsFor(p, id)[0];
        state.unit = u?.id || '';
        if (!u) state.offer = 'fast';
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
        addCart({ key: item.key, product: item.product, size: item.size, point: item.point, price: item.price, slot: item.slot });
      }
      break;
    }
    case 'addRemote':
      addCart({ key: `${p.id}-${state.size}-${state.point}-${id}`, product: p.id, size: state.size, point: state.point, price: id === 'fast' ? p.price : p.cheap, slot: id === 'fast' ? 'Доставка завтра' : 'Доставка через 3 дня' });
      break;
    case 'remove': state.cart = state.cart.filter(x => x.key !== id); render(); break;
    case 'cart': go('cart'); break;
    case 'checkout': if (state.cart.length) go('checkout'); break;
    case 'confirm':
      if (state.cart.length) {
        state.order = [...state.cart];
        state.orders.unshift({ items: [...state.cart], status: 'Заказ оформлен' });
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
