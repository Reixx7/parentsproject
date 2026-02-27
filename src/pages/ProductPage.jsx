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

// ─── Language context ─────────────────────────────────────────────────────────
export const LangContext = createContext({ lang: 'ru', toggleLang: () => {} })

const themeVars = {
  light: {
    '--bg':            '#ffffff',
    '--surface':       '#faf8f5',
    '--border':        '#eeeeee',
    '--border-mid':    '#e8e3de',
    '--text':          '#111111',
    '--text-muted':    '#555555',
    '--text-faint':    '#aaaaaa',
    '--input-bg':      '#ffffff',
    '--card-bg':       '#f5f2ee',
    '--btn':           '#222222',
    '--btn-text':      '#ffffff',
    '--btn-hover':     '#111111',
    '--icon':          '#555555',
    '--tag':           '#e8e3de',
    '--tag-text':      '#999999',
    '--sale':          '#c0392b',
    '--heart':         '#c0392b',
    '--review-bg':     '#faf8f5',
    '--review-border': '#e8e3de',
    '--verified':      '#7daa82',
    '--star':          '#e0b96e',
    '--toast-bg':      '#222222',
    '--toast-text':    '#ffffff',
    '--overlay':       'rgba(0,0,0,0.45)',
  },
  dark: {
    '--bg':            '#0f0f0f',
    '--surface':       '#1a1a1a',
    '--border':        '#252525',
    '--border-mid':    '#2a2a2a',
    '--text':          '#f0ede8',
    '--text-muted':    '#b0a898',
    '--text-faint':    '#666666',
    '--input-bg':      '#161616',
    '--card-bg':       '#1c1c1c',
    '--btn':           '#f0ede8',
    '--btn-text':      '#111111',
    '--btn-hover':     '#dddddd',
    '--icon':          '#b0a898',
    '--tag':           '#2a2a2a',
    '--tag-text':      '#888888',
    '--sale':          '#c0392b',
    '--heart':         '#e05c5c',
    '--review-bg':     '#1a1a1a',
    '--review-border': '#2a2a2a',
    '--verified':      '#7daa82',
    '--star':          '#e0b96e',
    '--toast-bg':      '#f0ede8',
    '--toast-text':    '#111111',
    '--overlay':       'rgba(0,0,0,0.7)',
  },
}

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  ru: {
    back: 'НАЗАД',
    home: 'ГЛАВНАЯ',
    loadingProduct: 'Загружаем товар...',
    networkError: 'Ошибка сети: ',
    productNotFound: 'Товар не найден',
    reviews: (n) => `${n} ${n === 1 ? 'отзыв' : n < 5 ? 'отзыва' : 'отзывов'}`,
    size: 'РАЗМЕР',
    sizeGuide: 'Таблица размеров',
    sizeError: 'Пожалуйста, выберите размер',
    quantity: 'КОЛИЧЕСТВО',
    addToCart: 'В КОРЗИНУ',
    added: 'ДОБАВЛЕНО ✓',
    share: 'ПОДЕЛИТЬСЯ',
    addedToCart: 'Добавлено в корзину',
    delivery1: 'Доставка от 1–3 дней',
    delivery2: 'Возврат 14 дней',
    delivery3: 'Гарантия качества',
    descTitle: 'ОПИСАНИЕ',
    descText: 'Элегантная модель из высококачественных материалов. Идеально подходит для повседневного использования и особых случаев. Лаконичный крой, удобная посадка, продуманные детали.',
    compTitle: 'СОСТАВ И УХОД',
    compFields: (articul) => [['Состав','95% хлопок, 5% эластан'],['Страна','Узбекистан'],['Артикул', articul || '—']],
    careText: 'Ручная стирка при 30°C · Не отбеливать · Глажка при низкой температуре',
    delivTitle: 'ДОСТАВКА И ВОЗВРАТ',
    delivText: 'Бесплатная доставка по Ташкенту при заказе от 500 000 сум. Доставка в регионы — 1–5 рабочих дней. Возврат товара надлежащего качества в течение 14 дней.',
    reviewsTitle: 'ОТЗЫВЫ',
    leaveReview: 'ОСТАВИТЬ ОТЗЫВ',
    verified: '✓ Подтверждённая покупка',
    related: 'С ЭТИМ ТАКЖЕ СМОТРЯТ',
    sizeGuideTitle: 'ТАБЛИЦА РАЗМЕРОВ',
    sizeGuideCols: ['Размер', 'Грудь (см)', 'Талия (см)', 'Бёдра (см)'],
    sizeGuideHint: 'Если вы находитесь между размерами, рекомендуем выбрать больший.',
    footerLinks: {
      'КАТАЛОГ':            ['Новинки', 'Вся коллекция', 'Одежда', 'Обувь', 'Аксессуары', 'Sale'],
      'ПОМОЩЬ ПОКУПАТЕЛЮ': ['Оплата', 'Возврат', 'Доставка', 'Наши магазины'],
      'О КОМПАНИИ':         ['Контакты', 'О бренде', 'Карьера в Selfie', 'Публичная оферта'],
    },
    payment: 'ОПЛАТА',
    subscription: 'ПОДПИСКА',
    subscriptionText: 'Оставляй номер и всегда будь в курсе последних новостей.',
    phonePlaceholder: 'Телефон или email',
    subscribed: '✓ Вы успешно подписались!',
    copyright: '© 2026 Selfie. Все права защищены.',
    fakeReviews: [
      { name: 'Анастасия К.', rating: 5, date: '15 февраля 2026', text: 'Отличное качество ткани, сидит идеально. Заказала размер S — подошёл отлично.', verified: true },
      { name: 'Малика Р.',    rating: 5, date: '3 февраля 2026',  text: 'Уже второй раз покупаю в Selfie. Всегда высокое качество и быстрая доставка.', verified: true },
      { name: 'Диана Т.',     rating: 4, date: '28 января 2026',  text: 'Красивая вещь, полностью соответствует фото. Немного долго ждала доставку.', verified: false },
    ],
  },
  en: {
    back: 'BACK',
    home: 'HOME',
    loadingProduct: 'Loading product...',
    networkError: 'Network error: ',
    productNotFound: 'Product not found',
    reviews: (n) => `${n} ${n === 1 ? 'review' : 'reviews'}`,
    size: 'SIZE',
    sizeGuide: 'Size guide',
    sizeError: 'Please select a size',
    quantity: 'QUANTITY',
    addToCart: 'ADD TO CART',
    added: 'ADDED ✓',
    share: 'SHARE',
    addedToCart: 'Added to cart',
    delivery1: 'Delivery in 1–3 days',
    delivery2: '14-day returns',
    delivery3: 'Quality guarantee',
    descTitle: 'DESCRIPTION',
    descText: 'An elegant model crafted from premium materials. Perfect for everyday wear and special occasions. Clean cut, comfortable fit, thoughtful details.',
    compTitle: 'COMPOSITION & CARE',
    compFields: (articul) => [['Composition','95% cotton, 5% elastane'],['Country','Uzbekistan'],['Article', articul || '—']],
    careText: 'Hand wash at 30°C · Do not bleach · Iron at low temperature',
    delivTitle: 'DELIVERY & RETURNS',
    delivText: 'Free delivery in Tashkent on orders over 500,000 sum. Regional delivery: 1–5 business days. Returns accepted within 14 days for undamaged items.',
    reviewsTitle: 'REVIEWS',
    leaveReview: 'LEAVE A REVIEW',
    verified: '✓ Verified purchase',
    related: 'YOU MAY ALSO LIKE',
    sizeGuideTitle: 'SIZE GUIDE',
    sizeGuideCols: ['Size', 'Bust (cm)', 'Waist (cm)', 'Hips (cm)'],
    sizeGuideHint: 'If you are between sizes, we recommend choosing the larger one.',
    footerLinks: {
      'CATALOG':          ['New In', 'All Collection', 'Clothing', 'Footwear', 'Accessories', 'Sale'],
      'CUSTOMER HELP':    ['Payment', 'Returns', 'Delivery', 'Our Stores'],
      'ABOUT US':         ['Contacts', 'About Brand', 'Careers at Selfie', 'Public Offer'],
    },
    payment: 'PAYMENT',
    subscription: 'NEWSLETTER',
    subscriptionText: 'Leave your number and always be the first to know our latest news.',
    phonePlaceholder: 'Phone or email',
    subscribed: '✓ Successfully subscribed!',
    copyright: '© 2026 Selfie. All rights reserved.',
    fakeReviews: [
      { name: 'Anastasia K.', rating: 5, date: 'February 15, 2026', text: 'Excellent fabric quality, fits perfectly. Ordered size S — fits great.', verified: true },
      { name: 'Malika R.',    rating: 5, date: 'February 3, 2026',  text: 'This is my second purchase at Selfie. Always high quality and fast delivery.', verified: true },
      { name: 'Diana T.',     rating: 4, date: 'January 28, 2026',  text: 'Beautiful item, exactly as shown in the photos. Delivery took a little longer than expected.', verified: false },
    ],
  },
}

// ─── Constants ────────────────────────────────────────────────────────────────
const API_URL = 'https://69989a63d66520f95f18019f.mockapi.io/products/products'

// ─── Utils ────────────────────────────────────────────────────────────────────
const formatPrice = p => p.toLocaleString('ru-RU') + ' сум'
const serif = "'Cormorant Garamond', Georgia, serif"

function getProductImages(p) {
  if (!p) return []
  if (p.images?.length) return p.images
  return [p.image, p.image2, p.image3].filter(Boolean)
}

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b" style={{ borderColor: 'var(--border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3.5 bg-transparent border-none cursor-pointer text-xs font-semibold tracking-widest"
        style={{ fontFamily: serif, color: 'var(--text)' }}
      >
        {title}
        {open
          ? <ChevronUp size={14} style={{ color: 'var(--text-faint)' }} />
          : <ChevronDown size={14} style={{ color: 'var(--text-faint)' }} />}
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? 400 : 0 }}>
        <div className="pb-4 text-[13px] leading-relaxed" style={{ fontFamily: serif, color: 'var(--text-muted)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
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
    <div onClick={onClose} className="fixed inset-0 z-2000 flex items-center justify-center bg-black/90">
      <button onClick={onClose} className="absolute top-6 right-6 bg-transparent border-none cursor-pointer text-white"><X size={24} /></button>
      <button onClick={e => { e.stopPropagation(); prev() }} className="absolute left-6 bg-transparent border-none cursor-pointer text-white"><ChevronLeft size={32} /></button>
      <img src={images[idx]} alt="" onClick={e => e.stopPropagation()}
        className="max-h-[90vh] max-w-[80vw] object-cover"
        onError={e => { e.target.src = 'https://placehold.co/800x1000/222/888?text=Фото' }} />
      <button onClick={e => { e.stopPropagation(); next() }} className="absolute right-6 bg-transparent border-none cursor-pointer text-white"><ChevronRight size={32} /></button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <span key={i} onClick={e => { e.stopPropagation(); setIdx(i) }}
            className="w-1.5 h-1.5 rounded-full inline-block cursor-pointer"
            style={{ background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)' }} />
        ))}
      </div>
    </div>
  )
}

// ─── SizeGuideModal ───────────────────────────────────────────────────────────
function SizeGuideModal({ onClose }) {
  const { lang } = useContext(LangContext)
  const t = T[lang]
  const rows = [['XS','80–84','60–64','86–90'],['S','84–88','64–68','90–94'],['M','88–92','68–72','94–98'],['L','92–96','72–76','98–102'],['XL','96–100','76–80','102–106']]
  return (
    <div onClick={onClose} className="fixed inset-0 z-1500 flex items-center justify-center" style={{ background: 'var(--overlay)' }}>
      <div onClick={e => e.stopPropagation()} className="w-120 max-w-[95vw] max-h-[85vh] overflow-y-auto p-8" style={{ fontFamily: serif, background: 'var(--bg)' }}>
        <div className="flex items-center justify-between mb-5">
          <span className="text-base font-semibold tracking-widest" style={{ color: 'var(--text)' }}>{t.sizeGuideTitle}</span>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-faint)' }}><X size={18} /></button>
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b-2" style={{ borderColor: 'var(--text)' }}>
              {t.sizeGuideCols.map(h => (
                <th key={h} className="text-left py-2 text-[11px] tracking-wider font-normal" style={{ color: 'var(--text-faint)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row[0]} className="border-b" style={{ borderColor: 'var(--border)' }}>
                {row.map((cell, i) => (
                  <td key={i} className="py-2.5" style={{ color: i === 0 ? 'var(--text)' : 'var(--text-muted)', fontWeight: i === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-xs leading-relaxed" style={{ color: 'var(--text-faint)' }}>
          {t.sizeGuideHint}
        </p>
      </div>
    </div>
  )
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ rating, size = 11 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => <Star key={s} size={size} fill={s <= rating ? 'var(--star)' : 'none'} color="var(--star)" />)}
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { lang } = useContext(LangContext)
  const t = T[lang]
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const handleSubscribe = () => {
    if (email.trim()) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 3000) }
  }

  return (
    <footer className="mt-12 pt-12" style={{ borderTop: '1px solid var(--border-mid)', fontFamily: serif, background: 'var(--bg)' }}>
      <div className="grid gap-7 px-10 pb-10" style={{ gridTemplateColumns: 'repeat(3, 1fr) 180px 300px', borderBottom: '1px solid var(--border)' }}>
        {Object.entries(t.footerLinks).map(([title, links]) => (
          <div key={title}>
            <div className="text-[11px] font-semibold tracking-widest mb-4" style={{ color: 'var(--text)' }}>{title}</div>
            {links.map(link => (
              <div key={link} className="text-xs mb-2.5 cursor-pointer transition-colors duration-200 leading-snug"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{link}</div>
            ))}
          </div>
        ))}
        <div>
          <div className="text-[11px] font-semibold tracking-widest mb-4" style={{ color: 'var(--text)' }}>{t.payment}</div>
          {['Uzum', 'Click', 'Payme'].map(p => (
            <div key={p} className="inline-block text-xs px-3 py-1 rounded-sm mr-1 mb-2"
              style={{ border: '1px solid var(--border-mid)', color: 'var(--text-muted)', background: 'var(--surface)' }}>{p}</div>
          ))}
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-widest mb-2.5" style={{ color: 'var(--text)' }}>{t.subscription}</div>
          <div className="text-xs leading-7 mb-3.5" style={{ color: 'var(--text-muted)' }}>{t.subscriptionText}</div>
          {subscribed
            ? <div className="text-xs px-3.5 py-2.5" style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>{t.subscribed}</div>
            : <div className="flex">
                <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  placeholder={t.phonePlaceholder}
                  className="flex-1 text-[11px] px-3 py-2 outline-none border-r-0"
                  style={{ border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text)', fontFamily: 'inherit' }} />
                <button onClick={handleSubscribe} className="text-[11px] px-4 py-2 cursor-pointer border-none"
                  style={{ background: 'var(--btn)', color: 'var(--btn-text)', fontFamily: 'inherit' }}>OK</button>
              </div>
          }
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3 py-5 px-10">
        <div className="text-[11px]" style={{ color: 'var(--text-faint)' }}>{t.copyright}</div>
        <div className="flex gap-5">
          {[Facebook, Instagram, Send, Youtube].map((Icon, i) => (
            <Icon key={i} size={17} className="cursor-pointer transition-colors duration-200" style={{ color: 'var(--icon)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--icon)'} />
          ))}
        </div>
        <div className="text-[15px] font-semibold" style={{ color: 'var(--text)' }}>+998 (55) 508 00 60</div>
      </div>
    </footer>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const { id: productId } = useParams()
  const navigate = useNavigate()

  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState('ru')
  const toggleLang = () => setLang(l => l === 'ru' ? 'en' : 'ru')

  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const t = T[lang]

  useEffect(() => {
    setFetchLoading(true)
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error(`${t.networkError}${r.status}`); return r.json() })
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
  const related = product
    ? allProducts.filter(p => p.category === product.category && String(p.id) !== String(productId)).slice(0, 4)
    : []

  function handleAddToCart() {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => String(i.id) === String(product.id) && i.selectedSize === selectedSize)
    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity
    } else {
      cart.push({ ...product, selectedSize, quantity })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2200)
  }

  // ── Quick order (Buy Now) ──────────────────────────────────────────────────
  const TG_TOKEN = '8393784537:AAE0aFZ8LOI6_nvPcF5uCRvc8nGerVpQjMI'
  const TG_CHAT  = '2106527740'
  const [quickOpen, setQuickOpen] = useState(false)
  const [quickForm, setQuickForm] = useState({ name: '', phone: '' })
  const [quickErrors, setQuickErrors] = useState({})
  const [quickLoading, setQuickLoading] = useState(false)
  const [quickDone, setQuickDone] = useState(false)

  function handleBuyNow() {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return }
    setQuickOpen(true)
    setQuickDone(false)
    setQuickForm({ name: '', phone: '' })
    setQuickErrors({})
  }

  async function handleQuickSubmit() {
    const errs = {}
    if (!quickForm.name.trim()) errs.name = true
    if (!quickForm.phone.trim()) errs.phone = true
    setQuickErrors(errs)
    if (Object.keys(errs).length) return
    setQuickLoading(true)
    const msg = `⚡ БЫСТРЫЙ ЗАКАЗ — Selfie\n\n🛍 Товар: ${product.name}\nРазмер: ${selectedSize}\nКол-во: ${quantity}\nЦена: ${(product.price * quantity).toLocaleString('ru-RU')} сум${product.articul ? '\nАрт.: ' + product.articul : ''}\n\n👤 Имя: ${quickForm.name}\n📞 Телефон: ${quickForm.phone}\n\n🕐 ${new Date().toLocaleString('ru-RU')}`
    try {
      await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT, text: msg }),
      })
    } catch (_) {}
    setQuickLoading(false)
    setQuickDone(true)
  }

  if (fetchLoading) return (
    <div className="min-h-screen flex items-center justify-center gap-3" style={{ background: dark ? '#0f0f0f' : '#fff', fontFamily: serif, color: '#aaa' }}>
      <Loader2 size={20} className="animate-spin" />
      <span className="text-sm tracking-widest">{t.loadingProduct}</span>
    </div>
  )

  if (fetchError || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: dark ? '#0f0f0f' : '#fff', fontFamily: serif, color: '#aaa' }}>
      <div className="text-4xl">⚠️</div>
      <div className="text-sm">{fetchError || t.productNotFound}</div>
      <button onClick={() => navigate('/products')} className="text-xs px-7 py-2.5 cursor-pointer border-none tracking-widest"
        style={{ background: dark ? '#f0ede8' : '#222', color: dark ? '#111' : '#fff', fontFamily: serif }}>← {t.back}</button>
    </div>
  )

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ThemeContext.Provider value={{ dark, toggleDark: () => setDark(d => !d) }}>
        <div
          className="min-h-screen transition-colors duration-300"
          style={{ ...themeVars[dark ? 'dark' : 'light'], background: 'var(--bg)', color: 'var(--text)', fontFamily: serif }}
        >
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />
          <style>{`
            @keyframes fadeInUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
            @keyframes cartPop  { 0%{transform:scale(1)} 40%{transform:scale(1.06)} 100%{transform:scale(1)} }
            .prod-thumb:hover { opacity:1 !important }
            .related-card:hover img { transform:scale(1.05) !important }
          `}</style>

          {lightboxOpen && images.length > 0 && <Lightbox images={images} activeIndex={activeImg} onClose={() => setLightboxOpen(false)} />}
          {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}

          {/* Quick Order Modal */}
          {quickOpen && (
            <div onClick={() => setQuickOpen(false)} className="fixed inset-0 z-[2000] flex items-center justify-center" style={{ background: 'var(--overlay)' }}>
              <div onClick={e => e.stopPropagation()} style={{ fontFamily: serif, background: 'var(--bg)', width: 380, maxWidth: '92vw', padding: '32px 28px 28px', position: 'relative' }}>
                <button onClick={() => setQuickOpen(false)} style={{ position: 'absolute', top: 14, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)' }}><X size={18}/></button>
                {quickDone ? (
                  <div style={{ textAlign: 'center', padding: '16px 0' }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
                    <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)', marginBottom: 8, letterSpacing: '0.04em', fontStyle: 'italic' }}>Заявка принята!</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>Мы свяжемся с вами в ближайшее время.</div>
                    <button onClick={() => setQuickOpen(false)} style={{ marginTop: 20, padding: '10px 28px', background: 'var(--btn)', color: 'var(--btn-text)', border: 'none', cursor: 'pointer', fontSize: 11, letterSpacing: '0.1em', fontFamily: serif }}>ЗАКРЫТЬ</button>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text)', marginBottom: 4 }}>БЫСТРЫЙ ЗАКАЗ</div>
                    <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 20 }}>{product.name} · {selectedSize} · {quantity} шт.</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                      {[{field:'name', placeholder:'Ваше имя *'}, {field:'phone', placeholder:'Телефон *'}].map(({field, placeholder}) => (
                        <input key={field} value={quickForm[field]} onChange={e => { setQuickForm(p => ({...p, [field]: e.target.value})); setQuickErrors(p => ({...p, [field]: false})) }}
                          placeholder={placeholder}
                          style={{ padding: '11px 14px', fontSize: 13, fontFamily: serif, outline: 'none', background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid ${quickErrors[field] ? '#c0392b' : 'var(--border-mid)'}`, borderRadius: 0, width: '100%' }} />
                      ))}
                    </div>
                    <button onClick={handleQuickSubmit} disabled={quickLoading}
                      style={{ width: '100%', padding: '13px', fontSize: 12, fontFamily: serif, letterSpacing: '0.1em', cursor: quickLoading ? 'not-allowed' : 'pointer', background: quickLoading ? 'var(--border)' : 'var(--btn)', color: quickLoading ? 'var(--text-faint)' : 'var(--btn-text)', border: 'none', fontWeight: 500 }}>
                      {quickLoading ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Toast */}
          {addedToCart && (
            <div className="fixed bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-7 py-3 text-xs tracking-widest z-9999 whitespace-nowrap shadow-2xl"
              style={{ background: 'var(--toast-bg)', color: 'var(--toast-text)', animation: 'fadeInUp 0.25s ease' }}>
              <ShoppingBag size={14} /> {t.addedToCart}
            </div>
          )}

          {/* Top bar */}
          <div className="flex items-center justify-between px-10 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/products')}
                className="flex items-center gap-1.5 text-[11px] tracking-widest bg-transparent border-none cursor-pointer transition-colors duration-200 p-0"
                style={{ color: 'var(--text-faint)', fontFamily: serif }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}>
                <ArrowLeft size={13} /> {t.back}
              </button>
              <span style={{ color: 'var(--border-mid)' }}>|</span>
              <span className="text-[11px] tracking-wider" style={{ color: 'var(--text-faint)' }}>
                {t.home} / {(product.category || '').toUpperCase()} / {product.name.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {/* Language toggle */}
              <button
                onClick={toggleLang}
                className="text-[10px] tracking-widest font-semibold bg-transparent cursor-pointer transition-colors duration-200 px-2 py-0.5"
                style={{ border: '1px solid var(--border-mid)', color: 'var(--icon)', fontFamily: serif }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--icon)'; e.currentTarget.style.borderColor = 'var(--border-mid)' }}>
                {lang === 'ru' ? 'EN' : 'RU'}
              </button>
              {/* Dark mode toggle */}
              <button onClick={() => setDark(d => !d)} className="bg-transparent border-none cursor-pointer flex p-0 transition-colors duration-200" style={{ color: 'var(--icon)' }}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid max-w-7xl mx-auto" style={{ gridTemplateColumns: '1fr 440px' }}>

            {/* Left — Images */}
            <div className="flex p-8 pl-10">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 mr-4 shrink-0">
                {images.map((img, i) => (
                  <div key={i} className="prod-thumb w-18 h-22.5 overflow-hidden cursor-pointer transition-all duration-200"
                    onClick={() => setActiveImg(i)}
                    style={{ background: 'var(--card-bg)', border: activeImg === i ? '1.5px solid var(--text)' : '1.5px solid transparent', opacity: activeImg === i ? 1 : 0.55 }}>
                    <img src={img} alt="" className="w-full h-full object-cover"
                      onError={e => { e.target.src = 'https://placehold.co/72x90/f5f2ee/888?text=Фото' }} />
                  </div>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1 relative overflow-hidden" style={{ background: 'var(--card-bg)' }}>
                {images.length > 0 && (
                  <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover block" style={{ maxHeight: 680 }}
                    onError={e => { e.target.src = 'https://placehold.co/700x900/f5f2ee/888?text=Фото' }} />
                )}
                {discount && (
                  <div className="absolute top-4 left-4 text-white text-[11px] px-2 py-0.5 font-semibold tracking-widest" style={{ background: 'var(--sale)' }}>
                    −{discount}%
                  </div>
                )}
                <button onClick={() => setLightboxOpen(true)} className="absolute bottom-4 right-4 bg-white/90 border-none cursor-pointer w-9 h-9 flex items-center justify-center shadow-md">
                  <ZoomIn size={15} color="#555" />
                </button>
                {images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/80 border-none cursor-pointer w-7.5 h-7.5 flex items-center justify-center">
                      <ChevronLeft size={14} />
                    </button>
                    <button onClick={() => setActiveImg(i => (i + 1) % images.length)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/80 border-none cursor-pointer w-7.5 h-7.5 flex items-center justify-center">
                      <ChevronRight size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right — Details */}
            <div className="flex flex-col pr-10 pt-8 pb-8 sticky top-14 self-start">

              {/* Tags */}
              <div className="flex gap-2 mb-3">
                <span className="text-[10px] tracking-widest px-2.5 py-0.5" style={{ color: 'var(--tag-text)', border: '1px solid var(--tag)' }}>
                  {(product.category || '').toUpperCase()}
                </span>
                {product.articul && (
                  <span className="text-[10px] tracking-widest px-2.5 py-0.5" style={{ color: 'var(--text-faint)', border: '1px solid var(--border)' }}>
                    {product.articul}
                  </span>
                )}
              </div>

              <h1 className="m-0 mb-1.5 text-2xl font-medium tracking-wide leading-snug" style={{ color: 'var(--text)' }}>
                {product.name}
              </h1>

              <div className="flex items-center gap-1.5 mb-4">
                <Stars rating={4} />
                <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>{t.reviews(T.ru.fakeReviews.length)}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3.5 mb-5">
                {product.oldPrice && (
                  <span className="text-base line-through" style={{ color: 'var(--text-faint)' }}>{formatPrice(product.oldPrice)}</span>
                )}
                <span className="text-[26px] font-semibold tracking-wide" style={{ color: product.oldPrice ? 'var(--sale)' : 'var(--text)' }}>
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="mb-5" style={{ borderTop: '1px solid var(--border)' }} />

              {/* Size picker */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[11px] tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>{t.size}</span>
                  <button onClick={() => setSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[11px] tracking-wider underline bg-transparent border-none cursor-pointer p-0"
                    style={{ color: 'var(--text-faint)', fontFamily: serif }}>
                    <Ruler size={11} /> {t.sizeGuide}
                  </button>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(product.sizes || []).map(s => (
                    <button key={s} onClick={() => { setSelectedSize(s); setSizeError(false) }}
                      className="px-3.5 py-2 text-xs tracking-wider cursor-pointer transition-all duration-150 min-w-11 text-center"
                      style={{
                        fontFamily: serif,
                        border: selectedSize === s ? '1.5px solid var(--text)' : sizeError ? '1.5px solid #c0392b' : '1px solid var(--border-mid)',
                        background: selectedSize === s ? 'var(--btn)' : 'var(--input-bg)',
                        color: selectedSize === s ? 'var(--btn-text)' : sizeError ? '#c0392b' : 'var(--text-muted)',
                      }}>{s}</button>
                  ))}
                </div>
                {sizeError && <div className="text-[11px] mt-1.5 tracking-wider" style={{ color: '#c0392b' }}>{t.sizeError}</div>}
              </div>

              {/* Quantity */}
              <div className="mb-5">
                <div className="text-[11px] tracking-widest font-semibold mb-2.5" style={{ color: 'var(--text-muted)' }}>{t.quantity}</div>
                <div className="flex items-center w-fit" style={{ border: '1px solid var(--border-mid)' }}>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="bg-transparent border-none cursor-pointer w-9 h-9 flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
                    <ChevronLeft size={14} />
                  </button>
                  <span className="text-sm min-w-8 text-center" style={{ color: 'var(--text)' }}>{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)}
                    className="bg-transparent border-none cursor-pointer w-9 h-9 flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-2.5 mb-2.5">
                <button onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 text-xs tracking-widest cursor-pointer border-none transition-colors duration-200"
                  style={{ fontFamily: serif, background: 'var(--btn)', color: 'var(--btn-text)', animation: addedToCart ? 'cartPop 0.35s ease' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--btn-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--btn)'}>
                  <ShoppingBag size={15} />
                  {addedToCart ? t.added : t.addToCart}
                </button>
                <button onClick={() => setLiked(l => !l)}
                  className="w-12.5 flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{
                    background: liked ? (dark ? '#2a1515' : '#fff5f5') : 'var(--input-bg)',
                    border: liked ? `1px solid ${dark ? '#5a2020' : '#f5c6c6'}` : '1px solid var(--border-mid)',
                  }}>
                  <Heart size={17} fill={liked ? 'var(--heart)' : 'none'} color={liked ? 'var(--heart)' : 'var(--icon)'} />
                </button>
              </div>

              {/* Buy Now */}
              <button onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-xs tracking-widest cursor-pointer mb-3.5 transition-colors duration-200"
                style={{ fontFamily: serif, background: 'transparent', color: 'var(--text)', border: '1.5px solid var(--text)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--btn)'; e.currentTarget.style.color = 'var(--btn-text)'; e.currentTarget.style.borderColor = 'var(--btn)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text)' }}>
                КУПИТЬ СЕЙЧАС
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3.5 text-xs tracking-widest cursor-pointer transition-colors duration-200"
                style={{ border: '1px solid var(--border-mid)', color: 'var(--text-faint)', fontFamily: serif }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-mid)'}>
                <Share2 size={13} /> {t.share}
              </button>

              {/* Service badges */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: <Truck size={16} />,      label: t.delivery1 },
                  { icon: <RotateCcw size={16} />,  label: t.delivery2 },
                  { icon: <Shield size={16} />,     label: t.delivery3 },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 px-2 py-3 text-[10px] text-center leading-snug tracking-wide"
                    style={{ background: 'var(--surface)', color: 'var(--text-faint)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
                    {label}
                  </div>
                ))}
              </div>

              <Accordion title={t.descTitle} defaultOpen>
                {t.descText}
              </Accordion>
              <Accordion title={t.compTitle}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {t.compFields(product.articul).map(([k, v]) => (
                    <React.Fragment key={k}>
                      <span style={{ color: 'var(--text-faint)' }}>{k}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{v}</span>
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-3.5 text-xs" style={{ color: 'var(--text-faint)' }}>
                  {t.careText}
                </div>
              </Accordion>
              <Accordion title={t.delivTitle}>
                {t.delivText}
              </Accordion>
            </div>
          </div>

          {/* Reviews */}
          <section className="px-10 py-10 max-w-7xl mx-auto" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="m-0 text-lg font-medium tracking-widest" style={{ color: 'var(--text)' }}>{t.reviewsTitle}</h2>
              <button className="bg-transparent px-5 py-2 text-[11px] tracking-widest cursor-pointer"
                style={{ border: '1px solid var(--text)', color: 'var(--text)', fontFamily: serif }}>{t.leaveReview}</button>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {t.fakeReviews.map((r, i) => (
                <div key={i} className="px-6 py-5" style={{ background: 'var(--review-bg)', borderLeft: '3px solid var(--review-border)' }}>
                  <div className="mb-2"><Stars rating={r.rating} /></div>
                  <p className="m-0 mb-3 text-[13px] leading-7" style={{ color: 'var(--text-muted)' }}>{r.text}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-semibold" style={{ color: 'var(--text)' }}>{r.name}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{r.date}</span>
                  </div>
                  {r.verified && <div className="text-[10px] mt-1 tracking-wider" style={{ color: 'var(--verified)' }}>{t.verified}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section className="px-10 pb-16 pt-10 max-w-7xl mx-auto" style={{ borderTop: '1px solid var(--border)' }}>
              <h2 className="m-0 mb-6 text-lg font-medium tracking-widest" style={{ color: 'var(--text)' }}>{t.related}</h2>
              <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                {related.map(p => {
                  const img = getProductImages(p)[0] || 'https://placehold.co/400x500/f5f2ee/888?text=Фото'
                  return (
                    <div key={p.id} className="related-card cursor-pointer" onClick={() => navigate(`/products/${p.id}`)}>
                      <div className="relative overflow-hidden" style={{ background: 'var(--card-bg)', aspectRatio: '3/4' }}>
                        <img src={img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500"
                          onError={e => { e.target.src = 'https://placehold.co/400x500/f5f2ee/888?text=Фото' }} />
                        {p.oldPrice && <div className="absolute top-2.5 left-2.5 text-white text-[10px] px-1.5 py-0.5" style={{ background: 'var(--sale)' }}>SALE</div>}
                      </div>
                      <div className="pt-2.5 pb-4">
                        <div className="text-[10px] mb-1" style={{ color: 'var(--text-faint)' }}>{p.category}</div>
                        <div className="text-[11.5px] mb-1" style={{ color: 'var(--text-muted)' }}>{p.name}</div>
                        <div className="flex gap-2 items-baseline">
                          {p.oldPrice && <span className="text-[11px] line-through" style={{ color: 'var(--text-faint)' }}>{formatPrice(p.oldPrice)}</span>}
                          <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{formatPrice(p.price)}</span>
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
    </LangContext.Provider>
  )
}