import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {TRANSLATIONS} from '@/constants';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zstars.app';
const seo = TRANSLATIONS.ru.seo;

export const metadata: Metadata = {
  title: seo.aboutTitle,
  description: seo.aboutDescription,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: seo.aboutTitle,
    description: seo.aboutDescription,
    url: `${siteUrl}/about`,
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
    title: seo.aboutTitle,
    description: seo.aboutDescription,
    images: ['/favicon.ico'],
  },
};

export default function AboutLayout({children}: {children: ReactNode}) {
  return children;
}

