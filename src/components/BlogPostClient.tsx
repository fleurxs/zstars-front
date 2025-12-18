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
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">
                  {post.date}
                </span>
                <Link
                  href="/blog"
                  className="text-sm text-primary-400 hover:underline font-medium"
                >
                  {language === 'ru' ? 'К списку статей' : 'Back to articles'}
                </Link>
              </div>
              <h1 className="text-3xl font-bold">{post.title}</h1>
            </div>

            <div className="rounded-2xl overflow-hidden border border-zinc-800 mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="space-y-5 text-zinc-200 leading-relaxed">
              {'contentHtml' in (post || {}) && typeof (post as {contentHtml?: unknown}).contentHtml === 'string' ? (
                <article
                  className="space-y-4 text-base leading-relaxed [&_h1]:text-white [&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-white [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-semibold [&_h2]:mb-2 [&_h3]:text-white [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:font-semibold [&_h3]:mb-2 [&_strong]:text-white [&_a]:text-primary-400 [&_a:hover]:underline [&_code]:text-primary-300"
                  dangerouslySetInnerHTML={{
                    __html: (post as {contentHtml: string}).contentHtml,
                  }}
                />
              ) : (
                ((post as {content?: string[]}).content || []).map(
                  (paragraph: string, index: number) => (
                  <p key={index} className="text-base">
                    {paragraph}
                  </p>
                  ),
                )
              )}
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

