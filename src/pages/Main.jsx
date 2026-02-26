import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const translations = {
  ru: {
    nav: {
      allCollection: "ВСЯ КОЛЛЕКЦИЯ",
      clothes: "ОДЕЖДА",
      shoes: "ОБУВЬ",
      accessories: "АКСЕССУАРЫ",
      onlineOnly: "ТОЛЬКО ОНЛАЙН",
      sale: "SALE",
      newItems: "НОВИНКИ",
    },
    hero: {
      subtitle: "*BAHOR",
    },
    banner: {
      title: "Женская одежда, обувь и аксессуары",
      subtitle: "стильные образы на каждый день",
      delivery: "БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ ОТ 400.000 СУМ",
      deliveryBtn: "ОФОРМИТЬ ДОСТАВКУ",
    },
    newOnSite: "Новое на сайте",
    allNew: "Все новинки",
    products: [
      { name: "Толстовка женская", price: "189 500 сум", oldPrice: null },
      { name: "Худи женское", price: "215 000 сум", oldPrice: null },
      { name: "Рубашка женская", price: "145 000 сум", oldPrice: null },
      { name: "Юбка женская", price: "169 500 сум", oldPrice: null },
      { name: "Куртка женская", price: "449 500 сум", oldPrice: "899 000 сум" },
      { name: "Блузка женская", price: "125 000 сум", oldPrice: null },
    ],
    coats: [
      { code: "47110-1", price: "449 500 сум", oldPrice: "899 000 сум" },
      { code: "47111-15", price: "464 500 сум", oldPrice: "929 000 сум" },
      { code: "47109-234", price: "359 500 сум", oldPrice: "899 000 сум" },
      { code: "47109-1", price: "449 500 сум", oldPrice: "899 000 сум" },
      { code: "47102-13", price: "449 500 сум", oldPrice: "899 000 сум" },
      { code: "47115-234", price: "696 500 сум", oldPrice: "929 000 сум" },
    ],
    banners: {
      onlineOnly: "ТОЛЬКО ОНЛАЙН",
      discounts: "СКИДКИ",
      discountsSub: "КРУГЛЫЙ ГОД",
    },
    footer: {
      catalog: "КАТАЛОГ",
      catalogLinks: ["Новинки", "Вся коллекция", "Одежда", "Обувь", "Аксессуары", "Только онлайн", "Sale"],
      help: "ПОМОЩЬ ПОКУПАТЕЛЮ",
      helpLinks: ["Оплата", "Возврат", "Доставка", "Наши магазины", "Бонусная программа"],
      about: "О КОМПАНИИ",
      aboutLinks: ["Контакты", "О бренде", "Карьера в Selfie", "Публичная оферта", "Политика конфиденциальности"],
      blog: "БЛОГ",
      blogLinks: ["Новости", "Акции", "LookBooks"],
      payment: "СПОСОБЫ ОПЛАТЫ",
      stayUpdated: "БУДЬ ВСЕГДА В КУРСЕ",
      stayUpdatedText: "Подписывайся, оставляй свой номер телефона и всегда будь в курсе последних новостей компании.",
      subscribe: "Подписаться",
      rights: "© 2026 Selfie Все права защищены",
    },
  },
  en: {
    nav: {
      allCollection: "ALL COLLECTION",
      clothes: "CLOTHES",
      shoes: "SHOES",
      accessories: "ACCESSORIES",
      onlineOnly: "ONLINE ONLY",
      sale: "SALE",
      newItems: "NEW",
    },
    hero: {
      subtitle: "*BAHOR",
    },
    banner: {
      title: "Women's clothing, shoes and accessories",
      subtitle: "stylish looks for every day",
      delivery: "FREE DELIVERY ON ORDERS FROM 400,000 SUM",
      deliveryBtn: "ARRANGE DELIVERY",
    },
    newOnSite: "New on site",
    allNew: "All new items",
    products: [
      { name: "Women's sweatshirt", price: "189,500 sum", oldPrice: null },
      { name: "Women's hoodie", price: "215,000 sum", oldPrice: null },
      { name: "Women's shirt", price: "145,000 sum", oldPrice: null },
      { name: "Women's skirt", price: "169,500 sum", oldPrice: null },
      { name: "Women's jacket", price: "449,500 sum", oldPrice: "899,000 sum" },
      { name: "Women's blouse", price: "125,000 sum", oldPrice: null },
    ],
    coats: [
      { code: "47110-1", price: "449,500 sum", oldPrice: "899,000 sum" },
      { code: "47111-15", price: "464,500 sum", oldPrice: "929,000 sum" },
      { code: "47109-234", price: "359,500 sum", oldPrice: "899,000 sum" },
      { code: "47109-1", price: "449,500 sum", oldPrice: "899,000 sum" },
      { code: "47102-13", price: "449,500 sum", oldPrice: "899,000 sum" },
      { code: "47115-234", price: "696,500 sum", oldPrice: "929,000 sum" },
    ],
    banners: {
      onlineOnly: "ONLINE ONLY",
      discounts: "DISCOUNTS",
      discountsSub: "ALL YEAR ROUND",
    },
    footer: {
      catalog: "CATALOG",
      catalogLinks: ["New items", "All collection", "Clothes", "Shoes", "Accessories", "Online only", "Sale"],
      help: "CUSTOMER HELP",
      helpLinks: ["Payment", "Returns", "Delivery", "Our stores", "Bonus program"],
      about: "ABOUT",
      aboutLinks: ["Contacts", "About brand", "Career at Selfie", "Public offer", "Privacy policy"],
      blog: "BLOG",
      blogLinks: ["News", "Promotions", "LookBooks"],
      payment: "PAYMENT METHODS",
      stayUpdated: "STAY UPDATED",
      stayUpdatedText: "Subscribe, leave your phone number and always stay up to date with the latest company news.",
      subscribe: "Subscribe",
      rights: "© 2026 Selfie All rights reserved",
    },
  },
};

const productColors = [
  ["bg-gray-200", "bg-gray-300", "bg-stone-100"],
  ["bg-gray-300", "bg-gray-400", "bg-stone-200"],
  ["bg-blue-100", "bg-gray-100", "bg-stone-50"],
  ["bg-gray-800", "bg-gray-700", "bg-gray-900"],
  ["bg-blue-900", "bg-blue-800", "bg-blue-700"],
  ["bg-stone-100", "bg-stone-200", "bg-white"],
];

export default function SelfiePage() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("ru");
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${dark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}`}>
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${dark ? "bg-zinc-950/95 border-zinc-800" : "bg-white/95 border-zinc-100"} backdrop-blur-md`}>
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className={`border-2 px-2 py-1 text-sm font-bold tracking-widest ${dark ? "border-white text-white" : "border-zinc-900 text-zinc-900"}`}>
            sf selfie
          </div>
          <div className="hidden lg:flex gap-6 text-xs tracking-widest">
            {Object.values(t.nav).map((item, i) => (
              <a key={i} href="#" className={`hover:opacity-60 transition-opacity ${i === 5 ? "text-red-500 font-bold" : ""}`}>
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button className="hover:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
          {/* Search */}
          <button className="hover:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Wishlist */}
          <button className="hover:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          {/* Profile */}
          <button className="hover:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === "ru" ? "en" : "ru")}
            className={`text-xs font-bold tracking-widest border px-2 py-1 rounded transition-colors ${dark ? "border-zinc-600 hover:border-white" : "border-zinc-300 hover:border-zinc-900"}`}
          >
            {lang === "ru" ? "EN" : "RU"}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className={`w-8 h-8 rounded text-center flex items-center justify-center relative transition-colors duration-300 ${dark ? " border-zinc-600 hover:border-white": " border-zinc-300 hover:border-zinc-900"}`}
          >
          
          {dark ?  <Sun className="w-6 h-6 text-white" /> : <Moon className="w-6 h-6 text-zinc-900" />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Gradient background simulating blurred flowers */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-stone-300 dark:from-pink-900 dark:via-rose-900 dark:to-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-tl from-pink-300/40 via-transparent to-stone-400/30" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-300/50 blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full bg-rose-200/60 blur-2xl" />
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-stone-300/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-amber-100/40 blur-xl" />
        </div>

        <div className="relative text-center text-white z-10">
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-[10rem] font-bold tracking-tight leading-none" style={{ fontFamily: "Georgia, serif" }}>
              SPRING
              <span className="absolute -top-4 right-0 text-2xl">*</span>
            </h1>
            <p className="text-7xl md:text-9xl italic font-light -mt-4" style={{ fontFamily: "Georgia, serif" }}>
              2026
            </p>
          </div>
          <p className="text-2xl tracking-[0.3em] mt-6 font-light">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* SUBTITLE BANNER */}
      <section className={`py-8 text-center border-b transition-colors ${dark ? "border-zinc-800" : "border-zinc-100"}`}>
        <h2 className="text-xl font-semibold tracking-wide">{t.banner.title}</h2>
        <p className={`text-sm mt-1 ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{t.banner.subtitle}</p>
      </section>

      {/* DELIVERY BANNER */}
      <section className={`flex items-center justify-between px-12 py-8 mx-6 my-6 rounded-sm transition-colors ${dark ? "bg-zinc-800" : "bg-stone-100"}`}>
        <h3 className="text-2xl md:text-3xl font-black tracking-widest leading-tight">
          {t.banner.delivery}
        </h3>
        <button className={`border-2 px-8 py-4 text-sm font-bold tracking-widest whitespace-nowrap transition-colors hover:bg-zinc-900 hover:text-white ${dark ? "border-white hover:bg-white hover:text-zinc-900" : "border-zinc-900"}`}>
          {t.banner.deliveryBtn}
        </button>
      </section>

      {/* NEW PRODUCTS */}
      <section className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t.newOnSite}</h2>
          <a href="#" className={`text-sm flex items-center gap-2 hover:opacity-60 transition-opacity ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
            {t.allNew} →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {t.products.map((product, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={`relative aspect-[3/4] overflow-hidden rounded-sm ${productColors[i][0]} dark:bg-zinc-700`}>
                {/* Placeholder product image with gradient */}
                <div className={`absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t ${dark ? "from-zinc-600 to-zinc-700" : `from-${productColors[i][1]} to-${productColors[i][0]}`}`}>
                  {/* Stylized silhouette */}
                  <div className={`w-3/5 h-4/5 rounded-t-full ${dark ? "bg-zinc-500" : productColors[i][2]}`} style={{ borderRadius: "50% 50% 0 0" }} />
                </div>
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-blue-900 text-white text-xs px-2 py-0.5 font-bold">New</span>
                </div>
                <div className="absolute bottom-2 left-2 z-10">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 font-bold">SALE</span>
                </div>
              </div>
              <div className="mt-2 px-1">
                <p className={`text-xs ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{product.name}</p>
                <div className="flex gap-2 items-center mt-0.5">
                  {product.oldPrice && <span className={`text-xs line-through ${dark ? "text-zinc-600" : "text-zinc-400"}`}>{product.oldPrice}</span>}
                  <span className={`text-sm font-semibold ${product.oldPrice ? "text-red-500" : ""}`}>{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SALE COATS SCROLL */}
      <section className="px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {t.coats.map((coat, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={`relative aspect-[3/4] overflow-hidden rounded-sm ${dark ? "bg-zinc-800" : "bg-stone-200"}`}>
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 font-bold">SALE</span>
                </div>
                <div className={`w-full h-full flex items-center justify-center ${dark ? "bg-zinc-700" : "bg-stone-300"}`}>
                  <div className={`w-1/2 h-4/5 rounded-t-full ${dark ? "bg-zinc-600" : "bg-stone-400"}`} style={{ borderRadius: "50% 50% 0 0" }} />
                </div>
              </div>
              <div className="mt-2 px-1">
                <p className={`text-xs ${dark ? "text-zinc-400" : "text-zinc-500"}`}>Пальто женское {coat.code}</p>
                <div className="flex gap-2 items-center mt-0.5 flex-wrap">
                  <span className={`text-xs line-through ${dark ? "text-zinc-600" : "text-zinc-400"}`}>{coat.oldPrice}</span>
                  <span className="text-sm font-semibold text-red-500">{coat.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO BANNERS */}
      <section className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Online Only Banner */}
        <div className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300 dark:from-pink-900 dark:via-rose-800 dark:to-pink-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/2 h-4/5 bg-white/30 dark:bg-white/10 rounded-full blur-sm" />
            </div>
          </div>
          <div className="absolute bottom-8 left-8 z-10">
            <h3 className="text-white text-3xl font-black tracking-widest drop-shadow-lg">
              {t.banners.onlineOnly}
            </h3>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Discounts Banner */}
        <div className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-400 via-slate-300 to-zinc-500 dark:from-zinc-700 dark:via-slate-600 dark:to-zinc-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/2 h-4/5 bg-white/20 dark:bg-white/5 rounded-full blur-sm" />
            </div>
          </div>
          <div className="absolute bottom-8 right-8 z-10 text-right">
            <h3 className="text-white text-4xl font-black tracking-widest drop-shadow-lg">
              {t.banners.discounts}
            </h3>
            <p className="text-white text-xl font-light tracking-widest">
              {t.banners.discountsSub}
            </p>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`mt-12 border-t pt-12 px-6 pb-8 transition-colors ${dark ? "border-zinc-800 bg-zinc-950" : "border-zinc-100 bg-white"}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Catalog */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-4">{t.footer.catalog}</h4>
            <ul className="space-y-2">
              {t.footer.catalogLinks.map((link, i) => (
                <li key={i}>
                  <a href="#" className={`text-sm hover:opacity-60 transition-opacity ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-4">{t.footer.help}</h4>
            <ul className="space-y-2">
              {t.footer.helpLinks.map((link, i) => (
                <li key={i}>
                  <a href="#" className={`text-sm hover:opacity-60 transition-opacity ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-4">{t.footer.about}</h4>
            <ul className="space-y-2">
              {t.footer.aboutLinks.map((link, i) => (
                <li key={i}>
                  <a href="#" className={`text-sm hover:opacity-60 transition-opacity ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-4">{t.footer.blog}</h4>
            <ul className="space-y-2">
              {t.footer.blogLinks.map((link, i) => (
                <li key={i}>
                  <a href="#" className={`text-sm hover:opacity-60 transition-opacity ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-4">{t.footer.payment}</h4>
            <div className="grid grid-cols-2 gap-2">
              {["U", "PAYME", "UZUM", "CLICK", "PayMe"].map((p, i) => (
                <div key={i} className={`text-xs font-bold px-2 py-1.5 rounded text-center ${dark ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-zinc-700"}`}>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Stay Updated */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-4">{t.footer.stayUpdated}</h4>
            <p className={`text-xs mb-4 leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
              {t.footer.stayUpdatedText}
            </p>
            <button className={`w-full py-3 text-sm font-bold tracking-wider transition-colors ${dark ? "bg-white text-zinc-900 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-zinc-700"}`}>
              {t.footer.subscribe}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 ${dark ? "border-zinc-800" : "border-zinc-100"}`}>
          <p className={`text-xs ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{t.footer.rights}</p>

          {/* Social icons */}
          <div className="flex gap-5">
            {["f", "ig", "tg", "yt", "pt"].map((icon, i) => (
              <a key={i} href="#" className={`text-sm hover:opacity-60 transition-opacity ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {i === 0 && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />}
                  {i === 1 && <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />}
                  {i === 2 && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.2-.04-.28-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.19-1.82 6.98-3.02 8.38-3.61 3.99-1.66 4.82-1.95 5.36-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.14-.02.3-.04.43z" />}
                  {i === 3 && <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />}
                  {i === 4 && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4h3V8h2v4h3l-4 4z" />}
                </svg>
              </a>
            ))}
          </div>

          <p className={`text-sm font-semibold tracking-wide ${dark ? "text-zinc-300" : "text-zinc-700"}`}>
            +998 (55) 508 00 60
          </p>
        </div>
      </footer>
    </div>
  );
}