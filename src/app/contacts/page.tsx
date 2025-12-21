'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TRANSLATIONS } from '@/constants';
import { Language } from '@/types';
import { MessageCircle, Mail, Clock } from 'lucide-react';

export default function ContactsPage() {
  const [language, setLanguage] = React.useState<Language>('ru');
  const t = TRANSLATIONS[language];
  const tc = t.contacts;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar language={language} setLanguage={setLanguage} />

      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            {tc.title}
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {tc.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Telegram Support */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 hover:bg-zinc-900/70 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-400 text-zinc-900">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{tc.telegramTitle}</h3>
                <p className="text-zinc-400">{tc.telegramDesc}</p>
              </div>
            </div>
            <p className="text-zinc-300 mb-6">
              {tc.telegramResponse}
            </p>
            <a
              href="https://t.me/epipiz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {tc.telegramBtn}
            </a>
          </div>

          {/* Working Hours */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-800 text-zinc-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{tc.hoursTitle}</h3>
                <p className="text-zinc-400">{tc.hoursDesc}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">{tc.weekday}</span>
                <span className="text-white font-medium">{tc.hoursWeekday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">{tc.weekend}</span>
                <span className="text-white font-medium">{tc.hoursWeekend}</span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm mt-4">
              {tc.hoursNote}
            </p>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
