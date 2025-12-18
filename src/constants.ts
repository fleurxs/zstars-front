

export const APP_NAME = "zStars";

// Exchange Rates
export const RUB_PER_STAR = 1.5;
export const PAYMENT_FEE_PERCENT = 0.045; // 4.5%
export const SERVICE_FEE_FLAT = 0; // Included in spread or separate

// Limits
export const MIN_STARS = 50;
export const MAX_STARS = 1000000;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 32;

// Assets
export const DEFAULT_AVATAR = "https://cdn4.telesco.pe/file/jpGEK3vS5Qpg_T6WRWQVoNP68wTsTBTHymqvIWESvDi_7zWsMfptz1KGFyLuS4QYWE01TI2w6JynWyjdvKUbyuEatcYp9BzQki0LnqeQlcWvq5afdJk9M_kWVwWSdVxtF6Ml5anTdHwyxkgeOQHzZl0MUNFauwc6Bn-pomKLfvpdEol2EpRUyF5z3ttHe445Vu8qMPnhkvkyY_lF_Mlv9KEXdzlluwvf9xmsNGsIK5YaIfYAwK7VRCoh87jsos_L-8KsZpRhBsk3QPSyiXZWyYpTWg6FSEw56bM3dRBhnl0uWHgV14ys3ptJ8GK7mnEmuARVAWuwBAfNDuBI0hUCPA.jpg";

// Quick Links
export const STAR_PACKAGES = [50, 250, 1000, 5000];
export const PREMIUM_MONTHS = [3, 6, 12];

export const PAYMENT_METHODS = [
  { id: 'sbp', name: 'СБП (Fast Payment)', icon: '⚡' },
  { id: 'card_ru', name: 'Bank Card RU', icon: '💳' },
  { id: 'ton', name: 'TON Crypto', icon: '💎' },
];

export const SLIDES = {
  ru: [
    {
      id: 1,
      title: "zStars News",
      text: "Подписывайтесь на наш телеграм канал. Рассказываем об экосистеме телеграм и не только.",
      linkUrl: "https://t.me/zStarsNews",
      linkLabel: "Перейти в канал",
      iconType: "telegram"
    },
    {
      id: 2,
      title: "TON Кабинет",
      text: "Скоро появится возможность оплатить личный кабинет TON. Следи за новостями.",
      linkUrl: "https://t.me/zStarsNews",
      linkLabel: "Следить за новостями",
      iconType: "ton"
    }
  ],
  en: [
    {
      id: 1,
      title: "zStars News",
      text: "Subscribe to our Telegram channel. We talk about the Telegram ecosystem and more.",
      linkUrl: "https://t.me/zStarsNews",
      linkLabel: "Open channel",
      iconType: "telegram"
    },
    {
      id: 2,
      title: "TON Cabinet",
      text: "Soon you will be able to pay for the TON personal cabinet. Follow the news.",
      linkUrl: "https://t.me/zStarsNews",
      linkLabel: "Follow news",
      iconType: "ton"
    }
  ]
};

export const NEWS_ITEMS = {
  ru: [
    {
      id: 1,
      image: "https://changelly.com/_next/image?url=%2Fweb-assets%2Fguides-faq%2Fexchange-guides-2.png&w=256&q=75",
      title: "Почему новые подарки не приносят ожидаемого профита?",
      desc: "Разбираемся в ситуации на рынке, анализируем прошлые дропы и делимся секретами.",
      date: "12 Окт"
    },
    {
      id: 2,
      image: "https://changelly.com/_next/image?url=%2Fweb-assets%2Fguides-faq%2Fexchange-guides-4.png&w=256&q=75",
      title: "TON бьет все рекорды: прогноз на 2025",
      desc: "Экосистема растет с невероятной скоростью. Узнайте, какие монеты стоит держать в кошельке.",
      date: "10 Окт"
    },
    {
      id: 3,
      image: "https://changelly.com/_next/image?url=%2Fweb-assets%2Fguides-faq%2Fexchange-guides-3.png&w=256&q=75",
      title: "Безопасность активов в Telegram",
      desc: "Как защитить свои Stars и TON от мошенников? Простые правила цифровой гигиены.",
      date: "08 Окт"
    }
  ],
  en: [
    {
      id: 1,
      image: "https://changelly.com/_next/image?url=%2Fweb-assets%2Fguides-faq%2Fexchange-guides-2.png&w=256&q=75",
      title: "Why new gifts don't bring expected profit?",
      desc: "We analyze the market situation, review past drops, and share secrets.",
      date: "Oct 12"
    },
    {
      id: 2,
      image: "https://changelly.com/_next/image?url=%2Fweb-assets%2Fguides-faq%2Fexchange-guides-4.png&w=256&q=75",
      title: "TON breaks records: forecast for 2025",
      desc: "The ecosystem is growing at incredible speed. Find out which coins are worth holding.",
      date: "Oct 10"
    },
    {
      id: 3,
      image: "https://changelly.com/_next/image?url=%2Fweb-assets%2Fguides-faq%2Fexchange-guides-3.png&w=256&q=75",
      title: "Asset security in Telegram",
      desc: "How to protect your Stars and TON from scammers? Simple digital hygiene rules.",
      date: "Oct 08"
    }
  ]
};

export const FAQ_ITEMS = {
  ru: [
    {
      question: "Зачем нужны звезды телеграм?",
      answer: "Telegram Stars — это внутренняя валюта экосистемы Telegram. Она используется для оплаты цифровых товаров и услуг в ботах и мини-приложениях, а также для поддержки авторов контента."
    },
    {
      question: "Что дает телеграм премиум?",
      answer: "Premium подписка снимает многие ограничения: удваивает лимиты каналов и папок, увеличивает скорость загрузки, позволяет отправлять файлы до 4 ГБ, дает эксклюзивные стикеры, реакции и отключает рекламу."
    },
    {
      question: "Как я могу оплатить телеграм звезды или премиум?",
      answer: "Мы принимаем самые популярные способы оплаты: СБП (Система Быстрых Платежей), банковские карты РФ и криптовалюту TON. Выберите удобный метод в форме заказа."
    },
    {
      question: "Требуется ли процедура KYC для покупки?",
      answer: "Нет, наш сервис полностью анонимен и не требует прохождения процедуры KYC (верификации личности). Нам нужен только ваш юзернейм для доставки товара."
    },
    {
      question: "Сколько времени занимает доставка моего заказа?",
      answer: "В большинстве случаев зачисление звезд или активация Premium происходит мгновенно после оплаты. В редких случаях (при высокой нагрузке сети TON) это может занять до 10-15 минут."
    }
  ],
  en: [
    {
      question: "Why are Telegram Stars needed?",
      answer: "Telegram Stars are the internal currency of the Telegram ecosystem. They are used to pay for digital goods and services in bots and mini-apps, as well as to support content creators."
    },
    {
      question: "What does Telegram Premium give?",
      answer: "Premium subscription removes many limits: it doubles channel and folder limits, increases download speeds, allows sending files up to 4 GB, gives exclusive stickers, reactions, and removes ads."
    },
    {
      question: "How can I pay for Telegram Stars or Premium?",
      answer: "We accept popular payment methods: SBP (Fast Payment System), Russian bank cards, and TON cryptocurrency. Select your preferred method in the order form."
    },
    {
      question: "Is KYC procedure required for purchase?",
      answer: "No, our service is completely anonymous and does not require KYC (identity verification). We only need your username to deliver the purchase."
    },
    {
      question: "How long does order delivery take?",
      answer: "In most cases, Stars crediting or Premium activation happens instantly after payment. In rare cases (during high TON network load), it may take up to 10-15 minutes."
    }
  ]
};

export const LEGAL_CONTENT = {
  ru: {
    privacy: `Политика конфиденциальности zStars

1. Общие положения
Настоящая политика описывает, как мы собираем, используем и защищаем вашу информацию. Мы уважаем вашу конфиденциальность и стремимся защитить ваши личные данные.

2. Сбор данных
Мы собираем только минимально необходимые данные для выполнения заказа: имя пользователя Telegram. Мы не храним платежные данные ваших карт.

3. Использование данных
Данные используются исключительно для обработки заказов и улучшения качества обслуживания. Мы не передаем ваши данные третьим лицам, за исключением случаев, предусмотренных законодательством.

4. Безопасность
Мы принимаем все необходимые меры для защиты ваших данных от несанкционированного доступа.`,
    terms: `Условия использования zStars

1. Введение
Используя наш сервис, вы соглашаетесь с данными условиями. Пожалуйста, внимательно ознакомьтесь с ними перед совершением покупки.

2. Услуги
Мы предоставляем услуги по пополнению баланса Telegram Stars и оплате подписки Telegram Premium. Мы действуем как независимый посредник.

3. Оплата и Возврат
Оплата производится через защищенные платежные шлюзы. Возврат средств возможен только в случае невыполнения заказа по нашей вине.

4. Ограничение ответственности
Мы не несем ответственности за действия третьих лиц или сбои в работе экосистемы Telegram.`
  },
  en: {
    privacy: `zStars Privacy Policy

1. General Provisions
This policy describes how we collect, use, and protect your information. We respect your privacy and are committed to protecting your personal data.

2. Data Collection
We collect only the minimum necessary data to fulfill an order: Telegram username. We do not store your payment card details.

3. Data Usage
Data is used solely for order processing and improving service quality. We do not share your data with third parties unless required by law.

4. Security
We take all necessary measures to protect your data from unauthorized access.`,
    terms: `zStars Terms of Use

1. Introduction
By using our service, you agree to these terms. Please read them carefully before making a purchase.

2. Services
We provide services for topping up Telegram Stars balance and paying for Telegram Premium subscriptions. We act as an independent intermediary.

3. Payment and Refunds
Payment is made through secure payment gateways. Refunds are possible only if the order is not fulfilled due to our fault.

4. Limitation of Liability
We are not responsible for the actions of third parties or failures in the Telegram ecosystem.`
  }
};

export const TRANSLATIONS = {
  ru: {
    nav: {
      about: "О нас",
      contacts: "Контакты"
    },
    widget: {
      tabStars: "Telegram Stars",
      tabPremium: "Telegram Premium",
      labelUsername: "Имя пользователя Telegram",
      placeholderUsername: "username (без @)",
      usernameNotFound: "Пользователь не найден",
      usernameFetchError: "Не удалось загрузить данные пользователя",
      labelAmountStars: "Количество звезд",
      labelDuration: "Длительность (мес.)",
      labelPayment: "Способ оплаты",
      btnContinue: "Далее",
      userProfile: "Профиль пользователя",
      emptyUsername: "username",
      orderSummary: "Детали заказа",
      priceRub: "Цена в рублях",
      paymentFallback: "Метод оплаты",
      badgeRub: "Рубли",
      badgeStars: "Звезд",
      badgePremium: "Премиум",
      amountTitleStars: "Количество Stars",
      amountTitlePremium: "Количество месяцев Premium",
      walletEmailLabel: "Email для чека",
      walletPhoneLabel: "Телефон для чека",
      walletOptionalLabel: "Контакт для чека",
      walletPlaceholderEmail: "mail@example.com",
      walletPlaceholderPhone: "+79991234567",
      walletPlaceholderOptional: "mail@example.com или телефон",
      walletOptionalBadge: "Необязательно",
      walletInfo: "Контакт нужен только для платежной системы, чтобы отправить чек. Мы не храним и не используем в других целях.",
      walletInvalidEmail: "Введите корректный email",
      walletInvalidPhone: "Введите номер в международном формате",
      back: "Назад",
      creatingLink: "Создаем ссылку для оплаты",
      waitingPayment: "Ожидаем оплаты",
      paymentCompleted: "Платеж выполнен!",
      agreePrefix: "Я согласен с",
      terms: "Правилами использования",
      refund: "Политикой возврата",
      agreeSuffix: "и подтверждаю верность данных.",
      rowReceive: "Получая на аккаунт",
      rowFeeSystem: "Комиссия платежной системы",
      btnPay: "Оплатить",
      promo: "У меня есть промокод",
      usernameHelpButton: "Где взять",
      usernameHelpTitle: "Где взять username в Telegram",
      statusText: {
        pending_payment: "Ожидаем оплату",
        paid_delivery_pending: "Оплата получена, доставляем",
        payment_failed: "Платеж не прошел",
        payment_expired: "Время оплаты истекло",
        payment_refunded: "Платеж возвращен",
        delivery_failed: "Ошибка доставки",
        completed: "Платеж завершен"
      },
      usernameHelpSections: [
        {
          platform: "Android",
          steps: [
            "Откройте Telegram и нажмите ☰ или аватар справа.",
            "Выберите «Настройки».",
            "В разделе «Аккаунт» найдите строку «Имя пользователя».",
            "Скопируйте значение без символа @."
          ]
        },
        {
          platform: "iOS",
          steps: [
            "Запустите Telegram и откройте вкладку «Настройки».",
            "Нажмите на блок с именем и аватаром.",
            "В поле «Имя пользователя» увидите свой @username.",
            "Если поле пустое, задайте имя и сохраните."
          ]
        },
        {
          platform: "Windows",
          steps: [
            "Откройте Telegram Desktop.",
            "Нажмите ☰ → «Настройки».",
            "Откройте «Профиль» и найдите «Имя пользователя».",
            "Скопируйте текст без символа @."
          ]
        },
        {
          platform: "macOS",
          steps: [
            "Откройте Telegram на Mac.",
            "В меню выберите Telegram → «Настройки» или нажмите Cmd + ,.",
            "Перейдите в раздел «Профиль».",
            "Скопируйте значение из поля «Имя пользователя» без @."
          ]
        }
      ]
    },
    referral: {
      title: "Приглашайте и зарабатывайте TON",
      desc: "Зарабатывайте до 50% от комиссии за покупки, совершенные вашими друзьями, навсегда."
    },
    faqTitle: "Часто задаваемые вопросы",
    newsTitle: "Последние новости",
    readMore: "Читать далее",
    cookie: {
      text: "Сайт использует куки.",
      link: "Узнать больше",
      button: "Хорошо"
    },
    footer: {
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      api: "API",
      disclaimer: "zStars — независимый сервис и не связан с Telegram FZ-LLC."
    }
  },
  en: {
    nav: {
      about: "About Us",
      contacts: "Contacts"
    },
    widget: {
      tabStars: "Telegram Stars",
      tabPremium: "Premium",
      labelUsername: "Telegram Username",
      placeholderUsername: "username (without @)",
      usernameNotFound: "User not found",
      usernameFetchError: "Unable to load user data",
      labelAmountStars: "Amount of Stars",
      labelDuration: "Duration (Months)",
      labelPayment: "Payment Method",
      btnContinue: "Next",
      userProfile: "User profile",
      emptyUsername: "username",
      orderSummary: "Order summary",
      priceRub: "Price in RUB",
      paymentFallback: "Payment method",
      badgeRub: "RUB",
      badgeStars: "Stars",
      badgePremium: "Premium",
      amountTitleStars: "Stars quantity",
      amountTitlePremium: "Premium months",
      walletEmailLabel: "Email for receipt",
      walletPhoneLabel: "Phone for receipt",
      walletOptionalLabel: "Contact for receipt",
      walletPlaceholderEmail: "mail@example.com",
      walletPlaceholderPhone: "+17995551234",
      walletPlaceholderOptional: "email or phone",
      walletOptionalBadge: "Optional",
      walletInfo: "Wallet contact is required by the payment system to send you a receipt. We do not store or use it for any other purpose.",
      walletInvalidEmail: "Enter a valid email",
      walletInvalidPhone: "Enter phone in international format",
      back: "Back",
      creatingLink: "Creating payment link",
      waitingPayment: "Waiting for payment",
      paymentCompleted: "Payment completed!",
      agreePrefix: "I agree with the",
      terms: "Terms of Service",
      refund: "Refund Policy",
      agreeSuffix: "and confirm details are correct.",
      rowReceive: "Receive on balance",
      rowFeeSystem: "Payment System Fee",
      btnPay: "Pay",
      promo: "I have a promo code",
      usernameHelpButton: "Where to find",
      usernameHelpTitle: "How to find your Telegram username",
      statusText: {
        pending_payment: "Waiting for payment",
        paid_delivery_pending: "Payment received, delivering",
        payment_failed: "Payment failed",
        payment_expired: "Payment expired",
        payment_refunded: "Payment refunded",
        delivery_failed: "Delivery failed",
        completed: "Payment completed"
      },
      usernameHelpSections: [
        {
          platform: "Android",
          steps: [
            "Open Telegram and tap ☰ or your avatar.",
            "Go to Settings.",
            "In the Account section find the Username field.",
            "Copy it without the @ symbol."
          ]
        },
        {
          platform: "iOS",
          steps: [
            "Open Telegram and go to the Settings tab.",
            "Tap your profile card with name and avatar.",
            "Find the Username field and copy it.",
            "If it is empty, set a username and save."
          ]
        },
        {
          platform: "Windows",
          steps: [
            "Open Telegram Desktop.",
            "Click ☰ → Settings.",
            "Open Profile and find the Username field.",
            "Copy the text without the @ symbol."
          ]
        },
        {
          platform: "macOS",
          steps: [
            "Open Telegram for macOS.",
            "In the top menu choose Telegram → Settings or press Cmd + ,.",
            "Go to Profile.",
            "Copy the value from Username without @."
          ]
        }
      ]
    },
    referral: {
      title: "Invite and Earn TON",
      desc: "Earn up to 50% of the commission on purchases made by your friends, forever."
    },
    faqTitle: "Frequently Asked Questions",
    newsTitle: "Latest News",
    readMore: "Read more",
    cookie: {
      text: "This site uses cookies.",
      link: "Learn more",
      button: "Okay"
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      api: "API",
      disclaimer: "zStars is an independent service and not affiliated with Telegram FZ-LLC."
    }
  }
};