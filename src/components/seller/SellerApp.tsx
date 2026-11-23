import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Globe,
  MapPin,
  Package,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useDemo } from '../../store/DemoContext';
import { ProductImage } from '../ProductImage';

type SellerSection = 'inventory' | 'promotion';

export const SellerApp: React.FC = () => {
  const {
    products,
    reservedInstanceIds,
    promotedInstanceIds,
    promoBillingModel,
    setPromoBillingModel,
    togglePromoteInstance,
    setMode,
    setCatalogSubTab,
    setBuyerTab,
    closeProduct,
  } = useDemo();

  const [section, setSection] = useState<SellerSection>('promotion');

  const sellerInstances = useMemo(() => {
    return products
      .flatMap((product) =>
        product.pvzStock
          .filter((inst) => inst.isSellerOwned)
          .map((inst) => ({
            product,
            instance: inst,
            isReserved: reservedInstanceIds.includes(inst.instanceId),
            isPromoted: promotedInstanceIds.includes(inst.instanceId),
          }))
      )
      .sort((a, b) => a.instance.daysLeftInPvz - b.instance.daysLeftInPvz);
  }, [products, reservedInstanceIds, promotedInstanceIds]);

  const activePromotedCount = sellerInstances.filter((x) => !x.isReserved && x.isPromoted).length;

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Мобильная кнопка возврата */}
      <button
        type="button"
        onClick={() => setMode('buyer')}
        className="lg:hidden inline-flex items-center gap-1.5 text-sm font-bold text-[#005BFF] mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Вернуться к покупателю
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-start">
        {/* Левое меню кабинета продавца */}
        <aside className="bg-white rounded-2xl border border-slate-200/80 p-3 space-y-1">
          <div className="px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Ozon Seller · Полка
          </div>

          <button
            type="button"
            onClick={() => setSection('promotion')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              section === 'promotion'
                ? 'bg-[#EAF2FF] text-[#005BFF]'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Продвижение рядом
          </button>

          <button
            type="button"
            onClick={() => setSection('inventory')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              section === 'inventory'
                ? 'bg-[#EAF2FF] text-[#005BFF]'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            Товары в ПВЗ
          </button>

          <div className="pt-3 mt-2 border-t border-slate-100 px-2">
            <button
              type="button"
              onClick={() => {
                closeProduct();
                setBuyerTab('catalog');
                setCatalogSubTab('nearby');
                setMode('buyer');
              }}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
            >
              Проверить выдачу «Успей забрать» →
            </button>
          </div>
        </aside>

        {/* Основная область */}
        <main className="space-y-5">
          {section === 'promotion' && (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">
                    Продвижение в «Успей забрать»
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Базовое участие товаров в ПВЗ бесплатно. Продвижение поднимает карточки выше{' '}
                    <span className="font-semibold text-slate-700">
                      только внутри раздела «Успей забрать»
                    </span>
                    , пока не истёк срок хранения на «Полке».
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#EAF2FF] text-[#005BFF] text-xs font-bold shrink-0">
                  Концепт после пилота
                </span>
              </div>

              {/* Выбор модели оплаты (из бизнес-инициативы) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
                <div className="text-sm font-extrabold text-slate-900 mb-3">
                  Модель оплаты продвижения (тестируется после пилота)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPromoBillingModel('commission')}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      promoBillingModel === 'commission'
                        ? 'border-[#005BFF] bg-[#F0F6FF]'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">Комиссия с выкупа</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Оплата привязана к реальной сделке в ПВЗ. Нет выкупа — нет списания.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPromoBillingModel('subscription')}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      promoBillingModel === 'subscription'
                        ? 'border-[#005BFF] bg-[#F0F6FF]'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">Подписка на период</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Доступ к приоритетным показам для всех локальных остатков продавца.
                    </div>
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs bg-slate-50 rounded-xl px-3.5 py-2.5 text-slate-600">
                  <span>
                    Активных бустов сейчас:{' '}
                    <strong className="text-slate-900">{activePromotedCount}</strong>
                  </span>
                  <span className="font-semibold text-[#005BFF]">
                    Изменения сразу видны в режиме «Покупатель»
                  </span>
                </div>
              </div>

              {/* Список товаров с таймером хранения и тумблером буста */}
              <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100">
                <div className="p-4 flex items-center justify-between">
                  <div className="text-sm font-extrabold text-slate-900">
                    Экземпляры в ПВЗ (отсортированы по срочности хранения)
                  </div>
                </div>

                {sellerInstances.map(({ product, instance, isReserved, isPromoted }) => (
                  <div
                    key={instance.instanceId}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <ProductImage
                        src={product.image}
                        alt={product.title}
                        colorHex={product.colorHex}
                        className="w-14 h-16 rounded-xl shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900">{product.title}</span>
                          {product.isCrossBorder && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                              <Globe className="w-3 h-3" />
                              Из-за рубежа
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {instance.instanceId} · размер {instance.size} ·{' '}
                          {product.price.toLocaleString('ru-RU')} ₽
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs">
                          <span className="inline-flex items-center gap-1 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {instance.pvzAddress}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 font-bold ${
                              instance.daysLeftInPvz <= 2 ? 'text-rose-600' : 'text-slate-600'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            Осталось {instance.daysLeftInPvz} дн. в ПВЗ
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      {isReserved ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold">
                          Заказан покупателем
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => togglePromoteInstance(instance.instanceId)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isPromoted
                              ? 'bg-[#005BFF] text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {isPromoted ? 'Продвижение включено' : 'Поднять в «Успей забрать»'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {section === 'inventory' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Товары на «Ozon Полке»</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Экземпляры, допущенные к повторной продаже по обычной цене без уценки и без
                  дополнительной отгрузки со склада.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100">
                {sellerInstances.map(({ product, instance, isReserved, isPromoted }) => (
                  <div
                    key={instance.instanceId}
                    className="p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <ProductImage
                        src={product.image}
                        alt={product.title}
                        colorHex={product.colorHex}
                        className="w-12 h-14 rounded-xl shrink-0"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900">{product.title}</div>
                        <div className="text-xs text-slate-500">
                          {instance.instanceId} · {instance.pvzAddress} · размер {instance.size}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-extrabold text-slate-900">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="mt-1 flex items-center justify-end gap-1.5">
                        {isReserved ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                            В резерве
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-[#EAF2FF] text-[#005BFF] text-[11px] font-bold">
                            В продаже (бесплатно)
                          </span>
                        )}
                        {!isReserved && isPromoted && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[11px] font-bold">
                            Буст
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
