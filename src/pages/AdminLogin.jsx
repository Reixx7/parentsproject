import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, Moon, Sun } from 'lucide-react'

const serif = "'Cormorant Garamond', Georgia, serif"

const ADMIN_LOGIN    = 'adminof'
const ADMIN_PASSWORD = 'selfie2026project'
const SESSION_KEY    = 'adminSession'

const Tk = {
  light: {
    bg: '#ffffff', surface: '#faf8f5', border: '#e8e3de',
    text: '#111111', textMuted: '#555555', textFaint: '#aaaaaa',
    inputBg: '#ffffff', inputBorder: '#d4cfc9',
    btnPrimary: '#111111', btnText: '#ffffff',
    saleBadge: '#c0392b', icon: '#555555',
  },
  dark: {
    bg: '#0f0f0f', surface: '#1a1a1a', border: '#2a2a2a',
    text: '#f0ede8', textMuted: '#b0a898', textFaint: '#555555',
    inputBg: '#161616', inputBorder: '#3a3530',
    btnPrimary: '#f0ede8', btnText: '#111111',
    saleBadge: '#e05c5c', icon: '#b0a898',
  },
}

export default function AdminLogin() {
  const navigate = useNavigate()
  const [dark,     setDark]     = useState(false)
  const [login,    setLogin]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  useEffect(() => {
    setDark(localStorage.getItem('darkMode') === 'true')
    // Если уже залогинен — сразу в панель
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      navigate('/admin')
    }
  }, [])

  const toggleDark = () => {
    const n = !dark
    setDark(n)
    localStorage.setItem('darkMode', String(n))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!login.trim() || !password.trim()) {
      setError('Заполните все поля')
      return
    }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 600))
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      navigate('/admin')
    } else {
      setError('Неверный логин или пароль')
      setLoading(false)
    }
  }

  const tk = dark ? Tk.dark : Tk.light

  return (
    <div style={{
      minHeight: '100vh', background: tk.bg, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: serif, transition: 'background 0.3s, color 0.3s',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        .inp { transition: border-color 0.2s; }
        .inp:focus { border-color: ${tk.text} !important; outline: none; }
        .inp::placeholder { color: ${tk.textFaint}; }
        .submit-btn:hover:not(:disabled) { opacity: 0.85; }
        @keyframes shake {
          0%,100% { transform: translateX(0) }
          20%,60%  { transform: translateX(-6px) }
          40%,80%  { transform: translateX(6px) }
        }
        .shake { animation: shake 0.35s ease; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .fade-up { animation: fadeUp 0.4s ease both; }
      `}</style>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDark}
        style={{
          position: 'fixed', top: 20, right: 24,
          background: 'none', border: 'none', cursor: 'pointer',
          color: tk.icon, display: 'flex', padding: 4,
        }}
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Card */}
      <div className="fade-up" style={{ width: 360, maxWidth: '92vw' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 30, fontWeight: 400, letterSpacing: '0.14em', color: tk.text }}>
            selfie
          </div>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: tk.textFaint, marginTop: 5 }}>
            ADMIN PANEL
          </div>
          <div style={{ width: 28, height: 1, background: tk.border, margin: '18px auto 0' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Login field */}
          <div>
            <label style={{
              display: 'block', fontSize: 10, letterSpacing: '0.18em',
              color: tk.textFaint, marginBottom: 7,
            }}>
              ЛОГИН
            </label>
            <input
              className="inp"
              value={login}
              onChange={e => { setLogin(e.target.value); setError('') }}
              autoComplete="username"
              placeholder="admin"
              style={{
                width: '100%', padding: '12px 14px', fontSize: 13,
                fontFamily: serif, background: tk.inputBg, color: tk.text,
                border: `1px solid ${error ? tk.saleBadge : tk.inputBorder}`,
              }}
            />
          </div>

          {/* Password field */}
          <div>
            <label style={{
              display: 'block', fontSize: 10, letterSpacing: '0.18em',
              color: tk.textFaint, marginBottom: 7,
            }}>
              ПАРОЛЬ
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="inp"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                autoComplete="current-password"
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '12px 44px 12px 14px', fontSize: 13,
                  fontFamily: serif, background: tk.inputBg, color: tk.text,
                  border: `1px solid ${error ? tk.saleBadge : tk.inputBorder}`,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: 'absolute', right: 14, top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: tk.icon, display: 'flex',
                }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="shake" style={{
              display: 'flex', alignItems: 'center', gap: 7,
              fontSize: 12, color: tk.saleBadge, letterSpacing: '0.03em',
            }}>
              <AlertCircle size={13} /> {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
            style={{
              marginTop: 8, padding: '14px', fontSize: 11,
              letterSpacing: '0.18em', fontFamily: serif,
              background: loading ? tk.border : tk.btnPrimary,
              color: loading ? tk.textFaint : tk.btnText,
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 500, transition: 'opacity 0.2s, background 0.2s',
            }}
          >
            {loading ? 'ВХОД...' : 'ВОЙТИ'}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: 'center', marginTop: 32,
          fontSize: 10, letterSpacing: '0.12em', color: tk.textFaint,
        }}>
          © 2026 SELFIE
        </div>
      </div>
    </div>
  )
}
