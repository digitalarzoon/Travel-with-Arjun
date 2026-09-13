import React from 'react';
import { useCurrency, USD_TO_NPR_RATE } from '../context/CurrencyContext';
import { ArrowLeftRight } from 'lucide-react';

interface CurrencySelectorProps {
  variant?: 'pill' | 'badge' | 'dropdown' | 'compact';
  className?: string;
  showRateTip?: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  variant = 'pill',
  className = '',
  showRateTip = false,
}) => {
  const { currency, setCurrency, toggleCurrency } = useCurrency();

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleCurrency}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
          currency === 'USD'
            ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
        } ${className}`}
        title={`Click to switch to ${currency === 'NPR' ? 'USD ($)' : 'NPR (Rs.)'} (1 USD ≈ ${USD_TO_NPR_RATE} NPR)`}
      >
        <span>{currency === 'USD' ? '🇺🇸 USD ($)' : '🇳🇵 NPR (रू)'}</span>
        <ArrowLeftRight className="w-3 h-3 text-slate-500" />
      </button>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg shadow-inner">
        <button
          type="button"
          onClick={() => setCurrency('NPR')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
            currency === 'NPR'
              ? 'bg-white text-[#145a4e] shadow-sm border border-slate-200/60'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          title="Display all prices in Nepalese Rupees (NPR)"
        >
          <span className="text-[11px]">🇳🇵</span>
          <span>NPR</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrency('USD')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
            currency === 'USD'
              ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          title="Display all prices in US Dollars (USD)"
        >
          <span className="text-[11px]">🇺🇸</span>
          <span>USD ($)</span>
        </button>
      </div>

      {showRateTip && (
        <span className="text-[10px] text-slate-500 font-medium hidden sm:inline" title="Calculated at 1 USD ≈ 135 NPR">
          (1$ ≈ 135 NPR)
        </span>
      )}
    </div>
  );
};
