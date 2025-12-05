'use client';

import React, {useState} from 'react';
import Navbar from '@/components/Navbar';
import SwapWidget from '@/components/SwapWidget';
import InfoSlider from '@/components/InfoSlider';
import ReferralBlock from '@/components/ReferralBlock';
import FAQ from '@/components/FAQ';
import LatestNews from '@/components/LatestNews';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';
import {Language} from '@/types';

export default function Home() {
  const [language, setLanguage] = useState<Language>('ru');

  return (
    <div className="min-h-screen relative selection:bg-primary-500/30 selection:text-primary-400 overflow-hidden flex flex-col">
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar language={language} setLanguage={setLanguage} />

        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
          <div className="w-full flex flex-col items-center justify-center max-w-[500px]">
             <SwapWidget language={language} />
             <InfoSlider language={language} />
             <ReferralBlock language={language} />
             <FAQ language={language} />
             <LatestNews language={language} />
          </div>
        </main>

        <Footer language={language} />
        <CookieBanner language={language} />
      </div>
    </div>
  );
}
