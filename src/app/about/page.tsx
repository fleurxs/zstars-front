'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TRANSLATIONS } from '@/constants';
import { Language } from '@/types';
import { Shield, Zap, HeadphonesIcon, DollarSign } from 'lucide-react';

export default function AboutPage() {
  const [language, setLanguage] = React.useState<Language>('ru');
  const t = TRANSLATIONS[language];
  const ta = t.about;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar language={language} setLanguage={setLanguage} />

      <main className="flex-1 max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            {ta.title}
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {ta.subtitle}
          </p>
        </div>

        <div className="space-y-8 mb-16">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              {ta.description1}
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              {ta.description2}
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              {ta.description3}
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            {ta.features.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900/70 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-green-400 text-zinc-900">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{ta.features.reliable}</h3>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900/70 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-400 text-zinc-900">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{ta.features.speed}</h3>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900/70 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-purple-400 text-zinc-900">
                  <HeadphonesIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{ta.features.support}</h3>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900/70 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-400 text-zinc-900">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{ta.features.prices}</h3>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
