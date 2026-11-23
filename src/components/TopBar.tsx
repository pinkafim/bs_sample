import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useDemo } from '../store/DemoContext';

export const TopBar: React.FC = () => {
  const { mode, setMode, resetDemo } = useDemo();

  return (
    <header className="sticky top-0 z-40 hidden lg:block bg-white/90 backdrop-blur border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight text-[#005BFF]">OZON</span>
          <div className="h-6 w-px bg-slate-200" />
          <div className="leading-tight">
            <div className="text-sm font-bold text-slate-900">Товары рядом</div>
            <div className="text-[11px] text-slate-500">Учебный прототип · Пилот MVP</div>
          </div>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
          <button
            type="button"
            onClick={() => setMode('buyer')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              mode === 'buyer'
                ? 'bg-white text-[#005BFF] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Покупатель
          </button>
          <button
            type="button"
            onClick={() => setMode('seller')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              mode === 'seller'
                ? 'bg-white text-[#005BFF] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Кабинет продавца
          </button>
        </div>

        <button
          type="button"
          onClick={resetDemo}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#005BFF] hover:text-[#0046C7] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Сбросить демо
        </button>
      </div>
    </header>
  );
};
