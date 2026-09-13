import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'NPR' | 'USD';

// Current realistic exchange rate: 1 USD ~ 135 Nepalese Rupees (NPR)
export const USD_TO_NPR_RATE = 135;

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
  exchangeRate: number;
  // Primary price formatter
  formatPrice: (
    amountInNpr: number,
    options?: {
      showBoth?: boolean;
      compact?: boolean;
      suffix?: string;
    }
  ) => string;
  // Get raw converted numeric value in currently active currency
  convertPrice: (amountInNpr: number) => number;
  // Format secondary equivalent price for tooltips or comparison
  formatSecondaryPrice: (amountInNpr: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('travel_arjun_currency');
      if (saved === 'USD' || saved === 'NPR') return saved;
    }
    return 'NPR';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== 'undefined') {
      localStorage.setItem('travel_arjun_currency', c);
    }
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'NPR' ? 'USD' : 'NPR');
  };

  const convertPrice = (amountInNpr: number): number => {
    if (currency === 'USD') {
      return Math.round(amountInNpr / USD_TO_NPR_RATE);
    }
    return amountInNpr;
  };

  const formatPrice = (
    amountInNpr: number,
    options?: {
      showBoth?: boolean;
      compact?: boolean;
      suffix?: string;
    }
  ): string => {
    const { showBoth = false, suffix = '' } = options || {};

    if (currency === 'USD') {
      const usdAmount = Math.round(amountInNpr / USD_TO_NPR_RATE);
      const formattedUsd = `$${usdAmount.toLocaleString()}`;
      if (showBoth) {
        return `${formattedUsd}${suffix ? ` ${suffix}` : ''} (NPR ${amountInNpr.toLocaleString()})`;
      }
      return `${formattedUsd}${suffix ? ` ${suffix}` : ''}`;
    }

    // Default NPR
    const formattedNpr = `NPR ${amountInNpr.toLocaleString()}`;
    if (showBoth) {
      const usdAmount = Math.round(amountInNpr / USD_TO_NPR_RATE);
      return `${formattedNpr}${suffix ? ` ${suffix}` : ''} (~$${usdAmount.toLocaleString()} USD)`;
    }
    return `${formattedNpr}${suffix ? ` ${suffix}` : ''}`;
  };

  const formatSecondaryPrice = (amountInNpr: number): string => {
    if (currency === 'USD') {
      return `NPR ${amountInNpr.toLocaleString()}`;
    }
    const usd = Math.round(amountInNpr / USD_TO_NPR_RATE);
    return `$${usd.toLocaleString()} USD`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        exchangeRate: USD_TO_NPR_RATE,
        formatPrice,
        convertPrice,
        formatSecondaryPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
