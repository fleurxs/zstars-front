import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {TRANSLATIONS} from '@/constants';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zstars.app';
const seo = TRANSLATIONS.ru.seo;

export const metadata: Metadata = {
  title: seo.contactsTitle,
  description: seo.contactsDescription,
  alternates: {
    canonical: '/contacts',
  },
  openGraph: {
    title: seo.contactsTitle,
    description: seo.contactsDescription,
    url: `${siteUrl}/contacts`,
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
    title: seo.contactsTitle,
    description: seo.contactsDescription,
    images: ['/favicon.ico'],
  },
};

export default function ContactsLayout({children}: {children: ReactNode}) {
  return children;
}

