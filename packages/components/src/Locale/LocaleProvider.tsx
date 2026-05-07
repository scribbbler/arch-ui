import React, { createContext, useContext } from 'react';
import type { Locale } from './types';
import en_US from './en_US';

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export const LocaleContext = createContext<Locale>(en_US);

export interface LocaleProviderProps {
  locale: DeepPartial<Locale>;
  children: React.ReactNode;
}

function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] as any, source[key] as any);
    } else if (source[key] !== undefined) {
      result[key] = source[key] as any;
    }
  }
  return result;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  const parentLocale = useContext(LocaleContext);
  const merged = deepMerge(
    deepMerge({ ...en_US }, parentLocale),
    locale as Partial<Locale>,
  );

  return (
    <LocaleContext.Provider value={merged}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
