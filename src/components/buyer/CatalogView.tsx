import React, { useMemo, useState } from 'react';
import { Globe, MapPin, Search, SlidersHorizontal, Star, TrendingUp } from 'lucide-react';
import { useDemo } from '../../store/DemoContext';
import { ClothingSize, Product, PvzInstance } from '../../types';
import { ProductImage } from '../ProductImage';

const SIZES: Array<'ALL' | ClothingSize> = ['ALL', 'S', 'M', 'L', 'XL'];

interface NearbyCardEntry {
  product: Product;
  instance: PvzInstance;
  promoted: boolean;
}

export const CatalogView: React.FC = () => {
  const {
    products,
    catalogSubTab,
    setCatalogSubTab,
    getAvailablePvzStock,
    isInstancePromoted,
    openProduct,
  } = useDemo();

  const [query, setQuery] = useState('');
  const [sizeFilter, setSizeFilter] = useState<'ALL' | ClothingSize>('ALL');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  // Вкладка «Успей забрать»: только доступные экземпляры в ПВЗ.
  // Платное продвижение продавцов поднимает карточки выше ТОЛЬКО здесь.
  const nearbyEntries = useMemo<NearbyCardEntry[]>(() => {
    const list: NearbyCardEntry[] = [];
    for (const product of products) {
      if (
        normalizedQuery &&
        !product.title.toLowerCase().includes(normalizedQuery) &&
        !product.colorName.toLowerCase().includes(normalizedQuery)
      ) {
        continue;
      }
      if (maxPrice !== null && product.price > maxPrice) continue;

      const stock = getAvailablePvzStock(
        product,
        sizeFilter === 'ALL' ? undefined : sizeFilter
      );

      for (const instance of stock) {
        list.push({
          product,
          instance,
          promoted: isInstancePromoted(instance.instanceId),
        });
      }
    }

    return list.sort((a, b) => {
      if (a.promoted !== b.promoted) return a.promoted ? -1 : 1;
      return a.instance.distanceMeters - b.instance.distanceMeters;
    });
  }, [products, normalizedQuery, sizeFilter, maxPrice, getAvailablePvzStock, isInstancePromoted]);

  // Вкладка «Все товары»: обычная выдача с заметными плашками, если вещь уже рядом.
  const allProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        normalizedQuery &&
        !product.title.toLowerCase().includes(normalizedQuery) &&
        !product.colorName.toLowerCase().includes(normalizedQuery)
      ) {
        return false;
      }
      if (sizeFilter !== 'ALL' && !product.sizes.includes(sizeFilter)) {
        return false;
      }
      if (maxPrice !== null && product.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [products, normalizedQuery, sizeFilter, maxPrice]);

  return (
    <div className="pb-20">
      {/* Поисковая строка */}
      <div className="px-4 pt-3 pb-2 bg-white sticky top-0 z-20 border-b border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск джинсов, цвета или фасона..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005BFF]/30"
          />
        </div>

        {/* Переключатель двух входов */}
        <div className="flex gap-5 mt-3 border-b border-slate-100">
          <button
            type="button"
            onClick={() => setCatalogSubTab('all')}
            className={`pb-2.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              catalogSubTab === 'all'
                ? 'border-[#005BFF] text-[#005BFF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Все товары
          </button>
          <button
            type="button"
            onClick={() => setCatalogSubTab('nearby')}
            className={`pb-2.5 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              catalogSubTab === 'nearby'
                ? 'border-[#005BFF] text-[#005BFF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Успей забрать
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#EAF2FF] text-[#005BFF]">
              {nearbyEntries.length}
            </span>
          </button>
        </div>

        {/* Фильтры: размер и бюджет */}
        <div className="flex items-center gap-2 mt-2.5 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 shrink-0">
            {SIZES.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSizeFilter(sz)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  sizeFilter === sz
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {sz === 'ALL' ? 'Все' : sz}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMaxPrice((prev) => (prev === 2590 ? null : 2590))}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border shrink-0 transition-colors cursor-pointer ${
              maxPrice === 2590
                ? 'bg-[#EAF2FF] border-[#005BFF] text-[#005BFF]'
                : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            До 2 590 ₽
          </button>
        </div>
      </div>

      {/* Контент вкладок */}
      <div className="px-4 pt-3">
        {catalogSubTab === 'nearby' && (
          <>
            <div className="mb-3 p-3 rounded-2xl bg-[#EAF2FF] text-[#0046C7] text-xs leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 mb-0.5">
                <MapPin className="w-3.5 h-3.5" />
                Уже в ближайших ПВЗ — примерьте сегодня
              </div>
              Вещи с «Ozon Полки» по обычной цене. Закажите сейчас и приходите на примерку после
              подтверждения готовности.
            </div>

            {nearbyEntries.length === 0 ? (
              <div className="text-center py-12 text-sm text-slate-500">
                По выбранным фильтрам вещей в ближайших ПВЗ сейчас нет.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {nearbyEntries.map(({ product, instance, promoted }) => (
                  <button
                    key={`${product.id}-${instance.instanceId}`}
                    type="button"
                    onClick={() => openProduct(product.id, instance.size)}
                    className={`text-left bg-white rounded-2xl overflow-hidden border transition-all hover:shadow-md cursor-pointer flex flex-col ${
                      promoted ? 'border-[#005BFF]/50 ring-1 ring-[#005BFF]/20' : 'border-slate-200/80'
                    }`}
                  >
                    <div className="relative aspect-[4/5] w-full bg-slate-100">
                      <ProductImage
                        src={product.image}
                        alt={product.title}
                        colorHex={product.colorHex}
                        className="w-full h-full"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#005BFF] text-white shadow-xs">
                          Забрать сегодня
                        </span>
                        {instance.qty === 1 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F91155] text-white shadow-xs">
                            Осталась 1 шт.
                          </span>
                        )}
                      </div>
                      {promoted && (
                        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-white/95 text-slate-700 shadow-xs">
                          <TrendingUp className="w-3 h-3 text-[#005BFF]" />
                          Продвижение
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-base font-extrabold text-slate-900">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </div>
                        <div className="text-xs font-medium text-slate-800 line-clamp-2 mt-0.5">
                          {product.title}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500 mt-1">
                          Размер {instance.size} · {instance.distanceMeters} м
                        </div>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-slate-100 text-[11px] text-[#005BFF] font-semibold truncate">
                        {instance.pvzAddress}
                      </div>
                      {product.isCrossBorder && (
                        <div className="mt-1 text-[10px] text-amber-700 font-semibold">
                          Вместо 3 недель из-за рубежа
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {catalogSubTab === 'all' && (
          <>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-sm font-bold text-slate-900">
                Результаты поиска ({allProducts.length})
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {allProducts.map((product) => {
                const localList = getAvailablePvzStock(
                  product,
                  sizeFilter === 'ALL' ? undefined : sizeFilter
                );
                const nearest = localList.sort((a, b) => a.distanceMeters - b.distanceMeters)[0];

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() =>
                      openProduct(
                        product.id,
                        sizeFilter !== 'ALL' ? sizeFilter : nearest?.size ?? product.sizes[0]
                      )
                    }
                    className={`text-left bg-white rounded-2xl overflow-hidden border transition-all hover:shadow-md cursor-pointer flex flex-col ${
                      nearest ? 'border-[#005BFF]/40' : 'border-slate-200/80'
                    }`}
                  >
                    <div className="relative aspect-[4/5] w-full bg-slate-100">
                      <ProductImage
                        src={product.image}
                        alt={product.title}
                        colorHex={product.colorHex}
                        className="w-full h-full"
                      />
                      {nearest ? (
                        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#005BFF] text-white shadow-xs">
                            Примерь сегодня · {nearest.size}
                          </span>
                          {product.isCrossBorder && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs inline-flex items-center gap-1">
                              <Globe className="w-2.5 h-2.5" />
                              Уже в ПВЗ
                            </span>
                          )}
                        </div>
                      ) : product.isCrossBorder ? (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800/85 text-white">
                          Из-за рубежа
                        </span>
                      ) : null}
                    </div>

                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-base font-extrabold text-slate-900">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </div>
                        <div className="text-xs font-medium text-slate-800 line-clamp-2 mt-0.5">
                          {product.title}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-slate-700">{product.rating}</span>
                          <span>· {product.reviewsCount}</span>
                        </div>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-slate-100">
                        {nearest ? (
                          <div className="text-[11px] font-bold text-[#005BFF]">
                            Сегодня в ПВЗ · {nearest.distanceMeters} м
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {product.regularDeliveryLabel}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
