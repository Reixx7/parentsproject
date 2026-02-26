import React, { useState, useEffect, useMemo, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Search, Heart, User, ShoppingBag, Facebook, Instagram, Send, Youtube, X, Trash2, HeartOff, ShoppingCart, Loader2, Moon, Sun } from 'lucide-react'

const API_URL = 'https://69989a63d66520f95f18019f.mockapi.io/products/products'

export const FavoritesContext = createContext(null)

// ─── Dark mode context ────────────────────────────────────────────────────────
export const ThemeContext = createContext({ dark: false, toggleDark: () => {} })

function formatPrice(p) { return p.toLocaleString('ru-RU') + ' сум' }

function getProductImages(p) {
  if (p.images && p.images.length) return p.images
  return [p.image, p.image2, p.image3].filter(Boolean)
}

function getProductImage(p) {
  return getProductImages(p)[0] || 'https://placehold.co/400x500/f5f2ee/888?text=Фото'
}

// ─── Pick 15 random products and apply 15% discount ──────────────────────────
function pickSaleProducts(products) {
  if (!products.length) return []
  const shuffled = [...products].sort(() => Math.random() - 0.5)
  const fifteen = shuffled.slice(0, Math.min(15, shuffled.length))
  return fifteen.map(p => ({
    ...p,
    oldPrice: p.oldPrice ?? p.price,
    // Math.floor for clean number, Math.round for rounding, kept as Math.floor
    price: Math.floor(p.price * (1 - 15 / 100)),
    _isSaleItem: true,
  }))
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  light: {
    bg: '#fff',
    surface: '#faf8f5',
    surfaceHover: '#f5f2ee',
    border: '#e8e3de',
    borderLight: '#eee',
    text: '#222',
    textMuted: '#555',
    textFaint: '#aaa',
    inputBg: '#fafaf9',
    drawerBg: '#fff',
    drawerFooter: '#faf8f5',
    overlay: 'rgba(0,0,0,0.35)',
    cardBg: '#f5f2ee',
    selectBg: '#fff',
    selectColor: '#555',
    tagBorder: '#e0dbd5',
    tagColor: '#aaa',
    saleChip: '#f0ece6',
    toastBg: '#222',
    toastColor: '#fff',
    headerBg: '#fff',
    footerBorder: '#e8e3de',
    icon: '#555',
    btnPrimary: '#222',
    btnPrimaryText: '#fff',
    saleBadge: '#c0392b',
    heartActive: '#c0392b',
  },
  dark: {
    bg: '#0f0f0f',
    surface: '#1a1a1a',
    surfaceHover: '#222',
    border: '#2a2a2a',
    borderLight: '#252525',
    text: '#f0ede8',
    textMuted: '#b0a898',
    textFaint: '#666',
    inputBg: '#161616',
    drawerBg: '#141414',
    drawerFooter: '#1a1a1a',
    overlay: 'rgba(0,0,0,0.6)',
    cardBg: '#1c1c1c',
    selectBg: '#1a1a1a',
    selectColor: '#b0a898',
    tagBorder: '#2e2e2e',
    tagColor: '#777',
    saleChip: '#2a1f1f',
    toastBg: '#f0ede8',
    toastColor: '#111',
    headerBg: '#0f0f0f',
    footerBorder: '#2a2a2a',
    icon: '#b0a898',
    btnPrimary: '#f0ede8',
    btnPrimaryText: '#111',
    saleBadge: '#c0392b',
    heartActive: '#e05c5c',
  },
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [toast, setToast] = useState(null)
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light

  function toggleFavorite(product) {
    const isLiked = favorites.some(f => f.id === product.id)
    if (isLiked) {
      setFavorites(prev => prev.filter(f => f.id !== product.id))
      showToast('Удалено из избранного', false)
    } else {
      setFavorites(prev => [...prev, product])
      showToast('Добавлено в избранное', true)
    }
  }

  function isFavorite(id) { return favorites.some(f => f.id === id) }
  function clearFavorites() { setFavorites([]) }

  function showToast(msg, liked) {
    setToast({ msg, liked })
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          background: tk.toastBg, color: tk.toastColor, padding: '12px 24px',
          fontSize: 12, letterSpacing: '0.06em', zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          animation: 'fadeInUp 0.25s ease',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          whiteSpace: 'nowrap',
        }}>
          <Heart size={14} fill={toast.liked ? tk.heartActive : 'none'} color={toast.liked ? tk.heartActive : tk.toastColor} />
          {toast.msg}
        </div>
      )}
      <style>{`
        @keyframes fadeInUp {
          from { opacity:0; transform:translateX(-50%) translateY(10px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .fav-drawer { animation: slideInRight 0.32s cubic-bezier(.22,.68,0,1.2); }
      `}</style>
    </FavoritesContext.Provider>
  )
}

// ─── Reusable select style ────────────────────────────────────────────────────
function getSelectStyle(tk) {
  return {
    border: `1px solid ${tk.border}`,
    padding: '6px 28px 6px 10px',
    fontSize: 11,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    background: tk.selectBg,
    cursor: 'pointer',
    outline: 'none',
    letterSpacing: '0.04em',
    color: tk.selectColor,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
  }
}

const NAV_ITEMS = ['ВСЯ КОЛЛЕКЦИЯ', 'ОДЕЖДА', 'ОБУВЬ', 'АКСЕССУАРЫ', 'ТОЛЬКО ОНЛАЙН', 'SALE', 'НОВИНКИ']

const NAV_ROUTES = {
  'ОДЕЖДА': '/category/odejda',
  'ОБУВЬ': '/category/obuv',
  'АКСЕССУАРЫ': '/category/aksessuary',
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '36', '37', '38', '39', '40', 'ONE SIZE', 'One size']
const SORT_OPTIONS = ['Сортировка', 'По цене (возр.)', 'По цене (убыв.)', 'Новинки']

const FOOTER_LINKS = {
  'КАТАЛОГ':            ['Новинки', 'Вся коллекция', 'Одежда', 'Обувь', 'Аксессуары', 'Только онлайн', 'Sale'],
  'ПОМОЩЬ ПОКУПАТЕЛЮ': ['Оплата', 'Возврат', 'Доставка', 'Наши магазины', 'Бонусная программа'],
  'О КОМПАНИИ':         ['Контакты', 'О бренде', 'Карьера в Selfie', 'Публичная оферта', 'Политика конфиденциальности'],
  'БЛОГ':               ['Новости', 'Акции', 'LookBooks'],
}

function FavoritesDrawer({ open, onClose }) {
  const { favorites, toggleFavorite, clearFavorites } = useContext(FavoritesContext)
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  const totalPrice = favorites.reduce((sum, p) => sum + p.price, 0)

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: tk.overlay, zIndex: 500, backdropFilter: 'blur(1px)' }} />
      <div className="fav-drawer" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 420, maxWidth: '95vw', background: tk.drawerBg, zIndex: 501,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-12px 0 48px rgba(0,0,0,0.25)',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${tk.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Heart size={18} color={tk.heartActive} fill={tk.heartActive} />
            <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.06em', color: tk.text }}>ИЗБРАННОЕ</span>
            {favorites.length > 0 && (
              <span style={{ background: tk.heartActive, color: '#fff', fontSize: 10, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{favorites.length}</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {favorites.length > 0 && (
              <button onClick={clearFavorites} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, color: tk.textFaint, fontSize: 11, letterSpacing: '0.04em', fontFamily: 'inherit', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = tk.heartActive}
                onMouseLeave={e => e.currentTarget.style.color = tk.textFaint}>
                <Trash2 size={13} /> Очистить
              </button>
            )}
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.textFaint, display: 'flex', padding: 4 }}><X size={20} /></button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: favorites.length === 0 ? 0 : '8px 0' }}>
          {favorites.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40, color: tk.textFaint }}>
              <HeartOff size={52} strokeWidth={1} />
              <div style={{ fontSize: 16, color: tk.textFaint, textAlign: 'center', lineHeight: 1.6 }}>В избранном пусто</div>
              <div style={{ fontSize: 12, color: tk.textFaint, textAlign: 'center' }}>Нажмите на карточке товара,<br />чтобы добавить его сюда</div>
              <button onClick={onClose} style={{ marginTop: 8, background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '11px 28px', fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit' }}>ПЕРЕЙТИ В КАТАЛОГ</button>
            </div>
          ) : (
            favorites.map((product) => (
              <FavDrawerItem key={product.id} product={product} onRemove={() => toggleFavorite(product)} />
            ))
          )}
        </div>

        {favorites.length > 0 && (
          <div style={{ flexShrink: 0, borderTop: `1px solid ${tk.border}`, padding: '20px 24px', background: tk.drawerFooter }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: tk.textFaint, letterSpacing: '0.06em' }}>
                ИТОГО {favorites.length} {favorites.length === 1 ? 'ТОВАР' : favorites.length < 5 ? 'ТОВАРА' : 'ТОВАРОВ'}
              </span>
              <span style={{ fontSize: 18, fontWeight: 600, color: tk.text, letterSpacing: '0.02em' }}>{formatPrice(totalPrice)}</span>
            </div>
            <button style={{ width: '100%', background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '14px 0', fontSize: 12, letterSpacing: '0.12em', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <ShoppingCart size={15} /> ДОБАВИТЬ ВСЁ В КОРЗИНУ
            </button>
          </div>
        )}
      </div>
    </>
  )
}

function FavDrawerItem({ product, onRemove }) {
  const [hover, setHover] = useState(false)
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  return (
    <div style={{ display: 'flex', gap: 14, padding: '14px 24px', borderBottom: `1px solid ${tk.borderLight}`, transition: 'background 0.15s', background: hover ? tk.surfaceHover : tk.drawerBg }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ flexShrink: 0, width: 80, height: 100, overflow: 'hidden', background: tk.cardBg }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: hover ? 'scale(1.06)' : 'scale(1)' }}
          onError={e => { e.target.src = 'https://placehold.co/80x100/f5f2ee/888?text=Фото' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: tk.textFaint, marginBottom: 3, letterSpacing: '0.03em' }}>
            {product.category}{product.articul ? ` · ${product.articul}` : ''}
          </div>
          <div style={{ fontSize: 13, color: tk.text, lineHeight: 1.4, marginBottom: 6 }}>{product.name}</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {(product.sizes || []).map(s => (
              <span key={s} style={{ fontSize: 10, border: `1px solid ${tk.tagBorder}`, padding: '1px 6px', color: tk.tagColor, letterSpacing: '0.04em' }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div>
            {product.oldPrice && (
              <div style={{ fontSize: 10, color: tk.textFaint, textDecoration: 'line-through', lineHeight: 1 }}>{formatPrice(product.oldPrice)}</div>
            )}
            <div style={{ fontSize: 14, fontWeight: 600, color: tk.text }}>{formatPrice(product.price)}</div>
          </div>
          <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.textFaint, display: 'flex', padding: 4, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = tk.heartActive}
            onMouseLeave={e => e.currentTarget.style.color = tk.textFaint}>
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

function Header({ activeNav, onNavClick, onSearchOpen, onFavDrawerOpen }) {
  const { favorites } = useContext(FavoritesContext)
  const { dark, toggleDark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 56, borderBottom: `1px solid ${tk.border}`, position: 'sticky', top: 0, background: tk.headerBg, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => onNavClick('ВСЯ КОЛЛЕКЦИЯ')}>
        <div style={{ border: `1.5px solid ${tk.text}`, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: tk.text }}>SF</div>
        <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '0.1em', color: tk.text }}>selfie</span>
      </div>
      <nav style={{ display: 'flex', gap: 20 }}>
        {NAV_ITEMS.map(item => (
          <button key={item} onClick={() => onNavClick(item)} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: 11,
            letterSpacing: '0.06em', fontFamily: 'inherit',
            color: activeNav === item ? tk.text : tk.textFaint,
            fontWeight: activeNav === item ? 600 : 400, padding: '0 2px',
            borderBottom: activeNav === item ? `1.5px solid ${tk.text}` : '1.5px solid transparent',
            transition: 'all 0.2s',
          }}>{item}</button>
        ))}
      </nav>
      <div style={{ display: 'flex', gap: 16, color: tk.icon, alignItems: 'center' }}>
        {/* Dark mode toggle */}
        <button onClick={toggleDark} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.icon, display: 'flex', padding: 0, transition: 'color 0.2s' }}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Home size={18} style={{ cursor: 'pointer' }} onClick={() => onNavClick('ВСЯ КОЛЛЕКЦИЯ')} />
        <Search size={18} style={{ cursor: 'pointer' }} onClick={onSearchOpen} />
        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex' }} onClick={onFavDrawerOpen}>
          <Heart size={18} color={favorites.length > 0 ? tk.heartActive : tk.icon} fill={favorites.length > 0 ? tk.heartActive : 'none'} style={{ transition: 'all 0.2s' }} />
          {favorites.length > 0 && (
            <span style={{ position: 'absolute', top: -6, right: -6, background: tk.heartActive, color: '#fff', fontSize: 9, width: 15, height: 15, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, lineHeight: 1 }}>{favorites.length}</span>
          )}
        </div>
        <ShoppingBag size={18} style={{ cursor: 'pointer' }} />
        <User size={18} style={{ cursor: 'pointer' }} />
      </div>
    </header>
  )
}

function ProductCard({ product, onAskAI }) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext)
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  const liked = isFavorite(product.id)

  return (
    <div onClick={() => navigate(`/products/${product.id}`)}
      style={{ position: 'relative', cursor: 'pointer', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ position: 'relative', overflow: 'hidden', background: tk.cardBg, aspectRatio: '3/4' }}>
        <img src={getProductImage(product)} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hover ? 'scale(1.04)' : 'scale(1)' }}
          onError={e => { e.target.src = 'https://placehold.co/400x500/f5f2ee/888?text=Фото' }} />
        {product.oldPrice && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: tk.saleBadge, color: '#fff', fontSize: 10, padding: '2px 6px', letterSpacing: '0.04em' }}>
            {product._isSaleItem ? '−15%' : 'SALE'}
          </div>
        )}
        <button onClick={e => { e.stopPropagation(); onAskAI(product) }}
          style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.78)', color: '#fff', border: 'none', padding: '6px 14px', fontSize: 11, letterSpacing: '0.08em', fontFamily: "'Cormorant Garamond', Georgia, serif", cursor: 'pointer', opacity: hover ? 1 : 0, transition: 'opacity 0.3s', borderRadius: 1 }}>
          ✦ Спросить ИИ
        </button>
        <button onClick={e => { e.stopPropagation(); toggleFavorite(product) }}
          style={{ position: 'absolute', top: 10, right: 10, background: liked ? (dark ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)') : (dark ? 'rgba(30,30,30,0.7)' : 'rgba(255,255,255,0.7)'), border: 'none', cursor: 'pointer', padding: 6, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', boxShadow: liked ? '0 2px 8px rgba(0,0,0,0.25)' : 'none' }}>
          <Heart size={15} fill={liked ? tk.heartActive : 'none'} color={liked ? tk.heartActive : (dark ? '#aaa' : '#888')} />
        </button>
      </div>
      <div style={{ padding: '10px 0 16px' }}>
        <div style={{ fontSize: 10, color: tk.textFaint, marginBottom: 3, letterSpacing: '0.03em' }}>{product.category}</div>
        <div style={{ fontSize: 11.5, color: tk.textMuted, marginBottom: 4, letterSpacing: '0.01em' }}>{product.name}</div>
        <div style={{ fontSize: 10, color: tk.textFaint, marginBottom: 4 }}>{product.articul}</div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
          {(product.sizes || []).slice(0, 4).map(s => (
            <span key={s} style={{ fontSize: 9, border: `1px solid ${tk.tagBorder}`, padding: '1px 5px', color: tk.tagColor, letterSpacing: '0.03em' }}>{s}</span>
          ))}
          {(product.sizes || []).length > 4 && <span style={{ fontSize: 9, color: tk.textFaint }}>+{product.sizes.length - 4}</span>}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
          {product.oldPrice && (
            <span style={{ fontSize: 11, color: tk.textFaint, textDecoration: 'line-through' }}>{formatPrice(product.oldPrice)}</span>
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: product.oldPrice ? tk.saleBadge : tk.text, letterSpacing: '0.01em' }}>{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  )
}

function ProductSkeleton() {
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <div style={{ background: tk.cardBg, aspectRatio: '3/4', animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ padding: '10px 0 16px' }}>
        <div style={{ height: 10, background: tk.cardBg, borderRadius: 2, marginBottom: 6, width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 12, background: tk.cardBg, borderRadius: 2, marginBottom: 6, width: '85%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 14, background: tk.cardBg, borderRadius: 2, width: '45%', animation: 'pulse 1.5s ease-in-out infinite' }} />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}

function AIModal({ product, onClose }) {
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const systemPrompt = `Ты стильный ИИ-помощник модного магазина Selfie. Помогаешь покупателям с вопросами о товарах, стиле, размерах и уходе за одеждой. Сейчас клиент смотрит на: "${product.name}", артикул ${product.articul || ''}, цена ${formatPrice(product.price)}, категория: ${product.category}, размеры: ${(product.sizes || []).join(', ')}. Отвечай кратко, по-русски, с тёплым профессиональным тоном.`

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages); setInput(''); setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: systemPrompt, messages: newMessages }),
      })
      const data = await res.json()
      const text = data.content?.map(b => b.text || '').join('') || 'Ошибка ответа'
      setMessages([...newMessages, { role: 'assistant', content: text }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Произошла ошибка. Попробуйте ещё раз.' }])
    }
    setLoading(false)
  }

  useEffect(() => {
    setMessages([{ role: 'assistant', content: `Привет! Я помогу вам с вопросами о товаре «${product.name}». Спрашивайте о размерах, составе ткани, уходе или как сочетать с другими вещами!` }])
  }, [product])

  return (
    <div style={{ position: 'fixed', inset: 0, background: tk.overlay, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: tk.drawerBg, width: 420, maxWidth: '95vw', borderRadius: 2, fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', flexDirection: 'column', maxHeight: '80vh', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${tk.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.05em', color: tk.text }}>✦ ИИ-консультант</div>
            <div style={{ fontSize: 11, color: tk.textFaint, marginTop: 2 }}>{product.name}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.textFaint, display: 'flex' }}><X size={18} /></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? tk.btnPrimary : tk.surface, color: m.role === 'user' ? tk.btnPrimaryText : tk.text, padding: '10px 14px', borderRadius: 2, maxWidth: '80%', fontSize: 13, lineHeight: 1.55 }}>
              {m.content}
            </div>
          ))}
          {loading && <div style={{ alignSelf: 'flex-start', color: tk.textFaint, fontSize: 13, fontStyle: 'italic' }}>Печатает...</div>}
        </div>
        <div style={{ padding: '12px 20px', borderTop: `1px solid ${tk.border}`, display: 'flex', gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Задайте вопрос..."
            style={{ flex: 1, border: `1px solid ${tk.border}`, padding: '8px 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none', borderRadius: 1, background: tk.inputBg, color: tk.text }} />
          <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '8px 16px', cursor: 'pointer', fontSize: 12, letterSpacing: '0.05em', opacity: loading || !input.trim() ? 0.5 : 1, fontFamily: 'inherit' }}>→</button>
        </div>
      </div>
    </div>
  )
}

function SearchOverlay({ products, onClose }) {
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.articul || '').toLowerCase().includes(q))
  }, [query, products])

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const allCategories = [...new Set(products.map(p => p.category))].slice(0, 6)

  return (
    <div style={{ position: 'fixed', inset: 0, background: dark ? 'rgba(10,10,10,0.97)' : 'rgba(255,255,255,0.97)', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 40px', borderBottom: `1px solid ${tk.border}`, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Search size={20} color={tk.textFaint} />
        <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Поиск товаров..."
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: 20, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.02em', color: tk.text, background: 'transparent' }} />
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.textFaint, display: 'flex' }}><X size={22} /></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 40px', background: dark ? '#0a0a0a' : 'transparent' }}>
        {query && results.length === 0 && <div style={{ color: tk.textFaint, fontSize: 14, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Ничего не найдено по запросу «{query}»</div>}
        {results.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px 16px', maxWidth: 1200 }}>
            {results.map(p => (
              <div key={p.id} onClick={onClose} style={{ cursor: 'pointer' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', background: tk.cardBg }} onError={e => { e.target.src = 'https://placehold.co/400x500/f5f2ee/888?text=Фото' }} />
                <div style={{ padding: '8px 0', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  <div style={{ fontSize: 10, color: tk.textFaint, marginBottom: 2 }}>{p.category}</div>
                  <div style={{ fontSize: 11.5, color: tk.textMuted }}>{p.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: tk.text, marginTop: 2 }}>{formatPrice(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!query && (
          <div>
            <div style={{ fontSize: 12, color: tk.textFaint, letterSpacing: '0.06em', marginBottom: 16, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>ПОПУЛЯРНЫЕ КАТЕГОРИИ</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {allCategories.map(c => (
                <button key={c} onClick={() => setQuery(c)} style={{ border: `1px solid ${tk.border}`, background: 'none', padding: '8px 20px', fontSize: 12, letterSpacing: '0.05em', cursor: 'pointer', fontFamily: "'Cormorant Garamond', Georgia, serif", color: tk.textMuted }}>{c}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Footer() {
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  function handleSubscribe() {
    if (email.trim()) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 3000) }
  }
  return (
    <footer style={{ borderTop: `1px solid ${tk.footerBorder}`, padding: '48px 40px 0', fontFamily: "'Cormorant Garamond', Georgia, serif", marginTop: 48, background: tk.bg }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 180px 300px', gap: 28, paddingBottom: 40, borderBottom: `1px solid ${tk.border}` }}>
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: tk.text, marginBottom: 16 }}>{title}</div>
            {links.map(link => (
              <div key={link} style={{ fontSize: 12, color: tk.textMuted, marginBottom: 10, cursor: 'pointer', lineHeight: 1.4, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = tk.text} onMouseLeave={e => e.target.style.color = tk.textMuted}>{link}</div>
            ))}
          </div>
        ))}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: tk.text, marginBottom: 16 }}>СПОСОБЫ ОПЛАТЫ</div>
          {['Uzum', 'Click', 'Payme'].map(p => (
            <div key={p} style={{ border: `1px solid ${tk.tagBorder}`, borderRadius: 3, padding: '5px 12px', fontSize: 12, color: tk.textMuted, background: tk.surface, display: 'inline-block', marginBottom: 8 }}>{p}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: tk.text, marginBottom: 10 }}>БУДЬ ВСЕГДА В КУРСЕ</div>
          <div style={{ fontSize: 12, color: tk.textMuted, lineHeight: 1.7, marginBottom: 14 }}>Подписывайся, оставляй свой номер телефона и всегда будешь в курсе последних новостей компании.</div>
          {subscribed ? (
            <div style={{ background: tk.surface, padding: '10px 14px', fontSize: 12, color: tk.textMuted }}>✓ Вы успешно подписались!</div>
          ) : (
            <div style={{ display: 'flex' }}>
              <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubscribe()} placeholder="Телефон или email"
                style={{ flex: 1, border: `1px solid ${tk.border}`, borderRight: 'none', padding: '8px 12px', fontSize: 11, fontFamily: 'inherit', outline: 'none', background: tk.inputBg, color: tk.text }} />
              <button onClick={handleSubscribe} style={{ background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '8px 16px', fontSize: 11, cursor: 'pointer', letterSpacing: '0.04em', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Подписаться</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: 11, color: tk.textFaint }}>© 2026 Selfie. Все права защищены.</div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {[Facebook, Instagram, Send, Youtube].map((Icon, i) => (
            <Icon key={i} size={17} style={{ cursor: 'pointer', color: tk.icon, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = tk.text}
              onMouseLeave={e => e.currentTarget.style.color = tk.icon} />
          ))}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: tk.text, letterSpacing: '0.02em' }}>+998 (55) 508 00 60</div>
      </div>
    </footer>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
const AllProducts = () => {
  const navigate = useNavigate()
  const [dark, setDark] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 15 random sale products (computed once when raw products arrive)
  const [saleProducts, setSaleProducts] = useState([])

  const [activeNav, setActiveNav] = useState('ВСЯ КОЛЛЕКЦИЯ')
  const [aiProduct, setAiProduct] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [favDrawerOpen, setFavDrawerOpen] = useState(false)

  const [filterCategory, setFilterCategory] = useState('Все')
  const [filterSize, setFilterSize] = useState('')
  const [filterPriceMax, setFilterPriceMax] = useState('')
  const [sortBy, setSortBy] = useState('Сортировка')
  const [searchQuery, setSearchQuery] = useState('')

  const tk = dark ? T.dark : T.light

  useEffect(() => {
    setLoading(true); setError(null)
    fetch(API_URL)
      .then(res => { if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`); return res.json() })
      .then(data => {
        setProducts(data)
        setSaleProducts(pickSaleProducts(data))
        setLoading(false)
      })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const categories = useMemo(() => ['Все', ...new Set(products.map(p => p.category))], [products])

  function handleNavClick(item) {
    if (NAV_ROUTES[item]) { navigate(NAV_ROUTES[item]); return }
    setActiveNav(item); setFilterCategory('Все')
  }

  function resetFilters() {
    setFilterCategory('Все'); setFilterSize(''); setFilterPriceMax('')
    setSortBy('Сортировка'); setSearchQuery(''); setActiveNav('ВСЯ КОЛЛЕКЦИЯ')
  }

  // When SALE nav is active, show the 15 discounted products instead of regular list
  const filteredProducts = useMemo(() => {
    let list = activeNav === 'SALE' ? [...saleProducts] : [...products]

    if (activeNav !== 'SALE') {
      // Don't double-filter on SALE tab
      if (filterCategory !== 'Все') list = list.filter(p => p.category === filterCategory)
    }
    if (filterSize) list = list.filter(p => (p.sizes || []).some(s => s.toUpperCase() === filterSize.toUpperCase()))
    if (filterPriceMax && !isNaN(Number(filterPriceMax))) list = list.filter(p => p.price <= Number(filterPriceMax))
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.articul || '').toLowerCase().includes(q))
    }
    if (sortBy === 'По цене (возр.)') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'По цене (убыв.)') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'Новинки') list.sort((a, b) => Number(b.id) - Number(a.id))
    return list
  }, [products, saleProducts, activeNav, filterCategory, filterSize, filterPriceMax, sortBy, searchQuery])

  const hasActiveFilters = filterCategory !== 'Все' || filterSize || filterPriceMax || searchQuery
  const selectStyle = getSelectStyle(tk)

  return (
    <ThemeContext.Provider value={{ dark, toggleDark: () => setDark(d => !d) }}>
      <FavoritesProvider>
        <div style={{ minHeight: '100vh', background: tk.bg, fontFamily: "'Cormorant Garamond', Georgia, serif", transition: 'background 0.3s, color 0.3s' }}>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />

          {searchOpen && <SearchOverlay products={products} onClose={() => setSearchOpen(false)} />}
          {aiProduct && <AIModal product={aiProduct} onClose={() => setAiProduct(null)} />}
          <FavoritesDrawer open={favDrawerOpen} onClose={() => setFavDrawerOpen(false)} />

          <Header activeNav={activeNav} onNavClick={handleNavClick} onSearchOpen={() => setSearchOpen(true)} onFavDrawerOpen={() => setFavDrawerOpen(true)} />

          <div style={{ padding: '10px 24px', fontSize: 11, color: tk.textFaint, letterSpacing: '0.04em' }}>
            ГЛАВНАЯ СТРАНИЦА / {activeNav}
          </div>

          <div style={{ textAlign: 'center', padding: '8px 0 20px', fontSize: 22, letterSpacing: '0.08em', color: tk.text, fontWeight: 500 }}>
            {activeNav === 'ВСЯ КОЛЛЕКЦИЯ' ? 'Вся коллекция' : activeNav.charAt(0) + activeNav.slice(1).toLowerCase()}
            {activeNav === 'SALE' && (
              <div style={{ fontSize: 12, color: tk.saleBadge, letterSpacing: '0.1em', marginTop: 6 }}>−15% НА 15 ТОВАРОВ</div>
            )}
          </div>

          <div style={{ padding: '0 24px 12px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: tk.textFaint }} />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Поиск по названию, категории или артикулу..."
                style={{ width: '100%', boxSizing: 'border-box', border: `1px solid ${tk.border}`, padding: '8px 32px 8px 32px', fontSize: 12, fontFamily: 'inherit', outline: 'none', color: tk.textMuted, background: tk.inputBg }} />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: tk.textFaint, display: 'flex' }}><X size={14} /></button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px 14px', borderBottom: `1px solid ${tk.border}`, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {activeNav !== 'SALE' && (
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={selectStyle}>
                  {categories.map(c => <option key={c} value={c}>{c === 'Все' ? 'Категория' : c}</option>)}
                </select>
              )}
              <select value={filterSize} onChange={e => setFilterSize(e.target.value)} style={selectStyle}>
                <option value="">Размер</option>
                {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input value={filterPriceMax} onChange={e => setFilterPriceMax(e.target.value)} placeholder="Цена до (сум)" type="number"
                style={{ border: `1px solid ${tk.border}`, padding: '6px 10px', fontSize: 11, fontFamily: 'inherit', outline: 'none', color: tk.selectColor, width: 130, background: tk.inputBg }} />
              {filterSize && (
                <span style={{ background: tk.saleChip, fontSize: 11, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4, color: tk.textMuted }}>
                  {filterSize} <X size={10} style={{ cursor: 'pointer' }} onClick={() => setFilterSize('')} />
                </span>
              )}
              {filterPriceMax && (
                <span style={{ background: tk.saleChip, fontSize: 11, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4, color: tk.textMuted }}>
                  до {Number(filterPriceMax).toLocaleString('ru-RU')} сум
                  <X size={10} style={{ cursor: 'pointer' }} onClick={() => setFilterPriceMax('')} />
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {hasActiveFilters && (
                <button onClick={resetFilters} style={{ background: 'none', border: 'none', fontSize: 11, letterSpacing: '0.04em', cursor: 'pointer', color: tk.saleBadge, fontFamily: 'inherit', textDecoration: 'underline' }}>
                  Сбросить всё
                </button>
              )}
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
                {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div style={{ padding: '10px 24px 0', fontSize: 11, color: tk.textFaint, maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            {loading ? (
              <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Загружаем товары...</>
            ) : error ? (
              <span style={{ color: tk.saleBadge }}>Ошибка загрузки: {error}</span>
            ) : (
              filteredProducts.length === 0 ? 'Товары не найдены' : `Найдено: ${filteredProducts.length} ${filteredProducts.length === 1 ? 'товар' : filteredProducts.length < 5 ? 'товара' : 'товаров'}`
            )}
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>

          <main style={{ padding: '16px 24px 48px', maxWidth: 1200, margin: '0 auto' }}>
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px 16px' }}>
                {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: tk.textFaint }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
                <div style={{ fontSize: 16, marginBottom: 20 }}>Не удалось загрузить товары.</div>
                <button onClick={() => window.location.reload()} style={{ background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '10px 28px', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', letterSpacing: '0.06em' }}>ПОВТОРИТЬ</button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: tk.textFaint }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🕵️</div>
                <div style={{ fontSize: 16, marginBottom: 20 }}>Ничего не найдено. Попробуйте изменить фильтры.</div>
                <button onClick={resetFilters} style={{ background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '10px 28px', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', letterSpacing: '0.06em' }}>СБРОСИТЬ ФИЛЬТРЫ</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px 16px' }}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAskAI={setAiProduct} />
                ))}
              </div>
            )}
          </main>

          <Footer />
        </div>
      </FavoritesProvider>
    </ThemeContext.Provider>
  )
}

export default AllProducts