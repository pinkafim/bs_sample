import React from 'react';
import { Package, RotateCcw, Search, ShoppingBag, Store } from 'lucide-react';
import { useDemo } from '../../store/DemoContext';
import { CatalogView } from './CatalogView';
import { ProductDetailView } from './ProductDetailView';
import { CartView, CheckoutView, OrdersView } from './CartCheckoutOrders';

export const BuyerApp: React.FC = () => {
  const {
    buyerTab,
    setBuyerTab,
    selectedProductId,
    closeProduct,
    checkoutOpen,
    cart,
    orders,
    setMode,
    resetDemo,
  } = useDemo();

  const renderScreen = () => {
    if (checkoutOpen) return <CheckoutView />;
    if (selectedProductId) return <ProductDetailView />;
    if (buyerTab === 'cart') return <CartView />;
    if (buyerTab === 'orders') return <OrdersView />;
    return <CatalogView />;
  };

  return (
    <div className="w-full lg:w-[392px] lg:h-[780px] min-h-[100dvh] lg:min-h-0 bg-[#F8FAFC] lg:rounded-[44px] lg:border-[10px] lg:border-[#0F172A] lg:shadow-2xl flex flex-col overflow-hidden relative">
      {/* Шапка внутри мобильного приложения */}
      <div className="px-4 h-12 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-[#005BFF] tracking-tight">OZON</span>
          <span className="text-xs font-bold text-slate-700">Товары рядом</span>
        </div>

        {/* На мобильном телефоне показываем быстрый переход в кабинет и сброс */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMode('seller')}
            className="lg:hidden inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700"
          >
            <Store className="w-3 h-3" />
            Селлер
          </button>
          <button
            type="button"
            onClick={resetDemo}
            className="lg:hidden p-1.5 rounded-lg bg-slate-100 text-slate-600"
            title="Сбросить демо"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className="hidden lg:inline-block px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
            Демо
          </span>
        </div>
      </div>

      {/* Скроллируемый экран */}
      <div className="flex-1 overflow-y-auto no-scrollbar">{renderScreen()}</div>

      {/* Нижняя навигация (скрыта на карточке и чекауте) */}
      {!selectedProductId && !checkoutOpen && (
        <nav className="h-16 bg-white border-t border-slate-200/80 grid grid-cols-3 shrink-0 px-2 py-1.5">
          <button
            type="button"
            onClick={() => {
              closeProduct();
              setBuyerTab('catalog');
            }}
            className={`flex flex-col items-center justify-center rounded-xl text-[11px] font-bold gap-0.5 cursor-pointer ${
              buyerTab === 'catalog' ? 'bg-[#EAF2FF] text-[#005BFF]' : 'text-slate-500'
            }`}
          >
            <Search className="w-4 h-4" />
            Каталог
          </button>

          <button
            type="button"
            onClick={() => {
              closeProduct();
              setBuyerTab('cart');
            }}
            className={`flex flex-col items-center justify-center rounded-xl text-[11px] font-bold gap-0.5 cursor-pointer ${
              buyerTab === 'cart' ? 'bg-[#EAF2FF] text-[#005BFF]' : 'text-slate-500'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Корзина{cart.length > 0 ? ` · ${cart.length}` : ''}
          </button>

          <button
            type="button"
            onClick={() => {
              closeProduct();
              setBuyerTab('orders');
            }}
            className={`flex flex-col items-center justify-center rounded-xl text-[11px] font-bold gap-0.5 cursor-pointer ${
              buyerTab === 'orders' ? 'bg-[#EAF2FF] text-[#005BFF]' : 'text-slate-500'
            }`}
          >
            <Package className="w-4 h-4" />
            Заказы{orders.length > 0 ? ` · ${orders.length}` : ''}
          </button>
        </nav>
      )}
    </div>
  );
};
