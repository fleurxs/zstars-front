import React, {useEffect, useMemo, useState} from 'react';
import {Check, ChevronDown, CreditCard, Info, Star, User} from 'lucide-react';
import {Language, PaymentMethod, TabType} from '../types';
import {
  DEFAULT_AVATAR,
  MAX_STARS,
  MIN_STARS,
  PAYMENT_FEE_PERCENT,
  PAYMENT_METHODS,
  RUB_PER_STAR,
  STAR_PACKAGES,
  TRANSLATIONS,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH
} from '../constants';

interface SwapWidgetProps {
  language: Language;
}

const SwapWidget: React.FC<SwapWidgetProps> = ({language}) => {
  const t = TRANSLATIONS[language].widget;

  const [activeTab, setActiveTab] = useState<TabType>(TabType.STARS);
  const [username, setUsername] = useState<string>('');
  const [starsAmount, setStarsAmount] = useState<number | string>(50); // Allow string for typing
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.SBP);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  // Simulate backend avatar fetch
  useEffect(() => {
    if (username.length >= USERNAME_MIN_LENGTH) {
      // In a real app, this would be a debounce fetch
      setAvatar(DEFAULT_AVATAR);
    } else {
      setAvatar(null);
    }
  }, [username]);

  // Username validation handler
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only English letters, numbers, and underscores
    const cleaned = val.replace(/[^a-zA-Z0-9_]/g, '');
    setUsername(cleaned);
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

  return (
    <div
      className="w-full max-w-[500px] bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden relative">

      {/* Tab Switcher */}
      <div className="p-1 mx-6 mt-6 bg-zinc-950/50 rounded-xl flex items-center relative z-10">
        <button
          onClick={() => setActiveTab(TabType.STARS)}
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

        {/* Username Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 ml-1">{t.labelUsername}</label>
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
              className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-xl py-3.5 pl-10 pr-4 text-white outline-none transition-all placeholder:text-zinc-600 font-medium"
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 ml-1">
            {activeTab === TabType.STARS ? t.labelAmountStars : t.labelDuration}
          </label>
          <div className="relative group">
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-yellow-400">
              <Star size={18} fill={activeTab === TabType.STARS ? "currentColor" : "none"}/>
            </div>

            <input
              type="text"
              inputMode="numeric"
              value={starsAmount}
              onChange={handleAmountChange}
              onBlur={handleBlurAmount}
              className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-xl py-3.5 pl-10 pr-24 text-white outline-none transition-all font-mono text-lg"
            />

            {/* Price Estimate Indicator */}
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium pointer-events-none">
              ≈ {calculations.subtotal.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          {/* Quick Selectors */}
          {activeTab === TabType.STARS && (
            <div className="flex flex-wrap gap-2 mt-2">
              {STAR_PACKAGES.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setStarsAmount(amt)}
                  className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 rounded-lg text-xs font-medium text-zinc-300 transition-colors"
                >
                  {amt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 ml-1">{t.labelPayment}</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
              <CreditCard size={18}/>
            </div>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl py-3.5 pl-10 pr-10 text-white outline-none appearance-none cursor-pointer transition-all font-medium"
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
              <ChevronDown size={16}/>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <div className="relative flex items-center pt-0.5">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-zinc-700 bg-zinc-950 checked:border-primary-500 checked:bg-primary-500 transition-all"
            />
            <Check size={14}
                   className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100"
                   strokeWidth={3}/>
          </div>
          <label htmlFor="terms" className="text-xs text-zinc-500 leading-tight cursor-pointer select-none">
            {t.agreePrefix} <span
            className="text-zinc-300 underline decoration-zinc-700 underline-offset-2">{t.terms}</span> & <span
            className="text-zinc-300 underline decoration-zinc-700 underline-offset-2">{t.refund}</span> {language === 'ru' &&
            <br/>} {t.agreeSuffix}
          </label>
        </div>

        {/* Breakdown Section */}
        <div className="pt-4 border-t border-zinc-800 space-y-3">

          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400 flex items-center gap-1">
              {t.rowReceive}
              <div className="group relative">
                <Info size={14} className="text-zinc-600 hover:text-zinc-400 cursor-help"/>
              </div>
            </span>
            <span className="text-white font-medium flex items-center gap-1.5">
              {calculations.receiveAmount.toLocaleString()}
              <Star size={14} className="fill-yellow-500 text-yellow-500"/>
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400 flex items-center gap-1">
              {t.rowFeeSystem}
              <Info size={14} className="text-zinc-600 hover:text-zinc-400 cursor-help"/>
            </span>
            <span className="text-zinc-300 font-medium flex items-center gap-1.5">
              {calculations.fee} ₽
            </span>
          </div>

        </div>

        {/* Action Button */}
        <button
          disabled={!agreed || username.length < USERNAME_MIN_LENGTH}
          className={`
            w-full py-4 rounded-xl font-bold text-lg tracking-wide shadow-xl transition-all duration-200 mt-2
            flex items-center justify-center gap-2
            ${agreed && username.length >= USERNAME_MIN_LENGTH
            ? 'bg-primary-400 hover:bg-primary-500 text-black shadow-primary-500/20 translate-y-0'
            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-70'}
          `}
        >
          <span>{t.btnPay}</span>
          <span>{calculations.total.toLocaleString('ru-RU')} ₽</span>
        </button>

      </div>
    </div>
  );
};

export default SwapWidget;