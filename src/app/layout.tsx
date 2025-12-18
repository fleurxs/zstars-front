import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zstars.app";
const title = "zStars — Telegram Stars и Premium без лишних комиссий";
const description =
  "Покупка Telegram Stars и подписки Telegram Premium с мгновенной доставкой. Оплата СБП, банковской картой РФ и криптовалютой TON без KYC. Промокоды, реферальная программа до 50% комиссии и круглосуточная поддержка.";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | zStars",
  },
  description,
  applicationName: "zStars",
  keywords: [
    "купить telegram stars",
    "telegram premium",
    "оплата telegram",
    "ton криптовалюта",
    "звезды телеграм",
    "сбп оплата",
    "банковская карта telegram stars",
    "телеграм звездочки",
    "referral telegram stars",
    "пополнить stars",
  ],
  authors: [{ name: "Команда zStars" }],
  creator: "zStars",
  publisher: "zStars",
  category: "finance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "zStars",
    images: [
      {
        url: "/favicon.ico",
        width: 64,
        height: 64,
        alt: "zStars логотип",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/favicon.ico"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} ${inter.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
