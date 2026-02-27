import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

import imgg from '../assets/imgg.png';
import bg from '../assets/bg.png';

// ══════════ TRANSLATIONS ══════════
const translations = {
  ru: {
    nav: {
      home: 'ГЛАВНАЯ',
      catalog: 'КАТАЛОГ',
      about: 'О НАС',
      faq: 'ВОПРОСЫ',
    },
    breadcrumb: {
      home: 'Главная страница',
      about: 'О Selfie',
    },
    history: {
      sectionLabel: 'История',
      title: 'История бренда',
      p1: 'Selfie — популярный в Узбекистане молодёжный бренд одежды масс-маркет, основанный в 2009 году. Компания специализируется на создании трендовых вещей в стиле casual и basic для девушек от 16 до 30 лет, выпуская более 4 000 моделей ежегодно.',
      p2: 'Бренд прошёл путь от небольших поставок до масштабной сети с 12+ филиалами в Ташкенте и регионах. Продукция производится в Гуанчжоу (КНР), однако весь дизайн и разработка коллекций ведётся собственной командой, глубоко понимающей запросы местной аудитории. В год выходит 12 коллекций — платья, джинсы, рубашки, верхняя одежда и аксессуары.',
    },
    milestones: {
      sectionLabel: 'Ключевые этапы',
      items: [
        { year: '2009', text: 'Основание бренда с целью создания стильной, качественной и доступной одежды для молодых девушек Узбекистана.' },
        { year: '2012', text: 'Запуск собственного дизайн-отдела. Все коллекции разрабатываются командой, которая учитывает вкусы и потребности местных покупательниц.' },
        { year: '2017', text: 'Выход в регионы. Selfie открывает магазины за пределами Ташкента — в Карши и других крупных городах.' },
        { year: '2022–23', text: 'Selfie становится одним из крупнейших молодёжных брендов страны: 12+ филиалов, включая Magic City и Compass Mall.' },
      ],
    },
    about: {
      sectionLabel: 'О SELFIE',
      title: 'О SELFIE',
      p1: 'Selfie — это платформа самовыражения для современных девушек Узбекистана. Мы создаём трендовую, доступную одежду, которая вдохновляет носить её с уверенностью каждый день. Наша цель — чтобы каждая покупка в Selfie ощущалась как маленькая победа стиля.',
      designTitle: 'Собственный дизайн. Доступные цены',
      designText: 'Все коллекции разрабатываются внутренней командой дизайнеров с учётом актуальных мировых трендов и особенностей местной аудитории. Производство в Гуанчжоу гарантирует стабильное качество.',
      teamTitle: 'Команда и сеть',
      teamText: 'Более 12 филиалов в Ташкенте и регионах, включая магазины в Magic City и Compass Mall. Наша команда — дизайнеры, байеры, менеджеры и специалисты по логистике — ежедневно работает над тем, чтобы новые коллекции появлялись на полках вовремя и радовали каждую покупательницу.',
      stats: [
        { num: '4 000+', label: 'моделей в год' },
        { num: '12', label: 'коллекций ежегодно' },
        { num: '12+', label: 'магазинов по стране' },
        { num: '2009', label: 'год основания' },
      ],
    },
    audience: {
      sectionLabel: 'Для кого мы работаем',
      items: [
        { title: 'Возраст', desc: 'Девушки от 16 до 30 лет — активные, следящие за трендами, живущие в ритме города.' },
        { title: 'Стиль', desc: 'Casual и basic: универсальные вещи на каждый день, которые легко сочетать и носить с удовольствием.' },
        { title: 'Ценности', desc: 'Selfie активен в социальных сетях и создаёт сообщество девушек, которые не боятся выражать себя через одежду.' },
      ],
    },
    footer: {
      tagline: 'Популярный узбекский молодёжный бренд одежды. Стиль, доступность и самовыражение — с 2009 года.',
      catalog: 'Каталог',
      catalogItems: ['Платья', 'Джинсы', 'Рубашки', 'Верхняя одежда', 'Аксессуары', 'Custom'],
      menu: 'Меню',
      menuItems: ['О нас', 'Продать свою одежду', 'Конкурсы', 'Континентский сервис'],
      support: 'Поддержка',
      supportItems: ['Доставка', 'Отзыв', 'Частичные вопросы', 'Комментарий к сервису', 'Отправить заказ'],
      copyright: '© 2026 SELFIE. Все права защищены.',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
    },
    darkMode: { dark: 'ТЁМНАЯ', light: 'СВЕТЛАЯ' },
  },
  en: {
    nav: {
      home: 'HOME',
      catalog: 'CATALOG',
      about: 'ABOUT',
      faq: 'FAQ',
    },
    breadcrumb: {
      home: 'Home',
      about: 'About Selfie',
    },
    history: {
      sectionLabel: 'History',
      title: 'Brand History',
      p1: 'Selfie is a popular Uzbek youth mass-market fashion brand founded in 2009. The company specializes in creating trendy casual and basic styles for girls aged 16 to 30, releasing over 4,000 models annually.',
      p2: 'The brand has grown from small-scale deliveries to a large network of 12+ branches in Tashkent and the regions. Products are manufactured in Guangzhou, China, while all design and collection development is handled by an in-house team deeply attuned to the local audience. 12 collections are released each year — dresses, jeans, shirts, outerwear and accessories.',
    },
    milestones: {
      sectionLabel: 'Key Milestones',
      items: [
        { year: '2009', text: 'Brand founded with the goal of creating stylish, high-quality, and affordable clothing for young women in Uzbekistan.' },
        { year: '2012', text: 'Launch of an in-house design department. All collections are developed by a team that understands the tastes and needs of local shoppers.' },
        { year: '2017', text: 'Regional expansion. Selfie opens stores outside Tashkent — in Karshi and other major cities.' },
        { year: '2022–23', text: 'Selfie becomes one of the largest youth brands in the country: 12+ branches, including Magic City and Compass Mall.' },
      ],
    },
    about: {
      sectionLabel: 'ABOUT SELFIE',
      title: 'ABOUT SELFIE',
      p1: 'Selfie is a platform of self-expression for modern women of Uzbekistan. We create trendy, affordable clothing that inspires confidence every day. Our goal is for every Selfie purchase to feel like a small style victory.',
      designTitle: 'Original Design. Affordable Prices',
      designText: 'All collections are developed by an in-house design team in line with the latest global trends and the preferences of the local audience. Manufacturing in Guangzhou ensures consistent quality.',
      teamTitle: 'Team & Network',
      teamText: 'More than 12 branches in Tashkent and the regions, including stores in Magic City and Compass Mall. Our team — designers, buyers, managers and logistics specialists — works daily to ensure new collections hit the shelves on time and delight every customer.',
      stats: [
        { num: '4,000+', label: 'models per year' },
        { num: '12', label: 'collections annually' },
        { num: '12+', label: 'stores nationwide' },
        { num: '2009', label: 'year founded' },
      ],
    },
    audience: {
      sectionLabel: 'Who We Work For',
      items: [
        { title: 'Age', desc: 'Girls aged 16 to 30 — active, trend-conscious, living in the rhythm of the city.' },
        { title: 'Style', desc: 'Casual and basic: versatile everyday pieces that are easy to mix, match, and enjoy.' },
        { title: 'Values', desc: 'Selfie is active on social media and builds a community of girls who are not afraid to express themselves through fashion.' },
      ],
    },
    footer: {
      tagline: 'A popular Uzbek youth fashion brand. Style, accessibility, and self-expression — since 2009.',
      catalog: 'Catalog',
      catalogItems: ['Dresses', 'Jeans', 'Shirts', 'Outerwear', 'Accessories', 'Custom'],
      menu: 'Menu',
      menuItems: ['About Us', 'Sell Your Clothes', 'Contests', 'Continental Service'],
      support: 'Support',
      supportItems: ['Delivery', 'Feedback', 'Partial Questions', 'Service Comment', 'Place Order'],
      copyright: '© 2026 SELFIE. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
    },
    darkMode: { dark: 'DARK', light: 'LIGHT' },
  },
};

export default function SelfieAboutPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('ru');

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    const savedLang = localStorage.getItem('lang') || 'ru';
    setLang(savedLang);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  const toggleLang = () => {
    const newLang = lang === 'ru' ? 'en' : 'ru';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = translations[lang];

  const theme = {
    bg: darkMode ? '#111' : '#fff',
    text: darkMode ? '#e5e5e5' : '#111',
    muted: darkMode ? '#888' : '#666',
    border: darkMode ? '#2a2a2a' : '#e8e8e8',
    heroBg: darkMode ? '#1a1a1a' : '#111',
    sectionBg: darkMode ? '#161616' : '#f7f7f7',
    darkSection: darkMode ? '#0d0d0d' : '#111',
    cardBg: darkMode ? '#1c1c1c' : '#fff',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", transition: 'background 0.3s, color 0.3s' }}>

      {/* ══════════ NAVBAR ══════════ */}
      <header style={{ borderBottom: `1px solid ${theme.border}`, top: 0, zIndex: 100, backgroundColor: theme.bg, transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px', height: 60, display: 'flex', alignItems: 'center', gap: 40 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', color: theme.text, fontSize: 18, fontWeight: 400, letterSpacing: '0.08em', whiteSpace: 'nowrap', flexShrink: 0 }}>
            <div>
              <img className="w-32.5 h-37.5" src="https://selfiestore.uz/static/62890302-3250-4096-b833-b364f5232082.png" alt="" />
            </div>
          </Link>

          {/* Nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32, flex: 1 }}>
            {[
              { to: '/', label: t.nav.home },
              { to: '/products', label: t.nav.catalog },
              { to: '/about', label: t.nav.about },
              { to: '/faq', label: t.nav.faq },
            ].map(({ to, label }) => (
              <Link key={to} to={to} style={{ textDecoration: 'none', color: theme.muted, fontSize: 12, letterSpacing: '0.08em', fontWeight: 400, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = theme.text}
                onMouseLeave={e => e.target.style.color = theme.muted}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Icons + controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Search size={18} style={{ cursor: 'pointer', color: theme.text }} />
            <Heart size={18} style={{ cursor: 'pointer', color: theme.text }} />
            <ShoppingCart size={18} style={{ cursor: 'pointer', color: theme.text }} />
            <User size={18} style={{ cursor: 'pointer', color: theme.text }} />

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              style={{
                background: 'none',
                border: `1px solid ${theme.border}`,
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 11,
                color: theme.text,
                cursor: 'pointer',
                letterSpacing: '0.06em',
                fontWeight: 600,
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              {lang === 'ru' ? 'EN' : 'RU'}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              style={{
                background: 'none',
                border: `1px solid ${theme.border}`,
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 11,
                color: theme.muted,
                cursor: 'pointer',
                letterSpacing: '0.06em',
              }}
            >
              {darkMode ? t.darkMode.light : t.darkMode.dark}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════ BREADCRUMB ══════════ */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '16px 40px', fontSize: 12, color: theme.muted, display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link to="/" style={{ color: theme.muted, textDecoration: 'none' }}>{t.breadcrumb.home}</Link>
        <span style={{ color: theme.muted }}>{'>>'}</span>
        <span style={{ color: theme.text }}>{t.breadcrumb.about}</span>
      </div>

      {/* ══════════ ИСТОРИЯ ══════════ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 40px' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.14em', color: theme.muted, marginBottom: 48, textTransform: 'uppercase' }}>{t.history.sectionLabel}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 64, alignItems: 'start' }}>
          <div style={{ borderRadius: 2, overflow: 'hidden' }}>
            <img src={imgg} alt="Selfie Brand" style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.src = 'https://placehold.co/300x400/f0f0f0/999?text=Selfie'; }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 24, marginTop: 0 }}>{t.history.title}</h2>
            <p style={{ fontSize: 13, lineHeight: 2, color: theme.muted, marginBottom: 20, marginTop: 0 }}>{t.history.p1}</p>
            <p style={{ fontSize: 13, lineHeight: 2, color: theme.muted, marginBottom: 20, margin: 0 }}>{t.history.p2}</p>
          </div>
        </div>
      </section>

      {/* ══════════ TIMELINE ══════════ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 72px' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.14em', color: theme.muted, marginBottom: 40, textTransform: 'uppercase' }}>{t.milestones.sectionLabel}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, borderTop: `1px solid ${theme.border}` }}>
          {t.milestones.items.map(({ year, text }) => (
            <div key={year} style={{ padding: '32px 24px 32px 24px', borderRight: `1px solid ${theme.border}`, paddingRight: 24 }}>
              <span style={{ fontSize: 28, fontWeight: 200, color: theme.text, display: 'block', marginBottom: 16, letterSpacing: '0.02em' }}>{year}</span>
              <p style={{ fontSize: 12, lineHeight: 1.9, color: theme.muted, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ О SELFIE (dark section) ══════════ */}
      <section style={{ backgroundColor: theme.darkSection, position: 'relative', overflow: 'hidden', padding: '72px 40px', transition: 'background 0.3s' }}>
        <img src={bg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, pointerEvents: 'none' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.14em', color: '#555', marginBottom: 28, textTransform: 'uppercase', marginTop: 0 }}>{t.about.sectionLabel}</p>
            <h2 style={{ fontSize: 22, fontWeight: 300, color: '#fff', letterSpacing: '0.04em', marginBottom: 24, marginTop: 0 }}>{t.about.title}</h2>
            <p style={{ fontSize: 13, lineHeight: 2, color: '#999', marginBottom: 32, marginTop: 0 }}>{t.about.p1}</p>
            <div style={{ borderTop: '1px solid #2a2a2a', marginBottom: 24 }} />
            <h3 style={{ fontSize: 13, fontWeight: 400, color: '#fff', marginBottom: 12, marginTop: 0, letterSpacing: '0.02em' }}>{t.about.designTitle}</h3>
            <p style={{ fontSize: 13, lineHeight: 2, color: '#888', margin: 0 }}>{t.about.designText}</p>
          </div>
          <div style={{ paddingTop: 56 }}>
            <h3 style={{ fontSize: 13, fontWeight: 400, color: '#fff', marginBottom: 16, marginTop: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.about.teamTitle}</h3>
            <p style={{ fontSize: 13, lineHeight: 2, color: '#999', margin: '0 0 24px 0' }}>{t.about.teamText}</p>
            <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {t.about.stats.map(({ num, label }) => (
                  <div key={label}>
                    <span style={{ fontSize: 28, fontWeight: 200, color: '#fff', display: 'block', letterSpacing: '0.02em' }}>{num}</span>
                    <span style={{ fontSize: 11, color: '#666', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ ЦЕЛЕВАЯ АУДИТОРИЯ ══════════ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 40px' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.14em', color: theme.muted, marginBottom: 48, textTransform: 'uppercase' }}>{t.audience.sectionLabel}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
          {t.audience.items.map(({ title, desc }) => (
            <div key={title} style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 400, marginBottom: 12, marginTop: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: theme.muted, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 56, paddingBottom: 32, marginTop: 0, backgroundColor: theme.bg, transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>

            {/* Brand */}
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ403JXli_VJ-mI8t3o6hq08vuIzuyAU4IHZw&s" alt="SELFIE" style={{ display: 'block' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
              />
              <div style={{ display: 'none', fontSize: 16, fontWeight: 400, letterSpacing: '0.12em', marginBottom: 16 }}>SELFIE</div>
              <p style={{ fontSize: 12, lineHeight: 1.9, color: theme.muted, margin: '0 0 20px 0', maxWidth: 260 }}>{t.footer.tagline}</p>
              <div style={{ display: 'flex', gap: 16 }}>
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <button key={i} style={{ background: 'none', border: `1px solid ${theme.border}`, borderRadius: 2, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme.muted, transition: 'border-color 0.2s, color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = theme.text; e.currentTarget.style.color = theme.text; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.muted; }}
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog */}
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.12em', marginBottom: 20, marginTop: 0, color: theme.text, textTransform: 'uppercase' }}>{t.footer.catalog}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {t.footer.catalogItems.map(item => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: 12, color: theme.muted, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = theme.text}
                      onMouseLeave={e => e.target.style.color = theme.muted}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Menu */}
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.12em', marginBottom: 20, marginTop: 0, color: theme.text, textTransform: 'uppercase' }}>{t.footer.menu}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {t.footer.menuItems.map(item => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: 12, color: theme.muted, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = theme.text}
                      onMouseLeave={e => e.target.style.color = theme.muted}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.12em', marginBottom: 20, marginTop: 0, color: theme.text, textTransform: 'uppercase' }}>{t.footer.support}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {t.footer.supportItems.map(item => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: 12, color: theme.muted, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = theme.text}
                      onMouseLeave={e => e.target.style.color = theme.muted}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 11, color: theme.muted, margin: 0, letterSpacing: '0.04em' }}>{t.footer.copyright}</p>
            <div style={{ display: 'flex', gap: 32 }}>
              {[t.footer.privacy, t.footer.terms].map(label => (
                <a key={label} href="#" style={{ fontSize: 11, color: theme.muted, textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = theme.text}
                  onMouseLeave={e => e.target.style.color = theme.muted}
                >{label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}