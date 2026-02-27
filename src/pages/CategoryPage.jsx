import React, { useState, useEffect, useMemo, createContext, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Heart, ShoppingBag, Search, Home, User, Loader2, X, ChevronRight, Moon, Sun } from 'lucide-react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleAuth from "../pages/GoogleAuth";
// ─── Constants ────────────────────────────────────────────────────────────────

const API_URL = 'https://69989a63d66520f95f18019f.mockapi.io/products/products'

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  ru: {
    navItems: ['ГЛАВНАЯ', 'ВСЯ КОЛЛЕКЦИЯ', 'ОДЕЖДА', 'ОБУВЬ', 'АКСЕССУАРЫ', 'ТОЛЬКО ОНЛАЙН', 'SALE', 'НОВИНКИ'],
    navRoutes: {
      'ГЛАВНАЯ':         '/',
      'ВСЯ КОЛЛЕКЦИЯ':   '/products',
      'ОДЕЖДА':          '/category/odejda',
      'ОБУВЬ':           '/category/obuv',
      'АКСЕССУАРЫ':      '/category/aksessuary',
      'ТОЛЬКО ОНЛАЙН':   '/products',
      'SALE':            '/products',
      'НОВИНКИ':         '/products',
    },
    sections: {
      odejda: {
        label: 'Одежда',
        navKey: 'ОДЕЖДА',
        subcategories: [
          'Одежда', 'Блузка', 'Бомбер', 'Брюки', 'Ветровка', 'Водолазка',
          'Демисезонная куртка', 'Джемпер', 'Джинсовка', 'Джинсы', 'Кожанка',
          'Косуха', 'Куртка', 'Лонгслив', 'Пальто', 'Платье', 'Плащ',
          'Рубашка', 'Сарафан', 'Свитер', 'Юбка',
        ],
      },
      obuv: {
        label: 'Обувь',
        navKey: 'ОБУВЬ',
        subcategories: [
          'Обувь', 'Ботинки', 'Кроссовки', 'Туфли', 'Сапоги', 'Балетки',
          'Лоферы', 'Мюли', 'Слипоны', 'Кеды', 'Босоножки',
        ],
      },
      aksessuary: {
        label: 'Аксессуары',
        navKey: 'АКСЕССУАРЫ',
        subcategories: [
          'Аксессуары', 'Сумка', 'Ремень', 'Шарф', 'Шапка', 'Перчатки',
          'Очки', 'Украшения', 'Кошелёк', 'Рюкзак',
        ],
      },
    },
    breadcrumbHome: 'Главная страница',
    loading: 'Загружаем...',
    loadingProducts: 'Загружаем товары...',
    found: (n) => `Найдено: ${n} ${n === 1 ? 'товар' : n < 5 ? 'товара' : 'товаров'}`,
    error: (msg) => `Ошибка: ${msg}`,
    errorLoad: 'Не удалось загрузить товары',
    retry: 'ПОВТОРИТЬ',
    emptyCategory: 'В этой категории пока нет товаров',
    seeAllCategories: 'СМОТРЕТЬ ВСЕ КАТЕГОРИИ',
    allCategories: 'Все категории',
    saleBadge: 'SALE',
  },
  en: {
    navItems: ['MAIN', 'ALL COLLECTION', 'CLOTHING', 'FOOTWEAR', 'ACCESSORIES', 'ONLINE ONLY', 'SALE', 'NEW IN'],
    navRoutes: {
      'MAIN':            '/',
      'ALL COLLECTION':  '/products',
      'CLOTHING':        '/category/odejda',
      'FOOTWEAR':        '/category/obuv',
      'ACCESSORIES':     '/category/aksessuary',
      'ONLINE ONLY':     '/products',
      'SALE':            '/products',
      'NEW IN':          '/products',
    },
    sections: {
      odejda: {
        label: 'Clothing',
        navKey: 'CLOTHING',
        subcategories: [
          'Clothing', 'Blouse', 'Bomber', 'Trousers', 'Windbreaker', 'Turtleneck',
          'Demi-season jacket', 'Jumper', 'Denim jacket', 'Jeans', 'Leather jacket',
          'Biker jacket', 'Coat', 'Longsleeve', 'Overcoat', 'Dress', 'Raincoat',
          'Shirt', 'Sundress', 'Sweater', 'Skirt',
        ],
      },
      obuv: {
        label: 'Footwear',
        navKey: 'FOOTWEAR',
        subcategories: [
          'Footwear', 'Boots', 'Sneakers', 'Heels', 'High boots', 'Ballerinas',
          'Loafers', 'Mules', 'Slip-ons', 'Canvas shoes', 'Sandals',
        ],
      },
      aksessuary: {
        label: 'Accessories',
        navKey: 'ACCESSORIES',
        subcategories: [
          'Accessories', 'Bag', 'Belt', 'Scarf', 'Hat', 'Gloves',
          'Sunglasses', 'Jewellery', 'Wallet', 'Backpack',
        ],
      },
    },
    breadcrumbHome: 'Home',
    loading: 'Loading...',
    loadingProducts: 'Loading products...',
    found: (n) => `Found: ${n} ${n === 1 ? 'item' : 'items'}`,
    error: (msg) => `Error: ${msg}`,
    errorLoad: 'Failed to load products',
    retry: 'RETRY',
    emptyCategory: 'No products in this category yet',
    seeAllCategories: 'SEE ALL CATEGORIES',
    allCategories: 'All categories',
    saleBadge: 'SALE',
  },
}

// ─── Theme ────────────────────────────────────────────────────────────────────
export const ThemeContext = createContext({ dark: false, toggleDark: () => {} })
export const LangContext  = createContext({ lang: 'ru', toggleLang: () => {} })

const themeVars = {
  light: {
    '--bg':                '#ffffff',
    '--surface':           '#faf8f5',
    '--surface-hover':     '#f5f2ee',
    '--border':            '#e8e3de',
    '--text':              '#222222',
    '--text-muted':        '#555555',
    '--text-faint':        '#aaaaaa',
    '--card-bg':           '#f5f2ee',
    '--header-bg':         '#ffffff',
    '--icon':              '#555555',
    '--btn':               '#222222',
    '--btn-text':          '#ffffff',
    '--heart':             '#c0392b',
    '--nav-active':        '#222222',
    '--nav-inactive':      '#888888',
    '--breadcrumb-link':   '#888888',
    '--breadcrumb-active': '#555555',
    '--subcat-text':       '#888888',
    '--subcat-hover':      '#111111',
  },
  dark: {
    '--bg':                '#0f0f0f',
    '--surface':           '#1a1a1a',
    '--surface-hover':     '#222222',
    '--border':            '#2a2a2a',
    '--text':              '#f0ede8',
    '--text-muted':        '#b0a898',
    '--text-faint':        '#666666',
    '--card-bg':           '#1c1c1c',
    '--header-bg':         '#0f0f0f',
    '--icon':              '#b0a898',
    '--btn':               '#f0ede8',
    '--btn-text':          '#111111',
    '--heart':             '#e05c5c',
    '--nav-active':        '#f0ede8',
    '--nav-inactive':      '#666666',
    '--breadcrumb-link':   '#666666',
    '--breadcrumb-active': '#b0a898',
    '--subcat-text':       '#888888',
    '--subcat-hover':      '#f0ede8',
  },
}

// ─── Utils ────────────────────────────────────────────────────────────────────

const serif = "'Cormorant Garamond', Georgia, serif"
const formatPrice = p => p.toLocaleString('ru-RU') + ' сум'

function getProductImage(product) {
  return product.images?.[0] ?? product.image ?? 'https://placehold.co/400x500/f5f2ee/888?text=Фото'
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ activeNavKey , onSearchOpen }) {
  const navigate = useNavigate()
  const { dark, toggleDark } = useContext(ThemeContext)
  const { lang, toggleLang } = useContext(LangContext)
  const t = T[lang]
const [open1, setOpen1] = useState(false)  
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 transition-colors duration-300"
      style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--border)', fontFamily: serif }}
    >
      {/* Logo */}
      <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => navigate('/products')}>
         <Link to="/" style={{ display:'flex', alignItems:'center', gap:6, textDecoration:'none', flexShrink:0 }}>
         <div>
          <img className="w-32.5 h-37.5" src="https://selfiestore.uz/static/62890302-3250-4096-b833-b364f5232082.png" alt="" />
         </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex gap-5">
        {t.navItems.map(item => {
          const isActive = activeNavKey === item
          return (
            <button
              key={item}
              onClick={() => navigate(t.navRoutes[item] ?? '/products')}
              className="bg-transparent border-none cursor-pointer text-[11px] tracking-wider transition-all duration-200 px-0.5"
              style={{
                fontFamily: serif,
                color: isActive ? 'var(--nav-active)' : 'var(--nav-inactive)',
                fontWeight: isActive ? 600 : 400,
                borderBottom: isActive ? '1.5px solid var(--nav-active)' : '1.5px solid transparent',
              }}
            >{item}</button>
          )
        })}
      </nav>

      {/* Icons */}
      <div className="flex gap-4 items-center" style={{ color: 'var(--icon)' }}>
        {/* Lang toggle */}
        <button
          onClick={toggleLang}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            color: 'var(--icon)',
            padding: '2px 7px',
            fontSize: 10,
            fontFamily: serif,
            letterSpacing: '0.08em',
            fontWeight: 600,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--icon)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          {lang === 'ru' ? 'EN' : 'RU'}
        </button>

        <button onClick={toggleDark} className="bg-transparent border-none cursor-pointer flex p-0 transition-colors duration-200" style={{ color: 'var(--icon)' }}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Home        size={18} className="cursor-pointer" onClick={() => navigate('/')} />
          <Search size={18} style={{ cursor: 'pointer' }} onClick={onSearchOpen} />
        <Heart       size={18} className="cursor-pointer" />
       <Link to="/cart"><ShoppingBag size={18} className="cursor-pointer" /></Link>
       <GoogleOAuthProvider clientId="285018621048-3t4r6du53df4kaofav0hatqjmd0taove.apps.googleusercontent.com">
                   <button className="icon-btn" onClick={() => setOpen1(true)} style={{ color: t.icon, transition:'color 0.35s' }}>
                     <User size={18}/>
                   </button>
                   {open1 && <GoogleAuth onClose={() => setOpen1(false)} />}
                 </GoogleOAuthProvider>
      </div>
    </header>
  )
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { dark } = useContext(ThemeContext)
  const { lang } = useContext(LangContext)
  const t = T[lang]
  const [hovered, setHovered] = useState(false)
  const [liked,   setLiked]   = useState(false)

  return (
    <div
      className="cursor-pointer"
      style={{ fontFamily: serif }}
      onClick={() => navigate(`/products/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ background: 'var(--card-bg)', aspectRatio: '3/4' }}>
        <img
          src={getProductImage(product)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          onError={e => { e.target.src = 'https://placehold.co/400x500/f5f2ee/888?text=Фото' }}
        />
        {product.oldPrice && (
          <div className="absolute top-2.5 left-2.5 text-white text-[10px] px-1.5 py-0.5 tracking-wider" style={{ background: '#c0392b' }}>
            {t.saleBadge}
          </div>
        )}
        <button
          onClick={e => { e.stopPropagation(); setLiked(p => !p) }}
          className="absolute top-2.5 right-2.5 rounded-full p-1.5 flex items-center justify-center transition-all duration-200 border-none cursor-pointer"
          style={{
            background: liked
              ? (dark ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)')
              : (dark ? 'rgba(30,30,30,0.7)'  : 'rgba(255,255,255,0.7)'),
            boxShadow: liked ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
          }}
        >
          <Heart size={14} fill={liked ? 'var(--heart)' : 'none'} color={liked ? 'var(--heart)' : (dark ? '#aaa' : '#888')} />
        </button>
      </div>

      <div className="pt-2.5 pb-4">
        <div className="text-[10px] mb-1 tracking-wide" style={{ color: 'var(--text-faint)' }}>{product.category}</div>
        <div className="text-[11.5px] mb-1 leading-snug" style={{ color: 'var(--text-muted)' }}>{product.name}</div>
        <div className="flex items-baseline gap-2.5 mt-1">
          {product.oldPrice && (
            <span className="text-[11px] line-through" style={{ color: 'var(--text-faint)' }}>{formatPrice(product.oldPrice)}</span>
          )}
          <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  )
}

// ─── ProductSkeleton ──────────────────────────────────────────────────────────

function ProductSkeleton() {
  return (
    <div>
      <div className="animate-pulse" style={{ background: 'var(--card-bg)', aspectRatio: '3/4' }} />
      <div className="pt-2.5 flex flex-col gap-2">
        <div className="h-2.5 rounded-sm animate-pulse w-3/5" style={{ background: 'var(--card-bg)' }} />
        <div className="h-3 rounded-sm animate-pulse w-4/5"   style={{ background: 'var(--card-bg)' }} />
        <div className="h-3.5 rounded-sm animate-pulse w-2/5" style={{ background: 'var(--card-bg)' }} />
      </div>
    </div>
  )
}

// ─── ProductGrid ──────────────────────────────────────────────────────────────

function ProductGrid({ products, loading, error, onBack }) {
  const { lang } = useContext(LangContext)
  const t = T[lang]

  if (loading) return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-2">
      {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
    </div>
  )

  if (error) return (
    <div className="text-center py-20" style={{ color: 'var(--text-faint)', fontFamily: serif }}>
      <div className="text-4xl mb-4">⚠️</div>
      <div className="text-sm mb-4">{t.errorLoad}</div>
      <button onClick={() => window.location.reload()}
        className="text-xs px-7 py-2.5 cursor-pointer border-none tracking-widest"
        style={{ background: 'var(--btn)', color: 'var(--btn-text)', fontFamily: serif }}>
        {t.retry}
      </button>
    </div>
  )

  if (products.length === 0) return (
    <div className="text-center py-20" style={{ color: 'var(--text-faint)', fontFamily: serif }}>
      <div className="text-4xl mb-4">🕵️</div>
      <div className="text-sm mb-5">{t.emptyCategory}</div>
      <button onClick={onBack}
        className="text-xs px-7 py-2.5 cursor-pointer border-none tracking-widest"
        style={{ background: 'var(--btn)', color: 'var(--btn-text)', fontFamily: serif }}>
        {t.seeAllCategories}
      </button>
    </div>
  )

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-2">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

// ─── CategoryPage ─────────────────────────────────────────────────────────────

export default function CategoryPage() {
  const { section } = useParams()
  const navigate    = useNavigate()

  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState('ru')
  const toggleLang = () => setLang(l => l === 'ru' ? 'en' : 'ru')

  const t = T[lang]
  const sectionInfo = t.sections[section]

  const [products,     setProducts]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [activeSubcat, setActiveSubcat] = useState(null)

  useEffect(() => {
    // section key (odejda/obuv/aksessuary) is URL-based, always valid regardless of lang
    if (!T.ru.sections[section]) navigate('/products')
  }, [section, navigate])

  useEffect(() => {
    setLoading(true); setError(null)
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error('Ошибка сети'); return r.json() })
      .then(data => { setProducts(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [])

  useEffect(() => { setActiveSubcat(null) }, [section, lang])

  // subcategory products matched by original RU category names from API
  const ruSectionInfo = T.ru.sections[section]
  const enSectionInfo = T.en.sections[section]

  const availableSubcats = useMemo(() => {
    if (!ruSectionInfo) return []
    const cats = new Set(products.map(p => p.category))
    // Return indices of RU subcats that exist in API, map to current lang
    return ruSectionInfo.subcategories
      .map((ruCat, i) => ({ ruCat, localCat: (lang === 'ru' ? ruSectionInfo : enSectionInfo).subcategories[i] || ruCat }))
      .filter(({ ruCat }) => cats.has(ruCat))
  }, [products, section, lang])

  // When activeSubcat is set, we store the RU cat name to filter API products
  const [activeSubcatRu, setActiveSubcatRu] = useState(null)

  const subcatProducts = useMemo(() => (
    activeSubcatRu ? products.filter(p => p.category === activeSubcatRu) : []
  ), [products, activeSubcatRu])

  function handleSubcatClick(ruCat, localLabel) {
    setActiveSubcat(localLabel)
    setActiveSubcatRu(ruCat)
  }

  function handleClearSubcat() {
    setActiveSubcat(null)
    setActiveSubcatRu(null)
  }

  useEffect(() => { handleClearSubcat() }, [section, lang])

  if (!sectionInfo) return null

  const subcatsToShow = availableSubcats.length > 0
    ? availableSubcats
    : (lang === 'ru' ? ruSectionInfo : enSectionInfo).subcategories.map((c, i) => ({
        ruCat: ruSectionInfo.subcategories[i] || c,
        localCat: c,
      }))

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ThemeContext.Provider value={{ dark, toggleDark: () => setDark(d => !d) }}>
        <div
          className="min-h-screen transition-colors duration-300"
          style={{ ...themeVars[dark ? 'dark' : 'light'], background: 'var(--bg)', color: 'var(--text)', fontFamily: serif }}
        >
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />

          <Header activeNavKey={sectionInfo.navKey} />

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 px-6 py-3 text-[11px] tracking-wider">
            <span
              className="cursor-pointer transition-colors duration-200"
              style={{ color: 'var(--breadcrumb-link)' }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--breadcrumb-link)'}
              onClick={() => navigate('/products')}
            >{t.breadcrumbHome}</span>

            <ChevronRight size={11} style={{ color: 'var(--text-faint)' }} />

            {activeSubcat ? (
              <>
                <span
                  className="cursor-pointer transition-colors duration-200"
                  style={{ color: 'var(--breadcrumb-link)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text)'}
                  onMouseLeave={e => e.target.style.color = 'var(--breadcrumb-link)'}
                  onClick={handleClearSubcat}
                >{sectionInfo.label}</span>
                <ChevronRight size={11} style={{ color: 'var(--text-faint)' }} />
                <span style={{ color: 'var(--breadcrumb-active)' }}>{activeSubcat}</span>
              </>
            ) : (
              <span style={{ color: 'var(--breadcrumb-active)' }}>{sectionInfo.label}</span>
            )}
          </nav>

          {/* ── Subcategory list ── */}
          {!activeSubcat && (
            <div className="max-w-200 mx-auto px-6 pb-20">
              <h1 className="text-center text-[22px] font-medium tracking-[0.08em] mt-4 mb-12" style={{ color: 'var(--text)' }}>
                {sectionInfo.label}
              </h1>

              {loading ? (
                <div className="flex items-center justify-center gap-3 py-20" style={{ color: 'var(--text-faint)' }}>
                  <Loader2 size={18} className="animate-spin" />
                  <span className="text-sm tracking-widest">{t.loading}</span>
                </div>
              ) : (
                <div style={{ columns: 3, columnGap: 64 }}>
                  {subcatsToShow.map(({ ruCat, localCat }) => (
                    <div key={ruCat} className="mb-5" style={{ breakInside: 'avoid' }}>
                      <button
                        onClick={() => handleSubcatClick(ruCat, localCat)}
                        className="bg-transparent border-none cursor-pointer text-left w-full p-0"
                        style={{ fontFamily: serif }}
                      >
                        <span
                          className="text-[15px] tracking-wide block transition-colors duration-200"
                          style={{ color: 'var(--subcat-text)' }}
                          onMouseEnter={e => e.target.style.color = 'var(--subcat-hover)'}
                          onMouseLeave={e => e.target.style.color = 'var(--subcat-text)'}
                        >{localCat}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Product grid ── */}
          {activeSubcat && (
            <div className="max-w-300 mx-auto px-6 pb-20">
              <div className="flex items-center justify-between mt-4 mb-8">
                <h1 className="text-[22px] font-medium tracking-[0.08em] m-0" style={{ color: 'var(--text)' }}>
                  {activeSubcat}
                </h1>
                <button
                  onClick={handleClearSubcat}
                  className="flex items-center gap-1.5 text-[11px] tracking-widest border-none bg-transparent cursor-pointer transition-colors duration-200"
                  style={{ color: 'var(--text-faint)', fontFamily: serif }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}
                >
                  <X size={12} /> {t.allCategories}
                </button>
              </div>

              {/* Counter */}
              <div className="text-[11px] tracking-wider mb-4" style={{ color: 'var(--text-faint)' }}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={12} className="animate-spin" /> {t.loadingProducts}
                  </span>
                ) : error ? (
                  <span style={{ color: '#c0392b' }}>{t.error(error)}</span>
                ) : (
                  <span>{t.found(subcatProducts.length)}</span>
                )}
              </div>

              <ProductGrid products={subcatProducts} loading={loading} error={error} onBack={handleClearSubcat} />
            </div>
          )}
        </div>
      </ThemeContext.Provider>
    </LangContext.Provider>
  )
}