import {Suspense} from 'react';
import HomeClient from '@/components/HomeClient';
import {PaymentMethodOption} from '@/types';

const FALLBACK_PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 1,
    provider: 'freekassa',
    code: 'sbp',
    name: 'api.payment.method.sbp',
    nameShort: 'api.payment.method.sbpShort',
    icon: 'qrcode',
    limits: {min: 50, max: 1000000},
    commission: {percent: 0, fixed: 0},
  },
  {
    id: 2,
    provider: 'freekassa',
    code: 'card',
    name: 'api.payment.method.card',
    nameShort: 'api.payment.method.cardShort',
    icon: 'card',
    limits: {min: 50, max: 1000000},
    commission: {percent: 0, fixed: 0},
  },
];

async function fetchPaymentMethods(): Promise<PaymentMethodOption[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '';
  const endpoint = '/v1/public/api/payment-methods';
  const url = baseUrl ? `${baseUrl.replace(/\/+$/, '')}${endpoint}` : endpoint;
  try {
    const res = await fetch(url, {cache: 'no-store'});
    if (!res.ok) {
      return FALLBACK_PAYMENT_METHODS;
    }
    const payload = await res.json();
    if (Array.isArray(payload?.result)) {
      // Добавляем nameShort если его нет в данных API
      return payload.result.map((method: any) => ({
        ...method,
        nameShort: method.nameShort || (method.code === 'sbp' ? 'api.payment.method.sbpShort' : method.code === 'card' ? 'api.payment.method.cardShort' : method.name)
      }));
    }
    return FALLBACK_PAYMENT_METHODS;
  } catch {
    return FALLBACK_PAYMENT_METHODS;
  }
}

export default async function Home() {
  const paymentMethods = await fetchPaymentMethods();
  return (
    <Suspense fallback={null}>
      <HomeClient paymentMethods={paymentMethods} />
    </Suspense>
  );
}
