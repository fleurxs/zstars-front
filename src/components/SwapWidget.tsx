import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  Info,
  Loader2,
  Mail,
  Star,
  User,
  Wallet,
  X
} from 'lucide-react';
import {Language, PaymentMethodCode, PaymentMethodOption, TabType} from '../types';
import {
  DEFAULT_AVATAR,
  MAX_STARS,
  MIN_STARS,
  PAYMENT_FEE_PERCENT,
  PREMIUM_MONTHS,
  RUB_PER_STAR,
  STAR_PACKAGES,
  TRANSLATIONS,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH
} from '../constants';

// Типы для Яндекс Метрики
declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: any[]) => void;
  }
}

interface SwapWidgetProps {
  language: Language;
  paymentMethods: PaymentMethodOption[];
  slug?: string[];
}

const SwapWidget: React.FC<SwapWidgetProps> = ({language, paymentMethods, slug}) => {
  const t = TRANSLATIONS[language].widget;
  const usernameHelpSections = t.usernameHelpSections ?? [];
  const searchParams = useSearchParams();
  type PublicPaymentStatus =
    | 'pending_payment'
    | 'payment_failed'
    | 'payment_expired'
    | 'payment_refunded'
    | 'paid_delivery_pending'
    | 'delivery_failed'
    | 'completed';

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (slug && slug.length > 0) {
      const firstSlug = slug[0].toLowerCase();
      if (firstSlug === 'premium') {
        return TabType.PREMIUM;
      }
    }
    return TabType.STARS;
  });
  const [username, setUsername] = useState<string>('');
  const [starsAmount, setStarsAmount] = useState<number | string>(() => {
    if (slug && slug.length > 0) {
      const firstSlug = slug[0].toLowerCase();
      if (firstSlug === 'premium') {
        return PREMIUM_MONTHS[0];
      }
    }
    return 50;
  }); // Allow string for typing
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodCode>(paymentMethods[0]?.code ?? '');
  const [agreed, setAgreed] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [wallet, setWallet] = useState<string>('');
  const [walletError, setWalletError] = useState<string>('');
  const [submittingPhase, setSubmittingPhase] = useState<
    'idle' | 'creating' | 'waiting' | 'completed' | 'failed'
  >('idle');
  const [usernameError, setUsernameError] = useState<string>('');
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [isUsernameHelpOpen, setIsUsernameHelpOpen] = useState<boolean>(false);
  const [usernameHelpAccordion, setUsernameHelpAccordion] = useState<Record<string, boolean>>({});
  const [paymentStatus, setPaymentStatus] = useState<PublicPaymentStatus | null>(null);
  const userFetchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userFetchController = useRef<AbortController | null>(null);
  const statusIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hydratedFromQuery = useRef<boolean>(false);

  useEffect(() => {
    if (userFetchTimeout.current) {
      clearTimeout(userFetchTimeout.current);
      userFetchTimeout.current = null;
    }
    if (userFetchController.current) {
      userFetchController.current.abort();
      userFetchController.current = null;
    }
    if (username.length < USERNAME_MIN_LENGTH) {
      setAvatar(null);
      setDisplayName('');
      setUsernameError('');
      setIsLoadingUser(false);
      return;
    }
    userFetchTimeout.current = setTimeout(async () => {
      const controller = new AbortController();
      userFetchController.current = controller;
      setIsLoadingUser(true);
      setUsernameError('');
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!baseUrl) {
          setUsernameError(t.usernameFetchError);
          setIsLoadingUser(false);
          return;
        }
        const endpoint = `/v1/public/api/recipients/${encodeURIComponent(username)}`;
        const url = `${baseUrl.replace(/\/+$/, '')}${endpoint}`;
        const res = await fetch(url, {signal: controller.signal});
        if (!res.ok) {
          if (res.status === 404) {
            setUsernameError(t.usernameNotFound);
          } else {
            setUsernameError(t.usernameFetchError);
          }
          setAvatar(null);
          setDisplayName('');
          return;
        }
        const payload = await res.json();
        const data = payload?.result ?? payload?.data ?? null;
        if (!data) {
          setUsernameError(t.usernameFetchError);
          setAvatar(null);
          setDisplayName('');
          return;
        }
        setAvatar(data.avatar || DEFAULT_AVATAR);
        setDisplayName(data.displayName || '');

        // Отправка события в Яндекс Метрику при успешной валидации username
        const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
        if (yandexMetrikaId && window.ym) {
          const counterId = parseInt(yandexMetrikaId, 10);
          if (!isNaN(counterId)) {
            window.ym(counterId, 'reachGoal', 'username_validated');
          }
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') {
          return;
        }
        setUsernameError(t.usernameFetchError);
        setAvatar(null);
        setDisplayName('');
      } finally {
        setIsLoadingUser(false);
      }
    }, 450);

    return () => {
      if (userFetchTimeout.current) {
        clearTimeout(userFetchTimeout.current);
        userFetchTimeout.current = null;
      }
      if (userFetchController.current) {
        userFetchController.current.abort();
        userFetchController.current = null;
      }
    };
  }, [username, t]);

  useEffect(() => {
    if (paymentMethods.length === 0) {
      setPaymentMethod('');
      return;
    }
    if (!paymentMethods.some((method) => method.code === paymentMethod)) {
      setPaymentMethod(paymentMethods[0].code);
    }
  }, [paymentMethods, paymentMethod]);

  useEffect(() => {
    if (!isUsernameHelpOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isUsernameHelpOpen]);

  useEffect(() => {
    setUsernameHelpAccordion({});
  }, [language]);

  // Username validation handler
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only English letters, numbers, and underscores
    const cleaned = val.replace(/[^a-zA-Z0-9_]/g, '');
    setUsername(cleaned);
    setUsernameError('');
    setDisplayName('');
    setAvatar(null);
  };

  const handleClearUsername = () => {
    setUsername('');
    setAvatar(null);
    setDisplayName('');
    setUsernameError('');
    setIsLoadingUser(false);
    if (userFetchTimeout.current) {
      clearTimeout(userFetchTimeout.current);
      userFetchTimeout.current = null;
    }
    if (userFetchController.current) {
      userFetchController.current.abort();
      userFetchController.current = null;
    }
  };

  const openUsernameHelp = () => {
    setIsUsernameHelpOpen(true);
    if (usernameHelpSections.length > 0) {
      setUsernameHelpAccordion((prev) => {
        if (Object.keys(prev).length > 0) {
          return prev;
        }
        const first = usernameHelpSections[0].platform;
        return {[first]: true};
      });
    }
  };

  const closeUsernameHelp = () => {
    setIsUsernameHelpOpen(false);
  };

  const handleToggleUsernameHelpSection = (platform: string) => {
    setUsernameHelpAccordion((prev) => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  // Calculations
  const calculations = useMemo(() => {
    const rawAmount = typeof starsAmount === 'string' ? parseInt(starsAmount) || 0 : starsAmount;
    const safeAmount = Math.max(0, rawAmount);

    // Base cost
    let subtotal = 0;
    if (activeTab === TabType.STARS) {
      subtotal = safeAmount * RUB_PER_STAR;
    } else {
      // Simple premium logic: 300 RUB per month approx base
      subtotal = safeAmount * 299;
    }

    const fee = Math.ceil(subtotal * PAYMENT_FEE_PERCENT);

    const total = subtotal + fee;

    return {
      subtotal,
      fee,
      total,
      receiveAmount: safeAmount
    };
  }, [starsAmount, activeTab]);

  const normalizedAmount = useMemo(() => {
    const rawAmount = typeof starsAmount === 'string' ? parseInt(starsAmount) || 0 : starsAmount;
    return Math.max(0, rawAmount);
  }, [starsAmount]);

  const activePaymentMethod = useMemo(
    () => paymentMethods.find((method) => method.code === paymentMethod),
    [paymentMethod, paymentMethods]
  );

  const walletRequirement = useMemo(() => {
    return 'email';
  }, [paymentMethod]);

  const walletRequired = walletRequirement !== 'none';

  const getWalletError = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!walletRequired && trimmed === '') {
        return '';
      }
      if (walletRequirement === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? '' : t.walletInvalidEmail;
      }
      if (walletRequirement === 'phone') {
        return t.walletInvalidPhone;
      }
      return '';
    },
    [t.walletInvalidEmail, t.walletInvalidPhone, walletRequirement, walletRequired]
  );

  const handleWalletChange = (val: string) => {
    setWallet(val);
    setWalletError(getWalletError(val));
  };

  useEffect(() => {
    setWalletError(getWalletError(wallet));
  }, [getWalletError, wallet]);

  useEffect(() => {
    if (submittingPhase !== 'waiting') {
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }
      return;
    }
    if (!username || normalizedAmount <= 0) {
      return;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const endpoint = '/v1/public/api/payments/status';
    const url = baseUrl ? `${baseUrl.replace(/\/+$/, '')}${endpoint}` : endpoint;
    let cancelled = false;

    const isFinalStatus = (status: PublicPaymentStatus | null) =>
      !!status && status !== 'pending_payment' && status !== 'paid_delivery_pending';

    const fetchStatus = async () => {
      try {
        const params = new URLSearchParams({
          username,
          type: activeTab,
          amount: String(normalizedAmount)
        });
        const res = await fetch(`${url}?${params.toString()}`);
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        const result = data?.result ?? data?.data ?? null;
        const status = (result?.publicStatus as PublicPaymentStatus | undefined) ?? null;
        if (cancelled) {
          return;
        }
        if (status) {
          setPaymentStatus(status);
          if (isFinalStatus(status)) {
            setSubmittingPhase(status === 'completed' ? 'completed' : 'failed');
          }
        }
      } catch (_err) {}
    };

    fetchStatus();
    statusIntervalRef.current = setInterval(fetchStatus, 3000);

    return () => {
      cancelled = true;
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }
    };
  }, [activeTab, normalizedAmount, submittingPhase, username]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setStarsAmount('');
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) {
      setStarsAmount(num);
    }
  };

  const handleBlurAmount = () => {
    let num = typeof starsAmount === 'string' ? parseInt(starsAmount) || 0 : starsAmount;
    if (activeTab === TabType.STARS) {
      if (num < MIN_STARS) num = MIN_STARS;
      if (num > MAX_STARS) num = MAX_STARS;
    }
    setStarsAmount(num);
  };

  useEffect(() => {
    if (hydratedFromQuery.current) {
      return;
    }
    hydratedFromQuery.current = true;
    const amountParam = searchParams.get('amount');
    const typeParam = searchParams.get('type');
    if (typeParam === TabType.PREMIUM) {
      setActiveTab(TabType.PREMIUM);
      if (!amountParam) {
        setStarsAmount(PREMIUM_MONTHS[0]);
      }
    } else if (typeParam === TabType.STARS) {
      setActiveTab(TabType.STARS);
    }
    if (amountParam) {
      const parsed = parseInt(amountParam);
      if (!Number.isNaN(parsed)) {
        if (typeParam === TabType.PREMIUM) {
          const allowed = PREMIUM_MONTHS.includes(parsed) ? parsed : PREMIUM_MONTHS[0];
          setStarsAmount(allowed);
        } else {
          const clamped = Math.min(Math.max(parsed, MIN_STARS), MAX_STARS);
          setStarsAmount(clamped);
        }
      }
    }
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      setUsername(usernameParam.slice(0, USERNAME_MAX_LENGTH));
    }
    const paymentMethodParam = searchParams.get('paymentMethod');
    if (paymentMethodParam && paymentMethods.some((m) => m.code === paymentMethodParam)) {
      setPaymentMethod(paymentMethodParam as PaymentMethodCode);
    }
    if (usernameParam || amountParam || paymentMethodParam) {
      setStep(2);
    }
  }, [paymentMethods, searchParams]);

  const canProceedToReview =
    username.length >= USERNAME_MIN_LENGTH && !usernameError && paymentMethod && normalizedAmount > 0;

  const walletLabel =
    walletRequirement === 'email'
      ? t.walletEmailLabel
      : t.walletOptionalLabel;

  const walletPlaceholder =
    walletRequirement === 'email'
      ? t.walletPlaceholderEmail
      : t.walletPlaceholderOptional;

  const statusTextMap = (t.statusText || {}) as Record<PublicPaymentStatus, string>;
  const currentStatusLabel = paymentStatus ? statusTextMap[paymentStatus] ?? t.waitingPayment : t.waitingPayment;

  const submitting = submittingPhase !== 'idle';

  const canPay =
    step === 2 &&
    agreed &&
    walletError === '' &&
    (!walletRequired || wallet.trim() !== '') &&
    username.length >= USERNAME_MIN_LENGTH &&
    !submitting;

  const getPayloadWallet = () => {
    return wallet.trim();
  };

  const handlePay = async () => {
    if (!canPay || submitting) {
      return;
    }

    // Отправка события в Яндекс Метрику при клике на кнопку оплаты
    const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    if (yandexMetrikaId && window.ym) {
      const counterId = parseInt(yandexMetrikaId, 10);
      if (!isNaN(counterId)) {
        window.ym(counterId, 'reachGoal', 'payment_click');
      }
    }

    const walletForPayload = getPayloadWallet();
    if (walletRequired && !walletForPayload) {
      setWalletError(walletRequirement === 'phone' ? t.walletInvalidPhone : t.walletInvalidEmail);
      return;
    }
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
      statusIntervalRef.current = null;
    }
    setPaymentStatus(null);
    setSubmittingPhase('creating');
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const endpoint = '/v1/public/api/payments';
    const url = baseUrl ? `${baseUrl.replace(/\/+$/, '')}${endpoint}` : endpoint;
    const paymentMethodId = activePaymentMethod?.id;
    const payload = {
      recipient: username,
      type: activeTab,
      amount: normalizedAmount,
      paymentMethodId,
      wallet: walletForPayload
    };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error('request_failed');
      }
      const data = await res.json();
      const result = data?.result ?? data?.data ?? null;
      if (result?.paymentUrl) {
        window.open(result.paymentUrl, '_blank', 'noopener,noreferrer');
        setSubmittingPhase('waiting');
        return;
      }
      throw new Error('payment_url_missing');
    } catch (err) {
      setSubmittingPhase('idle');
    }
  };

  return (
    <div
      className="w-full max-w-[500px] bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden relative">

      {/* Tab Switcher */}
      <div className="p-1 mx-6 mt-6 bg-zinc-950/50 rounded-xl flex items-center relative z-10">
        <button
          onClick={() => {
            setActiveTab(TabType.STARS);
            setStarsAmount(50);
          }}
          disabled={submitting}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
            activeTab === TabType.STARS
              ? 'bg-zinc-800 text-white shadow-lg'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {t.tabStars}
        </button>
        <button
          onClick={() => {
            setActiveTab(TabType.PREMIUM);
            setStarsAmount(3); // Default to 3 months for premium
          }}
          disabled={submitting}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
            activeTab === TabType.PREMIUM
              ? 'bg-zinc-800 text-white shadow-lg'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {t.tabPremium}
        </button>
      </div>

      {/* Main Form */}
      <div className="p-6 space-y-5">
        {step === 1 && (
          <>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-medium text-zinc-400 ml-1">
                  {t.labelUsername}
                  {displayName ? <span className="text-zinc-500 ml-2">· {displayName}</span> : null}
                </label>
                {usernameHelpSections.length > 0 && (
                  <button
                    type="button"
                    onClick={openUsernameHelp}
                    className="text-[11px] font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    {t.usernameHelpButton}
                  </button>
                )}
              </div>
              <div className="relative group">
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white">
                  {avatar ? (
                    <img src={avatar} alt="User" className="w-5 h-5 rounded-full object-cover"/>
                  ) : (
                    <User size={18}/>
                  )}
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder={t.placeholderUsername}
                  minLength={USERNAME_MIN_LENGTH}
                  maxLength={USERNAME_MAX_LENGTH}
                  disabled={submitting}
                  className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-xl py-3.5 pl-10 pr-12 text-white outline-none transition-all placeholder:text-zinc-600 font-medium disabled:cursor-not-allowed disabled:opacity-60"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {isLoadingUser && <Loader2 size={16} className="text-zinc-400 animate-spin"/>}
                  {!isLoadingUser && username && (
                    <button
                      type="button"
                      onClick={handleClearUsername}
                      disabled={submitting}
                      className="text-zinc-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X size={16}/>
                    </button>
                  )}
                </div>
              </div>
              {usernameError && (
                <p className="text-xs text-red-400 ml-1">{usernameError}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 ml-1">
                {activeTab === TabType.STARS ? t.labelAmountStars : t.labelDuration}
              </label>

              {activeTab === TabType.STARS ? (
                <div className="relative group">
                  <div
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-yellow-400">
                    <Star size={18} fill="currentColor"/>
                  </div>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={starsAmount}
                    onChange={handleAmountChange}
                    onBlur={handleBlurAmount}
                    disabled={submitting}
                    className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-xl py-3.5 pl-10 pr-24 text-white outline-none transition-all font-mono text-lg disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium pointer-events-none">
                    ≈ {calculations.subtotal.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {PREMIUM_MONTHS.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setStarsAmount(duration)}
                      disabled={submitting}
                      className={`
                    flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-200
                    ${starsAmount === duration
                        ? 'bg-primary-400/10 border-primary-400 text-primary-400 ring-1 ring-primary-400/50'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900'}
                  `}
                    >
                      <span className="text-lg font-bold">{duration} {language === 'ru' ? 'Мес.' : 'Mon.'}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === TabType.STARS && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {STAR_PACKAGES.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setStarsAmount(amt)}
                      disabled={submitting}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 rounded-lg text-xs font-medium text-zinc-300 transition-colors"
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 ml-1">{t.labelPayment}</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <CreditCard size={18}/>
                </div>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodCode)}
                  disabled={submitting}
                  className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl py-3.5 pl-10 pr-10 text-white outline-none appearance-none cursor-pointer transition-all font-medium disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {paymentMethods.map((m) => (
                    <option key={m.id} value={m.code}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <ChevronDown size={16}/>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400 flex items-center gap-1">
                  {t.rowReceive}
                  <div className="group relative">
                    <Info
                      size={14}
                      aria-label={t.rowReceiveTooltip}
                      className="text-zinc-600 hover:text-zinc-400 cursor-help"
                    />
                  <span className="absolute left-1/2 bottom-full -translate-x-1/2 -mb-3 max-w-[14rem] w-max px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition pointer-events-none break-words text-center shadow-lg">
                    {t.rowReceiveTooltip}
                  </span>
                  </div>
                </span>
                <span className="text-white font-medium flex items-center gap-1.5">
                  {calculations.receiveAmount.toLocaleString()}
                  {activeTab === TabType.STARS ? (
                    <Star size={14} className="fill-yellow-500 text-yellow-500"/>
                  ) : (
                    <span className="text-xs text-zinc-500">{language === 'ru' ? 'мес.' : 'mo.'}</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400 flex items-center gap-1">
                  {t.rowFeeSystem}
                  <div className="group relative">
                    <Info
                      size={14}
                      aria-label={t.rowFeeSystemTooltip}
                      className="text-zinc-600 hover:text-zinc-400 cursor-help"
                    />
                  <span className="absolute left-1/2 bottom-full -translate-x-1/2 -mb-3 max-w-[14rem] w-max px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition pointer-events-none break-words text-center shadow-lg">
                    {t.rowFeeSystemTooltip}
                  </span>
                  </div>
                </span>
                <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                  {calculations.fee} ₽
                </span>
              </div>
            </div>

            <button
              disabled={!canProceedToReview || submitting}
              onClick={() => setStep(2)}
              className={`
            w-full py-4 rounded-xl font-bold text-lg tracking-wide shadow-xl transition-all duration-200 mt-2
            flex items-center justify-center gap-2
            ${canProceedToReview
                ? 'bg-primary-400 hover:bg-primary-500 text-black shadow-primary-500/20 translate-y-0'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-70'}
          `}
            >
              <span>{t.btnContinue}</span>
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                disabled={submitting}
                className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={16}/>
                <span>{t.back}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 bg-zinc-950/60 border border-zinc-800 rounded-xl p-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center">
                {avatar ? <img src={avatar} alt="User" className="w-full h-full object-cover"/> : <User size={22} className="text-zinc-400"/>}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-zinc-400 uppercase tracking-wide">{t.userProfile}</span>
                <span className="text-base text-white font-semibold">@{username || t.emptyUsername}</span>
                {displayName ? <span className="text-xs text-zinc-500">{displayName}</span> : null}
              </div>
            </div>

            <>
              <div className="text-xs text-zinc-400 mb-3">{t.orderSummary}</div>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-sm text-zinc-300">
                    <span>{t.priceRub}</span>
                    <span className="text-xs text-zinc-500">
                      ({activePaymentMethod?.name || t.paymentFallback})
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold text-white">
                      {calculations.total.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs text-primary-200 bg-primary-500/10 border border-primary-500/40 px-2 py-1 rounded-lg w-fit">
                    <Wallet size={14}/>
                    <span>{t.badgeRub}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <ArrowRight size={24} className="text-zinc-600"/>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-sm text-zinc-300">
                    <span>
                      {activeTab === TabType.STARS ? t.amountTitleStars : t.amountTitlePremium}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold text-white">
                      {calculations.receiveAmount.toLocaleString()}
                    </span>
                    {activeTab === TabType.STARS ? (
                      <Star size={18} className="fill-yellow-500 text-yellow-500"/>
                    ) : (
                      <CalendarDays size={18} className="text-primary-300"/>
                    )}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs text-primary-200 bg-primary-500/10 border border-primary-500/40 px-2 py-1 rounded-lg w-fit">
                    {activeTab === TabType.STARS ? <Star size={14} className="fill-yellow-500 text-yellow-500"/> : <CalendarDays size={14} className="text-primary-300"/>}
                    <span>{activeTab === TabType.STARS ? t.badgeStars : t.badgePremium}</span>
                  </div>
                </div>
              </div>
            </>

            {submittingPhase === 'idle' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 ml-1 flex items-center gap-2">
                    {walletLabel}
                    {!walletRequired && (
                      <span className="text-[10px] uppercase tracking-wide text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-700">
                        {t.walletOptionalBadge}
                      </span>
                    )}
                  </label>
                  <div className="relative group">
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white">
                      <Mail size={18}/>
                    </div>
                    <input
                      type="text"
                      value={wallet}
                      onChange={(e) => handleWalletChange(e.target.value)}
                      placeholder={walletPlaceholder}
                      disabled={submitting}
                      className={`w-full bg-zinc-950 border rounded-xl py-3.5 pl-10 pr-4 text-white outline-none transition-all font-medium ${
                        walletError ? 'border-red-500/70 focus:border-red-500' : 'border-zinc-800 hover:border-zinc-700 focus:border-zinc-600'
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    />
                  </div>
                  {walletError && <p className="text-xs text-red-400 ml-1">{walletError}</p>}
                </div>

                <div className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                  <AlertCircle size={18} className="text-amber-400 mt-0.5"/>
                  <p className="text-xs text-zinc-300 leading-relaxed">{t.walletInfo}</p>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <div className="relative flex items-center pt-0.5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      disabled={submitting}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-zinc-700 bg-zinc-950 checked:border-primary-500 checked:bg-primary-500 transition-all"
                    />
                    <Check
                      size={14}
                      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100"
                      strokeWidth={3}
                    />
                  </div>
                  <label htmlFor="terms" className="text-xs text-zinc-500 leading-tight cursor-pointer select-none">
                    {t.agreePrefix} <span
                    className="text-zinc-300 underline decoration-zinc-700 underline-offset-2">{t.terms}</span> & <span
                    className="text-zinc-300 underline decoration-zinc-700 underline-offset-2">{t.refund}</span> {language === 'ru' &&
                    <br/>} {t.agreeSuffix}
                  </label>
                </div>

                <button
                  disabled={!canPay}
                  onClick={handlePay}
                  className={`
            w-full py-4 rounded-xl font-bold text-lg tracking-wide shadow-xl transition-all duration-200 mt-2
            flex items-center justify-center gap-2
            ${canPay
                ? 'bg-primary-400 hover:bg-primary-500 text-black shadow-primary-500/20 translate-y-0'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-70'}
          `}
                >
                  <span>{t.btnPay}</span>
                  <span>{calculations.total.toLocaleString('ru-RU')} ₽</span>
                </button>
              </>
            )}

            {submittingPhase === 'creating' && (
              <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                <Loader2 size={18} className="text-primary-300 animate-spin"/>
                <div className="flex flex-col">
                  <span className="text-sm text-white">{t.creatingLink}</span>
                </div>
              </div>
            )}

            {submittingPhase === 'waiting' && (
              <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                <Loader2 size={18} className="text-primary-300 animate-spin"/>
                <div className="flex flex-col">
                  <span className="text-sm text-white">{currentStatusLabel}</span>
                </div>
              </div>
            )}

            {submittingPhase === 'failed' && (
              <div className="flex items-center gap-3 bg-zinc-950 border border-red-900 rounded-xl p-4">
                <AlertCircle size={18} className="text-red-400"/>
                <div className="flex flex-col">
                  <span className="text-sm text-white">{currentStatusLabel}</span>
                </div>
              </div>
            )}

            {submittingPhase === 'completed' && (
              <div className="flex flex-col items-center gap-4 bg-zinc-950 border border-emerald-700 rounded-xl p-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check size={28} className="text-black" strokeWidth={3}/>
                </div>
                <span className="text-lg font-semibold text-white">{t.paymentCompleted}</span>
              </div>
            )}
          </>
        )}
      </div>
      {isUsernameHelpOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeUsernameHelp}
          />
          <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold text-white">{t.usernameHelpTitle}</h3>
              <button
                onClick={closeUsernameHelp}
                className="text-zinc-500 hover:text-white transition-colors p-1"
              >
                <X size={22}/>
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-88px)]">
              {usernameHelpSections.map((section) => {
                const isOpen = usernameHelpAccordion[section.platform];
                return (
                  <div
                    key={section.platform}
                    className="border border-zinc-800 rounded-xl bg-zinc-950/60"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleUsernameHelpSection(section.platform)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left text-sm text-white"
                    >
                      <span>{section.platform}</span>
                      <ChevronDown
                        size={16}
                        className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <ul className="px-4 pb-4 space-y-2 text-sm text-zinc-300">
                        {section.steps.map((step, idx) => (
                          <li key={`${section.platform}-${idx}`} className="flex items-start gap-2">
                            <span className="mt-0.5 text-primary-400">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapWidget;