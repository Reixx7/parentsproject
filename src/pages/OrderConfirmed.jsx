import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Moon, Sun, Home, Search, Heart, ShoppingBag, User, CheckCircle, ChevronRight } from 'lucide-react'

// ─── Design tokens ────────────────────────────────────────────────────────────
const Tk = {
  light: {
    bg: '#ffffff', surface: '#faf8f5', border: '#e8e3de',
    text: '#111111', textMuted: '#555555', textFaint: '#aaaaaa',
    headerBg: 'rgba(255,255,255,0.96)', icon: '#555555',
    btnPrimary: '#111111', btnText: '#ffffff',
    saleBadge: '#c0392b', cardBg: '#f5f2ee',
    successColor: '#2d7a4f',
  },
  dark: {
    bg: '#0f0f0f', surface: '#1a1a1a', border: '#2a2a2a',
    text: '#f0ede8', textMuted: '#b0a898', textFaint: '#666666',
    headerBg: 'rgba(15,15,15,0.96)', icon: '#b0a898',
    btnPrimary: '#f0ede8', btnText: '#111111',
    saleBadge: '#c0392b', cardBg: '#1c1c1c',
    successColor: '#5aaa7a',
  },
}

const serif = "'Cormorant Garamond', Georgia, serif"

const NAV_ROUTES = ['/products', '/category/odejda', '/category/obuv', '/category/aksessuary', '/products', '/products', '/products']

const TR = {
  ru: {
    nav: { allCollection: 'ВСЯ КОЛЛЕКЦИЯ', clothes: 'ОДЕЖДА', shoes: 'ОБУВЬ', accessories: 'АКСЕССУАРЫ', onlineOnly: 'ТОЛЬКО ОНЛАЙН', sale: 'SALE', newItems: 'НОВИНКИ' },
    confirmed: 'Заказ оформлен!',
    confirmedSub: 'Ваш заказ принят и передан в обработку. Мы свяжемся с вами в ближайшее время.',
    orderNumber: 'Номер заказа',
    orderDate: 'Дата',
    yourOrder: 'Ваш заказ',
    recipient: 'Получатель',
    phone: 'Телефон',
    email: 'Email',
    deliveryAddress: 'Адрес доставки',
    total: 'Итого',
    sum: 'сум',
    art: 'Арт.',
    qty: 'шт.',
    continueShopping: 'ПРОДОЛЖИТЬ ПОКУПКИ',
    goHome: 'НА ГЛАВНУЮ',
    noOrder: 'Информация о заказе не найдена',
    region: 'Регион',
    district: 'Район',
    street: 'Улица',
    house: 'Дом',
    comment: 'Комментарий',
    thankYou: 'Спасибо за покупку!',
  },
  en: {
    nav: { allCollection: 'ALL COLLECTION', clothes: 'CLOTHING', shoes: 'FOOTWEAR', accessories: 'ACCESSORIES', onlineOnly: 'ONLINE ONLY', sale: 'SALE', newItems: 'NEW IN' },
    confirmed: 'Order confirmed!',
    confirmedSub: 'Your order has been received and is being processed. We will contact you shortly.',
    orderNumber: 'Order number',
    orderDate: 'Date',
    yourOrder: 'Your order',
    recipient: 'Recipient',
    phone: 'Phone',
    email: 'Email',
    deliveryAddress: 'Delivery address',
    total: 'Total',
    sum: 'sum',
    art: 'Art.',
    qty: 'pcs.',
    continueShopping: 'CONTINUE SHOPPING',
    goHome: 'GO HOME',
    noOrder: 'Order information not found',
    region: 'Region',
    district: 'District',
    street: 'Street',
    house: 'House',
    comment: 'Comment',
    thankYou: 'Thank you for your purchase!',
  },
}

export default function OrderConfirmed() {
  const location = useLocation()
  const navigate  = useNavigate()
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState('ru')

  const t  = TR[lang]
  const tk = dark ? Tk.dark : Tk.light

  // Try to get order from navigation state, else from localStorage
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const savedDark = localStorage.getItem('darkMode') === 'true'
    const savedLang = localStorage.getItem('lang') || 'ru'
    setDark(savedDark)
    setLang(savedLang)

    if (location.state?.order) {
      setOrder(location.state.order)
    } else {
      // fallback: last order from localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      if (orders.length > 0) setOrder(orders[0])
    }
  }, [location.state])

  const toggleDark = () => { const n = !dark; setDark(n); localStorage.setItem('darkMode', String(n)) }
  const toggleLang = () => { const n = lang === 'ru' ? 'en' : 'ru'; setLang(n); localStorage.setItem('lang', n) }

  const navLabels = Object.values(t.nav)

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    } catch { return iso }
  }

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
        @keyframes scaleIn { from{transform:scale(0.6);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .check-anim { animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .fade-up-1  { animation: fadeUp 0.5s 0.2s ease both; }
        .fade-up-2  { animation: fadeUp 0.5s 0.35s ease both; }
        .fade-up-3  { animation: fadeUp 0.5s 0.5s ease both; }
        .info-row { display:flex; justify-content:space-between; align-items:flex-start; padding: 9px 0; }
        .info-row + .info-row { border-top: 1px solid ${dark ? '#2a2a2a' : '#e8e3de'}; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 56,
        background: tk.headerBg, borderBottom: `1px solid ${tk.border}`,
        backdropFilter: 'blur(12px)',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
           <div>
          <img className="w-[130px] h-[150px]" src="https://selfiestore.uz/static/62890302-3250-4096-b833-b364f5232082.png" alt="" />
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
          <button className="icon-btn" style={{ color: tk.icon }}><ShoppingBag size={18} /></button>
          <button className="icon-btn" style={{ color: tk.icon }}><User size={18} /></button>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 28px 100px' }}>

        {!order ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: tk.textFaint }}>
            <div style={{ fontSize: 15, marginBottom: 24 }}>{t.noOrder}</div>
            <Link to="/products" style={{ fontSize: 11, letterSpacing: '0.1em', color: tk.text, textDecoration: 'none', borderBottom: `1px solid ${tk.border}`, paddingBottom: 2 }}>
              {t.continueShopping}
            </Link>
          </div>
        ) : (
          <>
            {/* ── Success block ── */}
            <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: 48 }}>
              {/* Check icon */}
              <div className="check-anim" style={{ display: 'inline-flex', marginBottom: 20 }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="31" stroke={tk.successColor} strokeWidth="1.5"/>
                  <path d="M20 32l8 9 16-18" stroke={tk.successColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 400, letterSpacing: '0.04em', color: tk.text, fontStyle: 'italic' }}>
                {t.confirmed}
              </h1>
              <p style={{ margin: 0, fontSize: 13, color: tk.textMuted, lineHeight: 1.7, maxWidth: 440, marginInline: 'auto' }}>
                {t.confirmedSub}
              </p>

              {/* Order ID + date */}
              <div className="fade-up-2" style={{
                display: 'inline-flex', gap: 32, marginTop: 24,
                border: `1px solid ${tk.border}`, padding: '14px 28px',
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 10, color: tk.textFaint, letterSpacing: '0.08em', marginBottom: 3 }}>{t.orderNumber.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: tk.text, fontWeight: 600 }}>{order.id}</div>
                </div>
                <div style={{ width: 1, background: tk.border }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 10, color: tk.textFaint, letterSpacing: '0.08em', marginBottom: 3 }}>{t.orderDate.toUpperCase()}</div>
                  <div style={{ fontSize: 12, color: tk.text }}>{formatDate(order.date)}</div>
                </div>
              </div>
            </div>

            {/* ── Order summary ── */}
            <div className="fade-up-3">

              {/* Items */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: tk.text, marginBottom: 14 }}>
                  {t.yourOrder.toUpperCase()}
                </div>
                <div style={{ border: `1px solid ${tk.border}` }}>
                  {order.items?.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 14, padding: '14px 16px',
                      borderBottom: i < order.items.length - 1 ? `1px solid ${tk.border}` : 'none',
                    }}>
                      {/* Thumb */}
                      <div style={{ width: 56, height: 68, background: tk.cardBg, flexShrink: 0, overflow: 'hidden' }}>
                        {(item.images?.[0] || item.image) ? (
                          <img src={item.images?.[0] || item.image} alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={e => e.target.style.display = 'none'} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 8, color: tk.textFaint }}>sf</span>
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: tk.text, marginBottom: 2 }}>{item.name}</div>
                        {item.article && <div style={{ fontSize: 10, color: tk.textFaint, marginBottom: 4 }}>{t.art} {item.article}</div>}
                        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: tk.textMuted }}>
                          {item.selectedSize && <span>{item.selectedSize}</span>}
                          {item.selectedColor && <span>{item.selectedColor}</span>}
                          <span>{item.quantity || 1} {t.qty}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        {item.oldPrice && (
                          <div style={{ fontSize: 10, color: tk.textFaint, textDecoration: 'line-through' }}>
                            {Number(item.oldPrice).toLocaleString('ru-RU')} {t.sum}
                          </div>
                        )}
                        <div style={{ fontSize: 13, fontWeight: 600, color: item.oldPrice ? tk.saleBadge : tk.text }}>
                          {(Number(item.price) * (item.quantity || 1)).toLocaleString('ru-RU')} {t.sum}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Total row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: tk.cardBg, borderTop: `1px solid ${tk.border}` }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: tk.text }}>{t.total}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: tk.text }}>
                      {order.total?.toLocaleString('ru-RU')} {t.sum}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recipient + Address */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 36 }}>
                {/* Recipient */}
                <div style={{ border: `1px solid ${tk.border}`, padding: '18px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: tk.text, marginBottom: 12 }}>
                    {t.recipient.toUpperCase()}
                  </div>
                  {[
                    [t.recipient, `${order.form?.name} ${order.form?.surname}`.trim()],
                    [t.phone,     order.form?.phone],
                    [t.email,     order.form?.email || '—'],
                  ].map(([label, value]) => value && (
                    <div key={label} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 10, color: tk.textFaint, marginBottom: 1 }}>{label}</div>
                      <div style={{ fontSize: 12, color: tk.text }}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* Address */}
                <div style={{ border: `1px solid ${tk.border}`, padding: '18px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: tk.text, marginBottom: 12 }}>
                    {t.deliveryAddress.toUpperCase()}
                  </div>
                  {[
                    [t.region,   order.form?.region],
                    [t.district, order.form?.district],
                    [t.street,   order.form?.street],
                    [t.house,    [order.form?.house, order.form?.apartment && `кв. ${order.form.apartment}`, order.form?.entrance && `п. ${order.form.entrance}`].filter(Boolean).join(', ')],
                    order.form?.comment && [t.comment, order.form.comment],
                  ].filter(Boolean).map(([label, value]) => value && (
                    <div key={label} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 10, color: tk.textFaint, marginBottom: 1 }}>{label}</div>
                      <div style={{ fontSize: 12, color: tk.text }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thank you note */}
              <div style={{ textAlign: 'center', marginBottom: 36, paddingTop: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 400, fontStyle: 'italic', color: tk.textMuted, letterSpacing: '0.04em' }}>
                  {t.thankYou}
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <Link to="/products"
                  style={{
                    padding: '12px 32px', fontSize: 11, letterSpacing: '0.12em',
                    background: tk.btnPrimary, color: tk.btnText,
                    textDecoration: 'none', fontFamily: serif,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  {t.continueShopping}
                </Link>
                <Link to="/"
                  style={{
                    padding: '12px 32px', fontSize: 11, letterSpacing: '0.12em',
                    background: 'none', color: tk.text,
                    border: `1px solid ${tk.border}`,
                    textDecoration: 'none', fontFamily: serif,
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = tk.text}
                  onMouseLeave={e => e.currentTarget.style.borderColor = tk.border}>
                  {t.goHome}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
