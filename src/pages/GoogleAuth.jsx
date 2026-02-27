import { useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';

// Вставь в main.jsx:
// import { GoogleOAuthProvider } from '@react-oauth/google';
// <GoogleOAuthProvider clientId="285018621048-3t4r6du53df4kaofav0hatqjmd0taove.apps.googleusercontent.com">
//   <App />
// </GoogleOAuthProvider>

const GoogleIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Spinner = ({ dark }) => (
  <span
    className="inline-block w-4 h-4 rounded-full border-2 animate-spin"
    style={{
      borderColor: dark ? '#ddd' : 'rgba(255,255,255,0.3)',
      borderTopColor: dark ? '#111' : '#fff',
    }}
  />
);

// Floating label input field
const FloatingField = ({ type = "text", label, value, onChange, onKeyDown, hasError, errorMsg }) => (
  <div className="relative mb-3">
    <input
      type={type}
      placeholder=" "
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`peer w-full border-[1.5px] rounded border-[#d0d0d0] pt-4.5 pb-1.5 px-4 text-[15px] text-[#111] bg-white outline-none appearance-none transition-colors duration-200
        focus:border-[#111] ${hasError ? 'border-red-600' : ''}`}
    />
    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#999] pointer-events-none transition-all duration-150 font-normal
      peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[#777] peer-focus:tracking-wide
      peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-[#777] peer-[:not(:placeholder-shown)]:tracking-wide">
      {label}
    </label>
    {hasError && <p className="text-xs text-red-600 mt-1 pl-0.5">{errorMsg}</p>}
  </div>
);



export default function GoogleAuth({ onClose }) {
  const [step, setStep] = useState(1); // 1=info, 2=sms, 3=password, 4=done
  const [form, setForm] = useState({ name: "", phone: "" });
  
  const [passwords, setPasswords] = useState({ pass: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
 
  



  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const info = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(r => r.json());
        const u = { name: info.name, phone: "—", provider: "Google", email: info.email, picture: info.picture };
        setUser(u);
        localStorage.setItem("currentUser", JSON.stringify(u));
        setStep(4);
      } catch { setErrors({ google: "Ошибка получения данных" }); }
      finally { setLoading(false); }
    },
    onError: () => { setErrors({ google: "Ошибка входа через Google" }); setLoading(false); },
  });

  const handleGoogleClick = () => { setLoading(true); googleLogin(); };

  const handleStep1 = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Введите имя";
    if (!/^\+?\d{10,15}$/.test(form.phone.replace(/[\s\-()]/g, ""))) errs.phone = "Введите корректный номер";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(3);
  };

 

  const handlePassword = () => {
    const errs = {};
    if (passwords.pass.length < 6) errs.pass = "Минимум 6 символов";
    if (passwords.pass !== passwords.confirm) errs.confirm = "Пароли не совпадают";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const u = { name: form.name, phone: form.phone, provider: "phone" };
    setUser(u);
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ ...u, password: passwords.pass, registeredAt: new Date().toISOString() });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(u));
    setStep(4);
  };

  const goBack = () => {
    setErrors({});
    if (step > 1 && step < 4) setStep(step - 1);
  };

  return (
    <div
      className="fixed h-full w-full inset-0 bg-black/40 flex items-center justify-center  z-100"
      onClick={e => e.target === e.currentTarget && onClose?.()}
    >
      <div className="bg-white w-full max-w-120 min-h-125 rounded flex flex-col relative px-10 pt-8 pb-10 animate-[fadeUp_0.25s_ease_both] max-sm:px-5 max-sm:pt-6 max-sm:pb-7 max-sm:rounded-none max-sm:min-h-screen">

        {/* Keyframe styles injected minimally */}
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          @keyframes popIn { from { transform:scale(0); opacity:0; } to { transform:scale(1); opacity:1; } }
          .animate-pop-in { animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
        `}</style>

        {/* CLOSE */}
        <button
          className="absolute top-5 right-5 bg-transparent border-none cursor-pointer text-[#888] text-[22px] leading-none p-1 transition-colors duration-150 hover:text-[#111]"
          onClick={onClose}
        >✕</button>

        {/* BACK */}
        {step > 1 && step < 4 && (
          <button
            className="inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[11px] font-semibold tracking-widest uppercase text-[#555] p-0 mb-7 transition-colors duration-150 hover:text-black"
            onClick={goBack}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            Назад
          </button>
        )}

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <>
            <h2 className="text-[22px] font-semibold text-[#111] mb-7 tracking-tight">Регистрация</h2>

            <button
              className="w-full py-3.5 bg-white border-[1.5px] border-[#d0d0d0] rounded text-[#111] text-[13px] font-semibold tracking-[0.05em] cursor-pointer transition-all duration-150 flex items-center justify-center gap-2.5 mb-3 hover:border-[#111] hover:bg-[#fafafa] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGoogleClick}
              disabled={loading}
            >
              {loading ? <Spinner dark /> : <GoogleIcon />}
              Войти через Google
            </button>
            {errors.google && <p className="text-xs text-red-600 mb-2 text-center">{errors.google}</p>}

            {/* Divider */}
            <div className="flex items-center gap-3 my-1 mb-4">
              <span className="flex-1 h-px bg-[#e0e0e0]" />
              <span className="text-[11px] text-[#aaa] font-medium tracking-[0.05em] uppercase">или</span>
              <span className="flex-1 h-px bg-[#e0e0e0]" />
            </div>

            <FloatingField
              label="Имя"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              hasError={!!errors.name}
              errorMsg={errors.name}
            />
            <FloatingField
              type="tel"
              label="Номер телефона"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleStep1()}
              hasError={!!errors.phone}
              errorMsg={errors.phone}
            />

            {/* Info box */}
            <div className="flex gap-2.5 items-start bg-[#f7f7f7] rounded p-3 mt-2 mb-7">
              <div className="w-4.5 h-4.5 shrink-0 bg-[#888] rounded-full flex items-center justify-center text-white text-[11px] font-bold mt-px">i</div>
              <p className="text-[13px] text-[#555] leading-relaxed">Если имеется дисконтная карта, нужно указать тот номер к которой она привязана</p>
            </div>

            <button
              className="w-full py-4.25 bg-[#111] border-none rounded text-white text-[13px] font-semibold tracking-widest uppercase cursor-pointer transition-colors duration-150 mt-auto hover:bg-[#333] active:bg-black disabled:bg-[#ccc] disabled:cursor-not-allowed"
              onClick={handleStep1}
            >Далее</button>
          </>
        )}

        {/* ── STEP 2: SMS ── */}
      

        {/* ── STEP 3: Password ── */}
        {step === 3 && (
          <>
            <h2 className="text-[22px] font-semibold text-[#111] mb-7 tracking-tight">Создайте пароль</h2>
            <p className="text-[13px] text-[#888] mb-6 leading-relaxed">Придумайте пароль для входа в аккаунт</p>

            <FloatingField
              type="password"
              label="Пароль"
              value={passwords.pass}
              onChange={e => setPasswords({ ...passwords, pass: e.target.value })}
              hasError={!!errors.pass}
              errorMsg={errors.pass}
            />
            <FloatingField
              type="password"
              label="Повторите пароль"
              value={passwords.confirm}
              onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handlePassword()}
              hasError={!!errors.confirm}
              errorMsg={errors.confirm}
            />

            <div className="mt-auto">
              <button
                className="w-full py-4.25 bg-[#111] border-none rounded text-white text-[13px] font-semibold tracking-widest uppercase cursor-pointer transition-colors duration-150 hover:bg-[#333] active:bg-black disabled:bg-[#ccc] disabled:cursor-not-allowed"
                onClick={handlePassword}
              >Зарегистрироваться</button>
            </div>
          </>
        )}

        {/* ── STEP 4: Success ── */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center flex-1 justify-center">
            <div className="animate-pop-in w-16 h-16 rounded-full bg-[#111] flex items-center justify-center mb-5">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-[20px] font-semibold text-[#111] mb-1.5">Добро пожаловать!</p>
            <p className="text-[14px] text-[#888] mb-7">Регистрация прошла успешно</p>

            <div className="w-full bg-[#f7f7f7] rounded p-4 text-left mb-6">
              <div className="flex justify-between py-1.75 border-b border-[#eee] text-[13px]">
                <span className="text-[#999]">Имя</span>
                <span className="text-[#111] font-medium max-w-[60%] text-right truncate">{user?.name}</span>
              </div>
              {user?.phone && user.phone !== "—" && (
                <div className="flex justify-between py-1.75 border-b border-[#eee] text-[13px]">
                  <span className="text-[#999]">Телефон</span>
                  <span className="text-[#111] font-medium max-w-[60%] text-right truncate">{user.phone}</span>
                </div>
              )}
              {user?.email && (
                <div className="flex justify-between py-1.75 border-b border-[#eee] text-[13px]">
                  <span className="text-[#999]">Email</span>
                  <span className="text-[#111] font-medium max-w-[60%] text-right truncate">{user.email}</span>
                </div>
              )}
              <div className="flex justify-between py-1.75 text-[13px]">
                <span className="text-[#999]">Вход через</span>
                <span className="text-[#111] font-medium">{user?.provider === "Google" ? "Google" : "Телефон"}</span>
              </div>
            </div>

            <button
              className="w-full py-4.25    bg-[#111] border-none rounded text-white text-[13px] font-semibold tracking-widest uppercase cursor-pointer transition-colors duration-150 hover:bg-[#333] active:bg-black"
              onClick={onClose}
            >Закрыть</button>
          </div>
        )}

      </div>
    </div>
  );
}
