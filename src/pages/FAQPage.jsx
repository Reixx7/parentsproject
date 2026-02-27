import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, MessageCircle, Facebook, Instagram, Send, Youtube, Moon, Sun, Globe } from 'lucide-react'

// ─── Tokens ───────────────────────────────────────────────────────────────────
const Tk = {
  light: {
    bg: '#ffffff', surface: '#faf8f5', border: '#e8e3de',
    text: '#111111', textMuted: '#555555', textFaint: '#aaaaaa',
    btnPrimary: '#111111', btnText: '#ffffff',
    cardBg: '#f5f2ee', inputBg: '#ffffff', inputBorder: '#d4cfc9',
    icon: '#777777', accentLine: '#e0dbd5',
  },
  dark: {
    bg: '#0d0d0d', surface: '#151515', border: '#222222',
    text: '#f0ede8', textMuted: '#a09088', textFaint: '#484848',
    btnPrimary: '#f0ede8', btnText: '#111111',
    cardBg: '#161616', inputBg: '#111111', inputBorder: '#2a2520',
    icon: '#888888', accentLine: '#2a2520',
  },
}

const serif = "'Cormorant Garamond', Georgia, serif"

// ─── Translations ─────────────────────────────────────────────────────────────
const TR = {
  ru: {
    breadcrumb: ['ГЛАВНАЯ СТРАНИЦА', 'ПОМОЩЬ ПОКУПАТЕЛЮ', 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ'],
    heroSub: 'ПОМОЩЬ ПОКУПАТЕЛЮ',
    heroTitle: 'Часто задаваемые вопросы',
    heroText: 'Здесь вы найдёте ответы на самые популярные вопросы. Если вы не нашли нужную информацию — наша служба поддержки всегда готова помочь.',
    filterAll: 'ВСЕ РАЗДЕЛЫ',
    sectionLabel: 'РАЗДЕЛ',
    ctaTitle: 'Не нашли ответ?',
    ctaText: 'Наша служба поддержки работает ежедневно с 9:00 до 21:00 и готова ответить на любой вопрос.',
    call: 'ПОЗВОНИТЬ',
    whatsapp: 'НАПИСАТЬ В WHATSAPP',
    footerCols: {
      'КАТАЛОГ': ['Новинки','Вся коллекция','Одежда','Обувь','Аксессуары','Только онлайн','Sale'],
      'ПОМОЩЬ ПОКУПАТЕЛЮ': ['Оплата','Возврат','Доставка','Наши магазины','Бонусная программа'],
      'О КОМПАНИИ': ['Контакты','О бренде','Карьера в Selfie','Публичная оферта','Политика конфиденциальности'],
      'БЛОГ': ['Новости','Акции','LookBooks'],
    },
    payment: 'СПОСОБЫ ОПЛАТЫ',
    stayUpdated: 'БУДЬ ВСЕГДА В КУРСЕ',
    stayText: 'Подписывайся, оставляй свой номер телефона и всегда будешь в курсе последних новостей.',
    phonePlaceholder: 'Телефон или email',
    subscribe: 'Подписаться',
    subscribed: '✓ Вы успешно подписались!',
    copyright: '© 2026 Selfie. Все права защищены.',
    nav: [
      { to: '/', label: 'ГЛАВНАЯ' },
      { to: '/products', label: 'КАТАЛОГ' },
      { to: '/about', label: 'О НАС' },
      { to: '/faq', label: 'ВОПРОСЫ' },
    ],
  },
  en: {
    breadcrumb: ['HOME', 'CUSTOMER HELP', 'FAQ'],
    heroSub: 'CUSTOMER HELP',
    heroTitle: 'Frequently Asked Questions',
    heroText: 'Here you\'ll find answers to the most common questions. If you haven\'t found the information you need — our support team is always ready to help.',
    filterAll: 'ALL SECTIONS',
    sectionLabel: 'SECTION',
    ctaTitle: 'Didn\'t find an answer?',
    ctaText: 'Our support team works daily from 9:00 to 21:00 and is ready to answer any question.',
    call: 'CALL US',
    whatsapp: 'WRITE ON WHATSAPP',
    footerCols: {
      'CATALOG': ['New In','All Collection','Clothing','Footwear','Accessories','Online Only','Sale'],
      'CUSTOMER HELP': ['Payment','Returns','Delivery','Our Stores','Loyalty Program'],
      'ABOUT US': ['Contacts','About Brand','Careers','Public Offer','Privacy Policy'],
      'BLOG': ['News','Promotions','LookBooks'],
    },
    payment: 'PAYMENT METHODS',
    stayUpdated: 'STAY IN THE LOOP',
    stayText: 'Subscribe and leave your contact to always be the first to know about our latest news.',
    phonePlaceholder: 'Phone or email',
    subscribe: 'Subscribe',
    subscribed: '✓ Successfully subscribed!',
    copyright: '© 2026 Selfie. All rights reserved.',
    nav: [
      { to: '/', label: 'HOME' },
      { to: '/productsmain', label: 'CATALOG' },
      { to: '/about', label: 'ABOUT' },
      { to: '/clientsask', label: 'FAQ' },
    ],
  },
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQ_DATA = {
  ru: [
    {
      category: 'ДОСТАВКА', icon: '📦',
      items: [
        { q: 'Как быстро доставляется заказ по Ташкенту?', a: 'Доставка по Ташкенту осуществляется в течение 1–2 рабочих дней. При оформлении заказа до 12:00 — доставим уже сегодня. Курьер свяжется с вами за 30 минут до прибытия.' },
        { q: 'Осуществляете ли вы доставку по регионам Узбекистана?', a: 'Да, мы доставляем во все регионы Узбекистана через надёжные курьерские службы. Срок доставки составляет 2–5 рабочих дней. Стоимость рассчитывается автоматически при оформлении заказа.' },
        { q: 'Есть ли бесплатная доставка?', a: 'Бесплатная доставка по Ташкенту действует при сумме заказа от 500 000 сум. Для других регионов — при заказе от 1 000 000 сум.' },
        { q: 'Можно ли забрать заказ самовывозом?', a: 'Конечно! Вы можете забрать заказ в любом из наших магазинов. Адреса всех точек доступны в разделе «Наши магазины». Заказ будет готов к выдаче в течение 2–4 часов после подтверждения.' },
      ],
    },
    {
      category: 'ОПЛАТА', icon: '💳',
      items: [
        { q: 'Какие способы оплаты вы принимаете?', a: 'Мы принимаем оплату через Uzum, Click, Payme, а также наличными при получении. Все онлайн-платежи защищены шифрованием SSL.' },
        { q: 'Можно ли оплатить частями или в рассрочку?', a: 'Да! При оплате через Uzum Market вам доступна рассрочка на 3, 6 или 12 месяцев без переплаты.' },
        { q: 'Безопасна ли оплата на сайте?', a: 'Абсолютно. Все транзакции проходят через сертифицированные платёжные шлюзы. Мы не храним данные банковских карт.' },
      ],
    },
    {
      category: 'ВОЗВРАТ И ОБМЕН', icon: '🔄',
      items: [
        { q: 'Каков срок возврата товара?', a: 'Вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке, без следов использования, с бирками.' },
        { q: 'Как оформить возврат?', a: 'Свяжитесь с нами по номеру +998 (55) 508 00 60 или через форму на сайте. Укажите номер заказа и причину возврата.' },
        { q: 'Можно ли вернуть товар из категории SALE?', a: 'Товары со скидкой подлежат возврату и обмену на общих основаниях — в течение 14 дней. Исключение: нижнее бельё и аксессуары.' },
        { q: 'Что делать, если пришёл бракованный товар?', a: 'Немедленно свяжитесь с нами. Фото брака отправьте на наш WhatsApp или email. Мы организуем замену или возврат средств за наш счёт.' },
      ],
    },
    {
      category: 'РАЗМЕРЫ И УХОД', icon: '👗',
      items: [
        { q: 'Как выбрать правильный размер?', a: 'На каждой странице товара есть таблица размеров. Для точного выбора снимите мерки: обхват груди, талии и бёдер. Если вы на границе размеров — рекомендуем взять больший.' },
        { q: 'Совпадают ли ваши размеры с международными стандартами?', a: 'Мы используем европейскую систему размеров (XS, S, M, L, XL) и числовую для обуви (36–41). Полная таблица соответствия EU/UK/US/RU доступна в разделе «Размерная сетка».' },
        { q: 'Как правильно ухаживать за изделиями?', a: 'Инструкции по уходу указаны на ярлыке каждого изделия. Деликатную стирку рекомендуется проводить при 30°C. Изделия из шёлка и шерсти — только ручная стирка или химчистка.' },
      ],
    },
    {
      category: 'БОНУСНАЯ ПРОГРАММА', icon: '⭐',
      items: [
        { q: 'Как работает бонусная программа Selfie?', a: 'За каждую покупку вы получаете 5% от суммы в виде бонусов. 1 бонус = 1 сум. Бонусы начисляются после подтверждения получения заказа.' },
        { q: 'Как зарегистрироваться в программе?', a: 'Создайте аккаунт на сайте или в приложении Selfie — вы автоматически становитесь участником программы лояльности.' },
        { q: 'Сгорают ли бонусы?', a: 'Бонусы действительны 12 месяцев с момента начисления. Уведомления о скором сгорании приходят в SMS и на email за 30 дней.' },
      ],
    },
    {
      category: 'О МАГАЗИНЕ', icon: '🏪',
      items: [
        { q: 'Где находятся ваши магазины?', a: 'Наши магазины в Ташкенте: ТРЦ Nucleus, ТЦ Compass, ТРЦ Next. Актуальные адреса и время работы — в разделе «Наши магазины».' },
        { q: 'Как связаться с поддержкой?', a: 'Звоните: +998 (55) 508 00 60, ежедневно 9:00–21:00. WhatsApp: тот же номер. Email: support@selfie.uz. Среднее время ответа — 15 минут.' },
        { q: 'Есть ли мобильное приложение?', a: 'Да! Приложение Selfie доступно в App Store и Google Play. Эксклюзивные предложения, push-уведомления о новинках и история заказов.' },
      ],
    },
  ],
  en: [
    {
      category: 'DELIVERY', icon: '📦',
      items: [
        { q: 'How fast is delivery within Tashkent?', a: 'Delivery within Tashkent takes 1–2 business days. Orders placed before 12:00 will be delivered the same day. The courier will contact you 30 minutes before arrival.' },
        { q: 'Do you deliver to other regions of Uzbekistan?', a: 'Yes, we deliver to all regions via reliable courier services. Delivery takes 2–5 business days. The cost is calculated automatically at checkout.' },
        { q: 'Is free delivery available?', a: 'Free delivery within Tashkent applies for orders over 500,000 sum. For other regions — orders over 1,000,000 sum.' },
        { q: 'Can I pick up my order?', a: 'Of course! You can pick up your order from any of our stores. All locations are listed in the "Our Stores" section. Your order will be ready within 2–4 hours after confirmation.' },
      ],
    },
    {
      category: 'PAYMENT', icon: '💳',
      items: [
        { q: 'What payment methods do you accept?', a: 'We accept Uzum, Click, Payme, and cash on delivery. All online payments are secured with SSL encryption.' },
        { q: 'Can I pay in installments?', a: 'Yes! When paying through Uzum Market, you can get installments for 3, 6, or 12 months with no extra charge.' },
        { q: 'Is payment on the website secure?', a: 'Absolutely. All transactions go through certified payment gateways. We do not store bank card data.' },
      ],
    },
    {
      category: 'RETURNS & EXCHANGE', icon: '🔄',
      items: [
        { q: 'What is the return period?', a: 'You can return an item within 14 days of receipt. The item must be in original packaging, unused, with tags attached.' },
        { q: 'How do I initiate a return?', a: 'Contact us at +998 (55) 508 00 60 or via the website form. Provide your order number and reason for return.' },
        { q: 'Can I return SALE items?', a: 'Sale items can be returned or exchanged on standard terms — within 14 days. Exceptions: underwear and accessories for hygiene reasons.' },
        { q: 'What if I received a defective item?', a: 'Contact us immediately. Send photos of the defect via WhatsApp or email. We\'ll arrange a replacement or refund at our expense.' },
      ],
    },
    {
      category: 'SIZES & CARE', icon: '👗',
      items: [
        { q: 'How do I choose the right size?', a: 'Each product page has a size guide. For accurate selection, measure your chest, waist, and hips. If you\'re between sizes — we recommend sizing up.' },
        { q: 'Do your sizes match international standards?', a: 'We use European sizing (XS, S, M, L, XL) and numeric for footwear (36–41). A full EU/UK/US/RU conversion table is available in the Size Guide section.' },
        { q: 'How should I care for the items?', a: 'Care instructions are on the label of each item. Delicate washing is recommended at 30°C. Silk and wool items — hand wash or dry clean only.' },
      ],
    },
    {
      category: 'LOYALTY PROGRAM', icon: '⭐',
      items: [
        { q: 'How does the Selfie loyalty program work?', a: 'For every purchase you earn 5% of the amount as bonus points. 1 bonus = 1 sum. Points are credited after your order is confirmed as received.' },
        { q: 'How do I join the program?', a: 'Create an account on the website or Selfie app — you automatically become a loyalty program member.' },
        { q: 'Do bonus points expire?', a: 'Points are valid for 12 months from the date of credit. You\'ll receive SMS and email notifications 30 days before expiry.' },
      ],
    },
    {
      category: 'ABOUT US', icon: '🏪',
      items: [
        { q: 'Where are your stores located?', a: 'Our stores in Tashkent: Nucleus Mall, Compass Shopping Center, Next Mall. Current addresses and hours are in the "Our Stores" section.' },
        { q: 'How can I contact support?', a: 'Call: +998 (55) 508 00 60, daily 9:00–21:00. WhatsApp: same number. Email: support@selfie.uz. Average response time — 15 minutes.' },
        { q: 'Is there a mobile app?', a: 'Yes! The Selfie app is available on App Store and Google Play. Exclusive deals, new arrival notifications, order history and real-time delivery tracking.' },
      ],
    },
  ],
}

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({ q, a, isOpen, onToggle, tk }) {
  return (
    <div style={{ borderBottom: `1px solid ${tk.border}` }}>
      <button onClick={onToggle} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, padding: '18px 0', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: serif,
      }}>
        <span style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: '0.02em', color: isOpen ? tk.text : tk.textMuted, fontWeight: isOpen ? 500 : 400, transition: 'color 0.2s' }}>
          {q}
        </span>
        <span style={{
          flexShrink: 0, width: 24, height: 24, border: `1px solid ${isOpen ? tk.text : tk.accentLine}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.28s, border-color 0.2s',
        }}>
          <ChevronDown size={12} color={isOpen ? tk.text : tk.textFaint} />
        </span>
      </button>

      <div style={{ overflow: 'hidden', maxHeight: isOpen ? '400px' : '0px', transition: 'max-height 0.3s ease' }}>
        <div style={{
          paddingBottom: 18, paddingRight: 40, fontSize: 13, lineHeight: 1.85,
          letterSpacing: '0.02em', borderLeft: `2px solid ${tk.border}`, paddingLeft: 16,
          marginBottom: 4, fontFamily: serif, color: tk.textMuted,
        }}>
          {a}
        </div>
      </div>
    </div>
  )
}

// ─── Footer subscribe ─────────────────────────────────────────────────────────
function FooterSubscribe({ tk, t }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  if (done) return (
    <div style={{ background: tk.surface, padding: '10px 14px', fontSize: 12, color: tk.textMuted, fontFamily: serif }}>{t.subscribed}</div>
  )
  return (
    <div style={{ display: 'flex' }}>
      <input value={email} onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && email.trim() && setDone(true)}
        placeholder={t.phonePlaceholder}
        style={{ flex: 1, border: `1px solid ${tk.inputBorder}`, borderRight: 'none', padding: '9px 12px', fontSize: 11, fontFamily: serif, outline: 'none', background: tk.inputBg, color: tk.text }}
      />
      <button onClick={() => email.trim() && setDone(true)}
        style={{ background: tk.btnPrimary, color: tk.btnText, border: 'none', padding: '9px 16px', fontSize: 10, letterSpacing: '0.12em', cursor: 'pointer', fontFamily: serif, whiteSpace: 'nowrap' }}>
        {t.subscribe}
      </button>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function FAQPage() {
  const [dark,           setDark]           = useState(false)
  const [lang,           setLang]           = useState('ru')
  const [openKey,        setOpenKey]        = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  const tk   = dark ? Tk.dark : Tk.light
  const t    = TR[lang]
  const data = FAQ_DATA[lang]

  const toggleDark = () => setDark(d => !d)
  const toggleLang = () => { setLang(l => l === 'ru' ? 'en' : 'ru'); setActiveCategory(null); setOpenKey(null) }

  return (
    <div style={{ minHeight: '100vh', background: tk.bg, color: tk.text, fontFamily: serif, transition: 'background 0.3s, color 0.3s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box}
        a{text-decoration:none}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:${tk.border}}
      `}</style>

      {/* ── Header ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: tk.bg, borderBottom: `1px solid ${tk.border}`, padding: '0 40px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(8px)' }}>
        <Link to="/">
          <img src="https://selfiestore.uz/static/62890302-3250-4096-b833-b364f5232082.png" className="w-32.5 h-37.5"  alt="Selfie" />
        </Link>

        <nav style={{ display: 'flex', gap: 28 }}>
          {t.nav.map(({ to, label }) => (
            <Link key={to} to={to} style={{ fontSize: 10.5, letterSpacing: '0.1em', color: tk.textFaint, fontFamily: serif, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = tk.text}
              onMouseLeave={e => e.target.style.color = tk.textFaint}>
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={toggleLang} style={{ background: 'none', border: `1px solid ${tk.border}`, cursor: 'pointer', color: tk.textFaint, fontSize: 9, letterSpacing: '0.18em', padding: '4px 10px', fontFamily: serif, display: 'flex', alignItems: 'center', gap: 4, transition: 'border-color 0.2s, color 0.2s' }}>
            <Globe size={10}/> {lang === 'ru' ? 'EN' : 'RU'}
          </button>
          <button onClick={toggleDark} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.icon, display: 'flex' }}>
            {dark ? <Sun size={17}/> : <Moon size={17}/>}
          </button>
        </div>
      </header>

      {/* ── Breadcrumb ── */}
      <div style={{ padding: '10px 40px', fontSize: 10, letterSpacing: '0.12em', color: tk.textFaint }}>
        {t.breadcrumb.map((b, i) => (
          <span key={i}>
            {i > 0 && <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>}
            <span style={{ color: i === t.breadcrumb.length - 1 ? tk.textMuted : tk.textFaint }}>{b}</span>
          </span>
        ))}
      </div>

      {/* ── Hero ── */}
      <div style={{ textAlign: 'center', padding: '36px 40px 40px', borderBottom: `1px solid ${tk.border}` }}>
        <div style={{ fontSize: 9.5, letterSpacing: '0.24em', color: tk.textFaint, marginBottom: 16 }}>{t.heroSub}</div>
        <h1 style={{ fontSize: 32, fontWeight: 400, letterSpacing: '0.08em', color: tk.text, margin: '0 0 16px', lineHeight: 1.2 }}>{t.heroTitle}</h1>
        <div style={{ width: 28, height: 1, background: tk.border, margin: '0 auto 18px' }}/>
        <p style={{ fontSize: 13, color: tk.textMuted, maxWidth: 460, margin: '0 auto', lineHeight: 1.9, fontWeight: 300 }}>{t.heroText}</p>
      </div>

      {/* ── Filter tabs ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, padding: '24px 40px', borderBottom: `1px solid ${tk.border}` }}>
        <button onClick={() => setActiveCategory(null)}
          style={{ padding: '7px 18px', fontSize: 9.5, letterSpacing: '0.12em', cursor: 'pointer', fontFamily: serif, border: `1px solid ${activeCategory === null ? tk.btnPrimary : tk.border}`, background: activeCategory === null ? tk.btnPrimary : 'transparent', color: activeCategory === null ? tk.btnText : tk.textFaint, transition: 'all 0.18s' }}>
          {t.filterAll}
        </button>
        {data.map((cat, i) => (
          <button key={i} onClick={() => setActiveCategory(activeCategory === i ? null : i)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 18px', fontSize: 9.5, letterSpacing: '0.12em', cursor: 'pointer', fontFamily: serif, border: `1px solid ${activeCategory === i ? tk.btnPrimary : tk.border}`, background: activeCategory === i ? tk.btnPrimary : 'transparent', color: activeCategory === i ? tk.btnText : tk.textFaint, transition: 'all 0.18s' }}>
            <span style={{ fontSize: 13 }}>{cat.icon}</span> {cat.category}
          </button>
        ))}
      </div>

      {/* ── Accordion sections ── */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 40px' }}>
        {data.map((cat, catIdx) => {
          if (activeCategory !== null && activeCategory !== catIdx) return null
          return (
            <section key={catIdx} style={{ marginBottom: 52 }}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: '0.18em', color: tk.textFaint, marginBottom: 4 }}>{t.sectionLabel}</div>
                  <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '0.06em', color: tk.text }}>{cat.category}</div>
                </div>
                <div style={{ flex: 1, height: 1, background: tk.border, marginLeft: 8 }}/>
              </div>

              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`
                return (
                  <AccordionItem key={key} q={item.q} a={item.a} isOpen={openKey === key}
                    onToggle={() => setOpenKey(prev => prev === key ? null : key)} tk={tk}/>
                )
              })}
            </section>
          )
        })}

        {/* ── CTA ── */}
        <div style={{ marginTop: 52, border: `1px solid ${tk.border}`, background: tk.surface, textAlign: 'center', padding: '48px 40px' }}>
          <MessageCircle size={28} strokeWidth={1} style={{ margin: '0 auto 16px', display: 'block', color: tk.textFaint }}/>
          <h2 style={{ fontSize: 24, fontWeight: 400, letterSpacing: '0.08em', color: tk.text, margin: '0 0 12px' }}>{t.ctaTitle}</h2>
          <p style={{ fontSize: 12.5, color: tk.textMuted, lineHeight: 1.9, maxWidth: 300, margin: '0 auto 28px' }}>{t.ctaText}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            <a href="tel:+998555080060"
              style={{ display: 'inline-block', padding: '12px 28px', fontSize: 10, letterSpacing: '0.16em', background: tk.btnPrimary, color: tk.btnText, fontFamily: serif, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              {t.call}
            </a>
            <a href="https://wa.me/998555080060" target="_blank" rel="noreferrer"
              style={{ display: 'inline-block', padding: '12px 28px', fontSize: 10, letterSpacing: '0.16em', border: `1px solid ${tk.border}`, color: tk.textMuted, fontFamily: serif, transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = tk.text; e.currentTarget.style.color = tk.text }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = tk.border; e.currentTarget.style.color = tk.textMuted }}>
              {t.whatsapp}
            </a>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${tk.border}`, fontFamily: serif, background: tk.bg }}>
        <div style={{ padding: '48px 40px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 160px 280px', gap: 28, borderBottom: `1px solid ${tk.border}` }}>
          {Object.entries(t.footerCols).map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: tk.text, marginBottom: 16 }}>{title}</div>
              {links.map(link => (
                <div key={link} style={{ fontSize: 12, color: tk.textMuted, marginBottom: 10, cursor: 'pointer', lineHeight: 1.5, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = tk.text}
                  onMouseLeave={e => e.target.style.color = tk.textMuted}>
                  {link}
                </div>
              ))}
            </div>
          ))}

          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: tk.text, marginBottom: 16 }}>{t.payment}</div>
            {['Uzum','Click','Payme'].map(p => (
              <div key={p} style={{ display: 'inline-block', border: `1px solid ${tk.border}`, padding: '4px 12px', fontSize: 11.5, color: tk.textMuted, background: tk.surface, marginBottom: 8, marginRight: 6 }}>{p}</div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: tk.text, marginBottom: 12 }}>{t.stayUpdated}</div>
            <div style={{ fontSize: 12, color: tk.textMuted, lineHeight: 1.8, marginBottom: 16 }}>{t.stayText}</div>
            <FooterSubscribe tk={tk} t={t}/>
          </div>
        </div>

        <div style={{ padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 10.5, color: tk.textFaint }}>{t.copyright}</div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            {[Facebook, Instagram, Send, Youtube].map((Icon, i) => (
              <Icon key={i} size={16} style={{ cursor: 'pointer', color: tk.icon, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = tk.text}
                onMouseLeave={e => e.currentTarget.style.color = tk.icon}/>
            ))}
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: tk.text, letterSpacing: '0.02em' }}>+998 (55) 508 00 60</div>
        </div>
      </footer>
    </div>
  )
}
