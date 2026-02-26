import React, { useState, useEffect, useMemo, createContext, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Search, Home, User, Loader2, X, ChevronRight, Moon, Sun } from 'lucide-react'

// ─── Константы ────────────────────────────────────────────────────────────────

const API_URL = 'https://69989a63d66520f95f18019f.mockapi.io/products/products'

const NAV_ITEMS = ['ВСЯ КОЛЛЕКЦИЯ', 'ОДЕЖДА', 'ОБУВЬ', 'АКСЕССУАРЫ', 'ТОЛЬКО ОНЛАЙН', 'SALE', 'НОВИНКИ']

const NAV_ROUTES = {
  'ВСЯ КОЛЛЕКЦИЯ': '/products',
  'ОДЕЖДА':        '/category/odejda',
  'ОБУВЬ':         '/category/obuv',
  'АКСЕССУАРЫ':    '/category/aksessuary',
  'ТОЛЬКО ОНЛАЙН': '/products',
  'SALE':          '/products',
  'НОВИНКИ':       '/products',
}

const SECTIONS = {
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
}

// ─── Theme context (совместим с AllProducts) ──────────────────────────────────
export const ThemeContext = createContext({ dark: false, toggleDark: () => {} })

const T = {
  light: {
    bg: '#fff',
    surface: '#faf8f5',
    surfaceHover: '#f5f2ee',
    border: '#e8e3de',
    text: '#222',
    textMuted: '#555',
    textFaint: '#aaa',
    inputBg: '#fafaf9',
    cardBg: '#f5f2ee',
    headerBg: '#fff',
    icon: '#555',
    btnPrimary: '#222',
    btnPrimaryText: '#fff',
    heartActive: '#c0392b',
    tagBorder: '#e0dbd5',
    tagColor: '#aaa',
    navActive: '#222',
    navInactive: '#888',
    breadcrumbLink: '#888',
    breadcrumbActive: '#555',
    subcatText: '#888',
    subcatHover: '#111',
  },
  dark: {
    bg: '#0f0f0f',
    surface: '#1a1a1a',
    surfaceHover: '#222',
    border: '#2a2a2a',
    text: '#f0ede8',
    textMuted: '#b0a898',
    textFaint: '#666',
    inputBg: '#161616',
    cardBg: '#1c1c1c',
    headerBg: '#0f0f0f',
    icon: '#b0a898',
    btnPrimary: '#f0ede8',
    btnPrimaryText: '#111',
    heartActive: '#e05c5c',
    tagBorder: '#2e2e2e',
    tagColor: '#777',
    navActive: '#f0ede8',
    navInactive: '#666',
    breadcrumbLink: '#666',
    breadcrumbActive: '#b0a898',
    subcatText: '#888',
    subcatHover: '#f0ede8',
  },
}

// ─── Утилиты ──────────────────────────────────────────────────────────────────

function formatPrice(price) {
  return price.toLocaleString('ru-RU') + ' сум'
}

function getProductImage(product) {
  return product.images?.[0] ?? product.image ?? 'https://placehold.co/400x500/f5f2ee/888?text=Фото'
}

function pluralizeItems(count) {
  if (count === 1) return 'товар'
  if (count < 5)  return 'товара'
  return 'товаров'
}

// ─── Компоненты ───────────────────────────────────────────────────────────────

function Header({ activeNavKey }) {
  const navigate = useNavigate()
  const { dark, toggleDark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: tk.headerBg,
      borderBottom: `1px solid ${tk.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', height: 56,
      transition: 'background 0.3s',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    }}>
      {/* Логотип */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => navigate('/products')}>
        <div style={{ border: `1.5px solid ${tk.text}`, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: tk.text }}>
          SF
        </div>
        <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '0.1em', color: tk.text }}>
          selfie
        </span>
      </div>

      {/* Навигация */}
      <nav style={{ display: 'flex', gap: 20 }}>
        {NAV_ITEMS.map(item => {
          const isActive = activeNavKey === item
          return (
            <button
              key={item}
              onClick={() => navigate(NAV_ROUTES[item] ?? '/products')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 11, letterSpacing: '0.06em',
                fontFamily: 'inherit',
                color: isActive ? tk.navActive : tk.navInactive,
                fontWeight: isActive ? 600 : 400,
                padding: '0 2px',
                borderBottom: isActive ? `1.5px solid ${tk.navActive}` : '1.5px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {item}
            </button>
          )
        })}
      </nav>

      {/* Иконки */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: tk.icon }}>
        <button onClick={toggleDark} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.icon, display: 'flex', padding: 0, transition: 'color 0.2s' }}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Home     size={18} style={{ cursor: 'pointer' }} onClick={() => navigate('/products')} />
        <Search   size={18} style={{ cursor: 'pointer' }} />
        <Heart    size={18} style={{ cursor: 'pointer' }} />
        <ShoppingBag size={18} style={{ cursor: 'pointer' }} />
        <User     size={18} style={{ cursor: 'pointer' }} />
      </div>
    </header>
  )
}

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  const [hovered, setHovered] = useState(false)
  const [liked,   setLiked]   = useState(false)

  return (
    <div
      style={{ cursor: 'pointer', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      onClick={() => navigate(`/products/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Изображение */}
      <div style={{ position: 'relative', overflow: 'hidden', background: tk.cardBg, aspectRatio: '3/4' }}>
        <img
          src={getProductImage(product)}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          onError={e => { e.target.src = 'https://placehold.co/400x500/f5f2ee/888?text=Фото' }}
        />

        {product.oldPrice && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: '#c0392b', color: '#fff', fontSize: 10, padding: '2px 6px', letterSpacing: '0.04em' }}>
            SALE
          </div>
        )}

        <button
          onClick={e => { e.stopPropagation(); setLiked(prev => !prev) }}
          style={{
            position: 'absolute', top: 10, right: 10, borderRadius: '50%', padding: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', border: 'none', cursor: 'pointer',
            background: liked
              ? (dark ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)')
              : (dark ? 'rgba(30,30,30,0.7)' : 'rgba(255,255,255,0.7)'),
            boxShadow: liked ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
          }}
        >
          <Heart size={14} fill={liked ? tk.heartActive : 'none'} color={liked ? tk.heartActive : (dark ? '#aaa' : '#888')} />
        </button>
      </div>

      {/* Информация */}
      <div style={{ paddingTop: 10, paddingBottom: 16 }}>
        <div style={{ fontSize: 10, color: tk.textFaint, marginBottom: 3, letterSpacing: '0.03em' }}>{product.category}</div>
        <div style={{ fontSize: 11.5, color: tk.textMuted, marginBottom: 4, lineHeight: 1.4 }}>{product.name}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
          {product.oldPrice && (
            <span style={{ fontSize: 11, color: tk.textFaint, textDecoration: 'line-through' }}>{formatPrice(product.oldPrice)}</span>
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: tk.text }}>{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  )
}

function ProductSkeleton() {
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  return (
    <div>
      <div style={{ background: tk.cardBg, aspectRatio: '3/4', animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ height: 10, background: tk.cardBg, borderRadius: 2, width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 12, background: tk.cardBg, borderRadius: 2, width: '80%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 14, background: tk.cardBg, borderRadius: 2, width: '40%', animation: 'pulse 1.5s ease-in-out infinite' }} />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}

function ProductGrid({ products, loading, error, onBack }) {
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px 16px' }}>
        {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: tk.textFaint, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
        <div style={{ fontSize: 14, marginBottom: 16 }}>Не удалось загрузить товары</div>
        <button
          onClick={() => window.location.reload()}
          style={{ background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '10px 28px', fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          ПОВТОРИТЬ
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: tk.textFaint, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🕵️</div>
        <div style={{ fontSize: 14, marginBottom: 20 }}>В этой категории пока нет товаров</div>
        <button
          onClick={onBack}
          style={{ background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '10px 28px', fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          СМОТРЕТЬ ВСЕ КАТЕГОРИИ
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px 16px' }}>
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}

// ─── Главный компонент ────────────────────────────────────────────────────────

export default function CategoryPage() {
  const { section } = useParams()
  const navigate    = useNavigate()

  const [dark, setDark] = useState(false)
  const tk = dark ? T.dark : T.light

  const sectionInfo = SECTIONS[section]

  const [products,     setProducts]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [activeSubcat, setActiveSubcat] = useState(null)

  useEffect(() => {
    if (!sectionInfo) navigate('/products')
  }, [section, sectionInfo, navigate])

  useEffect(() => {
    setLoading(true); setError(null)
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error('Ошибка сети'); return r.json() })
      .then(data => { setProducts(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [])

  useEffect(() => { setActiveSubcat(null) }, [section])

  const availableSubcats = useMemo(() => {
    if (!sectionInfo) return []
    const apiCategories = new Set(products.map(p => p.category))
    return sectionInfo.subcategories.filter(s => apiCategories.has(s))
  }, [products, sectionInfo])

  const subcatProducts = useMemo(() => {
    if (!activeSubcat) return []
    return products.filter(p => p.category === activeSubcat)
  }, [products, activeSubcat])

  if (!sectionInfo) return null

  const subcatsToShow = availableSubcats.length > 0 ? availableSubcats : sectionInfo.subcategories

  return (
    <ThemeContext.Provider value={{ dark, toggleDark: () => setDark(d => !d) }}>
      <div style={{
        minHeight: '100vh',
        background: tk.bg,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        transition: 'background 0.3s, color 0.3s',
        color: tk.text,
      }}>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        <Header activeNavKey={sectionInfo.navKey} />

        {/* Хлебные крошки */}
        <nav style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '0.04em' }}>
          <span
            style={{ cursor: 'pointer', color: tk.breadcrumbLink, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = tk.text}
            onMouseLeave={e => e.target.style.color = tk.breadcrumbLink}
            onClick={() => navigate('/products')}
          >
            Главная страница
          </span>
          <ChevronRight size={11} color={tk.textFaint} />

          {activeSubcat ? (
            <>
              <span
                style={{ cursor: 'pointer', color: tk.breadcrumbLink, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = tk.text}
                onMouseLeave={e => e.target.style.color = tk.breadcrumbLink}
                onClick={() => setActiveSubcat(null)}
              >
                {sectionInfo.label}
              </span>
              <ChevronRight size={11} color={tk.textFaint} />
              <span style={{ color: tk.breadcrumbActive }}>{activeSubcat}</span>
            </>
          ) : (
            <span style={{ color: tk.breadcrumbActive }}>{sectionInfo.label}</span>
          )}
        </nav>

        {/* ── Список подкатегорий ── */}
        {!activeSubcat && (
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px' }}>
            <h1 style={{ textAlign: 'center', fontSize: 22, fontWeight: 500, letterSpacing: '0.08em', color: tk.text, marginTop: 16, marginBottom: 48 }}>
              {sectionInfo.label}
            </h1>

            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '80px 0', color: tk.textFaint }}>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: 13, letterSpacing: '0.1em' }}>Загружаем...</span>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </div>
            ) : (
              <div style={{ columns: 3, columnGap: 64 }}>
                {subcatsToShow.map(cat => (
                  <div key={cat} style={{ breakInside: 'avoid', marginBottom: 20 }}>
                    <button
                      onClick={() => setActiveSubcat(cat)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        textAlign: 'left', width: '100%', padding: 0,
                        fontFamily: 'inherit',
                      }}
                    >
                      <span
                        style={{ fontSize: 15, color: tk.subcatText, transition: 'color 0.2s', letterSpacing: '0.03em', display: 'block' }}
                        onMouseEnter={e => e.target.style.color = tk.subcatHover}
                        onMouseLeave={e => e.target.style.color = tk.subcatText}
                      >
                        {cat}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Товары подкатегории ── */}
        {activeSubcat && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, marginBottom: 32 }}>
              <h1 style={{ fontSize: 22, fontWeight: 500, letterSpacing: '0.08em', color: tk.text, margin: 0 }}>
                {activeSubcat}
              </h1>
              <button
                onClick={() => setActiveSubcat(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 11, letterSpacing: '0.1em',
                  color: tk.textFaint, border: 'none', background: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = tk.text}
                onMouseLeave={e => e.currentTarget.style.color = tk.textFaint}
              >
                <X size={12} /> Все категории
              </button>
            </div>

            {/* Счётчик */}
            <div style={{ fontSize: 11, color: tk.textFaint, letterSpacing: '0.04em', marginBottom: 16 }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> Загружаем товары...
                </span>
              ) : error ? (
                <span style={{ color: '#c0392b' }}>Ошибка: {error}</span>
              ) : (
                <span>Найдено: {subcatProducts.length} {pluralizeItems(subcatProducts.length)}</span>
              )}
            </div>

            <ProductGrid
              products={subcatProducts}
              loading={loading}
              error={error}
              onBack={() => setActiveSubcat(null)}
            />
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  )
}