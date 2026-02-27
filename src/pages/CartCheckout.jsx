import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Moon, Sun, Home, Search, Heart, ShoppingBag, User, X, Plus, Minus, ChevronDown } from 'lucide-react'

// ─── Design tokens ────────────────────────────────────────────────────────────
const Tk = {
  light: {
    bg: '#ffffff', surface: '#faf8f5', border: '#e8e3de',
    text: '#111111', textMuted: '#555555', textFaint: '#aaaaaa',
    headerBg: 'rgba(255,255,255,0.96)', icon: '#555555',
    btnPrimary: '#111111', btnText: '#ffffff',
    saleBadge: '#c0392b', inputBg: '#ffffff',
    cardBg: '#f5f2ee', inputBorder: '#d4af8a',
    reqStar: '#c0392b',
  },
  dark: {
    bg: '#0f0f0f', surface: '#1a1a1a', border: '#2a2a2a',
    text: '#f0ede8', textMuted: '#b0a898', textFaint: '#666666',
    headerBg: 'rgba(15,15,15,0.96)', icon: '#b0a898',
    btnPrimary: '#f0ede8', btnText: '#111111',
    saleBadge: '#c0392b', inputBg: '#161616',
    cardBg: '#1c1c1c', inputBorder: '#5a4a3a',
    reqStar: '#e07050',
  },
}

const serif = "'Cormorant Garamond', Georgia, serif"

const REGIONS = [
  'Ташкент', 'Самарканд', 'Бухара', 'Андижан', 'Фергана',
  'Наманган', 'Нукус', 'Карши', 'Термез', 'Гулистан',
  'Навои', 'Ургенч', 'Джизак', 'Нурафшон',
]

const TR = {
  ru: {
    pageTitle: 'Корзина',
    emptyCart: 'В корзине нет товаров!',
    emptyCartSub: 'Перейдите в каталог и выберите понравившиеся товары',
    goToCatalog: 'ПЕРЕЙТИ В КАТАЛОГ',
    art: 'Арт.',
    sizes: 'Размеры:',
    color: 'Цвет:',
    deliveryTitle: 'Оформление доставки',
    authorize: 'Авторизоваться',
    recipient: 'Получатель:',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Почта',
    phone: 'Телефон',
    address: 'Адрес:',
    region: 'Выбрать регион',
    district: 'Район',
    street: 'Улица',
    house: 'Дом',
    apartment: 'Квартира',
    entrance: 'Подъезд',
    intercom: 'Домофон',
    comment: 'Комментарий (необязательно)',
    total: 'Итого:',
    placeOrder: 'Оформить заказ',
    legalNote: 'Нажимая на кнопку «Оформить заказ», Вы соглашаетесь с',
    privacyPolicy: 'Политикой конфиденциальности',
    and: 'и принимаете правила',
    publicOffer: 'Публичной оферты',
    sum: 'сум',
    nav: {
      allCollection: 'ВСЯ КОЛЛЕКЦИЯ', clothes: 'ОДЕЖДА',
      shoes: 'ОБУВЬ', accessories: 'АКСЕССУАРЫ',
      onlineOnly: 'ТОЛЬКО ОНЛАЙН', sale: 'SALE', newItems: 'НОВИНКИ',
    },
    validationError: 'Пожалуйста, заполните все обязательные поля (*)',
    placing: 'Оформление...',
  },
  en: {
    pageTitle: 'Cart',
    emptyCart: 'Your cart is empty!',
    emptyCartSub: 'Go to the catalog and pick items you like',
    goToCatalog: 'GO TO CATALOG',
    art: 'Art.',
    sizes: 'Sizes:',
    color: 'Color:',
    deliveryTitle: 'Delivery details',
    authorize: 'Sign in',
    recipient: 'Recipient:',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address:',
    region: 'Select region',
    district: 'District',
    street: 'Street',
    house: 'House',
    apartment: 'Apartment',
    entrance: 'Entrance',
    intercom: 'Intercom',
    comment: 'Comment (optional)',
    total: 'Total:',
    placeOrder: 'Place order',
    legalNote: 'By clicking "Place order" you agree to the',
    privacyPolicy: 'Privacy Policy',
    and: 'and accept the',
    publicOffer: 'Public Offer',
    sum: 'sum',
    nav: {
      allCollection: 'ALL COLLECTION', clothes: 'CLOTHING',
      shoes: 'FOOTWEAR', accessories: 'ACCESSORIES',
      onlineOnly: 'ONLINE ONLY', sale: 'SALE', newItems: 'NEW IN',
    },
    validationError: 'Please fill all required fields (*)',
    placing: 'Placing...',
  },
}

const NAV_ROUTES = ['/products', '/category/odejda', '/category/obuv', '/category/aksessuary', '/products', '/products', '/products']

// Telegram config (from original file)
const TG_TOKEN = '8393784537:AAE0aFZ8LOI6_nvPcF5uCRvc8nGerVpQjMI'
const TG_CHAT  = '2106527740'

export default function CartCheckout() {
  const navigate = useNavigate()
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState('ru')
  const [cart, setCart]   = useState([])
  const [cartLoaded, setCartLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})
  const [regionOpen, setRegionOpen] = useState(false)

  const t  = TR[lang]
  const tk = dark ? Tk.dark : Tk.light

  const [form, setForm] = useState({
    name: '', surname: '', email: '', phone: '',
    region: '', district: '', street: '',
    house: '', apartment: '', entrance: '', intercom: '',
    comment: '',
  })

  // Load cart + user + theme
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
    setCartLoaded(true)

    const savedDark = localStorage.getItem('darkMode') === 'true'
    const savedLang = localStorage.getItem('lang') || 'ru'
    setDark(savedDark)
    setLang(savedLang)

    // Pre-fill from currentUser
    try {
      const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
      if (user) {
        const nameParts = (user.name || '').split(' ')
        setForm(prev => ({
          ...prev,
          name:    nameParts[0] || '',
          surname: nameParts[1] || '',
          email:   user.email && user.email !== '—' ? user.email : '',
          phone:   user.phone && user.phone !== '—' ? user.phone : '',
        }))
      }
    } catch (_) {}
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('darkMode', String(next))
  }
  const toggleLang = () => {
    const next = lang === 'ru' ? 'en' : 'ru'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const total = cart.reduce((s, item) => s + (Number(item.price) * (item.quantity || 1)), 0)

  const updateQty = (id, size, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const qty = Math.max(1, (item.quantity || 1) + delta)
        return { ...item, quantity: qty }
      }
      return item
    }).filter(Boolean))
  }

  const removeItem = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)))
  }

  // Save cart changes back
  useEffect(() => {
    if (!cartLoaded) return
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart, cartLoaded])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
  }

  const validate = () => {
    const req = ['name', 'surname', 'phone', 'region', 'district', 'street', 'house']
    const newErrors = {}
    req.forEach(f => { if (!form[f].trim()) newErrors[f] = true })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sendToTelegram = async (orderData) => {
    const productsList = orderData.items.map((item, i) =>
      `${i + 1}. ${item.name}\n   Арт.: ${item.article || '—'}\n   Размер: ${item.selectedSize || '—'}\n   Цвет: ${item.selectedColor || '—'}\n   Цена: ${Number(item.price).toLocaleString('ru-RU')} ${t.sum}\n   Кол-во: ${item.quantity || 1} шт.\n   Сумма: ${(Number(item.price) * (item.quantity || 1)).toLocaleString('ru-RU')} ${t.sum}`
    ).join('\n\n')

    const msg = `🛍 НОВЫЙ ЗАКАЗ — Selfie\n\n📦 ТОВАРЫ:\n${productsList}\n\n👤 ПОКУПАТЕЛЬ:\nИмя: ${form.name} ${form.surname}\nEmail: ${form.email || '—'}\nТелефон: ${form.phone}\n\n🚚 АДРЕС:\nРегион: ${form.region}\nРайон: ${form.district}\nУлица: ${form.street}\nДом: ${form.house}${form.apartment ? ', кв. ' + form.apartment : ''}${form.entrance ? ', подъезд ' + form.entrance : ''}${form.intercom ? ', домофон ' + form.intercom : ''}\n\n💬 Комментарий: ${form.comment || '—'}\n\n💰 ИТОГО: ${orderData.total.toLocaleString('ru-RU')} ${t.sum}\n🕐 Время: ${new Date().toLocaleString('ru-RU')}`

    try {
      const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT, text: msg }),
      })
      return res.ok
    } catch { return false }
  }

  const handleSubmit = async () => {
    if (!validate()) return
    if (cart.length === 0) return
    setLoading(true)

    const orderData = {
      id: 'ORD-' + Date.now(),
      date: new Date().toISOString(),
      items: cart,
      form,
      total,
      status: 'pending',
    }

    // Save to localStorage orders
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.unshift(orderData)
    localStorage.setItem('orders', JSON.stringify(orders))

    // Send to Telegram
    await sendToTelegram(orderData)

    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]))

    setLoading(false)

    // Navigate to confirmation
    navigate('/order-confirmed', { state: { order: orderData } })
  }

  const navLabels = Object.values(t.nav)

  // ── Input style helper ────────────────────────────────────────────────────
  const inputStyle = (field) => ({
    width: '100%', padding: '11px 14px', fontSize: 13,
    fontFamily: serif, outline: 'none',
    background: tk.inputBg, color: tk.text,
    border: `1px solid ${errors[field] ? tk.reqStar : tk.inputBorder}`,
    borderRadius: 0,
    transition: 'border-color 0.2s',
  })

  return (
    <div style={{ minHeight: '100vh', background: tk.bg, color: tk.text, fontFamily: serif, transition: 'background 0.3s, color 0.3s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        .nav-lnk { position:relative; text-decoration:none; transition:color 0.2s; }
        .nav-lnk::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:1.5px; background:currentColor; transform:scaleX(0); transition:transform 0.22s; }
        .nav-lnk:hover::after { transform:scaleX(1); }
        .icon-btn { background:none; border:none; cursor:pointer; display:flex; padding:0; transition:opacity 0.2s; }
        .icon-btn:hover { opacity:0.6; }
        .inp:focus { border-color: ${dark ? '#9a7a5a' : '#b8935a'} !important; }
        .region-opt:hover { background: ${dark ? '#2a2a2a' : '#f5f2ee'}; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.35s ease both; }
        .cart-item { border-bottom: 1px solid ${dark ? '#2a2a2a' : '#e8e3de'}; padding-bottom: 16px; margin-bottom: 16px; }
        .cart-item:last-child { border-bottom: none; margin-bottom: 0; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 56,
        background: tk.headerBg, borderBottom: `1px solid ${tk.border}`,
        backdropFilter: 'blur(12px)',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', flexShrink: 0 }}>
           <div>
          <img className="w-32.5 h-37.5" src="https://selfiestore.uz/static/62890302-3250-4096-b833-b364f5232082.png" alt="" />
         </div>
        </Link>

        <nav style={{ display: 'flex', gap: 20 }}>
          {navLabels.map((label, i) => (
            <Link key={i} to={NAV_ROUTES[i]} className="nav-lnk"
              style={{ fontSize: 11, letterSpacing: '0.06em', fontFamily: serif, fontWeight: i === 5 ? 600 : 400, color: i === 5 ? tk.saleBadge : tk.textFaint }}>
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={toggleLang} className="icon-btn"
            style={{ border: `1px solid ${tk.border}`, color: tk.icon, padding: '2px 7px', fontSize: 10, fontFamily: serif, fontWeight: 600, letterSpacing: '0.08em' }}>
            {lang === 'ru' ? 'EN' : 'RU'}
          </button>
          <button onClick={toggleDark} className="icon-btn" style={{ color: tk.icon }}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/" className="icon-btn" style={{ color: tk.icon }}><Home size={18} /></Link>
          <button className="icon-btn" style={{ color: tk.icon }}><Search size={18} /></button>
          <button className="icon-btn" style={{ color: tk.icon }}><Heart size={18} /></button>
          <button className="icon-btn" style={{ color: tk.icon, position: 'relative' }}>
            <ShoppingBag size={18} />
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: -5, right: -6, background: tk.saleBadge, color: '#fff', borderRadius: '50%', width: 14, height: 14, fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {cart.length}
              </span>
            )}
          </button>
          <button className="icon-btn" style={{ color: tk.icon }}><User size={18} /></button>
        </div>
      </header>

      {/* ── PAGE ── */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 28px 80px' }}>
        {/* Page title */}
        <h1 style={{ fontSize: 15, fontWeight: 400, letterSpacing: '0.05em', color: tk.textMuted, marginBottom: 24 }}>
          {t.pageTitle}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 560px', gap: 40, alignItems: 'start' }}>

          {/* ── LEFT: Cart items ── */}
          <div>
            {cart.length === 0 ? (
              /* Empty state */
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', gap: 16 }}>
                {/* Bag illustration */}
                <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
                  <rect x="10" y="28" width="60" height="58" rx="2" stroke={tk.textFaint} strokeWidth="1.5"/>
                  <path d="M26 28V22a14 14 0 0128 0v6" stroke={tk.textFaint} strokeWidth="1.5" fill="none"/>
                  <rect x="27" y="44" width="26" height="20" rx="1" stroke={tk.textFaint} strokeWidth="1.2" fill="none"/>
                  <text x="40" y="58" textAnchor="middle" style={{ fontSize: 10, fontFamily: serif, fill: tk.textFaint, fontWeight: 500 }}>sf</text>
                </svg>
                <div style={{ fontSize: 16, fontWeight: 500, color: tk.text, letterSpacing: '0.03em' }}>{t.emptyCart}</div>
                <div style={{ fontSize: 12, color: tk.textFaint, letterSpacing: '0.04em' }}>{t.emptyCartSub}</div>
                <Link to="/products" style={{
                  display: 'inline-block', marginTop: 8,
                  border: `1px solid ${tk.text}`, padding: '10px 28px',
                  fontSize: 11, letterSpacing: '0.12em', color: tk.text,
                  textDecoration: 'none', transition: 'background 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = tk.btnPrimary; e.currentTarget.style.color = tk.btnText }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = tk.text }}>
                  {t.goToCatalog}
                </Link>
              </div>
            ) : (
              <div className="fade-in">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize}-${idx}`} className="cart-item"
                    style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    {/* Image */}
                    <div style={{ width: 90, height: 110, background: tk.cardBg, flexShrink: 0, overflow: 'hidden' }}>
                      {(item.images?.[0] || item.image) ? (
                        <img src={item.images?.[0] || item.image} alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { e.target.style.display = 'none' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 9, color: tk.textFaint }}>sf</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: tk.text, marginBottom: 3 }}>{item.name}</div>
                          {item.article && <div style={{ fontSize: 11, color: tk.textFaint, marginBottom: 8 }}>{t.art} {item.article}</div>}
                        </div>
                        <button onClick={() => removeItem(item.id, item.selectedSize)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.textFaint, padding: 2, display: 'flex' }}
                          onMouseEnter={e => e.currentTarget.style.color = tk.text}
                          onMouseLeave={e => e.currentTarget.style.color = tk.textFaint}>
                          <X size={16} />
                        </button>
                      </div>

                      <div style={{ borderTop: `1px solid ${tk.border}`, paddingTop: 12, marginTop: 4 }}>
                        {item.selectedSize && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                            <span style={{ fontSize: 11, color: tk.textFaint }}>{t.sizes}</span>
                            <span style={{ background: tk.text, color: tk.btnText, fontSize: 11, padding: '3px 10px', fontWeight: 600 }}>
                              {item.selectedSize}
                            </span>
                          </div>
                        )}
                        {item.selectedColor && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <span style={{ fontSize: 11, color: tk.textFaint }}>● {item.selectedColor}</span>
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {/* Qty control */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <button onClick={() => updateQty(item.id, item.selectedSize, -1)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.text, fontSize: 18, lineHeight: 1, padding: 0, display: 'flex' }}>
                              <Minus size={13} />
                            </button>
                            <span style={{ fontSize: 13, minWidth: 16, textAlign: 'center', color: tk.text }}>{item.quantity || 1}</span>
                            <button onClick={() => updateQty(item.id, item.selectedSize, 1)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.text, fontSize: 18, lineHeight: 1, padding: 0, display: 'flex' }}>
                              <Plus size={13} />
                            </button>
                          </div>

                          {/* Price */}
                          <div style={{ textAlign: 'right' }}>
                            {item.oldPrice && (
                              <div style={{ fontSize: 11, color: tk.textFaint, textDecoration: 'line-through', marginBottom: 1 }}>
                                {Number(item.oldPrice).toLocaleString('ru-RU')} {t.sum}
                              </div>
                            )}
                            <div style={{ fontSize: 14, fontWeight: 600, color: item.oldPrice ? tk.saleBadge : tk.text }}>
                              {(Number(item.price) * (item.quantity || 1)).toLocaleString('ru-RU')} {t.sum}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Delivery form ── */}
          <div style={{ border: `1px solid ${tk.border}`, background: tk.surface, padding: '28px 28px 24px' }}>
            {/* Title + auth button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 500, letterSpacing: '0.05em', color: tk.text }}>{t.deliveryTitle}</h2>
              <Link to="/auth" style={{
                background: tk.btnPrimary, color: tk.btnText,
                fontSize: 11, padding: '6px 14px', letterSpacing: '0.08em',
                textDecoration: 'none', fontFamily: serif,
              }}>{t.authorize}</Link>
            </div>

            {/* ── Recipient ── */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: tk.text, marginBottom: 12 }}>
                {t.recipient}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { field: 'name',    label: t.firstName, req: true },
                  { field: 'surname', label: t.lastName,  req: true },
                  { field: 'email',   label: t.email,     req: false },
                  { field: 'phone',   label: t.phone,     req: true },
                ].map(({ field, label, req }) => (
                  <div key={field} style={{ position: 'relative' }}>
                    <input name={field} value={form[field]} onChange={handleChange}
                      placeholder={label}
                      className="inp"
                      style={{
                        ...inputStyle(field),
                        border: `1px solid ${errors[field] ? tk.reqStar : tk.inputBorder}`,
                      }} />
                    {req && (
                      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: tk.reqStar, fontSize: 14, lineHeight: 1 }}>*</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Address ── */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: tk.text, marginBottom: 12 }}>
                {t.address}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                {/* Region dropdown */}
                <div style={{ position: 'relative' }}>
                  <button onClick={() => setRegionOpen(o => !o)}
                    style={{
                      width: '100%', padding: '11px 14px', fontSize: 13,
                      fontFamily: serif, outline: 'none', cursor: 'pointer',
                      background: tk.inputBg, color: form.region ? tk.text : tk.textFaint,
                      border: `1px solid ${errors.region ? tk.reqStar : tk.inputBorder}`,
                      textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                    <span>{form.region || t.region}</span>
                    <ChevronDown size={14} style={{ color: tk.textFaint, transform: regionOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  <span style={{ position: 'absolute', right: 34, top: '50%', transform: 'translateY(-50%)', color: tk.reqStar, fontSize: 14 }}>*</span>
                  {regionOpen && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                      background: tk.inputBg, border: `1px solid ${tk.inputBorder}`,
                      maxHeight: 200, overflowY: 'auto',
                    }}>
                      {REGIONS.map(r => (
                        <div key={r} className="region-opt"
                          style={{ padding: '9px 14px', fontSize: 13, cursor: 'pointer', color: tk.text, fontFamily: serif }}
                          onClick={() => { setForm(prev => ({ ...prev, region: r })); setRegionOpen(false); if (errors.region) setErrors(p => ({ ...p, region: false })) }}>
                          {r}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {[
                  { field: 'district', label: t.district, req: true },
                  { field: 'street',   label: t.street,   req: true },
                ].map(({ field, label, req }) => (
                  <div key={field} style={{ position: 'relative' }}>
                    <input name={field} value={form[field]} onChange={handleChange}
                      placeholder={label} className="inp" style={{ ...inputStyle(field) }} />
                    {req && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: tk.reqStar, fontSize: 14 }}>*</span>}
                  </div>
                ))}

                {/* House + Apartment row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ position: 'relative' }}>
                    <input name="house" value={form.house} onChange={handleChange}
                      placeholder={t.house} className="inp" style={{ ...inputStyle('house') }} />
                    <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: tk.reqStar, fontSize: 14 }}>*</span>
                  </div>
                  <input name="apartment" value={form.apartment} onChange={handleChange}
                    placeholder={t.apartment} className="inp" style={{ ...inputStyle(null), border: `1px solid ${tk.inputBorder}` }} />
                </div>

                {/* Entrance + Intercom row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <input name="entrance" value={form.entrance} onChange={handleChange}
                    placeholder={t.entrance} className="inp" style={{ ...inputStyle(null), border: `1px solid ${tk.inputBorder}` }} />
                  <input name="intercom" value={form.intercom} onChange={handleChange}
                    placeholder={t.intercom} className="inp" style={{ ...inputStyle(null), border: `1px solid ${tk.inputBorder}` }} />
                </div>

                {/* Comment */}
                <input name="comment" value={form.comment} onChange={handleChange}
                  placeholder={t.comment} className="inp"
                  style={{ ...inputStyle(null), border: `1px solid ${tk.inputBorder}` }} />
              </div>
            </div>

            {/* ── Total + submit ── */}
            <div style={{ borderTop: `1px solid ${tk.border}`, paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: tk.text }}>{t.total}</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: tk.text }}>
                  {total.toLocaleString('ru-RU')} {t.sum}
                </span>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                style={{
                  width: '100%', padding: '14px', fontSize: 13,
                  fontFamily: serif, letterSpacing: '0.1em', cursor: loading ? 'not-allowed' : 'pointer',
                  background: loading ? tk.border : tk.btnPrimary,
                  color: loading ? tk.textFaint : tk.btnText,
                  border: 'none', transition: 'background 0.2s',
                  fontWeight: 500,
                }}>
                {loading ? t.placing : t.placeOrder}
              </button>

              <div style={{ marginTop: 12, fontSize: 10.5, color: tk.textFaint, lineHeight: 1.6 }}>
                {t.legalNote}{' '}
                <span style={{ borderBottom: `1px solid ${tk.textFaint}`, cursor: 'pointer' }}>{t.privacyPolicy}</span>
                {' '}{t.and}{' '}
                <span style={{ borderBottom: `1px solid ${tk.textFaint}`, cursor: 'pointer' }}>{t.publicOffer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
