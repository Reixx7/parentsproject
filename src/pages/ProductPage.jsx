import React, { useState, useContext, useEffect, createContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Heart, ShoppingBag, ChevronLeft, ChevronRight, X,
  Truck, RotateCcw, Shield, Ruler, Share2, ZoomIn,
  ChevronDown, ChevronUp, Star, ArrowLeft, Loader2,
  Moon, Sun, Facebook, Instagram, Send, Youtube
} from 'lucide-react'

// ─── Theme ────────────────────────────────────────────────────────────────────
export const ThemeContext = createContext({ dark: false, toggleDark: () => {} })

const T = {
  light: {
    bg: '#fff', surface: '#faf8f5', surfaceAlt: '#f5f2ee',
    border: '#eee', borderMid: '#e8e3de',
    text: '#111', textMuted: '#555', textFaint: '#aaa',
    inputBg: '#fff', cardBg: '#f5f2ee',
    btnPrimary: '#222', btnPrimaryText: '#fff',
    btnHover: '#111',
    icon: '#555', iconHover: '#222',
    tag: '#e8e3de', tagText: '#999',
    saleBadge: '#c0392b', heartActive: '#c0392b',
    reviewBorder: '#e8e3de', reviewBg: '#faf8f5',
    verified: '#7daa82', star: '#e0b96e',
    toastBg: '#222', toastText: '#fff',
    overlayBg: 'rgba(0,0,0,0.45)',
    headerBg: '#fff',
  },
  dark: {
    bg: '#0f0f0f', surface: '#1a1a1a', surfaceAlt: '#1c1c1c',
    border: '#252525', borderMid: '#2a2a2a',
    text: '#f0ede8', textMuted: '#b0a898', textFaint: '#666',
    inputBg: '#161616', cardBg: '#1c1c1c',
    btnPrimary: '#f0ede8', btnPrimaryText: '#111',
    btnHover: '#ddd',
    icon: '#b0a898', iconHover: '#f0ede8',
    tag: '#2a2a2a', tagText: '#888',
    saleBadge: '#c0392b', heartActive: '#e05c5c',
    reviewBorder: '#2a2a2a', reviewBg: '#1a1a1a',
    verified: '#7daa82', star: '#e0b96e',
    toastBg: '#f0ede8', toastText: '#111',
    overlayBg: 'rgba(0,0,0,0.7)',
    headerBg: '#0f0f0f',
  },
}

// ─── Constants ────────────────────────────────────────────────────────────────
const API_URL = 'https://69989a63d66520f95f18019f.mockapi.io/products/products'

const FAKE_REVIEWS = [
  { name: 'Анастасия К.', rating: 5, date: '15 февраля 2026', text: 'Отличное качество ткани, сидит идеально. Заказала размер S — подошёл отлично.', verified: true },
  { name: 'Малика Р.',    rating: 5, date: '3 февраля 2026',  text: 'Уже второй раз покупаю в Selfie. Всегда высокое качество и быстрая доставка.', verified: true },
  { name: 'Диана Т.',     rating: 4, date: '28 января 2026',  text: 'Красивая вещь, полностью соответствует фото. Немного долго ждала доставку.', verified: false },
]

const FOOTER_LINKS = {
  'КАТАЛОГ':            ['Новинки', 'Вся коллекция', 'Одежда', 'Обувь', 'Аксессуары', 'Sale'],
  'ПОМОЩЬ ПОКУПАТЕЛЮ': ['Оплата', 'Возврат', 'Доставка', 'Наши магазины'],
  'О КОМПАНИИ':         ['Контакты', 'О бренде', 'Карьера в Selfie', 'Публичная оферта'],
}

// ─── Utils ────────────────────────────────────────────────────────────────────
const formatPrice = p => p.toLocaleString('ru-RU') + ' сум'

function getProductImages(p) {
  if (!p) return []
  if (p.images?.length) return p.images
  return [p.image, p.image2, p.image3].filter(Boolean)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light

  return (
    <div style={{ borderBottom: `1px solid ${tk.border}` }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 0', fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 12, letterSpacing: '0.08em', color: tk.text, fontWeight: 600,
      }}>
        {title}
        {open ? <ChevronUp size={14} color={tk.textFaint} /> : <ChevronDown size={14} color={tk.textFaint} />}
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ paddingBottom: 16, fontSize: 13, color: tk.textMuted, lineHeight: 1.75, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function Lightbox({ images, activeIndex, onClose }) {
  const [idx, setIdx] = useState(activeIndex)
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  useEffect(() => {
    const h = e => ({ Escape: onClose, ArrowRight: next, ArrowLeft: prev }[e.key]?.())
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [images.length])

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}><X size={24} /></button>
      <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}><ChevronLeft size={32} /></button>
      <img src={images[idx]} alt="" onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh', maxWidth: '80vw', objectFit: 'contain' }}
        onError={e => { e.target.src = 'https://placehold.co/800x1000/222/888?text=Фото' }} />
      <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}><ChevronRight size={32} /></button>
      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {images.map((_, i) => (
          <span key={i} onClick={e => { e.stopPropagation(); setIdx(i) }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'inline-block' }} />
        ))}
      </div>
    </div>
  )
}

function SizeGuideModal({ onClose }) {
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  const rows = [['XS','80–84','60–64','86–90'],['S','84–88','64–68','90–94'],['M','88–92','68–72','94–98'],['L','92–96','72–76','98–102'],['XL','96–100','76–80','102–106']]

  return (
    <div style={{ position: 'fixed', inset: 0, background: tk.overlayBg, zIndex: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: tk.bg, width: 480, maxWidth: '95vw', maxHeight: '85vh', overflowY: 'auto', fontFamily: "'Cormorant Garamond', Georgia, serif", padding: '28px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.06em', color: tk.text }}>ТАБЛИЦА РАЗМЕРОВ</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.textFaint }}><X size={18} /></button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${tk.text}` }}>
              {['Размер', 'Грудь (см)', 'Талия (см)', 'Бёдра (см)'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 0', letterSpacing: '0.04em', fontSize: 11, color: tk.textFaint }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row[0]} style={{ borderBottom: `1px solid ${tk.border}` }}>
                {row.map((cell, i) => (
                  <td key={i} style={{ padding: '10px 0', color: i === 0 ? tk.text : tk.textMuted, fontWeight: i === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: 16, fontSize: 12, color: tk.textFaint, lineHeight: 1.6 }}>
          Если вы находитесь между размерами, рекомендуем выбрать больший.
        </p>
      </div>
    </div>
  )
}

function Stars({ rating, size = 11 }) {
  const { dark } = useContext(ThemeContext)
  const tk = dark ? T.dark : T.light
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(s => <Star key={s} size={size} fill={s <= rating ? tk.star : 'none'} color={tk.star} />)}
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
    <footer style={{ borderTop: `1px solid ${tk.borderMid}`, padding: '48px 40px 0', fontFamily: "'Cormorant Garamond', Georgia, serif", marginTop: 48, background: tk.bg }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 180px 300px', gap: 28, paddingBottom: 40, borderBottom: `1px solid ${tk.border}` }}>
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: tk.text, marginBottom: 16 }}>{title}</div>
            {links.map(link => (
              <div key={link} style={{ fontSize: 12, color: tk.textMuted, marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = tk.text}
                onMouseLeave={e => e.target.style.color = tk.textMuted}>{link}</div>
            ))}
          </div>
        ))}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: tk.text, marginBottom: 16 }}>ОПЛАТА</div>
          {['Uzum', 'Click', 'Payme'].map(p => (
            <div key={p} style={{ border: `1px solid ${tk.borderMid}`, borderRadius: 3, padding: '5px 12px', fontSize: 12, color: tk.textMuted, background: tk.surface, display: 'inline-block', marginBottom: 8, marginRight: 4 }}>{p}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: tk.text, marginBottom: 10 }}>ПОДПИСКА</div>
          <div style={{ fontSize: 12, color: tk.textMuted, lineHeight: 1.7, marginBottom: 14 }}>Оставляй номер и всегда будь в курсе последних новостей.</div>
          {subscribed ? (
            <div style={{ background: tk.surface, padding: '10px 14px', fontSize: 12, color: tk.textMuted }}>✓ Вы успешно подписались!</div>
          ) : (
            <div style={{ display: 'flex' }}>
              <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubscribe()} placeholder="Телефон или email"
                style={{ flex: 1, border: `1px solid ${tk.border}`, borderRight: 'none', padding: '8px 12px', fontSize: 11, fontFamily: 'inherit', outline: 'none', background: tk.inputBg, color: tk.text }} />
              <button onClick={handleSubscribe} style={{ background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '8px 16px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>OK</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: 11, color: tk.textFaint }}>© 2026 Selfie. Все права защищены.</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[Facebook, Instagram, Send, Youtube].map((Icon, i) => (
            <Icon key={i} size={17} style={{ cursor: 'pointer', color: tk.icon, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = tk.text}
              onMouseLeave={e => e.currentTarget.style.color = tk.icon} />
          ))}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: tk.text }}>+998 (55) 508 00 60</div>
      </div>
    </footer>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const { id: productId } = useParams()
  const navigate = useNavigate()

  // Theme
  const [dark, setDark] = useState(false)
  const tk = dark ? T.dark : T.light

  // Data
  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  // UI state
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    setFetchLoading(true)
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error(`Ошибка сети: ${r.status}`); return r.json() })
      .then(data => {
        setAllProducts(data)
        setProduct(data.find(p => String(p.id) === String(productId)) || data[0])
        setFetchLoading(false)
      })
      .catch(err => { setFetchError(err.message); setFetchLoading(false) })
  }, [productId])

  useEffect(() => { setActiveImg(0) }, [product])

  const images = product ? getProductImages(product) : []
  const discount = product?.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null
  const related = product ? allProducts.filter(p => p.category === product.category && String(p.id) !== String(productId)).slice(0, 4) : []

  function handleAddToCart() {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2200)
  }

  // ── Loading / Error states ──
  if (fetchLoading) return (
    <div style={{ minHeight: '100vh', background: tk.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', Georgia, serif", color: tk.textFaint, gap: 12 }}>
      <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
      <span style={{ fontSize: 14, letterSpacing: '0.06em' }}>Загружаем товар...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (fetchError || !product) return (
    <div style={{ minHeight: '100vh', background: tk.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', Georgia, serif", color: tk.textFaint, gap: 16 }}>
      <div style={{ fontSize: 36 }}>⚠️</div>
      <div style={{ fontSize: 14 }}>{fetchError || 'Товар не найден'}</div>
      <button onClick={() => navigate('/products')} style={{ background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none', padding: '10px 28px', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', letterSpacing: '0.06em' }}>← НАЗАД</button>
    </div>
  )

  return (
    <ThemeContext.Provider value={{ dark, toggleDark: () => setDark(d => !d) }}>
      <div style={{ minHeight: '100vh', background: tk.bg, fontFamily: "'Cormorant Garamond', Georgia, serif", transition: 'background 0.3s', color: tk.text }}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          @keyframes fadeInUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
          @keyframes cartPop  { 0%{transform:scale(1)} 40%{transform:scale(1.06)} 100%{transform:scale(1)} }
          @keyframes spin     { to { transform:rotate(360deg) } }
          .prod-thumb:hover { opacity:1 !important }
          .related-card:hover img { transform:scale(1.05) !important }
        `}</style>

        {lightboxOpen && images.length > 0 && <Lightbox images={images} activeIndex={activeImg} onClose={() => setLightboxOpen(false)} />}
        {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}

        {/* Toast */}
        {addedToCart && (
          <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', background: tk.toastBg, color: tk.toastText, padding: '12px 28px', fontSize: 12, letterSpacing: '0.08em', zIndex: 9999, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.2)', animation: 'fadeInUp 0.25s ease', whiteSpace: 'nowrap' }}>
            <ShoppingBag size={14} /> Добавлено в корзину
          </div>
        )}

        {/* Top bar */}
        <div style={{ padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${tk.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => navigate('/products')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, letterSpacing: '0.06em', color: tk.textFaint, fontFamily: 'inherit', padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = tk.text}
              onMouseLeave={e => e.currentTarget.style.color = tk.textFaint}>
              <ArrowLeft size={13} /> НАЗАД
            </button>
            <span style={{ color: tk.border }}>|</span>
            <span style={{ fontSize: 11, color: tk.textFaint, letterSpacing: '0.04em' }}>
              ГЛАВНАЯ / {(product.category || '').toUpperCase()} / {product.name.toUpperCase()}
            </span>
          </div>
          {/* Dark mode toggle */}
          <button onClick={() => setDark(d => !d)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.icon, display: 'flex', padding: 0, transition: 'color 0.2s' }}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', maxWidth: 1280, margin: '0 auto' }}>

          {/* Left — Images */}
          <div style={{ display: 'flex', gap: 0, padding: '32px 32px 32px 40px' }}>
            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginRight: 16, flexShrink: 0 }}>
              {images.map((img, i) => (
                <div key={i} className="prod-thumb" onClick={() => setActiveImg(i)} style={{
                  width: 72, height: 90, overflow: 'hidden', cursor: 'pointer', background: tk.cardBg,
                  border: activeImg === i ? `1.5px solid ${tk.text}` : '1.5px solid transparent',
                  opacity: activeImg === i ? 1 : 0.55, transition: 'all 0.2s',
                }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.src = 'https://placehold.co/72x90/f5f2ee/888?text=Фото' }} />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div style={{ flex: 1, position: 'relative', background: tk.cardBg, overflow: 'hidden' }}>
              {images.length > 0 && (
                <img src={images[activeImg]} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: 680, display: 'block' }}
                  onError={e => { e.target.src = 'https://placehold.co/700x900/f5f2ee/888?text=Фото' }} />
              )}
              {discount && (
                <div style={{ position: 'absolute', top: 16, left: 16, background: tk.saleBadge, color: '#fff', fontSize: 11, padding: '3px 8px', letterSpacing: '0.06em', fontWeight: 600 }}>
                  −{discount}%
                </div>
              )}
              <button onClick={() => setLightboxOpen(true)} style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                <ZoomIn size={15} color="#555" />
              </button>
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                    style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={14} />
                  </button>
                  <button onClick={() => setActiveImg(i => (i + 1) % images.length)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right — Details */}
          <div style={{ padding: '32px 40px 32px 0', display: 'flex', flexDirection: 'column', position: 'sticky', top: 56, alignSelf: 'start' }}>
            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.1em', color: tk.tagText, border: `1px solid ${tk.tag}`, padding: '3px 10px' }}>
                {(product.category || '').toUpperCase()}
              </span>
              {product.articul && (
                <span style={{ fontSize: 10, letterSpacing: '0.1em', color: tk.textFaint, border: `1px solid ${tk.border}`, padding: '3px 10px' }}>
                  {product.articul}
                </span>
              )}
            </div>

            <h1 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 500, letterSpacing: '0.03em', lineHeight: 1.3, color: tk.text }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <Stars rating={4} />
              <span style={{ fontSize: 11, color: tk.textFaint }}>{FAKE_REVIEWS.length} отзыва</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
              {product.oldPrice && (
                <span style={{ fontSize: 16, color: tk.textFaint, textDecoration: 'line-through' }}>{formatPrice(product.oldPrice)}</span>
              )}
              <span style={{ fontSize: 26, fontWeight: 600, color: product.oldPrice ? tk.saleBadge : tk.text, letterSpacing: '0.02em' }}>
                {formatPrice(product.price)}
              </span>
            </div>

            <div style={{ borderTop: `1px solid ${tk.border}`, marginBottom: 20 }} />

            {/* Size picker */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 11, letterSpacing: '0.08em', color: tk.textMuted, fontWeight: 600 }}>РАЗМЕР</span>
                <button onClick={() => setSizeGuideOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: tk.textFaint, fontFamily: 'inherit', letterSpacing: '0.04em', textDecoration: 'underline', padding: 0 }}>
                  <Ruler size={11} /> Таблица размеров
                </button>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(product.sizes || []).map(s => (
                  <button key={s} onClick={() => { setSelectedSize(s); setSizeError(false) }} style={{
                    border: selectedSize === s ? `1.5px solid ${tk.text}` : sizeError ? '1.5px solid #c0392b' : `1px solid ${tk.borderMid}`,
                    background: selectedSize === s ? tk.btnPrimary : tk.inputBg,
                    color: selectedSize === s ? tk.btnPrimaryText : sizeError ? '#c0392b' : tk.textMuted,
                    padding: '8px 14px', fontSize: 12, cursor: 'pointer',
                    fontFamily: 'inherit', letterSpacing: '0.04em', transition: 'all 0.15s', minWidth: 44, textAlign: 'center',
                  }}>{s}</button>
                ))}
              </div>
              {sizeError && <div style={{ fontSize: 11, color: '#c0392b', marginTop: 7, letterSpacing: '0.04em' }}>Пожалуйста, выберите размер</div>}
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.08em', color: tk.textMuted, marginBottom: 10, fontWeight: 600 }}>КОЛИЧЕСТВО</div>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${tk.borderMid}`, width: 'fit-content' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tk.textMuted }}>
                  <ChevronLeft size={14} />
                </button>
                <span style={{ fontSize: 14, color: tk.text, minWidth: 32, textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tk.textMuted }}>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <button onClick={handleAddToCart} style={{
                flex: 1, background: tk.btnPrimary, color: tk.btnPrimaryText, border: 'none',
                padding: '14px 0', fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                animation: addedToCart ? 'cartPop 0.35s ease' : 'none', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = tk.btnHover}
                onMouseLeave={e => e.currentTarget.style.background = tk.btnPrimary}>
                <ShoppingBag size={15} />
                {addedToCart ? 'ДОБАВЛЕНО ✓' : 'В КОРЗИНУ'}
              </button>
              <button onClick={() => setLiked(l => !l)} style={{
                width: 50, background: liked ? (dark ? '#2a1515' : '#fff5f5') : tk.inputBg,
                border: liked ? `1px solid ${dark ? '#5a2020' : '#f5c6c6'}` : `1px solid ${tk.borderMid}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
              }}>
                <Heart size={17} fill={liked ? tk.heartActive : 'none'} color={liked ? tk.heartActive : tk.icon} />
              </button>
            </div>

            <button style={{ background: 'none', border: `1px solid ${tk.borderMid}`, cursor: 'pointer', padding: '10px 0', fontSize: 11, letterSpacing: '0.08em', color: tk.textFaint, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 22, transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = tk.text}
              onMouseLeave={e => e.currentTarget.style.borderColor = tk.borderMid}>
              <Share2 size={13} /> ПОДЕЛИТЬСЯ
            </button>

            {/* Service badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 22 }}>
              {[
                { icon: <Truck size={16} />, label: 'Доставка от 1–3 дней' },
                { icon: <RotateCcw size={16} />, label: 'Возврат 14 дней' },
                { icon: <Shield size={16} />, label: 'Гарантия качества' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', background: tk.surface, fontSize: 10, color: tk.textFaint, textAlign: 'center', lineHeight: 1.5, letterSpacing: '0.03em' }}>
                  <span style={{ color: tk.textMuted }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            {/* Accordions */}
            <Accordion title="ОПИСАНИЕ" defaultOpen>
              Элегантная модель из высококачественных материалов. Идеально подходит для повседневного использования и особых случаев. Лаконичный крой, удобная посадка, продуманные детали — всё это делает вещь универсальной.
            </Accordion>
            <Accordion title="СОСТАВ И УХОД">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
                {[['Состав','95% хлопок, 5% эластан'],['Страна','Узбекистан'],['Артикул', product.articul || '—']].map(([k, v]) => (
                  <React.Fragment key={k}>
                    <span style={{ color: tk.textFaint }}>{k}</span>
                    <span style={{ color: tk.textMuted }}>{v}</span>
                  </React.Fragment>
                ))}
              </div>
              <div style={{ marginTop: 14, color: tk.textFaint, fontSize: 12 }}>
                Ручная стирка при 30°C · Не отбеливать · Глажка при низкой температуре
              </div>
            </Accordion>
            <Accordion title="ДОСТАВКА И ВОЗВРАТ">
              Бесплатная доставка по Ташкенту при заказе от 500 000 сум. Доставка в регионы — 1–5 рабочих дней. Возврат товара надлежащего качества в течение 14 дней.
            </Accordion>
          </div>
        </div>

        {/* Reviews */}
        <section style={{ padding: '40px', borderTop: `1px solid ${tk.border}`, maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: 18, letterSpacing: '0.06em', fontWeight: 500, color: tk.text }}>ОТЗЫВЫ</h2>
            <button style={{ background: 'none', border: `1px solid ${tk.text}`, padding: '8px 20px', fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit', color: tk.text }}>ОСТАВИТЬ ОТЗЫВ</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {FAKE_REVIEWS.map((r, i) => (
              <div key={i} style={{ padding: '20px 24px', background: tk.reviewBg, borderLeft: `3px solid ${tk.reviewBorder}` }}>
                <div style={{ marginBottom: 8 }}><Stars rating={r.rating} /></div>
                <p style={{ margin: '0 0 12px', fontSize: 13, color: tk.textMuted, lineHeight: 1.7 }}>{r.text}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: tk.text }}>{r.name}</span>
                  <span style={{ fontSize: 10, color: tk.textFaint }}>{r.date}</span>
                </div>
                {r.verified && <div style={{ fontSize: 10, color: tk.verified, marginTop: 4, letterSpacing: '0.04em' }}>✓ Подтверждённая покупка</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section style={{ padding: '40px 40px 60px', borderTop: `1px solid ${tk.border}`, maxWidth: 1280, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 24px', fontSize: 18, letterSpacing: '0.06em', fontWeight: 500, color: tk.text }}>С ЭТИМ ТАКЖЕ СМОТРЯТ</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px 16px' }}>
              {related.map(p => {
                const img = getProductImages(p)[0] || 'https://placehold.co/400x500/f5f2ee/888?text=Фото'
                return (
                  <div key={p.id} className="related-card" onClick={() => navigate(`/products/${p.id}`)} style={{ cursor: 'pointer' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', background: tk.cardBg, aspectRatio: '3/4' }}>
                      <img src={img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onError={e => { e.target.src = 'https://placehold.co/400x500/f5f2ee/888?text=Фото' }} />
                      {p.oldPrice && <div style={{ position: 'absolute', top: 10, left: 10, background: tk.saleBadge, color: '#fff', fontSize: 10, padding: '2px 6px' }}>SALE</div>}
                    </div>
                    <div style={{ padding: '10px 0 16px' }}>
                      <div style={{ fontSize: 10, color: tk.textFaint, marginBottom: 3 }}>{p.category}</div>
                      <div style={{ fontSize: 11.5, color: tk.textMuted, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                        {p.oldPrice && <span style={{ fontSize: 11, color: tk.textFaint, textDecoration: 'line-through' }}>{formatPrice(p.oldPrice)}</span>}
                        <span style={{ fontSize: 13, fontWeight: 600, color: tk.text }}>{formatPrice(p.price)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}