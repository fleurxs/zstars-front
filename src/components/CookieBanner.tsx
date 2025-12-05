import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface CookieBannerProps {
  language: Language;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = TRANSLATIONS[language].cookie;

  useEffect(() => {
    // Check if the user has already accepted cookies
    const consented = localStorage.getItem('starpay_cookie_consent');
    if (!consented) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('starpay_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 flex justify-center">
      <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center gap-4 max-w-lg w-full animate-in slide-in-from-bottom-5 duration-500">
        <div className="text-sm text-zinc-300 text-center sm:text-left flex-1">
          {t.text}{' '}
          <a href="#" className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors">
            {t.link}
          </a>
        </div>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-zinc-100 text-zinc-900 hover:bg-white rounded-xl font-semibold text-sm transition-colors shadow-lg active:scale-95 transform whitespace-nowrap"
        >
          {t.button}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
