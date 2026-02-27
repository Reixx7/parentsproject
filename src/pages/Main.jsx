import { Moon, Sun, Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from "../pages/GoogleAuth";
import { Link } from "react-router-dom";
import herobg from "../assets/swiper-container.png"
import main1 from "../assets/main1.png"
import main2 from "../assets/main2.png"
// ─── HERO BACKGROUND IMAGE ────────────────────────────────────────────────────
// Замени на путь к своей фотографии. Примеры:
//   const HERO_BG = "/images/hero.jpg"
//   const HERO_BG = "https://example.com/photo.jpg"
//   const HERO_BG = null   ← градиентный фон без фото
const HERO_BG = herobg

// ─── Design tokens ────────────────────────────────────────────────────────────
const Tk = {
  light: {
    bg:           '#ffffff',
    surface:      '#faf8f5',
    border:       '#e8e3de',
    text:         '#111111',
    textMuted:    '#555555',
    textFaint:    '#aaaaaa',
    headerBg:     'rgba(255,255,255,0.94)',
    icon:         '#555555',
    btnPrimary:   '#222222',
    btnText:      '#ffffff',
    saleBadge:    '#c0392b',
    inputBg:      '#fafaf9',
    cardBg:       '#f5f2ee',
    tagBorder:    '#e0dbd5',
    tagColor:     '#aaaaaa',
  },
  dark: {
    bg:           '#0f0f0f',
    surface:      '#1a1a1a',
    border:       '#2a2a2a',
    text:         '#f0ede8',
    textMuted:    '#b0a898',
    textFaint:    '#666666',
    headerBg:     'rgba(15,15,15,0.94)',
    icon:         '#b0a898',
    btnPrimary:   '#f0ede8',
    btnText:      '#111111',
    saleBadge:    '#c0392b',
    inputBg:      '#161616',
    cardBg:       '#1c1c1c',
    tagBorder:    '#2e2e2e',
    tagColor:     '#777777',
  },
}

const serif = "'Cormorant Garamond', Georgia, serif"

const translations = {
  ru: {
    nav: {
      main:          "ГЛАВНАЯ",
      allCollection: "ВСЯ КОЛЛЕКЦИЯ",
      clothes:       "ОДЕЖДА",
      shoes:         "ОБУВЬ",
      accessories:   "АКСЕССУАРЫ",
      onlineOnly:    "ТОЛЬКО ОНЛАЙН",
      sale:          "SALE",
      newItems:      "НОВИНКИ",
      about:         "О НАС",
      faq:           "ВОПРОСЫ",
    },
    nav_routes: {
      main:          "/",
      allCollection: "/products",
      clothes:       "/category/odejda",
      shoes:         "/category/obuv",
      accessories:   "/category/aksessuary",
      onlineOnly:    "/category/tolko-onlayn",
      sale:          "/category/sale",
      newItems:      "/category/novinki",
      about:         "/about",
      faq:           "/faq",
    },
    hero: { subtitle: "*BAHOR" },
    banner: {
      title:       "Женская одежда, обувь и аксессуары",
      subtitle:    "стильные образы на каждый день",
      delivery:    "БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ ОТ 400.000 СУМ",
      deliveryBtn: "ОФОРМИТЬ ДОСТАВКУ",
    },
    newOnSite: "Новое на сайте",
    allNew:    "Все новинки",
    products: [
      {
    id: 1,
    name: "Куртка W25",
    category: "Куртки",
    articul: "47129-18",
    price: 436500,
    currency: "UZS",
    sizes: ["S","M"],
    images: [
      "https://selfiestore.uz/static/4e6022ff-c9c0-47ef-8c84-99efdf4a8b52.webp",
      "https://selfiestore.uz/static/8ffb2b1a-beaf-4b9f-988f-e2a7b020d49c.webp",
      "https://selfiestore.uz/static/8769c921-b7e4-444c-8c98-80c1869d87a3.webp"
    ],
    inStock: true
  },
  {
    id: 2,
    name: "Куртка Short",
    category: "Куртки",
    articul: "47126-25",
    price: 509500,
    currency: "UZS",
    sizes: ["S"],
    images: [
      "https://selfiestore.uz/static/e9afcf5b-d0e2-4dee-8080-6c1adb16d40d.webp",
      "https://selfiestore.uz/static/74305a64-385c-4588-8b49-afd4bfcadb21.webp",
      "https://selfiestore.uz/static/1b62974b-3d67-4069-afa1-0149a5c9fc0b.webp"
    ],
    inStock: false
  },
  {
    id: 3,
    name: "Пальто Classic",
    category: "Пальто",
    articul: "48110-02",
    price: 890000,
    currency: "UZS",
    sizes: ["M","L"],
    images: [
      "https://selfiestore.uz/static/e4e4de22-7e2a-474c-894f-b1bc9bc7d476.webp",
      "https://selfiestore.uz/static/6d8b0cdb-af9a-458f-99bb-33eb83a5f155.webp",
      "https://selfiestore.uz/static/43958f3b-403a-46f6-9ebe-465a5a3ed6ec.webp"
    ],
    inStock: true
  },
  {
    id: 4,
    name: "Пальто Oversize",
    category: "Пальто",
    articul: "48115-04",
    price: 940000,
    currency: "UZS",
    sizes: ["S","M"],
    images: [
      "https://selfiestore.uz/static/b2fe72dc-3612-47f6-b2d4-377fb03f430c.webp",
      "https://selfiestore.uz/static/61878aac-22ab-4cc1-a1b8-6a5fded0b480.webp",
      "https://selfiestore.uz/static/fc7abf1d-2c31-4811-a281-02f815a63328.webp"
    ],
    inStock: false
  },
  {
    id: 5,
    name: "Платье Silk",
    category: "Платья",
    articul: "39122-05",
    price: 520000,
    currency: "UZS",
    sizes: ["S","M","L"],
    images: [
      "https://selfiestore.uz/static/9512041e-dea4-4a5d-8a28-f05ea2ac48bd.webp",
      "https://selfiestore.uz/static/6733c3d1-6e16-427f-babb-8cd5e996c115.webp",
      "https://selfiestore.uz/static/48861ef5-5760-46b9-b82d-25604e091dea.webp"
    ],
    inStock: true
  },
  {
    id: 6,
    name: "Платье Casual",
    category: "Платья",
    articul: "39125-11",
    price: 389000,
    currency: "UZS",
    sizes: ["XS","S","M"],
    images: [
      "https://selfiestore.uz/static/5e197cfa-ce27-4dd3-8246-cfb6594a4059.webp",
      "https://selfiestore.uz/static/5616b11a-34ef-4783-afc9-4156eb10f035.webp",
      "https://selfiestore.uz/static/d1709fe7-64a4-4b67-a41d-7421a06e96e9.webp"
    ],
    inStock: true
  }
    ],
    coats: [
       {
    id: 25,
    name: "Кардиган Knit",
    category: "Кардиганы",
    articul: "45108-05",
    price: 395000,
    currency: "UZS",
    sizes: ["M","L"],
    images: [
      "https://selfiestore.uz/static/72bd2139-0fe0-40cf-8813-40661f683cb9.webp",
      "https://selfiestore.uz/static/5f482344-23e7-4ea5-b0a4-ab9ef011dd60.webp",
      "https://selfiestore.uz/static/bc113e2c-38d9-4b04-a128-816c8b710c45.webp"
    ],
    inStock: false
  },
  {
    id: 26,
    name: "Свитер Wool",
    category: "Свитеры",
    articul: "46106-08",
    price: 410000,
    currency: "UZS",
    sizes: ["M","L"],
    images: [
      "https://selfiestore.uz/static/97820c77-b010-408f-8f7c-42058ad37152.webp",
      "https://selfiestore.uz/static/143a4d70-f288-4b00-9e42-7438cc492a28.webp",
      "https://selfiestore.uz/static/d29f73da-bc9f-42fd-a552-3a5f8736d3c3.webp"
    ],
    inStock: true
  },
  {
    id: 27,
    name: "Свитер Oversize",
    category: "Свитеры",
    articul: "46110-02",
    price: 445000,
    currency: "UZS",
    sizes: ["S","M"],
    images: [
      "https://selfiestore.uz/static/6914f864-f196-4040-a260-b2da991a8f95.webp",
      "https://selfiestore.uz/static/736ae41a-4d60-40e6-bc46-5e52e884ac75.webp",
      "https://selfiestore.uz/static/b77bb6f9-38ce-4825-95a8-89ac5195b785.webp"
    ],
    inStock: false
  },
  {
    id: 28,
    name: "Топ Rib",
    category: "Топы",
    articul: "17101-01",
    price: 120000,
    currency: "UZS",
    sizes: ["XS","S","M"],
    images: [
      "https://selfiestore.uz/static/39941df3-b371-4629-b03f-208d63994327.webp",
      "https://selfiestore.uz/static/a028d044-0f1d-4f3e-915e-6b5447c9d345.webp",
      "https://selfiestore.uz/static/a04de4f1-4f77-43f0-ac7a-542da1500c3f.webp"
    ],
    inStock: true
  },
  {
    id: 29,
    name: "Топ Crop",
    category: "Топы",
    articul: "17106-04",
    price: 145000,
    currency: "UZS",
    sizes: ["XS","S"],
    images: [
      "https://selfiestore.uz/static/b41beffd-2c79-447e-8be8-0328e9e55338.webp",
      "https://selfiestore.uz/static/3453ae50-e6d6-4019-8c1c-3ff30739b2bb.webp",
      "https://selfiestore.uz/static/5313e473-76dc-4ac5-b315-f5af39886b38.webp"
    ],
    inStock: false
  },
  {
    id: 30,
    name: "Косуха AU21 с хлястиками",
    category: "Косуха",
    articul: "99102-01",
    price: 180000,
    currency: "UZS",
    sizes: ["ONE SIZE"],
    images: [
      "https://selfiestore.uz/static/033948e2-da67-47f1-8718-6c50efb71c02.webp",
      "https://selfiestore.uz/static/892b3e95-55a6-4b70-9131-e34a5149812a.webp",
      "https://selfiestore.uz/static/5a3d0fb3-ad90-4833-b337-b883c118bae2.webp"
    ],
    inStock: true
  },
 
    ],
   
    banners: { onlineOnly: "ТОЛЬКО ОНЛАЙН", discounts: "СКИДКИ", discountsSub: "КРУГЛЫЙ ГОД" },
    footer: {
      catalog:      "КАТАЛОГ",
      catalogLinks: ["Новинки", "Вся коллекция", "Одежда", "Обувь", "Аксессуары", "Только онлайн", "Sale"],
      help:         "ПОМОЩЬ ПОКУПАТЕЛЮ",
      helpLinks:    ["Оплата", "Возврат", "Доставка", "Наши магазины", "Бонусная программа"],
      about:        "О КОМПАНИИ",
      aboutLinks:   ["Контакты", "О бренде", "Карьера в Selfie", "Публичная оферта", "Политика конфиденциальности"],
      blog:         "БЛОГ",
      blogLinks:    ["Новости", "Акции", "LookBooks"],
      payment:      "СПОСОБЫ ОПЛАТЫ",
      stayUpdated:  "БУДЬ ВСЕГДА В КУРСЕ",
      stayUpdatedText: "Подписывайся, оставляй свой номер телефона и всегда будь в курсе последних новостей компании.",
      phonePlaceholder: "Телефон или email",
      subscribe:    "Подписаться",
      subscribed:   "✓ Вы успешно подписались!",
      rights:       "© 2026 Selfie. Все права защищены.",
    },
    newBadge: "Новое",
  },
  en: {
    nav: {
      main:          "MAIN",
      allCollection: "ALL COLLECTION",
      clothes:       "CLOTHING",
      shoes:         "FOOTWEAR",
      accessories:   "ACCESSORIES",
      onlineOnly:    "ONLINE ONLY",
      sale:          "SALE",
      newItems:      "NEW IN",
      about:         "ABOUT US",
      faq:           "FAQ",
    },
    nav_routes: {
      main:          "/",
      allCollection: "/products",
      clothes:       "/category/odejda",
      shoes:         "/category/obuv",
      accessories:   "/category/aksessuary",
      onlineOnly:    "/category/tolko-onlayn",
      sale:          "/category/sale",
      newItems:      "/category/novinki",
      about:         "/about",
      faq:           "/faq",
    },
    hero: { subtitle: "*BAHOR" },
    banner: {
      title:       "Women's clothing, shoes and accessories",
      subtitle:    "stylish looks for every day",
      delivery:    "FREE DELIVERY ON ORDERS FROM 400,000 SUM",
      deliveryBtn: "ARRANGE DELIVERY",
    },
    newOnSite: "New on site",
    allNew:    "All new items",
    products: [
      {
  id: 1,
  name: "Jacket W25",
  category: "Jackets",
  articul: "47129-18",
  price: 436500,
  currency: "UZS",
  sizes: ["S","M"],
  images: [
    "https://selfiestore.uz/static/4e6022ff-c9c0-47ef-8c84-99efdf4a8b52.webp",
    "https://selfiestore.uz/static/8ffb2b1a-beaf-4b9f-988f-e2a7b020d49c.webp",
    "https://selfiestore.uz/static/8769c921-b7e4-444c-8c98-80c1869d87a3.webp"
  ],
  inStock: true
},
{
  id: 2,
  name: "Jacket Short",
  category: "Jackets",
  articul: "47126-25",
  price: 509500,
  currency: "UZS",
  sizes: ["S"],
  images: [
    "https://selfiestore.uz/static/e9afcf5b-d0e2-4dee-8080-6c1adb16d40d.webp",
    "https://selfiestore.uz/static/74305a64-385c-4588-8b49-afd4bfcadb21.webp",
    "https://selfiestore.uz/static/1b62974b-3d67-4069-afa1-0149a5c9fc0b.webp"
  ],
  inStock: false
},
{
  id: 3,
  name: "Coat Classic",
  category: "Coats",
  articul: "48110-02",
  price: 890000,
  currency: "UZS",
  sizes: ["M","L"],
  images: [
    "https://selfiestore.uz/static/e4e4de22-7e2a-474c-894f-b1bc9bc7d476.webp",
    "https://selfiestore.uz/static/6d8b0cdb-af9a-458f-99bb-33eb83a5f155.webp",
    "https://selfiestore.uz/static/43958f3b-403a-46f6-9ebe-465a5a3ed6ec.webp"
  ],
  inStock: true
},
{
  id: 4,
  name: "Coat Oversize",
  category: "Coats",
  articul: "48115-04",
  price: 940000,
  currency: "UZS",
  sizes: ["S","M"],
  images: [
    "https://selfiestore.uz/static/b2fe72dc-3612-47f6-b2d4-377fb03f430c.webp",
    "https://selfiestore.uz/static/61878aac-22ab-4cc1-a1b8-6a5fded0b480.webp",
    "https://selfiestore.uz/static/fc7abf1d-2c31-4811-a281-02f815a63328.webp"
  ],
  inStock: false
},
{
  id: 5,
  name: "Dress Silk",
  category: "Dresses",
  articul: "39122-05",
  price: 520000,
  currency: "UZS",
  sizes: ["S","M","L"],
  images: [
    "https://selfiestore.uz/static/9512041e-dea4-4a5d-8a28-f05ea2ac48bd.webp",
    "https://selfiestore.uz/static/6733c3d1-6e16-427f-babb-8cd5e996c115.webp",
    "https://selfiestore.uz/static/48861ef5-5760-46b9-b82d-25604e091dea.webp"
  ],
  inStock: true
},
{
  id: 6,
  name: "Dress Casual",
  category: "Dresses",
  articul: "39125-11",
  price: 389000,
  currency: "UZS",
  sizes: ["XS","S","M"],
  images: [
    "https://selfiestore.uz/static/5e197cfa-ce27-4dd3-8246-cfb6594a4059.webp",
    "https://selfiestore.uz/static/5616b11a-34ef-4783-afc9-4156eb10f035.webp",
    "https://selfiestore.uz/static/d1709fe7-64a4-4b67-a41d-7421a06e96e9.webp"
  ],
  inStock: true
}
    ],
    coats: [
       {
    id: 25,
    name: "Knit Cardigan",
    category: "Cardigans",
    articul: "45108-05",
    price: 395000,
    currency: "UZS",
    sizes: ["M","L"],
    images: [
      "https://selfiestore.uz/static/72bd2139-0fe0-40cf-8813-40661f683cb9.webp",
      "https://selfiestore.uz/static/5f482344-23e7-4ea5-b0a4-ab9ef011dd60.webp",
      "https://selfiestore.uz/static/bc113e2c-38d9-4b04-a128-816c8b710c45.webp"
    ],
    inStock: false
  },
  {
    id: 26,
    name: "Wool Sweater",
    category: "Sweaters",
    articul: "46106-08",
    price: 410000,
    currency: "UZS",
    sizes: ["M","L"],
    images: [
      "https://selfiestore.uz/static/97820c77-b010-408f-8f7c-42058ad37152.webp",
      "https://selfiestore.uz/static/143a4d70-f288-4b00-9e42-7438cc492a28.webp",
      "https://selfiestore.uz/static/d29f73da-bc9f-42fd-a552-3a5f8736d3c3.webp"
    ],
    inStock: true
  },
  {
    id: 27,
    name: "Oversized Sweater",
    category: "Sweaters",
    articul: "46110-02",
    price: 445000,
    currency: "UZS",
    sizes: ["S","M"],
    images: [
      "https://selfiestore.uz/static/6914f864-f196-4040-a260-b2da991a8f95.webp",
      "https://selfiestore.uz/static/736ae41a-4d60-40e6-bc46-5e52e884ac75.webp",
      "https://selfiestore.uz/static/b77bb6f9-38ce-4825-95a8-89ac5195b785.webp"
    ],
    inStock: false
  },
  {
    id: 28,
    name: "Ribbed Top",
    category: "Tops",
    articul: "17101-01",
    price: 120000,
    currency: "UZS",
    sizes: ["XS","S","M"],
    images: [
      "https://selfiestore.uz/static/39941df3-b371-4629-b03f-208d63994327.webp",
      "https://selfiestore.uz/static/a028d044-0f1d-4f3e-915e-6b5447c9d345.webp",
      "https://selfiestore.uz/static/a04de4f1-4f77-43f0-ac7a-542da1500c3f.webp"
    ],
    inStock: true
  },
  {
    id: 29,
    name: "Crop Top",
    category: "Tops",
    articul: "17106-04",
    price: 145000,
    currency: "UZS",
    sizes: ["XS","S"],
    images: [
      "https://selfiestore.uz/static/b41beffd-2c79-447e-8be8-0328e9e55338.webp",
      "https://selfiestore.uz/static/3453ae50-e6d6-4019-8c1c-3ff30739b2bb.webp",
      "https://selfiestore.uz/static/5313e473-76dc-4ac5-b315-f5af39886b38.webp"
    ],
    inStock: false
  },
  {
    id: 30,
    name: "AU21 Biker Jacket with Straps",
    category: "Biker Jackets",
    articul: "99102-01",
    price: 180000,
    currency: "UZS",
    sizes: ["ONE SIZE"],
    images: [
      "https://selfiestore.uz/static/033948e2-da67-47f1-8718-6c50efb71c02.webp",
      "https://selfiestore.uz/static/892b3e95-55a6-4b70-9131-e34a5149812a.webp",
      "https://selfiestore.uz/static/5a3d0fb3-ad90-4833-b337-b883c118bae2.webp"
    ],
    inStock: true
  },
 
    ],
    coatLabel: "Women's coat",
    banners: { onlineOnly: "ONLINE ONLY", discounts: "DISCOUNTS", discountsSub: "ALL YEAR ROUND" },
    footer: {
      catalog:      "CATALOG",
      catalogLinks: ["New In", "All Collection", "Clothing", "Footwear", "Accessories", "Online Only", "Sale"],
      help:         "CUSTOMER HELP",
      helpLinks:    ["Payment", "Returns", "Delivery", "Our Stores", "Loyalty Program"],
      about:        "ABOUT US",
      aboutLinks:   ["Contacts", "About Brand", "Careers at Selfie", "Public Offer", "Privacy Policy"],
      blog:         "BLOG",
      blogLinks:    ["News", "Promotions", "LookBooks"],
      payment:      "PAYMENT METHODS",
      stayUpdated:  "STAY IN THE LOOP",
      stayUpdatedText: "Subscribe, leave your phone number and always stay up to date with the latest company news.",
      phonePlaceholder: "Phone or email",
      subscribe:    "Subscribe",
      subscribed:   "✓ Successfully subscribed!",
      rights:       "© 2026 Selfie. All rights reserved.",
    },
    newBadge: "New",
  },
}

const productColors = [
  ["#e8e0d8", "#d4cac0"],
  ["#d6d0c8", "#c2bab0"],
  ["#dce4ec", "#c8d4e0"],
  ["#2c2c2c", "#1a1a1a"],
  ["#1e3050", "#152240"],
  ["#f0ece6", "#e4dfd8"],
]

export default function SelfiePage() {
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState("ru")
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  // true когда прокрутили дальше героя → шапка становится сплошной
  const [scrolled, setScrolled] = useState(false)

  const t = translations[lang]
  const tk = dark ? Tk.dark : Tk.light
  const navLabels = Object.values(t.nav)
  const navRoutes = Object.values(t.nav_routes)

  useEffect(() => {
    const onScroll = () => {
      // переключаемся когда ушли дальше 80% высоты экрана
      setScrolled(window.scrollY > window.innerHeight * 0.82)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSubscribe() {
    if (email.trim()) { setSubscribed(true); setEmail(""); setTimeout(() => setSubscribed(false), 3000) }
  }

  // ── Цвета шапки: прозрачная над героем / сплошная после скролла ─────────
  const hBg     = scrolled ? tk.headerBg                    : 'transparent'
  const hBorder = scrolled ? tk.border                      : 'rgba(255,255,255,0.12)'
  const hBlur   = scrolled ? 'blur(16px)'                   : 'none'
  // Текст навигации
  const nText   = scrolled ? tk.text                        : 'rgba(255,255,255,0.95)'
  const nFaint  = scrolled ? tk.textFaint                   : 'rgba(255,255,255,0.55)'
  const nBorder = scrolled ? tk.border                      : 'rgba(255,255,255,0.22)'
  const nIcon   = scrolled ? tk.icon                        : 'rgba(255,255,255,0.88)'

  return (
    <div style={{ minHeight: '100vh', background: tk.bg, color: tk.text, fontFamily: serif, transition: 'background 0.3s, color 0.3s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .nav-lnk { position:relative; text-decoration:none; transition:color 0.35s; }
        .nav-lnk::after { content:''; position:absolute; bottom:-3px; left:0; right:0; height:1.5px; background:currentColor; transform:scaleX(0); transition:transform 0.22s; transform-origin:left; }
        .nav-lnk:hover::after { transform:scaleX(1); }
        .prod-card:hover .prod-img { transform:scale(1.04); }
        .prod-img { transition:transform 0.5s ease; }
        .ftr-lnk { transition:color 0.2s; cursor:pointer; }
        .icon-btn { background:none; border:none; cursor:pointer; display:flex; padding:0; transition:opacity 0.2s; }
        .icon-btn:hover { opacity:0.65; }
        .promo-ov { position:absolute; inset:0; background:rgba(0,0,0,0.07); opacity:0; transition:opacity 0.3s; pointer-events:none; }
        .promo-wrap:hover .promo-ov { opacity:1; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .h-title { animation:fadeUp 1s ease both; }
        .h-year  { animation:fadeUp 1s 0.15s ease both; }
        .h-sub   { animation:fadeUp 1s 0.3s ease both; }
        .h-line  { animation:fadeIn 1.8s 0.6s ease both; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HEADER — position:fixed, прозрачный над героем, сплошной после скролла
      ══════════════════════════════════════════════════════════════════════ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 56,
        background: hBg,
        borderBottom: `1px solid ${hBorder}`,
        backdropFilter: hBlur,
        WebkitBackdropFilter: hBlur,
        transition: 'background 0.45s, border-color 0.45s, backdrop-filter 0.45s',
      }}>

        {/* Логотип */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:6, textDecoration:'none', flexShrink:0 }}>
         <div>
          <img className="w-[130px] h-[150px]" src="https://selfiestore.uz/static/62890302-3250-4096-b833-b364f5232082.png" alt="" />
         </div>
        </Link>

        {/* Навигация */}
        <nav style={{ display:'flex', gap:20 }}>
          {navLabels.map((label, i) => {
            const isSale = label === t.nav.sale
            return (
              <Link key={i} to={navRoutes[i]}
                className="nav-lnk"
                style={{
                  fontSize:11, letterSpacing:'0.06em', fontFamily:serif,
                  fontWeight: isSale ? 600 : 400, padding:'0 2px',
                  color: isSale ? tk.saleBadge : nFaint,
                  transition:'color 0.35s',
                }}
                onMouseEnter={e => { if (!isSale) e.currentTarget.style.color = nText }}
                onMouseLeave={e => { if (!isSale) e.currentTarget.style.color = nFaint }}
              >{label}</Link>
            )
          })}
        </nav>

        {/* Иконки */}
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          {/* Язык */}
          <button
            onClick={() => setLang(l => l === 'ru' ? 'en' : 'ru')}
            style={{
              background:'none', cursor:'pointer',
              color:nIcon, padding:'2px 7px', fontSize:10,
              fontFamily:serif, letterSpacing:'0.08em', fontWeight:600,
              border:`1px solid ${nBorder}`,
              transition:'color 0.35s, border-color 0.35s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = nText; e.currentTarget.style.borderColor = nText }}
            onMouseLeave={e => { e.currentTarget.style.color = nIcon; e.currentTarget.style.borderColor = nBorder }}>
            {lang === 'ru' ? 'EN' : 'RU'}
          </button>

          <button className="icon-btn" onClick={() => setDark(d => !d)} style={{ color:nIcon, transition:'color 0.35s' }}>
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <Link to="/" className="icon-btn" style={{ color:nIcon, transition:'color 0.35s' }}>
            <Home size={18}/>
          </Link>

        <Link to="/cart">
          <button className="icon-btn" style={{ color:nIcon, transition:'color 0.35s' }}>
            <ShoppingBag size={18}/>
          </button> </Link>
          <GoogleOAuthProvider clientId="285018621048-3t4r6du53df4kaofav0hatqjmd0taove.apps.googleusercontent.com">
            <button className="icon-btn" onClick={() => setOpen(true)} style={{ color:nIcon, transition:'color 0.35s' }}>
              <User size={18}/>
            </button>
            {open && <GoogleAuth onClose={() => setOpen(false)} />}
          </GoogleOAuthProvider>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — полноэкранный раздел с фоновой фотографией
          ╔═══════════════════════════════════════════════════════════════╗
          ║  Чтобы добавить фото, замени HERO_BG вверху файла:           ║
          ║  const HERO_BG = "/images/spring-hero.jpg"                   ║
          ╚═══════════════════════════════════════════════════════════════╝
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        position:'relative', height:'100vh', minHeight:600,
        display:'flex', alignItems:'center', justifyContent:'center',
        overflow:'hidden',
      }}>

        {/* 1. Фото (если задано) */}
        {HERO_BG && (
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`url(${HERO_BG})`,
            backgroundSize:'cover',
            backgroundPosition:'center top',
            backgroundRepeat:'no-repeat',
          }}/>
        )}

        {/* 2. Фон / оверлей
              Без фото  → атмосферный градиент
              С фото    → тёмный оверлей для читаемости текста        */}
        <div style={{
          position:'absolute', inset:0,
          background: HERO_BG
            ? (dark
                ? 'linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.18) 45%,rgba(0,0,0,0.55) 100%)'
                : 'linear-gradient(180deg,rgba(0,0,0,0.35) 0%,rgba(0,0,0,0.08) 45%,rgba(0,0,0,0.42) 100%)')
            : (dark
                ? 'linear-gradient(135deg,#1a0f0f 0%,#0f0f18 50%,#1a1210 100%)'
                : 'linear-gradient(135deg,#f5e8e0 0%,#ecddd4 50%,#e8ddd5 100%)'),
        }}>
          {/* Декоративные блобы — только без фото */}
          {!HERO_BG && <>
            <div style={{ position:'absolute', top:'20%', left:'15%', width:320, height:320, borderRadius:'50%', background: dark?'rgba(180,80,60,0.12)':'rgba(220,160,130,0.35)', filter:'blur(80px)' }}/>
            <div style={{ position:'absolute', top:'35%', left:'35%', width:220, height:220, borderRadius:'50%', background: dark?'rgba(160,100,80,0.10)':'rgba(200,170,140,0.40)', filter:'blur(60px)' }}/>
            <div style={{ position:'absolute', bottom:'25%', right:'20%', width:280, height:280, borderRadius:'50%', background: dark?'rgba(100,80,60,0.12)':'rgba(180,150,120,0.30)', filter:'blur(70px)' }}/>
          </>}
        </div>

        {/* 3. Текст — всегда светлый (читается и над фото, и над градиентом)
        <div style={{ position:'relative', textAlign:'center', zIndex:10, padding:'0 24px' }}>
          <h1 className="h-title" style={{
            margin:0, lineHeight:0.88,
            fontSize:'clamp(72px,13vw,152px)',
            fontWeight:300, fontStyle:'italic',
            letterSpacing:'-0.02em',
            fontFamily:serif,
            color: HERO_BG
              ? 'rgba(255,255,255,0.96)'
              : (dark ? 'rgba(240,237,232,0.92)' : 'rgba(40,30,25,0.88)'),
          }}>SPRING</h1>

          <p className="h-year" style={{
            margin:'6px 0 0', lineHeight:1,
            fontSize:'clamp(52px,9vw,112px)',
            fontWeight:300, letterSpacing:'0.15em', fontFamily:serif,
            color: HERO_BG
              ? 'rgba(255,255,255,0.52)'
              : (dark ? 'rgba(240,237,232,0.5)' : 'rgba(40,30,25,0.42)'),
          }}>2026</p>

          <p className="h-sub" style={{
            marginTop:28, fontSize:13,
            letterSpacing:'0.42em', fontFamily:serif, fontWeight:400,
            color: HERO_BG
              ? 'rgba(255,255,255,0.62)'
              : (dark ? 'rgba(240,237,232,0.48)' : 'rgba(40,30,25,0.46)'),
          }}>{t.hero.subtitle}</p>
        </div> */}

        {/* 4. Scroll indicator */}
        <div className="h-line" style={{
          position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
        }}>
          <div style={{
            width:1, height:44,
            background: HERO_BG
              ? 'rgba(255,255,255,0.38)'
              : (dark ? 'rgba(240,237,232,0.22)' : 'rgba(40,30,25,0.18)'),
          }}/>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SUBTITLE
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding:'28px 0', textAlign:'center', borderBottom:`1px solid ${tk.border}` }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:400, letterSpacing:'0.04em', color:tk.text }}>{t.banner.title}</h2>
        <p style={{ margin:'6px 0 0', fontSize:13, color:tk.textFaint, letterSpacing:'0.06em' }}>{t.banner.subtitle}</p>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          DELIVERY BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ display:'flex', alignItems:'center', justifyContent:'space-between', margin:'24px', padding:'28px 40px', background:tk.surface, border:`1px solid ${tk.border}` }}>
        <h3 style={{ margin:0, fontSize:'clamp(13px,1.6vw,18px)', fontWeight:600, letterSpacing:'0.1em', color:tk.text, lineHeight:1.4, maxWidth:'65%' }}>
          {t.banner.delivery}
        </h3>
        <button
          style={{ background:'none', border:`1px solid ${tk.text}`, padding:'12px 28px', fontSize:11, letterSpacing:'0.12em', fontFamily:serif, cursor:'pointer', color:tk.text, transition:'background 0.2s,color 0.2s', whiteSpace:'nowrap', flexShrink:0 }}
          onMouseEnter={e => { e.currentTarget.style.background=tk.btnPrimary; e.currentTarget.style.color=tk.btnText }}
          onMouseLeave={e => { e.currentTarget.style.background='none';        e.currentTarget.style.color=tk.text }}>
          {t.banner.deliveryBtn}
        </button>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          NEW PRODUCTS
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding:'8px 24px 32px' }}>
  {/* ───── NEW ON SITE ───── */}
  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:20 }}>
    <h2 style={{ margin:0, fontSize:18, fontWeight:500, letterSpacing:'0.06em', color:tk.text }}>
      {t.newOnSite}
    </h2>
    <a
      href="#"
      style={{ fontSize:11, letterSpacing:'0.06em', color:tk.textFaint, textDecoration:'none' }}
      onMouseEnter={e => e.target.style.color=tk.text}
      onMouseLeave={e => e.target.style.color=tk.textFaint}
    >
      {t.allNew} →
    </a>
  </div>

  <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'8px 12px' }}>
    {t.products.map((product, i) => (
      <div key={i} className="prod-card" style={{ cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'3/4', overflow:'hidden' }}>
          <img
            src={product.images?.[0]}
            alt={product.name}
            style={{
              position:'absolute',
              inset:0,
              width:'100%',
              height:'100%',
              objectFit:'cover'
            }}
          />

          {t.newBadge && (
            <div style={{
              position:'absolute',
              top:8,
              left:8,
              background:tk.btnPrimary,
              color:tk.btnText,
              fontSize:9,
              padding:'2px 7px',
              letterSpacing:'0.06em'
            }}>
              {t.newBadge.toUpperCase()}
            </div>
          )}
        </div>

        <div style={{ padding:'8px 0 12px' }}>
          <div style={{ fontSize:15, color:tk.textMuted, marginBottom:3 }}>{product.name}</div>
          <div style={{ display:'flex', gap:8, alignItems:'baseline' }}>
        
            <span style={{ fontSize:15, fontWeight:600, color: product.oldPrice ? tk.saleBadge : tk.text }}>
              {product.price} сум
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* ───── SALE COATS ───── */}
<section style={{ padding:'0 24px 40px' }}>
  <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'8px 12px' }}>
    {t.coats.map((coat, i) => (
      <div key={i} className="prod-card" style={{ cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'3/4', overflow:'hidden' }}>
          <img
            src={coat.images?.[0]}
            alt={`Coat ${coat.code}`}
            style={{
              position:'absolute',
              inset:0,
              width:'100%',
              height:'100%',
              objectFit:'cover'
            }}
          />

          <div style={{
            position:'absolute',
            top:8,
            left:8,
            background:tk.saleBadge,
            color:'#fff',
            fontSize:9,
            padding:'2px 7px',
            letterSpacing:'0.06em'
          }}>
            SALE
          </div>
        </div>

        <div style={{ padding:'8px 0 12px' }}>
          <div style={{ fontSize:15, color:tk.textFaint, marginBottom:2 }}>
            {coat.name} {coat.code}
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'baseline' }}>
            
            <span style={{ fontSize:15, fontWeight:600, color:tk.saleBadge }}>
              {coat.price} сум
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROMO BANNERS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="px-6 pb-12 grid grid-cols-2 gap-3">

  {/* Баннер 1 — ТОЛЬКО ОНЛАЙН */}
  <div className={`relative overflow-hidden cursor-pointer aspect-square group ${dark ? 'bg-gradient-to-br from-[#2a1520] to-[#1a0f18]' : 'bg-gradient-to-br from-[#f2e0da] to-[#e8d0c8]'}`}>
    <img
      src={main1}
      alt="Main Banner 1"
      className="absolute inset-0 w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
    />
    {/* затемнение снизу */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    {/* текст */}
    <div className="absolute bottom-6 left-6">
      <div className={`text-xl font-bold tracking-[0.12em] text-white leading-tight`}>
        {t.banners.onlineOnly}
      </div>
    </div>
    <div className="promo-ov" />
  </div>

  {/* Баннер 2 — СКИДКИ */}
  <div className={`relative overflow-hidden cursor-pointer aspect-square group ${dark ? 'bg-gradient-to-br from-[#1a1a20] to-[#111118]' : 'bg-gradient-to-br from-[#e0dbd5] to-[#ccc8c0]'}`}>
    <img
      src={main2}
      alt="Main Banner 2"
      className="absolute inset-0 w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
    />
    {/* затемнение снизу */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
    {/* текст */}
    <div className="absolute bottom-6 right-6 text-right">
      <div className="text-xl font-bold tracking-[0.12em] text-white leading-tight">
        {t.banners.discounts}
      </div>
      <div className="text-xs font-light tracking-[0.22em] text-white/70 mt-1">
        {t.banners.discountsSub}
      </div>
    </div>
    <div className="promo-ov" />
  </div>

</section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer style={{ borderTop:`1px solid ${tk.border}`, padding:'48px 40px 0', background:tk.bg, fontFamily:serif }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr) 180px 300px', gap:28, paddingBottom:40, borderBottom:`1px solid ${tk.border}` }}>
          {[
            { title:t.footer.catalog, links:t.footer.catalogLinks },
            { title:t.footer.help,    links:t.footer.helpLinks },
            { title:t.footer.about,   links:t.footer.aboutLinks },
            { title:t.footer.blog,    links:t.footer.blogLinks },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.1em', color:tk.text, marginBottom:16 }}>{title}</div>
              {links.map(link => (
                <div key={link} className="ftr-lnk" style={{ fontSize:12, color:tk.textMuted, marginBottom:10, lineHeight:1.4 }}
                  onMouseEnter={e=>e.target.style.color=tk.text} onMouseLeave={e=>e.target.style.color=tk.textMuted}>{link}</div>
              ))}
            </div>
          ))}
          <div>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.1em', color:tk.text, marginBottom:16 }}>{t.footer.payment}</div>
            {['Uzum','Click','Payme'].map(p => (
              <div key={p} style={{ display:'inline-block', border:`1px solid ${tk.tagBorder}`, borderRadius:3, padding:'4px 10px', fontSize:11, color:tk.textMuted, background:tk.surface, marginBottom:8, marginRight:6 }}>{p}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.1em', color:tk.text, marginBottom:10 }}>{t.footer.stayUpdated}</div>
            <div style={{ fontSize:12, color:tk.textMuted, lineHeight:1.7, marginBottom:14 }}>{t.footer.stayUpdatedText}</div>
            {subscribed ? (
              <div style={{ background:tk.surface, padding:'10px 14px', fontSize:12, color:tk.textMuted }}>{t.footer.subscribed}</div>
            ) : (
              <div style={{ display:'flex' }}>
                <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubscribe()}
                  placeholder={t.footer.phonePlaceholder}
                  style={{ flex:1, border:`1px solid ${tk.border}`, borderRight:'none', padding:'8px 12px', fontSize:11, fontFamily:serif, outline:'none', background:tk.inputBg, color:tk.text }}/>
                <button onClick={handleSubscribe} style={{ background:tk.btnPrimary, color:tk.btnText, border:'none', padding:'8px 16px', fontSize:11, cursor:'pointer', fontFamily:serif, letterSpacing:'0.04em', whiteSpace:'nowrap' }}>
                  {t.footer.subscribe}
                </button>
              </div>
            )}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 0', flexWrap:'wrap', gap:12 }}>
          <div style={{ fontSize:11, color:tk.textFaint }}>{t.footer.rights}</div>
          <div style={{ display:'flex', gap:20 }}>
            {[0,1,2,3].map(i => (
              <a key={i} href="#" style={{ color:tk.icon, display:'flex', transition:'color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.color=tk.text} onMouseLeave={e=>e.currentTarget.style.color=tk.icon}>
                <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                  {i===0&&<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>}
                  {i===1&&<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>}
                  {i===2&&<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.2-.04-.28-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.19-1.82 6.98-3.02 8.38-3.61 3.99-1.66 4.82-1.95 5.36-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.14-.02.3-.04.43z"/>}
                  {i===3&&<path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>}
                </svg>
              </a>
            ))}
          </div>
          <div style={{ fontSize:15, fontWeight:600, color:tk.text, letterSpacing:'0.02em' }}>+998 (55) 508 00 60</div>
        </div>
          <Link to="/admin"><div className="m-w-[1440px] h-10 bg-black text-center content-center" >
          <h1 style={{ fontSize:26, fontWeight:600, letterSpacing:'0.12em', color: dark?'#f0ede8':'white', lineHeight:1 }} className="text-white font-bold text-2xl " >Админ</h1>
       </div ></Link>
      </footer>
     

    </div>
  )
}