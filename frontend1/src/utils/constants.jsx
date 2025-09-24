import React from "react";
import {
  FaHeart,
  FaUser,
  FaPhoneAlt,
  FaRegStar,
  FaHome,
  FaRegListAlt,
} from "react-icons/fa";
import {
  Heart,
  User,
  Phone,
  Star,
  Home,
  Package,
  CreditCard,
  Shield,
  ShoppingCart,
  Sparkles,
  Crown,
  Zap,
  Baby,
} from "lucide-react";

export const sidebarLinks = [
  {
    id: 1,
    category: "Women",
    subCategory: true,
    name: "women",
    womenSubcategory: [
      "All Products",
      "Womens' Clothes",
      "Womens' Shoes",
      "Womens' Clothing Accessories",
      "Womens' Clothing Fabrics",
    ],
    routes: {
      "All Products": "/products/category/Women",
      "Womens' Clothes": "/products/category/Women/Clothes",
      "Womens' Shoes": "/products/category/Women/Shoes",
      "Womens' Clothing Accessories":
        "/products/category/Women/Clothing Accessories",
      "Womens' Clothing Fabrics": "/products/category/Women/Clothing Fabrics",
    },
  },
  {
    id: 2,
    category: "Men",
    subCategory: true,
    name: "men",
    menSubcategory: [
      "All Products",
      "Mens' Clothes",
      "Mens' Shoes",
      "Mens' Clothing Accessories",
      "Mens' Clothing Fabrics",
    ],
    routes: {
      "All Products": "/products/category/Men",
      "Mens' Clothes": "/products/category/Men/Clothes",
      "Mens' Shoes": "/products/category/Men/Shoes",
      "Mens' Clothing Accessories":
        "/products/category/Men/Clothing Accessories",
      "Mens' Clothing Fabrics": "/products/category/Men/Clothing Fabrics",
    },
  },
  {
    id: 3,
    category: "Teens & Kids",
    subCategory: true,
    name: "teens",
    teensSubcategory: [
      "All Products",
      "Kids' Clothes",
      "Kids' Shoes",
      "Clothing Accessories",
      "Toys & Games",
    ],
    routes: {
      "All Products": "/products/category/Teens & Kids",
      "Kids' Clothes": "/products/category/Teens & Kids/Clothes",
      "Kids' Shoes": "/products/category/Teens & Kids/Shoes",
      "Clothing Accessories":
        "/products/category/Teens & Kids/Clothing Accessories",
      "Toys & Games": "/products/category/Teens & Kids/Toys & Games",
    },
  },
  {
    id: 11,
    category: "Unisex",
    subCategory: true,
    name: "unisex",
    unisexSubcategory: [
      "All Products",
      "Unisex Clothes",
      "Unisex Shoes",
      "Unisex Clothing Accessories",
      "Unisex Clothing Fabrics",
    ],
    routes: {
      "All Products": "/products/category/Unisex",
      "Unisex Clothes": "/products/category/Unisex/Clothes",
      "Unisex Shoes": "/products/category/Unisex/Shoes",
      "Unisex Clothing Accessories":
        "/products/category/Unisex/Clothing Accessories",
      "Unisex Clothing Fabrics": "/products/category/Unisex/Clothing Fabrics",
    },
  },
  {
    id: 10,
    category: "Babies",
    subCategory: true,
    name: "babies",
    babiesSubcategory: [
      "All Products",
      "Baby Clothes",
      "Baby Shoes",
      "Toys & Games",
      "Baby Essentials",
    ],
    routes: {
      "All Products": "/products/category/Babies",
      "Baby Clothes": "/products/category/Babies/Clothes",
      "Baby Shoes": "/products/category/Babies/Shoes",
      "Toys & Games": "/products/category/Babies/Toys & Games",
      "Baby Essentials": "/products/category/Babies/Baby Products",
    },
  },
  {
    id: 4,
    category: "Accessories",
    subCategory: true,
    name: "accessories",
    accessoriesSubcategory: [
      "All Products",
      "Household Items",
      "Clothing Accessories",
      "Electronic Items",
    ],
    routes: {
      "All Products": "/products/category/Accessories",
      "Household Items": "/products/category/Accessories/Household Items",
      "Clothing Accessories": "/products/all/Clothing Accessories",
      "Electronic Items":
        "/products/category/Accessories/Electronic Accessories",
    },
  },
  {
    id: 5,
    category: "Shoes",
    route: "/products/subCategory/Shoes",
  },
  {
    id: 6,
    category: "Clothes",
    route: "/products/subCategory/Clothes",
  },
  {
    id: 7,
    category: "Clothing Fabrics",
    route: "/products/subCategory/Clothing Fabrics",
  },
  {
    id: 8,
    category: "Clothing Accessories",
    route: "/products/subCategory/Clothing Accessories",
  },
  {
    id: 12,
    category: "Suprise Me",
    route: "/products/supriseMe",
  },
  {
    id: 9,
    category: "Anime",
  },
];

export const sidebarCat = [
  {
    name: "Favourites",
    icon: <Heart />,
    url: "/profile/wishlist",
  },
  {
    name: "Profile",
    icon: <User />,
    url: "/profile",
  },
  {
    name: "Pre-orders",
    icon: <Star />,
    url: "",
  },
  {
    name: "Contact Us",
    icon: <Phone />,
    url: "/profile/help",
  },
];
export const list = [
  {
    name: "Home",
    icon: <Home />,
    url: "/",
  },
  {
    name: "Products",
    icon: <FaRegListAlt />,
    url: "/products",
  },
  {
    name: "Account",
    icon: <User />,
    url: "/profile",
  },
];

export const CATEGORY_STRUCTURE = [
  {
    category: "Women",
    subCategories: [
      "Clothes",
      "Shoes",
      "Clothing Accessories",
      "Clothing Fabrics",
    ],
    queryKey: "women",
  },
  {
    category: "Men",
    subCategories: [
      "Clothes",
      "Shoes",
      "Clothing Accessories",
      "Clothing Fabrics",
    ],
    queryKey: "men",
  },
  {
    category: "Unisex",
    subCategories: [
      "Clothes",
      "Shoes",
      "Clothing Accessories",
      "Clothing Fabrics",
    ],
    queryKey: "unisex",
  },
  {
    category: "Teens & Kids",
    subCategories: ["Clothes", "Shoes", "Clothing Accessories", "Toys & Games"],
    queryKey: "teens-kids",
  },
  {
    category: "Babies",
    subCategories: ["Clothes", "Shoes", "Toys & Games", "Baby Products"],
    queryKey: "babies",
  },
  {
    category: "Accessories",
    subCategories: [
      "Household Items",
      "Clothing Accessories",
      "Electronic Accessories",
    ],
    queryKey: "accessories",
  },
];

export const categories = [
  {
    id: 1,
    name: "Womens' Clothes",
    image:
      "https://i.pinimg.com/1200x/2c/63/cd/2c63cd73e582af47936a9f5fbca0bf4c.jpg",
    url: "/products/category/Women/Clothes",
  },
  {
    id: 2,
    name: "Womens' Shoes",
    image:
      "https://i.pinimg.com/1200x/3e/cd/6e/3ecd6edc0016cb949cb7899be4ce1e38.jpg",
    url: "/products/category/Women/Shoes",
  },
  {
    id: 3,
    name: "Kids' Shoes",
    image:
      "https://i.pinimg.com/736x/51/e6/e6/51e6e67fc19198f5c12a68304512098b.jpg",
    url: "/products/category/Teens & Kids/Shoes",
  },
  {
    id: 4,
    name: "Baby Clothes",
    image:
      "https://i.pinimg.com/736x/55/50/ff/5550fff02e8bafe1a41cb8dfdf52f8e6.jpg",
    url: "/products/category/Babies/Clothes",
  },
  {
    id: 5,
    name: "Kids' Clothes",
    image:
      "https://i.pinimg.com/736x/93/54/ac/9354ac0645f5ae8d94ae1e3f5efb56e9.jpg",
    url: "/products/category/Teens & Kids/Clothes",
  },
  {
    id: 6,
    name: "Clothing Accessories",
    image:
      "https://i.pinimg.com/736x/67/7c/59/677c59d7633b4082ccb4676c24f87c37.jpg",
    url: "/products/all/Clothing Accessories",
  },
  {
    id: 7,
    name: "Mens' Clothes",
    image:
      "https://i.pinimg.com/736x/7d/46/18/7d461808f381dca36dc271ca2494c9cd.jpg",
    url: "/products/category/Men/Clothes",
  },
  {
    id: 8,
    name: "Womens' Clothing Fabric",
    image:
      "https://i.pinimg.com/1200x/44/c4/cf/44c4cf8e1292bbd3777ff90f1b45243b.jpg",
    url: "/products/category/Women/Clothing Fabrics",
  },
  {
    id: 9,
    name: "Mens' Shoes",
    image:
      "https://i.pinimg.com/736x/f7/d1/93/f7d1935960f76dacce070027427f11c6.jpg",
    url: "/products/category/Men/Shoes",
  },
  {
    id: 10,
    name: "Baby Shoes",
    image:
      "https://i.pinimg.com/736x/79/d5/23/79d523c1a57907e5b695a7292c85e77e.jpg",
    url: "/products/category/Babies/Shoes",
  },
  {
    id: 11,
    name: "Mens' Clothing Fabric",
    image:
      "https://i.pinimg.com/1200x/d8/82/60/d882600a708bed6434b63350d6390386.jpg",
    url: "/products/category/Men/Clothing Fabrics",
  },
  {
    id: 12,
    name: "Household Items",
    image:
      "https://i.pinimg.com/736x/eb/d8/4a/ebd84aee9bd1feddce359d9803236f4b.jpg",
    url: "/products/category/Accessories/Household Items",
  },
];

export const statesAndCities = {
  Abia: ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Bende"],
  Adamawa: ["Yola", "Mubi", "Numan", "Jimeta", "Ganye"],
  "Akwa Ibom": ["Uyo", "Ikot Ekpene", "Eket", "Oron", "Abak"],
  Anambra: ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Aguleri"],
  Bauchi: ["Bauchi", "Azare", "Misau", "Jama'are", "Katagum"],
  Bayelsa: ["Yenagoa", "Brass", "Sagbama", "Nembe", "Ogbia"],
  Benue: ["Makurdi", "Gboko", "Katsina-Ala", "Vandeikya", "Adikpo"],
  Borno: ["Maiduguri", "Biu", "Bama", "Dikwa", "Gubio"],
  "Cross River": ["Calabar", "Ugep", "Ikom", "Obudu", "Ogoja"],
  Delta: ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor"],
  Ebonyi: ["Abakaliki", "Afikpo", "Onueke", "Ezzamgbo", "Ishiagu"],
  Edo: ["Benin City", "Auchi", "Ekpoma", "Uromi", "Irrua"],
  Ekiti: ["Ado-Ekiti", "Ikere-Ekiti", "Oye-Ekiti", "Ijero-Ekiti", "Ise-Ekiti"],
  Enugu: ["Enugu", "Nsukka", "Oji River", "Agbani", "Awgu"],
  FCT: ["Abuja", "Gwagwalada", "Kuje", "Bwari", "Kwali"],
  Gombe: ["Gombe", "Billiri", "Kaltungo", "Dukku", "Bajoga"],
  Imo: ["Owerri", "Orlu", "Okigwe", "Mbaise", "Nkwerre"],
  Jigawa: ["Dutse", "Hadejia", "Kazaure", "Gumel", "Birnin Kudu"],
  Kaduna: ["Kaduna", "Zaria", "Kafanchan", "Sabon Gari", "Soba"],
  Kano: ["Kano", "Wudil", "Garko", "Rano", "Karaye"],
  Katsina: ["Katsina", "Daura", "Funtua", "Malumfashi", "Bakori"],
  Kebbi: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru", "Gwandu"],
  Kogi: ["Lokoja", "Okene", "Kabba", "Ankpa", "Idah"],
  Kwara: ["Ilorin", "Offa", "Omu-Aran", "Lafiagi", "Kaiama"],
  Lagos: ["Lagos Island", "Ikeja", "Epe", "Ikorodu", "Badagry"],
  Nasarawa: ["Lafia", "Keffi", "Akwanga", "Nassarawa", "Doma"],
  Niger: ["Minna", "Bida", "Kontagora", "Suleja", "New Bussa"],
  Ogun: ["Abeokuta", "Sagamu", "Ota", "Ilaro", "Ijebu-Ode"],
  Ondo: ["Akure", "Ondo", "Owo", "Ikare-Akoko", "Okitipupa"],
  Osun: ["Osogbo", "Ile-Ife", "Ede", "Ilesha", "Ikirun"],
  Oyo: ["Ibadan", "Ogbomoso", "Iseyin", "Oyo", "Shaki"],
  Plateau: ["Jos", "Bukuru", "Bokkos", "Pankshin", "Shendam"],
  Rivers: ["Port Harcourt", "Obio-Akpor", "Okrika", "Degema", "Bonny"],
  Sokoto: ["Sokoto", "Tambuwal", "Gwadabawa", "Bodinga", "Yabo"],
  Taraba: ["Jalingo", "Wukari", "Bali", "Gembu", "Serti"],
  Yobe: ["Damaturu", "Potiskum", "Gashua", "Nguru", "Geidam"],
  Zamfara: ["Gusau", "Kaura Namoda", "Talata Mafara", "Bungudu", "Anka"],
};

export const faqData = [
  {
    category: "Orders & Shipping",
    icon: Package,
    questions: [
      {
        question: "How can I track my order?",
        answer:
          "You can track your order by visiting the \"My Orders\" section in your account. Each order has a tracking number that you can use to monitor your package's progress. You'll also receive email updates with tracking information.",
      },
      {
        question: "What are your shipping options and delivery times?",
        answer:
          "We offer standard shipping (3-5 business days) and express shipping (1-2 business days). Shipping times may vary based on your location and product availability. Lagos and Abuja typically receive faster delivery.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "You can cancel or modify your order within 2 hours of placing it, provided it hasn't been processed for shipping. After this window, please contact our sales team via WhatsApp for assistance.",
      },
      {
        question: "What if my order arrives damaged or incorrect?",
        answer:
          "We apologize for any inconvenience. Please contact us immediately with photos of the damaged item or incorrect product. We'll arrange for a replacement or full refund within 24 hours.",
      },
    ],
  },
  {
    category: "Payments & Pricing",
    icon: CreditCard,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards, bank transfers, Paystack, and cash on delivery (COD) for select locations. All online payments are secured with SSL encryption.",
      },
      {
        question: "Are your prices in Nigerian Naira?",
        answer:
          "Yes, all prices on our website are displayed in Nigerian Naira (₦). We don't charge any additional currency conversion fees for local transactions.",
      },
      {
        question: "Do you offer installment payments?",
        answer:
          "Yes, we partner with select financial institutions to offer installment payment options for purchases above ₦100,000. This option will be available at checkout for eligible items.",
      },
      {
        question: "What is your refund policy?",
        answer:
          "We offer full refunds within 14 days of delivery for unused items in original packaging. Refunds are processed within 5-7 business days to your original payment method.",
      },
    ],
  },
  {
    category: "Account & Technical",
    icon: Shield,
    questions: [
      {
        question: "How do I create an account?",
        answer:
          'Click on "Sign Up" at the top right of any page. Fill in your details including name, email, and password. You\'ll receive a verification email to activate your account.',
      },
      {
        question: "I forgot my password. How can I reset it?",
        answer:
          'Go to the login page and click "Forgot Password". Enter your email address and we\'ll send you a password reset link. The link expires after 24 hours for security.',
      },
      {
        question: "Why can't I access my account?",
        answer:
          "This could be due to an incorrect password, unverified email, or temporary account suspension. Try resetting your password first, or contact our technical support via WhatsApp.",
      },
      {
        question: "How do I update my personal information?",
        answer:
          'Log into your account and go to "My Profile". You can update your name, phone number, addresses, and password. Email changes require verification.',
      },
    ],
  },
  {
    category: "Products & Services",
    icon: ShoppingCart,
    questions: [
      {
        question: "How do I know if a product is genuine?",
        answer:
          "All our products are sourced directly from authorized distributors and manufacturers. Each product comes with original packaging, warranty cards, and authenticity certificates where applicable.",
      },
      {
        question: "Do you offer warranties on products?",
        answer:
          "Yes, all products come with manufacturer warranties. Warranty periods vary by product and brand. You can find warranty information on each product page and in your order confirmation.",
      },
      {
        question: "Can I return a product I don't like?",
        answer:
          "Yes, we offer a 14-day return policy for most items. Products must be unused, in original packaging, and accompanied by the original receipt. Some items like software and personal care products may have restrictions.",
      },
      {
        question: "How do I leave a product review?",
        answer:
          'After receiving your order, go to "My Orders" and click on the product you want to review. You can rate the product and leave detailed feedback to help other customers.',
      },
    ],
  },
];

export const categoryConfigs = {
  // Women's Categories
  "Women-Clothes": {
    greeting: "Welcome to Your Wardrobe Dreams 🌸",
    subtitle: "Fashion is art, and you are the canvas",
    vibe: "Discover styles that speak your language",
    bgGradient: "from-purple-500 via-pink-500 to-rose-500",
    textColor: "text-white",
    icon: Sparkles,
    particles: ["👗", "🌸", "✨", "💫"],
    animation: "slide-in-right",
  },
  "Women-Shoes": {
    greeting: "Step Into Elegance ✨",
    subtitle: "Every step tells a story",
    vibe: "Find your perfect stride with our curated collection",
    bgGradient: "from-pink-500 via-rose-400 to-pink-600",
    textColor: "text-white",
    icon: Crown,
    particles: ["👠", "✨", "💎", "👑"],
    animation: "fade-in-up",
  },
  "Women-Clothing Accessories": {
    greeting: "Accessorize Like a Queen 👑",
    subtitle: "The details that make you shine",
    vibe: "Perfect finishing touches for your perfect look",
    bgGradient: "from-rose-500 via-pink-400 to-purple-500",
    textColor: "text-white",
    icon: Star,
    particles: ["👜", "💍", "🕶️", "✨"],
    animation: "twinkle",
  },
  "Women-Clothing Fabrics": {
    greeting: "Fabrics of Dreams 🧵",
    subtitle: "Where creativity meets quality",
    vibe: "Craft your vision with premium materials",
    bgGradient: "from-indigo-400 via-purple-400 to-pink-400",
    textColor: "text-white",
    icon: Sparkles,
    particles: ["🧵", "✂️", "🎨", "✨"],
    animation: "fade-in-left",
  },

  // Men's Categories
  "Men-Clothes": {
    greeting: "Gentleman's Wardrobe 🎩",
    subtitle: "Sophistication meets comfort",
    vibe: "Redefine your style with timeless pieces",
    bgGradient: "from-gray-700 via-blue-800 to-indigo-900",
    textColor: "text-white",
    icon: Crown,
    particles: ["👔", "🎩", "⚡", "🔥"],
    animation: "fade-in-left",
  },
  "Men-Shoes": {
    greeting: "Walk with Confidence 👞",
    subtitle: "Every step speaks volumes",
    vibe: "From boardroom to street, find your perfect fit",
    bgGradient: "from-slate-600 via-gray-700 to-blue-800",
    textColor: "text-white",
    icon: Zap,
    particles: ["👞", "⚡", "🔥", "💼"],
    animation: "slide-in-left",
  },
  "Men-Clothing Accessories": {
    greeting: "The Gentleman's Touch 🎯",
    subtitle: "Details that define distinction",
    vibe: "Elevate every outfit with the perfect accent",
    bgGradient: "from-amber-600 via-orange-600 to-red-700",
    textColor: "text-white",
    icon: Star,
    particles: ["👔", "⌚", "🕶️", "💼"],
    animation: "zoom-in",
  },
  "Men-Clothing Fabrics": {
    greeting: "Premium Materials Await 🧵",
    subtitle: "Craft excellence with quality",
    vibe: "Build your wardrobe from the finest foundations",
    bgGradient: "from-stone-600 via-gray-600 to-slate-700",
    textColor: "text-white",
    icon: Package,
    particles: ["🧵", "✂️", "📐", "⚡"],
    animation: "fade-in-up",
  },

  // Unisex Categories
  "Unisex-Clothes": {
    greeting: "Fashion Without Boundaries 🌈",
    subtitle: "Style that speaks to everyone",
    vibe: "Express yourself freely with versatile designs",
    bgGradient: "from-teal-500 via-cyan-500 to-blue-500",
    textColor: "text-white",
    icon: Heart,
    particles: ["👕", "🌈", "✨", "💫"],
    animation: "zoom-in",
  },
  "Unisex-Shoes": {
    greeting: "Shoes for Every Journey 🚀",
    subtitle: "Comfort meets universal style",
    vibe: "Step into footwear that fits any adventure",
    bgGradient: "from-green-500 via-teal-500 to-cyan-600",
    textColor: "text-white",
    icon: Zap,
    particles: ["👟", "🚀", "⚡", "🌟"],
    animation: "bounce-in",
  },
  "Unisex-Clothing Accessories": {
    greeting: "Accessories for All 🎨",
    subtitle: "Universal style, personal expression",
    vibe: "Find pieces that complement every personality",
    bgGradient: "from-violet-500 via-purple-500 to-indigo-600",
    textColor: "text-white",
    icon: Star,
    particles: ["🎒", "🧢", "🕶️", "✨"],
    animation: "slide-in-right",
  },
  "Unisex-Clothing Fabrics": {
    greeting: "Materials for Every Creator 🎭",
    subtitle: "Unleash your creative potential",
    vibe: "Quality fabrics for unlimited possibilities",
    bgGradient: "from-emerald-500 via-teal-600 to-cyan-700",
    textColor: "text-white",
    icon: Sparkles,
    particles: ["🧵", "🎨", "✂️", "🌟"],
    animation: "twinkle",
  },

  // Teens & Kids Categories
  "Teens & Kids-Clothes": {
    greeting: "Young & Trendy Styles 🌟",
    subtitle: "Fashion that grows with you",
    vibe: "Cool clothes for the coolest kids and teens",
    bgGradient: "from-orange-400 via-pink-400 to-red-500",
    textColor: "text-white",
    icon: Star,
    particles: ["👚", "🌟", "🎈", "🦄"],
    animation: "bounce-in",
  },
  "Teens & Kids-Shoes": {
    greeting: "Ready, Set, Go! 👟",
    subtitle: "Shoes for every adventure",
    vibe: "From playground to party - find the perfect fit",
    bgGradient: "from-lime-400 via-green-500 to-emerald-600",
    textColor: "text-white",
    icon: Zap,
    particles: ["👟", "⚡", "🏃‍♂️", "🌈"],
    animation: "zoom-in",
  },
  "Teens & Kids-Clothing Accessories": {
    greeting: "Accessorize Your Style 🎨",
    subtitle: "Fun accessories for fabulous kids",
    vibe: "Add some sparkle to every outfit",
    bgGradient: "from-yellow-400 via-orange-400 to-pink-500",
    textColor: "text-white",
    icon: Heart,
    particles: ["🎒", "🧢", "🌈", "✨"],
    animation: "slide-in-right",
  },
  "Teens & Kids-Toys & Games": {
    greeting: "Playtime Paradise 🎮",
    subtitle: "Where imagination comes alive",
    vibe: "Discover endless fun and learning adventures",
    bgGradient: "from-red-400 via-yellow-400 to-green-500",
    textColor: "text-white",
    icon: Star,
    particles: ["🎮", "🧸", "🎲", "🚀"],
    animation: "bounce-in",
  },

  // Babies Categories
  "Babies-Clothes": {
    greeting: "Tiny Fashion, Big Cuteness 👶",
    subtitle: "Adorable outfits for little angels",
    vibe: "Soft, safe, and absolutely precious clothing",
    bgGradient: "from-sky-300 via-blue-400 to-indigo-500",
    textColor: "text-white",
    icon: Baby,
    particles: ["👶", "🍼", "💙", "⭐"],
    animation: "fade-in-up",
  },
  "Babies-Shoes": {
    greeting: "Little Steps, Big Dreams 👣",
    subtitle: "First shoes for first adventures",
    vibe: "Gentle protection for tiny explorers",
    bgGradient: "from-pink-300 via-rose-400 to-purple-500",
    textColor: "text-white",
    icon: Heart,
    particles: ["👶", "👣", "💕", "🌟"],
    animation: "bounce-in",
  },
  "Babies-Toys & Games": {
    greeting: "Wonder & Joy Await 🧸",
    subtitle: "Safe fun for curious minds",
    vibe: "Educational play that sparks imagination",
    bgGradient: "from-amber-300 via-yellow-400 to-orange-500",
    textColor: "text-white",
    icon: Star,
    particles: ["🧸", "🎵", "🌈", "⭐"],
    animation: "twinkle",
  },
  "Babies-Baby Products": {
    greeting: "Hello Little Sunshine! 🌈",
    subtitle: "Where tiny dreams come true",
    vibe: "Everything your little one needs to sparkle and grow",
    bgGradient: "from-blue-400 via-cyan-300 to-teal-400",
    textColor: "text-white",
    icon: Baby,
    particles: ["👶", "🍼", "🧸", "⭐"],
    animation: "bounce-in",
  },

  // Accessories Categories
  "Accessories-Household Items": {
    greeting: "Home Essentials & More 🏠",
    subtitle: "Making your house a home",
    vibe: "Discover items that bring comfort and style to every room",
    bgGradient: "from-emerald-400 via-teal-500 to-cyan-600",
    textColor: "text-white",
    icon: Heart,
    particles: ["🏠", "🕯️", "🌿", "✨"],
    animation: "fade-in-left",
  },
  "Accessories-Clothing Accessories": {
    greeting: "Complete Your Look ✨",
    subtitle: "The perfect finishing touches",
    vibe: "From subtle to statement - find your signature style",
    bgGradient: "from-purple-400 via-violet-500 to-indigo-600",
    textColor: "text-white",
    icon: Crown,
    particles: ["👜", "💍", "🕶️", "✨"],
    animation: "slide-in-right",
  },
  "Accessories-Electronic Accessories": {
    greeting: "Tech Meets Style ⚡",
    subtitle: "Enhance your digital lifestyle",
    vibe: "Smart accessories for the modern world",
    bgGradient: "from-blue-500 via-indigo-600 to-purple-700",
    textColor: "text-white",
    icon: Zap,
    particles: ["⚡", "📱", "💻", "🔌"],
    animation: "zoom-in",
  },

  // Special Categories (keeping your anime one)
  Anime: {
    greeting: "Yokoso watashi no McLily store 🌸",
    subtitle: "Your otaku paradise awaits",
    vibe: "Dive into the world of anime magic and collectibles",
    bgGradient: "from-indigo-600 via-purple-600 to-pink-600",
    textColor: "text-white",
    icon: Zap,
    particles: ["⚡", "🌸", "🎌", "✨"],
    animation: "zoom-in",
  },
};
