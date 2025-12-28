import type {Metadata} from 'next';
import {Language} from '@/types';
import BlogListClient from '@/components/BlogListClient';
import {TRANSLATIONS} from '@/constants';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zstars.app';

function resolveTexts(lang: 'ru' | 'en') {
  const seo = TRANSLATIONS[lang].seo;
  return {
    title: seo.blogTitle,
    description: seo.blogDescription,
  };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{lang?: string}>;
}): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const lang: 'ru' | 'en' = params.lang === 'en' ? 'en' : 'ru';
  const {title, description} = resolveTexts(lang);

  return {
    title,
    description,
    alternates: {
      canonical: '/blog',
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/blog`,
      images: [
        {
          url: '/favicon.ico',
          width: 64,
          height: 64,
          alt: 'zStars логотип',
        },
      ],
    },
    twitter: {
      title,
      description,
      images: ['/favicon.ico'],
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{lang?: string}>;
}) {
  const params = (await searchParams) ?? {};
  const language: Language = params.lang === 'en' ? 'en' : 'ru';

  return <BlogListClient initialLanguage={language} />;
}

