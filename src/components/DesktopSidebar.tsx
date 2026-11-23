import React from 'react';
import { Globe, MapPin, Scale, Sparkles } from 'lucide-react';
import { useDemo } from '../store/DemoContext';

export const DesktopSidebar: React.FC = () => {
  const { setCatalogSubTab, setBuyerTab, closeProduct, openProduct } = useDemo();

  return (
    <aside className="hidden lg:flex flex-col justify-center max-w-md pr-8">
      <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-bold bg-[#EAF2FF] text-[#005BFF] mb-4">
        <MapPin className="w-3.5 h-3.5" />
        Примерка сегодня в ПВЗ
      </span>

      <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight mb-3">
        Товары рядом
      </h1>

      <p className="text-base text-slate-600 leading-relaxed mb-7">
        Найдите джинсы нужного размера, которые уже находятся на «Ozon Полке» в ближайшем ПВЗ.
        Стандартные фото, обычная цена и примерка в день заказа.
      </p>

      <div className="border-t border-slate-200 pt-5 space-y-2.5">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Быстрые сценарии для проверки
        </div>

        <button
          type="button"
          onClick={() => {
            closeProduct();
            setBuyerTab('catalog');
            setCatalogSubTab('nearby');
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#EAF2FF] hover:bg-[#DCEAFF] text-[#005BFF] font-semibold text-sm text-left transition-colors cursor-pointer"
        >
          <MapPin className="w-4 h-4 shrink-0" />
          Открыть раздел «Успей забрать»
        </button>

        <button
          type="button"
          onClick={() => openProduct('jeans-straight-dark', 'M')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm text-left transition-colors cursor-pointer"
        >
          <Scale className="w-4 h-4 shrink-0 text-[#005BFF]" />
          Сравнить 2 590 ₽: склад vs уже в ПВЗ
        </button>

        <button
          type="button"
          onClick={() => openProduct('jeans-straight-graphite', 'M')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm text-left transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 shrink-0 text-[#005BFF]" />
          Посмотреть «Похожие рядом» из карточки
        </button>

        <button
          type="button"
          onClick={() => openProduct('jeans-baggy-china', 'M')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm text-left transition-colors cursor-pointer"
        >
          <Globe className="w-4 h-4 shrink-0 text-amber-600" />
          Кейс из-за рубежа: сегодня вместо 3 недель
        </button>
      </div>
    </aside>
  );
};
