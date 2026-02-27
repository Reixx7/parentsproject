import { useState, useEffect } from 'react'
import {
  Moon, Sun, LogOut, LayoutDashboard, Package, Users,
  ShoppingBag, BarChart2, Settings, ChevronLeft, ChevronRight,
  Eye, EyeOff, TrendingUp, AlertCircle, Search, X, Globe
} from 'lucide-react'

// ─── Tokens ───────────────────────────────────────────────────────────────────
const Tk = {
  light: {
    bg: '#ffffff', surface: '#faf8f5', border: '#e8e3de',
    text: '#111111', textMuted: '#555555', textFaint: '#aaaaaa',
    headerBg: 'rgba(255,255,255,0.97)', icon: '#777777',
    btnPrimary: '#111111', btnText: '#ffffff',
    saleBadge: '#c0392b', inputBg: '#ffffff', inputBorder: '#d4cfc9',
    accent: '#8a6a5a', accentLight: '#f5f1ed',
    sidebarBg: '#faf8f5', sidebarActive: '#f0ebe5',
    tableBorder: '#f0ede8', cardBg: '#f5f2ee',
    line: '#c4a882', lineFill: 'rgba(196,168,130,0.1)',
    dot: '#8a6a5a',
  },
  dark: {
    bg: '#0d0d0d', surface: '#151515', border: '#222222',
    text: '#f0ede8', textMuted: '#a09088', textFaint: '#484848',
    headerBg: 'rgba(13,13,13,0.97)', icon: '#888888',
    btnPrimary: '#f0ede8', btnText: '#111111',
    saleBadge: '#e05c5c', inputBg: '#111111', inputBorder: '#2a2520',
    accent: '#c4a882', accentLight: '#1a1612',
    sidebarBg: '#0a0a0a', sidebarActive: '#181410',
    tableBorder: '#191919', cardBg: '#151515',
    line: '#c4a882', lineFill: 'rgba(196,168,130,0.06)',
    dot: '#c4a882',
  },
}

const serif = "'Cormorant Garamond', Georgia, serif"
const ADMIN_LOGIN    = 'admin'
const ADMIN_PASSWORD = 'selfie2026'


// ─── Translations ──────────────────────────────────────────────────────────────
const TR = {
  ru: {
    title: 'selfie', adminPanel: 'ADMIN PANEL',
    loginLabel: 'ЛОГИН', passLabel: 'ПАРОЛЬ', enterBtn: 'ВОЙТИ', enteringBtn: 'ВХОД...',
    fillAll: 'Заполните все поля', wrongCreds: 'Неверный логин или пароль',
    nav: { dashboard:'Дашборд', orders:'Заказы', users:'Клиенты', products:'Товары', analytics:'Аналитика', settings:'Настройки' },
    logout: 'Выйти',
    revenue: 'Выручка', ordersLbl: 'Заказы', clientsLbl: 'Клиенты', goodsLbl: 'Товары',
    sum: 'сум', total: 'всего', registered: 'зарегистрировано', inCatalog: 'в каталоге',
    revenueByMonth: 'ВЫРУЧКА ПО МЕСЯЦАМ',
    topGoods: 'ТОП ТОВАРЫ', sales: 'продаж',
    recentOrders: 'ПОСЛЕДНИЕ ЗАКАЗЫ', noOrders: 'Заказов пока нет',
    allOrders: 'ВСЕ ЗАКАЗЫ', ordersNotFound: 'Заказы не найдены',
    filterAll: 'Все', filterNew: 'Новые', filterWay: 'В пути', filterDone: 'Доставлены',
    clientsTitle: 'КЛИЕНТЫ', noClients: 'Зарегистрированных клиентов нет',
    colClient: 'КЛИЕНТ', colEmail: 'EMAIL', colPhone: 'ТЕЛЕФОН', colDate: 'ДАТА',
    goodsTitle: 'ТОВАРЫ', noStock: 'НЕТ', pcs: 'шт',
    analyticsCards: ['Средний чек','Конверсия','Возвраты','Новые клиенты'],
    analyticsDesc: ['По всем заказам','Посетители → Покупки','От общего числа заказов','Всего зарегистрировано'],
    ordersByStatus: 'ЗАКАЗЫ ПО СТАТУСУ',
    settingsTitle: 'НАСТРОЙКИ МАГАЗИНА',
    settingsFields: ['Название магазина','Email поддержки','Телефон','Валюта'],
    settingsDefs: ['Selfie','support@selfie.uz','+998 55 508 00 60','UZS (сум)'],
    save: 'СОХРАНИТЬ',
    accessTitle: 'ДОСТУП В ПАНЕЛЬ',
    accessText: 'Логин: admin\nПароль задаётся в AdminPanel.jsx → ADMIN_PASSWORD',
    colId: 'ID', colCustomer: 'КЛИЕНТ', colTel: 'ТЕЛЕФОН', colItems: 'ТОВАРЫ',
    colAmount: 'СУММА', colStatus: 'СТАТУС', colDt: 'ДАТА',
    addressLbl: 'АДРЕС ДОСТАВКИ', itemsLbl: 'СОСТАВ ЗАКАЗА',
    house: 'дом', apt: 'кв.',
    months: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    statuses: { pending:'Новый', processing:'В обработке', shipped:'В пути', delivered:'Доставлен', cancelled:'Отменён' },
    search: 'Поиск...',
    copyright: '© 2026 SELFIE',
  },
  en: {
    title: 'selfie', adminPanel: 'ADMIN PANEL',
    loginLabel: 'LOGIN', passLabel: 'PASSWORD', enterBtn: 'SIGN IN', enteringBtn: 'SIGNING IN...',
    fillAll: 'Please fill all fields', wrongCreds: 'Invalid login or password',
    nav: { dashboard:'Dashboard', orders:'Orders', users:'Clients', products:'Products', analytics:'Analytics', settings:'Settings' },
    logout: 'Log out',
    revenue: 'Revenue', ordersLbl: 'Orders', clientsLbl: 'Clients', goodsLbl: 'Products',
    sum: 'sum', total: 'total', registered: 'registered', inCatalog: 'in catalog',
    revenueByMonth: 'REVENUE BY MONTH',
    topGoods: 'TOP PRODUCTS', sales: 'sales',
    recentOrders: 'RECENT ORDERS', noOrders: 'No orders yet',
    allOrders: 'ALL ORDERS', ordersNotFound: 'No orders found',
    filterAll: 'All', filterNew: 'New', filterWay: 'In transit', filterDone: 'Delivered',
    clientsTitle: 'CLIENTS', noClients: 'No registered clients',
    colClient: 'CLIENT', colEmail: 'EMAIL', colPhone: 'PHONE', colDate: 'DATE',
    goodsTitle: 'PRODUCTS', noStock: 'OUT', pcs: 'pcs',
    analyticsCards: ['Avg. order','Conversion','Returns','New clients'],
    analyticsDesc: ['Across all orders','Visitors → Purchases','Of total orders','Total registered'],
    ordersByStatus: 'ORDERS BY STATUS',
    settingsTitle: 'STORE SETTINGS',
    settingsFields: ['Store name','Support email','Phone','Currency'],
    settingsDefs: ['Selfie','support@selfie.uz','+998 55 508 00 60','UZS (sum)'],
    save: 'SAVE',
    accessTitle: 'PANEL ACCESS',
    accessText: 'Login: admin\nPassword is set in AdminPanel.jsx → ADMIN_PASSWORD',
    colId: 'ID', colCustomer: 'CLIENT', colTel: 'PHONE', colItems: 'ITEMS',
    colAmount: 'AMOUNT', colStatus: 'STATUS', colDt: 'DATE',
    addressLbl: 'DELIVERY ADDRESS', itemsLbl: 'ORDER ITEMS',
    house: 'house', apt: 'apt.',
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    statuses: { pending:'New', processing:'Processing', shipped:'In transit', delivered:'Delivered', cancelled:'Cancelled' },
    search: 'Search...',
    copyright: '© 2026 SELFIE',
  },
}

const mockProducts = [
  { name: 'Шёлковое платье',    category: 'Платья',         stock: 24, price: 189000, sales: 89  },
  { name: 'Льняной жакет',      category: 'Верхняя одежда', stock: 12, price: 320000, sales: 56  },
  { name: 'Кашемировый свитер', category: 'Джемперы',       stock: 0,  price: 450000, sales: 102 },
  { name: 'Джинсы скинни',      category: 'Брюки',          stock: 38, price: 165000, sales: 145 },
  { name: 'Вечернее платье',    category: 'Платья',         stock: 7,  price: 590000, sales: 34  },
]

const navIds   = ['dashboard','orders','users','products','analytics','settings']
const navIcons = [LayoutDashboard, Package, Users, ShoppingBag, BarChart2, Settings]

const fmt   = n  => Number(n).toLocaleString('ru-RU')
const fmtDt = (iso, lang) => {
  try { return new Date(iso).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) }
  catch { return iso || '—' }
}

// ─── SVG Line Chart ───────────────────────────────────────────────────────────
function LineChart({ data, months, tk, curMonth }) {
  const W = 580, H = 108, pad = { t: 14, b: 26, l: 8, r: 8 }
  const iW = W - pad.l - pad.r
  const iH = H - pad.t - pad.b
  const max = Math.max(...data, 1)

  const pts = data.map((v, i) => ({
    x: pad.l + (i / (data.length - 1)) * iW,
    y: pad.t + iH - (v / max) * iH,
  }))

  const curve = pts.map((p, i) => {
    if (i === 0) return `M${p.x},${p.y}`
    const cx = iW / (data.length - 1) * 0.38
    return `C${pts[i-1].x + cx},${pts[i-1].y} ${p.x - cx},${p.y} ${p.x},${p.y}`
  }).join(' ')

  const area = `${curve} L${pts[pts.length-1].x},${H - pad.b} L${pts[0].x},${H - pad.b} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 108, overflow: 'visible' }}>
      {[0.33, 0.66, 1].map(f => (
        <line key={f} x1={pad.l} x2={W-pad.r} y1={pad.t + iH*(1-f)} y2={pad.t + iH*(1-f)}
          stroke={tk.border} strokeWidth={0.5} strokeDasharray="3,5"/>
      ))}
      <path d={area} fill={tk.lineFill}/>
      <path d={curve} fill="none" stroke={tk.line} strokeWidth={1.8}/>
      {pts.map((p, i) => (
        <g key={i}>
          {i === curMonth && <circle cx={p.x} cy={p.y} r={6} fill={tk.dot} opacity={0.12}/>}
          <circle cx={p.x} cy={p.y} r={i === curMonth ? 3.5 : 2}
            fill={i === curMonth ? tk.dot : tk.line}
            stroke={tk.bg} strokeWidth={i === curMonth ? 1.5 : 0}/>
          <text x={p.x} y={H-4} textAnchor="middle" fontSize={7.5} fill={tk.textFaint} fontFamily={serif}>
            {months[i]}
          </text>
        </g>
      ))}
    </svg>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function Badge({ status, t, dark }) {
  const label = t.statuses[status] || t.statuses.pending
  const map = {
    [t.statuses.delivered]:  { bg: dark ? '#0f2a18' : '#e6f4ea', c: dark ? '#4caf7d' : '#1b5e3b' },
    [t.statuses.shipped]:    { bg: dark ? '#0a1e30' : '#e3f0fc', c: dark ? '#5aadfa' : '#1254a0' },
    [t.statuses.processing]: { bg: dark ? '#2a2008' : '#fff8e1', c: dark ? '#fbbf24' : '#a05a00' },
    [t.statuses.pending]:    { bg: dark ? '#1a1612' : '#f5f1ed', c: dark ? '#c4a882' : '#7a5a4a' },
    [t.statuses.cancelled]:  { bg: dark ? '#2a0e0e' : '#fdecea', c: dark ? '#f87171' : '#b71c1c' },
  }
  const s = map[label] || map[t.statuses.pending]
  return (
    <span style={{ background: s.bg, color: s.c, fontSize: 9.5, padding: '3px 9px', letterSpacing: '0.07em', display: 'inline-block', whiteSpace: 'nowrap' }}>
      {label}
    </span>
  )
}

// ─── Orders Table ─────────────────────────────────────────────────────────────
function OrdersTable({ orders, tk, dark, t, lang, expanded = false }) {
  const [open, setOpen] = useState(null)
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${tk.border}` }}>
          {[t.colId, t.colCustomer, t.colTel, t.colItems, t.colAmount, t.colStatus, t.colDt, expanded ? '' : null]
            .filter(v => v !== null)
            .map(h => (
              <th key={h} style={{ textAlign: 'left', paddingBottom: 10, fontSize: 9, letterSpacing: '0.12em', color: tk.textFaint, fontWeight: 400 }}>{h}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {orders.map((o, i) => (
          <>
            <tr key={o.id || i} className="row-hover"
              style={{ borderBottom: `1px solid ${tk.tableBorder}`, cursor: expanded ? 'pointer' : 'default' }}
              onClick={() => expanded && setOpen(open === i ? null : i)}>
              <td style={{ padding: '11px 8px 11px 0', fontSize: 10, color: tk.accent, fontFamily: 'monospace' }}>{(o.id||'—').slice(0,12)}</td>
              <td style={{ fontSize: 13, color: tk.text, paddingRight: 10 }}>{o.form?.name} {o.form?.surname}</td>
              <td style={{ fontSize: 11, color: tk.textMuted, paddingRight: 10 }}>{o.form?.phone || '—'}</td>
              <td style={{ fontSize: 11, color: tk.textMuted }}>{o.items?.length || 0} {lang==='ru'?'шт.':'pcs.'}</td>
              <td style={{ fontSize: 13, fontStyle: 'italic', color: tk.text, paddingRight: 10, whiteSpace: 'nowrap' }}>{fmt(o.total)} {t.sum}</td>
              <td style={{ paddingRight: 8 }}><Badge status={o.status} t={t} dark={dark}/></td>
              <td style={{ fontSize: 10, color: tk.textFaint, whiteSpace: 'nowrap' }}>{fmtDt(o.date, lang)}</td>
              {expanded && <td style={{ fontSize: 11, color: tk.textFaint, paddingLeft: 4 }}>{open===i?'▲':'▼'}</td>}
            </tr>
            {expanded && open === i && (
              <tr key={`d${i}`}>
                <td colSpan={8} style={{ paddingBottom: 14 }}>
                  <div style={{ background: tk.cardBg, padding: '16px 20px', borderLeft: `2px solid ${tk.accent}`, marginTop: 2 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: o.form?.comment ? 12 : 0 }}>
                      <div>
                        <div style={{ fontSize: 9, letterSpacing: '0.14em', color: tk.textFaint, marginBottom: 8 }}>{t.addressLbl}</div>
                        <div style={{ fontSize: 12, color: tk.textMuted, lineHeight: 1.9 }}>
                          {[o.form?.region, o.form?.district,
                            o.form?.street && `ул. ${o.form.street}`,
                            o.form?.house  && `${t.house} ${o.form.house}${o.form?.apartment?`, ${t.apt} ${o.form.apartment}`:''}`
                          ].filter(Boolean).map((ln, j) => <div key={j}>{ln}</div>)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, letterSpacing: '0.14em', color: tk.textFaint, marginBottom: 8 }}>{t.itemsLbl}</div>
                        {o.items?.map((item, j) => (
                          <div key={j} style={{ fontSize: 12, color: tk.textMuted, marginBottom: 4 }}>
                            {item.name} × {item.quantity||1} —{' '}
                            <span style={{ fontStyle: 'italic' }}>{fmt(item.price*(item.quantity||1))} {t.sum}</span>
                            {item.selectedSize && <span style={{ color: tk.textFaint, fontSize: 10 }}> · {item.selectedSize}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    {o.form?.comment && (
                      <div style={{ fontSize: 11, color: tk.textFaint, fontStyle: 'italic', borderTop: `1px solid ${tk.border}`, paddingTop: 10 }}>
                        💬 {o.form.comment}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════════════════
function AdminLogin({ onLogin, dark, toggleDark, lang, toggleLang, t }) {
  const tk = dark ? Tk.dark : Tk.light
  const [login,    setLogin]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [shake,    setShake]    = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!login.trim() || !password.trim()) { setError(t.fillAll); setShake(true); setTimeout(() => setShake(false), 400); return }
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 550))
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError(t.wrongCreds); setShake(true); setTimeout(() => setShake(false), 400)
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: tk.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: serif, transition: 'background 0.3s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box}
        .l-inp{transition:border-color 0.2s;outline:none;border-radius:0}
        .l-inp:focus{border-color:${tk.text} !important}
        .l-inp::placeholder{color:${tk.textFaint};font-family:${serif}}
        .l-btn{transition:opacity 0.18s}
        .l-btn:hover:not(:disabled){opacity:.8}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
        .fu{animation:fadeUp .45s ease both}
        .sk{animation:shake .35s ease}
      `}</style>

      {/* Controls top-right */}
      <div style={{ position: 'fixed', top: 20, right: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={toggleLang} style={{ background: 'none', border: `1px solid ${tk.border}`, cursor: 'pointer', color: tk.textFaint, fontSize: 9, letterSpacing: '0.16em', padding: '5px 11px', fontFamily: serif }}>
          {lang === 'ru' ? 'EN' : 'RU'}
        </button>
        <button onClick={toggleDark} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.icon, display: 'flex' }}>
          {dark ? <Sun size={17}/> : <Moon size={17}/>}
        </button>
      </div>

      <div className="fu" style={{ width: 330, maxWidth: '92vw' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ fontSize: 34, fontWeight: 400, fontStyle: 'italic', letterSpacing: '0.12em', color: tk.text }}>{t.title}</div>
          <div style={{ fontSize: 8.5, letterSpacing: '0.32em', color: tk.textFaint, marginTop: 7 }}>{t.adminPanel}</div>
          <div style={{ width: 20, height: 1, background: tk.border, margin: '20px auto 0' }}/>
        </div>

        <form onSubmit={handleSubmit} className={shake ? 'sk' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 8.5, letterSpacing: '0.22em', color: tk.textFaint, marginBottom: 8 }}>{t.loginLabel}</div>
            <input className="l-inp" value={login} onChange={e => { setLogin(e.target.value); setError('') }}
              autoComplete="username" placeholder="admin"
              style={{ width: '100%', padding: '12px 14px', fontSize: 13, fontFamily: serif, background: tk.inputBg, color: tk.text, border: `1px solid ${error ? tk.saleBadge : tk.inputBorder}` }}/>
          </div>
          <div>
            <div style={{ fontSize: 8.5, letterSpacing: '0.22em', color: tk.textFaint, marginBottom: 8 }}>{t.passLabel}</div>
            <div style={{ position: 'relative' }}>
              <input className="l-inp" type={showPass ? 'text' : 'password'} value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                autoComplete="current-password" placeholder="••••••••"
                style={{ width: '100%', padding: '12px 42px 12px 14px', fontSize: 13, fontFamily: serif, background: tk.inputBg, color: tk.text, border: `1px solid ${error ? tk.saleBadge : tk.inputBorder}` }}/>
              <button type="button" onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: tk.icon, display: 'flex' }}>
                {showPass ? <EyeOff size={14}/> : <Eye size={14}/>}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: tk.saleBadge }}>
              <AlertCircle size={12}/> {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="l-btn"
            style={{ marginTop: 6, padding: '13px', fontSize: 9.5, letterSpacing: '0.22em', fontFamily: serif, background: loading ? tk.border : tk.btnPrimary, color: loading ? tk.textFaint : tk.btnText, border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? t.enteringBtn : t.enterBtn}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 40, fontSize: 8.5, letterSpacing: '0.16em', color: tk.textFaint }}>{t.copyright}</div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PANEL
// ═══════════════════════════════════════════════════════════════════════════════
export default function AdminPanel() {
  const [authed,      setAuthed]      = useState(false)
  const [dark,        setDark]        = useState(false)
  const [lang,        setLang]        = useState('ru')
  const [active,      setActive]      = useState('dashboard')
  const [collapsed,   setCollapsed]   = useState(false)
  const [orders,      setOrders]      = useState([])
  const [users,       setUsers]       = useState([])
  const [search,      setSearch]      = useState('')
  const [orderFilter, setOrderFilter] = useState('all')

  const t  = TR[lang]
  const tk = dark ? Tk.dark : Tk.light

  const toggleDark = () => { const n = !dark; setDark(n); localStorage.setItem('darkMode', String(n)) }
  const toggleLang = () => { const n = lang==='ru'?'en':'ru'; setLang(n); localStorage.setItem('lang', n) }

  useEffect(() => {
    setDark(localStorage.getItem('darkMode') === 'true')
    setLang(localStorage.getItem('lang') || 'ru')
    setOrders(JSON.parse(localStorage.getItem('orders') || '[]'))
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'))
  }, [])

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} dark={dark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} t={t}/>

  const handleLogout = () => { setAuthed(false) }

  const totalRevenue = orders.reduce((s, o) => s + (Number(o.total)||0), 0)
  const avgOrder     = orders.length ? Math.round(totalRevenue / orders.length) : 0
  const curMonth     = new Date().getMonth()

  const filteredOrders = orders.filter(o => {
    const mf = orderFilter==='all' || o.status===orderFilter || (orderFilter==='pending' && !o.status)
    const ms = !search || [`${o.form?.name||''} ${o.form?.surname||''}`, o.form?.phone||'', o.id||''].some(s => s.toLowerCase().includes(search.toLowerCase()))
    return mf && ms
  })

  const statsCards = [
    { label: t.revenue,    value: fmt(totalRevenue) + ' ' + t.sum, Icon: TrendingUp, note: `${orders.length} ${t.total}` },
    { label: t.ordersLbl,  value: fmt(orders.length),               Icon: Package,    note: t.total },
    { label: t.clientsLbl, value: fmt(users.length),                Icon: Users,      note: t.registered },
    { label: t.goodsLbl,   value: fmt(mockProducts.length),         Icon: ShoppingBag,note: t.inCatalog },
  ]

  // Build chart data from real orders by month, fallback to mock
  const chartData = (() => {
    const byMonth = Array(12).fill(0)
    orders.forEach(o => { try { byMonth[new Date(o.date).getMonth()] += Number(o.total)||0 } catch {} })
    return byMonth.some(v => v > 0) ? byMonth : [40,65,45,80,55,90,70,85,60,95,75,88].map(v => v*1000)
  })()

  return (
    <div style={{ minHeight:'100vh', display:'flex', fontFamily:serif, background:tk.bg, color:tk.text, transition:'background 0.3s, color 0.3s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${tk.border}}
        .nav-btn:hover{background:${tk.sidebarActive} !important}
        .row-hover:hover td{background:${tk.accentLight}}
        .inp:focus{border-color:${tk.accent} !important;outline:none}
        .inp::placeholder{color:${tk.textFaint};font-family:${serif}}
        .stat-card{transition:transform 0.18s}
        .stat-card:hover{transform:translateY(-2px)}
        @keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fi .26s ease both}
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ width:collapsed?54:208, flexShrink:0, background:tk.sidebarBg, borderRight:`1px solid ${tk.border}`, display:'flex', flexDirection:'column', transition:'width 0.22s ease', position:'sticky', top:0, height:'100vh', overflow:'hidden' }}>
        <div style={{ padding:'22px 12px', borderBottom:`1px solid ${tk.border}`, display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
          <div style={{ fontSize:17, fontWeight:400, fontStyle:'italic', letterSpacing:'0.1em', color:tk.text, whiteSpace:'nowrap', opacity:collapsed?0:1, transition:'opacity 0.15s', flex:1 }}>
            selfie
          </div>
          <button onClick={() => setCollapsed(c=>!c)} style={{ background:'none', border:'none', cursor:'pointer', color:tk.textFaint, display:'flex', flexShrink:0 }}>
            {collapsed ? <ChevronRight size={14}/> : <ChevronLeft size={14}/>}
          </button>
        </div>

        <nav style={{ flex:1, padding:'10px 5px', overflowY:'auto' }}>
          {navIds.map((id, i) => {
            const Icon = navIcons[i]
            return (
              <button key={id} onClick={() => setActive(id)} className="nav-btn"
                style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'9px 10px', background:active===id?tk.sidebarActive:'transparent', color:active===id?tk.text:tk.textMuted, border:'none', cursor:'pointer', marginBottom:1, borderLeft:active===id?`2px solid ${tk.accent}`:'2px solid transparent', fontFamily:serif, fontSize:11.5, letterSpacing:'0.05em', transition:'all 0.14s', textAlign:'left', whiteSpace:'nowrap' }}>
                <Icon size={14} style={{ flexShrink:0 }}/>
                {!collapsed && t.nav[id]}
              </button>
            )
          })}
        </nav>

        <div style={{ padding:'8px 5px', borderTop:`1px solid ${tk.border}`, flexShrink:0 }}>
          <button onClick={handleLogout} className="nav-btn"
            style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'9px 10px', background:'transparent', color:tk.saleBadge, border:'none', cursor:'pointer', fontFamily:serif, fontSize:11.5, letterSpacing:'0.05em', whiteSpace:'nowrap' }}>
            <LogOut size={14} style={{ flexShrink:0 }}/>
            {!collapsed && t.logout}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>

        {/* Header */}
        <header style={{ position:'sticky', top:0, zIndex:50, background:tk.headerBg, backdropFilter:'blur(12px)', borderBottom:`1px solid ${tk.border}`, padding:'0 24px', height:52, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div style={{ fontSize:13, letterSpacing:'0.08em', color:tk.text }}>{t.nav[active]}</div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ position:'relative' }}>
              <Search size={11} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:tk.textFaint }}/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search} className="inp"
                style={{ paddingLeft:28, paddingRight:search?26:10, paddingTop:6, paddingBottom:6, fontSize:11, fontFamily:serif, background:tk.inputBg, color:tk.text, border:`1px solid ${tk.border}`, width:180 }}/>
              {search && <button onClick={() => setSearch('')} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:tk.textFaint, display:'flex' }}><X size={10}/></button>}
            </div>
            <button onClick={toggleLang} style={{ background:'none', border:`1px solid ${tk.border}`, cursor:'pointer', color:tk.textFaint, fontSize:8.5, letterSpacing:'0.18em', padding:'4px 9px', fontFamily:serif, display:'flex', alignItems:'center', gap:4 }}>
              <Globe size={10}/>{lang==='ru'?'EN':'RU'}
            </button>
            <button onClick={toggleDark} style={{ background:'none', border:'none', cursor:'pointer', color:tk.icon, display:'flex' }}>
              {dark ? <Sun size={15}/> : <Moon size={15}/>}
            </button>
          </div>
        </header>

        <div style={{ padding:'22px', flex:1 }}>

          {/* ── DASHBOARD ── */}
          {active === 'dashboard' && (
            <div className="fi">
              {/* Stats row */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:18 }}>
                {statsCards.map((s, i) => (
                  <div key={i} className="stat-card" style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'18px 18px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                      <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint }}>{s.label.toUpperCase()}</div>
                      <s.Icon size={14} style={{ color:tk.accent, opacity:0.75 }}/>
                    </div>
                    <div style={{ fontSize:19, fontWeight:400, fontStyle:'italic', color:tk.text, marginBottom:3, lineHeight:1.2 }}>{s.value}</div>
                    <div style={{ fontSize:10, color:tk.textFaint }}>{s.note}</div>
                  </div>
                ))}
              </div>

              {/* Line chart + Top */}
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:10, marginBottom:18 }}>
                <div style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'20px 20px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                    <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint }}>{t.revenueByMonth}</div>
                    <div style={{ fontSize:12, fontStyle:'italic', color:tk.accent }}>{fmt(totalRevenue)} {t.sum}</div>
                  </div>
                  <LineChart data={chartData} months={t.months} tk={tk} curMonth={curMonth}/>
                </div>

                <div style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'20px 20px' }}>
                  <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint, marginBottom:16 }}>{t.topGoods}</div>
                  {[...mockProducts].sort((a,b)=>b.sales-a.sales).slice(0,4).map((p,i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:i<3?`1px solid ${tk.tableBorder}`:'none' }}>
                      <div>
                        <div style={{ fontSize:12, color:tk.text }}>{p.name}</div>
                        <div style={{ fontSize:9, color:tk.textFaint, marginTop:1 }}>{p.sales} {t.sales}</div>
                      </div>
                      <div style={{ fontSize:11, color:tk.accent, fontStyle:'italic', whiteSpace:'nowrap', marginLeft:8 }}>{fmt(p.price)} {t.sum}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent orders */}
              <div style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'20px 20px' }}>
                <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint, marginBottom:16 }}>{t.recentOrders}</div>
                {orders.length === 0
                  ? <div style={{ textAlign:'center', padding:'28px 0', fontSize:13, color:tk.textFaint, fontStyle:'italic' }}>{t.noOrders}</div>
                  : <OrdersTable orders={orders.slice(0,5)} tk={tk} dark={dark} t={t} lang={lang}/>
                }
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {active === 'orders' && (
            <div className="fi">
              <div style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'20px 20px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
                  <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint }}>{t.allOrders} ({filteredOrders.length})</div>
                  <div style={{ display:'flex', gap:5 }}>
                    {[['all',t.filterAll],['pending',t.filterNew],['shipped',t.filterWay],['delivered',t.filterDone]].map(([val,lbl]) => (
                      <button key={val} onClick={() => setOrderFilter(val)}
                        style={{ padding:'4px 11px', fontSize:9, letterSpacing:'0.1em', fontFamily:serif, background:orderFilter===val?tk.btnPrimary:'transparent', color:orderFilter===val?tk.btnText:tk.textFaint, border:`1px solid ${orderFilter===val?tk.btnPrimary:tk.border}`, cursor:'pointer', transition:'all 0.14s' }}>
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>
                {filteredOrders.length === 0
                  ? <div style={{ textAlign:'center', padding:'32px 0', fontSize:13, color:tk.textFaint, fontStyle:'italic' }}>{t.ordersNotFound}</div>
                  : <OrdersTable orders={filteredOrders} tk={tk} dark={dark} t={t} lang={lang} expanded/>
                }
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {active === 'users' && (
            <div className="fi" style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'20px 20px' }}>
              <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint, marginBottom:18 }}>{t.clientsTitle} ({users.length})</div>
              {users.length === 0
                ? <div style={{ textAlign:'center', padding:'32px 0', fontSize:13, color:tk.textFaint, fontStyle:'italic' }}>{t.noClients}</div>
                : (
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom:`1px solid ${tk.border}` }}>
                        {[t.colClient, t.colEmail, t.colPhone, t.colDate].map(h => (
                          <th key={h} style={{ textAlign:'left', paddingBottom:10, fontSize:9, letterSpacing:'0.12em', color:tk.textFaint, fontWeight:400 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, i) => (
                        <tr key={i} className="row-hover" style={{ borderBottom:`1px solid ${tk.tableBorder}` }}>
                          <td style={{ padding:'11px 0' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                              <div style={{ width:28, height:28, background:tk.cardBg, border:`1px solid ${tk.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:tk.textMuted, flexShrink:0 }}>
                                {(u.name||'?')[0].toUpperCase()}
                              </div>
                              <span style={{ fontSize:13, color:tk.text }}>{u.name||'—'}</span>
                            </div>
                          </td>
                          <td style={{ fontSize:12, color:tk.textMuted }}>{u.email||'—'}</td>
                          <td style={{ fontSize:12, color:tk.textMuted }}>{u.phone||'—'}</td>
                          <td style={{ fontSize:10, color:tk.textFaint }}>{u.createdAt ? fmtDt(u.createdAt, lang) : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              }
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {active === 'products' && (
            <div className="fi">
              <div style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'20px 20px' }}>
                <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint, marginBottom:18 }}>{t.goodsTitle} ({mockProducts.length})</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                  {mockProducts.map((p,i) => (
                    <div key={i} style={{ border:`1px solid ${tk.border}`, padding:'16px 16px', background:p.stock===0?(dark?'#120e0e':'#fff9f9'):tk.bg, transition:'border-color 0.2s' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                        <div>
                          <div style={{ fontSize:13, color:tk.text, marginBottom:3 }}>{p.name}</div>
                          <div style={{ fontSize:8.5, letterSpacing:'0.1em', color:tk.textFaint }}>{p.category.toUpperCase()}</div>
                        </div>
                        <span style={{ fontSize:8.5, padding:'3px 7px', background:p.stock===0?(dark?'#2a1010':'#fdecea'):(dark?'#102210':'#e6f4ea'), color:p.stock===0?'#f87171':(dark?'#4caf7d':'#1b5e3b'), letterSpacing:'0.07em', flexShrink:0, marginLeft:8 }}>
                          {p.stock===0 ? t.noStock : `${p.stock} ${t.pcs}`}
                        </span>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', paddingTop:10, borderTop:`1px solid ${tk.tableBorder}` }}>
                        <span style={{ fontSize:14, fontStyle:'italic', color:tk.text }}>{fmt(p.price)} {t.sum}</span>
                        <span style={{ fontSize:9.5, color:tk.textFaint }}>{p.sales} {t.sales}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {active === 'analytics' && (
            <div className="fi">
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:14 }}>
                {t.analyticsCards.map((title,i) => {
                  const vals = [fmt(avgOrder)+' '+t.sum, '3.4%', '2.1%', fmt(users.length)]
                  return (
                    <div key={i} style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'22px 22px' }}>
                      <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint, marginBottom:14 }}>{title.toUpperCase()}</div>
                      <div style={{ fontSize:26, fontWeight:400, fontStyle:'italic', color:tk.text, marginBottom:5 }}>{vals[i]}</div>
                      <div style={{ fontSize:10, color:tk.textFaint }}>{t.analyticsDesc[i]}</div>
                    </div>
                  )
                })}
              </div>

              <div style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'20px 20px' }}>
                <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint, marginBottom:18 }}>{t.ordersByStatus}</div>
                {['pending','shipped','delivered','cancelled'].map(s => {
                  const count = orders.filter(o => (o.status||'pending')===s).length
                  const pct   = orders.length ? Math.round(count/orders.length*100) : 0
                  return (
                    <div key={s} style={{ marginBottom:16 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                        <span style={{ fontSize:12, color:tk.textMuted }}>{t.statuses[s]}</span>
                        <span style={{ fontSize:10, color:tk.textFaint }}>{count} ({pct}%)</span>
                      </div>
                      <div style={{ height:2, background:tk.border }}>
                        <div style={{ height:'100%', width:`${pct}%`, background:tk.accent, transition:'width 0.6s ease' }}/>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {active === 'settings' && (
            <div className="fi" style={{ maxWidth:450 }}>
              <div style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'22px 22px', marginBottom:10 }}>
                <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint, marginBottom:18 }}>{t.settingsTitle}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {t.settingsFields.map((label,i) => (
                    <div key={i}>
                      <div style={{ fontSize:8.5, letterSpacing:'0.18em', color:tk.textFaint, marginBottom:7 }}>{label.toUpperCase()}</div>
                      <input defaultValue={t.settingsDefs[i]} className="inp"
                        style={{ width:'100%', padding:'10px 12px', fontSize:13, fontFamily:serif, background:tk.inputBg, color:tk.text, border:`1px solid ${tk.inputBorder}`, outline:'none' }}/>
                    </div>
                  ))}
                  <button style={{ marginTop:6, alignSelf:'flex-start', padding:'10px 22px', fontSize:9, letterSpacing:'0.2em', fontFamily:serif, background:tk.btnPrimary, color:tk.btnText, border:'none', cursor:'pointer' }}>
                    {t.save}
                  </button>
                </div>
              </div>

              <div style={{ background:tk.surface, border:`1px solid ${tk.border}`, padding:'18px 22px' }}>
                <div style={{ fontSize:8.5, letterSpacing:'0.16em', color:tk.textFaint, marginBottom:10 }}>{t.accessTitle}</div>
                <div style={{ fontSize:12, color:tk.textMuted, lineHeight:2, whiteSpace:'pre-line' }}>{t.accessText}</div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}