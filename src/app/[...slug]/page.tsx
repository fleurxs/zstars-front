import HomeClient from '@/components/HomeClient';
import {PaymentMethodOption} from '@/types';

const FALLBACK_PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 1,
    provider: 'freekassa',
    code: 'sbp',
    name: 'SBP',
    limits: {min: 50, max: 1000000},
    commission: {percent: 0, fixed: 0},
  },
  {
    id: 2,
    provider: 'freekassa',
    code: 'card',
    name: 'Card',
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
    if (Array.isArray(payload?.data)) {
      return payload.data;
    }
    return FALLBACK_PAYMENT_METHODS;
  } catch {
    return FALLBACK_PAYMENT_METHODS;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const paymentMethods = await fetchPaymentMethods();
  return <HomeClient paymentMethods={paymentMethods} slug={slug} />;
}