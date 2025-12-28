export type Language = 'ru' | 'en';

export enum TabType {
  STARS = 'stars',
  PREMIUM = 'premium'
}

export type PaymentMethodCode = string;

export interface PaymentMethodOption {
  id: number;
  provider: string;
  code: string;
  name: string;
  nameShort: string;
  icon: string;
  limits: {
    min: number;
    max: number;
  };
  commission: {
    percent: number;
    fixed: number;
  };
}
