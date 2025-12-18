'use client';

import {useState} from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import {BLOG_POSTS, TRANSLATIONS} from '@/constants';
import {Language} from '@/types';

const BlogListClient = ({initialLanguage}: {initialLanguage: Language}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t = TRANSLATIONS[language];
  const posts = BLOG_POSTS[language];

  return (
    <div className="min-h-screen relative selection:bg-primary-500/30 selection:text-primary-400 overflow-hidden flex flex-col bg-black">
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar language={language} setLanguage={setLanguage} />

        <main className="flex-1 flex flex-col items-center p-4 md:p-8">
          <div className="w-full max-w-5xl">
            <div className="text-center space-y-2 mb-10">
              <h1 className="text-3xl font-bold text-white">{t.newsTitle}</h1>
              <p className="text-sm text-zinc-400">
                {language === 'ru'
                  ? 'Свежие разборы рынка, TON и безопасность в Telegram.'
                  : 'Fresh takes on the market, TON outlook, and Telegram security.'}
              </p>
            </div>

            <div className="grid gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-primary-500/60 transition-all duration-300"
                >
                  <div className="sm:flex">
                    <div className="sm:w-56 h-40 sm:h-full overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-5 flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-xs text-zinc-400">
                        <span className="font-semibold uppercase tracking-wide text-primary-400">
                          {post.date}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <span className="text-sm font-medium text-primary-400 group-hover:underline">
                        {t.readMore}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <Footer language={language} />
        <CookieBanner language={language} />
      </div>
    </div>
  );
};

export default BlogListClient;

