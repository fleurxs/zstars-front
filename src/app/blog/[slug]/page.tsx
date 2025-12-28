import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BLOG_POSTS, TRANSLATIONS} from '@/constants';
import {Language} from '@/types';
import BlogPostClient from '@/components/BlogPostClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zstars.app';

export function generateStaticParams() {
  const slugs = Array.from(
    new Set([...BLOG_POSTS.ru, ...BLOG_POSTS.en].map((post) => post.slug)),
  );
  return slugs.map((slug) => ({slug}));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{slug: string}>;
  searchParams?: Promise<{lang?: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const search = (await searchParams) ?? {};
  const language: Language = search.lang === 'en' ? 'en' : 'ru';
  const seo = TRANSLATIONS[language].seo;
  const post =
    BLOG_POSTS[language].find((item) => item.slug === slug) ||
    BLOG_POSTS.ru.find((item) => item.slug === slug);
  const title = post?.title ?? seo.blogPostFallbackTitle;
  const description = post?.excerpt ?? seo.blogPostFallbackDescription;
  const image = post?.image
    ? [
        {
          url: post.image,
          alt: post.title,
        },
      ]
    : [
        {
          url: '/favicon.ico',
          width: 64,
          height: 64,
          alt: 'zStars логотип',
        },
      ];

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/blog/${slug}`,
      images: image,
    },
    twitter: {
      title,
      description,
      images: image.map((item) => item.url),
    },
  };
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{slug: string}>;
  searchParams?: Promise<{lang?: string}>;
}) {
  const {slug} = await params;
  const paramsData = (await searchParams) ?? {};
  const language: Language = paramsData.lang === 'en' ? 'en' : 'ru';
  const exists =
    BLOG_POSTS[language].some((item) => item.slug === slug) ||
    BLOG_POSTS.ru.some((item) => item.slug === slug);

  if (!exists) {
    return notFound();
  }

  return <BlogPostClient slug={slug} initialLanguage={language} />;
}

