'use client';

import {useState} from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import {BLOG_POSTS, TRANSLATIONS} from '@/constants';
import {Language} from '@/types';

const BlogPostClient = ({
  slug,
  initialLanguage,
}: {
  slug: string;
  initialLanguage: Language;
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const posts = BLOG_POSTS[language];
  const fallbackPost = BLOG_POSTS.ru.find((item) => item.slug === slug);
  const post = posts.find((item) => item.slug === slug) || fallbackPost;
  const t = TRANSLATIONS[language];

  if (!post) return null;

  return (
    <div className="min-h-screen relative selection:bg-primary-500/30 selection:text-primary-400 overflow-hidden flex flex-col bg-black">
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar language={language} setLanguage={setLanguage} />

        <main className="flex-1 flex flex-col items-center p-4 md:p-8">
          <div className="w-full max-w-3xl text-white">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">
                  {post.date}
                </span>
                <h1 className="text-3xl font-bold mt-2">{post.title}</h1>
              </div>
              <Link
                href="/blog"
                className="text-sm text-primary-400 hover:underline font-medium"
              >
                {language === 'ru' ? 'К списку статей' : 'Back to articles'}
              </Link>
            </div>

            <div className="rounded-2xl overflow-hidden border border-zinc-800 mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="space-y-5 text-zinc-200 leading-relaxed">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-zinc-800 pt-6 text-sm text-zinc-400">
              <span>{t.newsTitle}</span>
              <Link
                href="/blog"
                className="text-primary-400 hover:underline font-medium"
              >
                {language === 'ru'
                  ? 'Посмотреть другие материалы'
                  : 'See other posts'}
              </Link>
            </div>
          </div>
        </main>

        <Footer language={language} />
        <CookieBanner language={language} />
      </div>
    </div>
  );
};

export default BlogPostClient;

