import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Clock,
  Globe,
  MapPin,
  Package,
  Star,
} from 'lucide-react';
import { useDemo } from '../../store/DemoContext';
import { FulfillmentType } from '../../types';
import { ProductImage } from '../ProductImage';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    selectedSize,
    setSelectedSize,
    closeProduct,
    openProduct,
    getAvailablePvzStock,
    addToCart,
    setBuyerTab,
  } = useDemo();

  const product = products.find((p) => p.id === selectedProductId);
  const [chosenMethod, setChosenMethod] = useState<FulfillmentType>('pvz_today');

  const localMatches = useMemo(() => {
    if (!product) return [];
    return getAvailablePvzStock(product, selectedSize).sort(
      (a, b) => a.distanceMeters - b.distanceMeters
    );
  }, [product, selectedSize, getAvailablePvzStock]);

  const nearestLocal = localMatches[0];

  // Связка «Похожие рядом»: та же similarityGroup и тот же выбранный размер,
  // физически доступные сегодня в ближайшем ПВЗ.
  const similarNearby = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && p.similarityGroup === product.similarityGroup)
      .map((p) => {
        const stock = getAvailablePvzStock(p, selectedSize).sort(
          (a, b) => a.distanceMeters - b.distanceMeters
        )[0];
        return stock ? { product: p, instance: stock } : null;
      })
      .filter((x): x is { product: typeof product; instance: NonNullable<typeof nearestLocal> } =>
        Boolean(x)
      );
  }, [products, product, selectedSize, getAvailablePvzStock]);

  if (!product) return null;

  const effectiveMethod: FulfillmentType = nearestLocal ? chosenMethod : 'warehouse_regular';

  const handleAddToCart = () => {
    if (effectiveMethod === 'pvz_today' && nearestLocal) {
      addToCart({
        cartKey: `${product.id}-${selectedSize}-pvz-${nearestLocal.instanceId}`,
        productId: product.id,
        size: selectedSize,
        fulfillmentType: 'pvz_today',
        instanceId: nearestLocal.instanceId,
        pvzAddress: nearestLocal.pvzAddress,
        deliveryLabel: 'Самовывоз сегодня после подтверждения ПВЗ',
        price: product.price,
      });
    } else {
      addToCart({
        cartKey: `${product.id}-${selectedSize}-warehouse`,
        productId: product.id,
        size: selectedSize,
        fulfillmentType: 'warehouse_regular',
        pvzAddress: 'проспект Мира, 182 (обычная доставка)',
        deliveryLabel: product.regularDeliveryLabel,
        price: product.price,
      });
    }
    setBuyerTab('cart');
  };

  return (
    <div className="pb-24 bg-white min-h-full">
      {/* Верхняя панель карточки */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 h-12 bg-white/95 backdrop-blur border-b border-slate-100">
        <button
          type="button"
          onClick={closeProduct}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </button>
        <span className="text-xs font-semibold text-slate-400">Карточка товара</span>
      </div>

      {/* Стандартное фото карточки */}
      <div className="relative aspect-[4/4] w-full bg-slate-100">
        <ProductImage
          src={product.image}
          alt={product.title}
          colorHex={product.colorHex}
          className="w-full h-full"
        />
        {product.isCrossBorder && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white">
            <Globe className="w-3.5 h-3.5" />
            Товар из-за рубежа
          </span>
        )}
      </div>

      {/* Основная информация */}
      <div className="px-4 pt-4">
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-black text-slate-900">
            {product.price.toLocaleString('ru-RU')} ₽
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-800">{product.rating}</span>
            <span>({product.reviewsCount} отзывов)</span>
          </div>
        </div>

        <h1 className="text-base font-bold text-slate-900 mt-1">{product.title}</h1>
        <div className="text-xs text-slate-500 mt-0.5">
          {product.brand} · цвет: {product.colorName}
        </div>

        {/* Выбор размера */}
        <div className="mt-4">
          <div className="text-xs font-bold text-slate-700 mb-2">Размер</div>
          <div className="flex gap-2">
            {product.sizes.map((sz) => {
              const hasLocal = getAvailablePvzStock(product, sz).length > 0;
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setSelectedSize(sz);
                    setChosenMethod(hasLocal ? 'pvz_today' : 'warehouse_regular');
                  }}
                  className={`relative min-w-[46px] h-10 px-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'border-[#005BFF] bg-[#EAF2FF] text-[#005BFF]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {sz}
                  {hasLocal && (
                    <span
                      title="Есть сегодня в ближайшем ПВЗ"
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#005BFF] ring-2 ring-white"
                    />
                  )}
                </button>
              );
})}
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#005BFF] inline-block" />
            Синяя точка — размер уже лежит в ближайшем ПВЗ
          </div>
        </div>

        {/* Блок выбора способа получения (сравнение при равной цене) */}
        <div className="mt-5 space-y-2.5">
          <div className="text-xs font-bold text-slate-700">Способ получения</div>

          {nearestLocal && (
            <button
              type="button"
              onClick={() => setChosenMethod('pvz_today')}
              className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                effectiveMethod === 'pvz_today'
                  ? 'border-[#005BFF] bg-[#F0F6FF]'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#005BFF] shrink-0" />
                  <span className="text-sm font-extrabold text-[#005BFF]">
                    Забрать и примерить сегодня
                  </span>
                </div>
                {effectiveMethod === 'pvz_today' && (
                  <span className="w-5 h-5 rounded-full bg-[#005BFF] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div className="mt-1.5 text-xs text-slate-700 font-medium">
                Уже в ПВЗ: <span className="font-bold">{nearestLocal.pvzAddress}</span> (
                {nearestLocal.distanceMeters} м)
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#005BFF]/20 text-[11px] font-bold text-[#005BFF]">
                  Размер {nearestLocal.size}
                </span>
                {nearestLocal.qty === 1 && (
                  <span className="px-2 py-0.5 rounded-md bg-[#FFE4EC] text-[11px] font-bold text-[#E11D48]">
                    Осталась 1 штука рядом
                  </span>
                )}
                {product.isCrossBorder && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-[11px] font-bold text-amber-800">
                    Без ожидания из-за рубежа
                  </span>
                )}
              </div>

              <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />
                Оформите заказ и дождитесь подтверждения готовности от ПВЗ
              </div>
            </button>
          )}

          {/* Обычная доставка со склада */}
          <button
            type="button"
            onClick={() => setChosenMethod('warehouse_regular')}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
              effectiveMethod === 'warehouse_regular'
                ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-600 shrink-0" />
                <span className="text-sm font-bold text-slate-900">
                  {product.regularDeliveryLabel}
                </span>
              </div>
              {effectiveMethod === 'warehouse_regular' && (
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {product.isCrossBorder
                ? 'Международная доставка со склада продавца · обычная цена'
                : 'Привезут со склада в выбранный пункт выдачи'}
            </div>
          </button>
        </div>

        {/* Блок «Похожие рядом» */}
        {similarNearby.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-extrabold text-slate-900">Похожие рядом</h3>
              <span className="text-[11px] font-bold text-[#005BFF]">
                Размер {selectedSize} · сегодня
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              {nearestLocal
                ? 'Другие подходящие модели этого же размера в ближайших ПВЗ'
                : 'Этой модели нет рядом, но похожие джинсы вашего размера уже ждут примерки'}
            </p>

            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {similarNearby.map(({ product: simProd, instance }) => (
                <button
                  key={`${simProd.id}-${instance.instanceId}`}
                  type="button"
                  onClick={() => openProduct(simProd.id, instance.size)}
                  className="w-36 shrink-0 text-left rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-[#005BFF] transition-colors cursor-pointer"
                >
                  <div className="relative h-36 bg-slate-100">
                    <ProductImage
                      src={simProd.image}
                      alt={simProd.title}
                      colorHex={simProd.colorHex}
                      className="w-full h-full"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-[#005BFF] text-white text-[10px] font-bold">
                      Сегодня
                    </span>
                  </div>
                  <div className="p-2">
                    <div className="text-sm font-extrabold text-slate-900">
                      {simProd.price.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-[11px] text-slate-700 truncate">{simProd.title}</div>
                    <div className="text-[10px] font-semibold text-[#005BFF] mt-0.5 truncate">
                      {instance.distanceMeters} м · {instance.pvzAddress}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Нижняя фиксированная кнопка покупки */}
      <div className="sticky bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur border-t border-slate-100 mt-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-3.5 rounded-2xl bg-[#005BFF] hover:bg-[#0046C7] text-white font-bold text-sm transition-colors cursor-pointer shadow-sm"
        >
          {effectiveMethod === 'pvz_today' && nearestLocal
            ? `В корзину · Забрать сегодня · ${product.price.toLocaleString('ru-RU')} ₽`
            : `В корзину · ${product.price.toLocaleString('ru-RU')} ₽`}
        </button>
      </div>
    </div>
  );
};
