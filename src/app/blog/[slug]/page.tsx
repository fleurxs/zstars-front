import {notFound} from 'next/navigation';
import {BLOG_POSTS} from '@/constants';
import {Language} from '@/types';
import BlogPostClient from '@/components/BlogPostClient';

export function generateStaticParams() {
  const slugs = Array.from(
    new Set([...BLOG_POSTS.ru, ...BLOG_POSTS.en].map((post) => post.slug)),
  );
  return slugs.map((slug) => ({slug}));
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{slug: string}>;
  searchParams?: {lang?: string};
}) {
  const {slug} = await params;
  const language: Language = searchParams?.lang === 'en' ? 'en' : 'ru';
  const exists =
    BLOG_POSTS[language].some((item) => item.slug === slug) ||
    BLOG_POSTS.ru.some((item) => item.slug === slug);

  if (!exists) {
    return notFound();
  }

  return <BlogPostClient slug={slug} initialLanguage={language} />;
}

