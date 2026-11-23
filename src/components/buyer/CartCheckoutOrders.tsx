import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { useDemo } from '../../store/DemoContext';
import { ProductImage } from '../ProductImage';

export const CartView: React.FC = () => {
  const { cart, products, removeFromCart, setCheckoutOpen, setBuyerTab } = useDemo();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center flex flex-col items-center justify-center min-h-[420px]">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Корзина пуста</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Выберите джинсы в каталоге или в разделе «Успей забрать»
        </p>
        <button
          type="button"
          onClick={() => setBuyerTab('catalog')}
          className="px-5 py-2.5 rounded-xl bg-[#005BFF] text-white text-xs font-bold cursor-pointer"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 space-y-3">
      <h2 className="text-lg font-extrabold text-slate-900">Корзина</h2>

      {cart.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;

        return (
          <div
            key={item.cartKey}
            className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5"
          >
            <div className="flex gap-3">
              <ProductImage
                src={product.image}
                alt={product.title}
                colorHex={product.colorHex}
                className="w-16 h-20 rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900 leading-snug">
                  {product.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {product.colorName} · размер {item.size}
                </div>
                <div className="text-sm font-extrabold text-slate-900 mt-1">
                  {item.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.cartKey)}
                className="self-start p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                title="Убрать"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div
              className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                item.fulfillmentType === 'pvz_today'
                  ? 'bg-[#EAF2FF] text-[#0046C7]'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {item.fulfillmentType === 'pvz_today' ? (
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <Package className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold">{item.deliveryLabel}</div>
                <div className="opacity-85">{item.pvzAddress}</div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="pt-2">
        <button
          type="button"
          onClick={() => setCheckoutOpen(true)}
          className="w-full py-3.5 rounded-2xl bg-[#005BFF] hover:bg-[#0046C7] text-white font-bold text-sm cursor-pointer"
        >
          Перейти к оформлению · {total.toLocaleString('ru-RU')} ₽
        </button>
      </div>
    </div>
  );
};

export const CheckoutView: React.FC = () => {
  const { cart, products, setCheckoutOpen, placeOrder } = useDemo();
  const [payment, setPayment] = useState<'on_receipt' | 'online'>('on_receipt');

  const total = cart.reduce((sum, i) => sum + i.price, 0);
  const firstItem = cart[0];
  if (!firstItem) return null;

  return (
    <div className="min-h-full bg-white pb-8">
      <div className="flex items-center gap-2 px-4 h-12 border-b border-slate-100">
        <button
          type="button"
          onClick={() => setCheckoutOpen(false)}
          className="p-1 text-slate-600 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-extrabold text-slate-900">Оформление заказа</h2>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF2FF] text-[#005BFF] mb-2">
            Самовывоз и примерка в ПВЗ
          </span>
          <div className="p-3 rounded-2xl bg-[#F0F6FF] border border-[#005BFF]/20">
            <div className="text-xs font-bold text-[#005BFF] flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {firstItem.deliveryLabel}
            </div>
            <div className="text-xs text-slate-600 mt-1">{firstItem.pvzAddress}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700">Товары</div>
          {cart.map((item) => {
            const p = products.find((x) => x.id === item.productId);
            if (!p) return null;
            return (
              <div key={item.cartKey} className="flex items-center gap-3">
                <ProductImage
                  src={p.image}
                  alt={p.title}
                  colorHex={p.colorHex}
                  className="w-12 h-14 rounded-lg shrink-0"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">{p.title}</div>
                  <div className="text-slate-500">
                    {p.colorName} · размер {item.size}
                  </div>
                  <div className="font-extrabold text-slate-900 mt-0.5">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700">Способ оплаты</div>
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer">
            <input
              type="radio"
              name="pay"
              checked={payment === 'on_receipt'}
              onChange={() => setPayment('on_receipt')}
            />
            При получении (после примерки)
          </label>
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer">
            <input
              type="radio"
              name="pay"
              checked={payment === 'online'}
              onChange={() => setPayment('online')}
            />
            Картой онлайн
          </label>
        </div>

        <div className="border-t border-slate-100 pt-3 space-y-1.5 text-sm">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Самовывоз</span>
            <span className="font-semibold text-emerald-600">Бесплатно</span>
          </div>
          <div className="flex justify-between font-extrabold text-slate-900 text-base">
            <span>Итого</span>
            <span>{total.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => placeOrder(payment)}
          className="w-full py-3.5 rounded-2xl bg-[#005BFF] hover:bg-[#0046C7] text-white font-bold text-sm cursor-pointer"
        >
          Заказать · {total.toLocaleString('ru-RU')} ₽
        </button>
      </div>
    </div>
  );
};

export const OrdersView: React.FC = () => {
  const { orders, products, confirmPvzReadiness, setBuyerTab } = useDemo();

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center flex flex-col items-center justify-center min-h-[420px]">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <Package className="w-7 h-7" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Заказов пока нет</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          После оформления здесь появится статус готовности к примерке
        </p>
        <button
          type="button"
          onClick={() => setBuyerTab('catalog')}
          className="px-5 py-2.5 rounded-xl bg-[#005BFF] text-white text-xs font-bold cursor-pointer"
        >
          Выбрать товар
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 space-y-3">
      <h2 className="text-lg font-extrabold text-slate-900">Мои заказы</h2>

      {orders.map((order) => {
        const product = products.find((p) => p.id === order.item.productId);
        if (!product) return null;

        return (
          <div
            key={order.orderId}
            className="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-800">{order.orderId}</span>
              <span>Сегодня, {order.createdAt}</span>
            </div>

            {order.status === 'checking_pvz' && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-800">
                  <Clock className="w-4 h-4 shrink-0" />
                  ПВЗ проверяет готовность вещи
                </div>
                <p className="text-[11px] text-amber-900/80 leading-relaxed">
                  Экземпляр зарезервирован за вами и снят с витрины. Не выходите в пункт выдачи
                  раньше уведомления о готовности.
                </p>
                <button
                  type="button"
                  onClick={() => confirmPvzReadiness(order.orderId)}
                  className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
                >
                  Демо: симулировать подтверждение от ПВЗ
                </button>
              </div>
            )}

            {order.status === 'ready_for_pickup' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Готов к выдаче — можно идти на примерку
                </div>
                <div className="text-[11px] text-emerald-900/80 mt-1">
                  ПВЗ: {order.item.pvzAddress}. Оплата:{' '}
                  {order.paymentMethod === 'on_receipt' ? 'при получении' : 'оплачено онлайн'}.
                </div>
              </div>
            )}

            {order.status === 'in_transit' && (
              <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-700">
                <div className="font-bold">В пути со склада</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{order.item.deliveryLabel}</div>
              </div>
            )}

            <div className="flex gap-3 items-center">
              <ProductImage
                src={product.image}
                alt={product.title}
                colorHex={product.colorHex}
                className="w-12 h-14 rounded-lg shrink-0"
              />
              <div className="text-xs">
                <div className="font-bold text-slate-900">{product.title}</div>
                <div className="text-slate-500">
                  Размер {order.item.size} · {order.item.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
