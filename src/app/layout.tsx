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
  const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID as string;
  const shouldLoadYandexMetrika = yandexMetrikaId && yandexMetrikaId.trim() !== '';

  const yandexMetrikaScript = shouldLoadYandexMetrika ? `
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.webvisor.org/metrika/tag_ww.js?id=${yandexMetrikaId}', 'ym');

    ym(${yandexMetrikaId}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
  ` : '';
  return (
    <html lang="ru">
      <head>
        {/* Yandex.Metrika counter */}
        {shouldLoadYandexMetrika && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: yandexMetrikaScript,
            }}
          />
        )}
        {/* /Yandex.Metrika counter */}
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased bg-black text-white`}>
        {/* Yandex.Metrika counter */}
        {shouldLoadYandexMetrika && (
          <noscript>
            <div>
              <img src={"https://mc.yandex.ru/watch/" + yandexMetrikaId} style={{position: "absolute", left: "-9999px"}} alt="" />
            </div>
          </noscript>
        )}
        {/* /Yandex.Metrika counter */}

        {children}
      </body>
    </html>
  );
}
