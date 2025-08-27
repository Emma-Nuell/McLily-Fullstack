import React from "react";
import {
  FaHeart,
  FaUser,
  FaPhoneAlt,
  FaRegStar,
  FaHome,
  FaRegListAlt,
} from "react-icons/fa";
import { Heart, User, Phone, Star, Home, Package, CreditCard, Shield, ShoppingCart } from "lucide-react";

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
      "Womens' Clothing Fabric",
    ],
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
      "Mens' Clothing Fabric",
    ],
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
      "Unisex Clothing Fabric",
      "Unisex Clothing Accessories",
    ],
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
  },
  {
    id: 4,
    category: "Accessories",
    subCategory: true,
    name: "accessories",
    accessoriesSubcategory: [
      "All Products",
      "Household Accessories",
      "Clothing Accessories",
      "Electronic Accessories",
    ],
  },
  {
    id: 5,
    category: "Shoes",
  },
  {
    id: 6,
    category: "Clothings",
  },
  {
    id: 7,
    category: "Clothing Fabric",
  },
  {
    id: 8,
    category: "Accessories",
  },
  {
    id: 12,
    category: "Suprise Me",
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
    url: "/favourite",
  },
  {
    name: "Profile",
    icon: <User />,
    url: "/profile",
  },
  {
    name: "Pre-orders",
    icon: <Star />,
    url: "/preorder",
  },
  {
    name: "Contact Us",
    icon: <Phone />,
    url: "/preorder",
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
  },
  {
    id: 2,
    name: "Womens' Shoes",
    image:
      "https://i.pinimg.com/1200x/3e/cd/6e/3ecd6edc0016cb949cb7899be4ce1e38.jpg",
  },
  {
    id: 3,
    name: "Kids' Shoes",
    image:
      "https://i.pinimg.com/736x/51/e6/e6/51e6e67fc19198f5c12a68304512098b.jpg",
  },
  {
    id: 4,
    name: "Baby Clothes",
    image:
      "https://i.pinimg.com/736x/55/50/ff/5550fff02e8bafe1a41cb8dfdf52f8e6.jpg",
  },
  {
    id: 5,
    name: "Kids' Clothes",
    image:
      "https://i.pinimg.com/736x/93/54/ac/9354ac0645f5ae8d94ae1e3f5efb56e9.jpg",
  },
  {
    id: 6,
    name: "Clothing Accessories",
    image:
      "https://i.pinimg.com/736x/67/7c/59/677c59d7633b4082ccb4676c24f87c37.jpg",
  },
  {
    id: 7,
    name: "Mens' Clothes",
    image:
      "https://i.pinimg.com/736x/7d/46/18/7d461808f381dca36dc271ca2494c9cd.jpg",
  },
  {
    id: 8,
    name: "Womens' Clothing Fabric",
    image:
      "https://i.pinimg.com/1200x/44/c4/cf/44c4cf8e1292bbd3777ff90f1b45243b.jpg",
  },
  {
    id: 9,
    name: "Mens' Shoes",
    image:
      "https://i.pinimg.com/736x/f7/d1/93/f7d1935960f76dacce070027427f11c6.jpg",
  },
  {
    id: 10,
    name: "Baby Shoes",
    image:
      "https://i.pinimg.com/736x/79/d5/23/79d523c1a57907e5b695a7292c85e77e.jpg",
  },
  {
    id: 11,
    name: "Mens' Clothing Fabric",
    image:
      "https://i.pinimg.com/1200x/d8/82/60/d882600a708bed6434b63350d6390386.jpg",
  },
  {
    id: 12,
    name: "Household Accessories",
    image:
      "https://i.pinimg.com/736x/eb/d8/4a/ebd84aee9bd1feddce359d9803236f4b.jpg",
  },
];

export const statesAndCities = {
    'Abia': ['Aba', 'Umuahia', 'Ohafia', 'Arochukwu', 'Bende'],
    'Adamawa': ['Yola', 'Mubi', 'Numan', 'Jimeta', 'Ganye'],
    'Akwa Ibom': ['Uyo', 'Ikot Ekpene', 'Eket', 'Oron', 'Abak'],
    'Anambra': ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Aguleri'],
    'Bauchi': ['Bauchi', 'Azare', 'Misau', 'Jama\'are', 'Katagum'],
    'Bayelsa': ['Yenagoa', 'Brass', 'Sagbama', 'Nembe', 'Ogbia'],
    'Benue': ['Makurdi', 'Gboko', 'Katsina-Ala', 'Vandeikya', 'Adikpo'],
    'Borno': ['Maiduguri', 'Biu', 'Bama', 'Dikwa', 'Gubio'],
    'Cross River': ['Calabar', 'Ugep', 'Ikom', 'Obudu', 'Ogoja'],
    'Delta': ['Asaba', 'Warri', 'Sapele', 'Ughelli', 'Agbor'],
    'Ebonyi': ['Abakaliki', 'Afikpo', 'Onueke', 'Ezzamgbo', 'Ishiagu'],
    'Edo': ['Benin City', 'Auchi', 'Ekpoma', 'Uromi', 'Irrua'],
    'Ekiti': ['Ado-Ekiti', 'Ikere-Ekiti', 'Oye-Ekiti', 'Ijero-Ekiti', 'Ise-Ekiti'],
    'Enugu': ['Enugu', 'Nsukka', 'Oji River', 'Agbani', 'Awgu'],
    'FCT': ['Abuja', 'Gwagwalada', 'Kuje', 'Bwari', 'Kwali'],
    'Gombe': ['Gombe', 'Billiri', 'Kaltungo', 'Dukku', 'Bajoga'],
    'Imo': ['Owerri', 'Orlu', 'Okigwe', 'Mbaise', 'Nkwerre'],
    'Jigawa': ['Dutse', 'Hadejia', 'Kazaure', 'Gumel', 'Birnin Kudu'],
    'Kaduna': ['Kaduna', 'Zaria', 'Kafanchan', 'Sabon Gari', 'Soba'],
    'Kano': ['Kano', 'Wudil', 'Garko', 'Rano', 'Karaye'],
    'Katsina': ['Katsina', 'Daura', 'Funtua', 'Malumfashi', 'Bakori'],
    'Kebbi': ['Birnin Kebbi', 'Argungu', 'Yauri', 'Zuru', 'Gwandu'],
    'Kogi': ['Lokoja', 'Okene', 'Kabba', 'Ankpa', 'Idah'],
    'Kwara': ['Ilorin', 'Offa', 'Omu-Aran', 'Lafiagi', 'Kaiama'],
    'Lagos': ['Lagos Island', 'Ikeja', 'Epe', 'Ikorodu', 'Badagry'],
    'Nasarawa': ['Lafia', 'Keffi', 'Akwanga', 'Nassarawa', 'Doma'],
    'Niger': ['Minna', 'Bida', 'Kontagora', 'Suleja', 'New Bussa'],
    'Ogun': ['Abeokuta', 'Sagamu', 'Ota', 'Ilaro', 'Ijebu-Ode'],
    'Ondo': ['Akure', 'Ondo', 'Owo', 'Ikare-Akoko', 'Okitipupa'],
    'Osun': ['Osogbo', 'Ile-Ife', 'Ede', 'Ilesha', 'Ikirun'],
    'Oyo': ['Ibadan', 'Ogbomoso', 'Iseyin', 'Oyo', 'Shaki'],
    'Plateau': ['Jos', 'Bukuru', 'Bokkos', 'Pankshin', 'Shendam'],
    'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Okrika', 'Degema', 'Bonny'],
    'Sokoto': ['Sokoto', 'Tambuwal', 'Gwadabawa', 'Bodinga', 'Yabo'],
    'Taraba': ['Jalingo', 'Wukari', 'Bali', 'Gembu', 'Serti'],
    'Yobe': ['Damaturu', 'Potiskum', 'Gashua', 'Nguru', 'Geidam'],
    'Zamfara': ['Gusau', 'Kaura Namoda', 'Talata Mafara', 'Bungudu', 'Anka']
  };

export const faqData = [
    {
      category: 'Orders & Shipping',
      icon: Package,
      questions: [
        {
          question: 'How can I track my order?',
          answer: 'You can track your order by visiting the "My Orders" section in your account. Each order has a tracking number that you can use to monitor your package\'s progress. You\'ll also receive email updates with tracking information.'
        },
        {
          question: 'What are your shipping options and delivery times?',
          answer: 'We offer standard shipping (3-5 business days) and express shipping (1-2 business days). Shipping times may vary based on your location and product availability. Lagos and Abuja typically receive faster delivery.'
        },
        {
          question: 'Can I change or cancel my order?',
          answer: 'You can cancel or modify your order within 2 hours of placing it, provided it hasn\'t been processed for shipping. After this window, please contact our sales team via WhatsApp for assistance.'
        },
        {
          question: 'What if my order arrives damaged or incorrect?',
          answer: 'We apologize for any inconvenience. Please contact us immediately with photos of the damaged item or incorrect product. We\'ll arrange for a replacement or full refund within 24 hours.'
        }
      ]
    },
    {
      category: 'Payments & Pricing',
      icon: CreditCard,
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit and debit cards, bank transfers, Paystack, and cash on delivery (COD) for select locations. All online payments are secured with SSL encryption.'
        },
        {
          question: 'Are your prices in Nigerian Naira?',
          answer: 'Yes, all prices on our website are displayed in Nigerian Naira (₦). We don\'t charge any additional currency conversion fees for local transactions.'
        },
        {
          question: 'Do you offer installment payments?',
          answer: 'Yes, we partner with select financial institutions to offer installment payment options for purchases above ₦100,000. This option will be available at checkout for eligible items.'
        },
        {
          question: 'What is your refund policy?',
          answer: 'We offer full refunds within 14 days of delivery for unused items in original packaging. Refunds are processed within 5-7 business days to your original payment method.'
        }
      ]
    },
    {
      category: 'Account & Technical',
      icon: Shield,
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on "Sign Up" at the top right of any page. Fill in your details including name, email, and password. You\'ll receive a verification email to activate your account.'
        },
        {
          question: 'I forgot my password. How can I reset it?',
          answer: 'Go to the login page and click "Forgot Password". Enter your email address and we\'ll send you a password reset link. The link expires after 24 hours for security.'
        },
        {
          question: 'Why can\'t I access my account?',
          answer: 'This could be due to an incorrect password, unverified email, or temporary account suspension. Try resetting your password first, or contact our technical support via WhatsApp.'
        },
        {
          question: 'How do I update my personal information?',
          answer: 'Log into your account and go to "My Profile". You can update your name, phone number, addresses, and password. Email changes require verification.'
        }
      ]
    },
    {
      category: 'Products & Services',
      icon: ShoppingCart,
      questions: [
        {
          question: 'How do I know if a product is genuine?',
          answer: 'All our products are sourced directly from authorized distributors and manufacturers. Each product comes with original packaging, warranty cards, and authenticity certificates where applicable.'
        },
        {
          question: 'Do you offer warranties on products?',
          answer: 'Yes, all products come with manufacturer warranties. Warranty periods vary by product and brand. You can find warranty information on each product page and in your order confirmation.'
        },
        {
          question: 'Can I return a product I don\'t like?',
          answer: 'Yes, we offer a 14-day return policy for most items. Products must be unused, in original packaging, and accompanied by the original receipt. Some items like software and personal care products may have restrictions.'
        },
        {
          question: 'How do I leave a product review?',
          answer: 'After receiving your order, go to "My Orders" and click on the product you want to review. You can rate the product and leave detailed feedback to help other customers.'
        }
      ]
    }
  ];

export const products = [
  {
    id: "001",
    name: "Elegant High Heels",
    description:
      "Stylish women's high heels perfect for parties and formal events.",
    category: "Women Shoes",
    price: 4999,
    currency: "USD",
    brand: "FashionFeet",
    stock: 20,
    images: [
      "https://www.course-api.com/images/store/extra-product-2.jpeg",
      "https://www.course-api.com/images/store/product-6.jpeg",
      "https://www.course-api.com/images/store/extra-product-4.jpeg",
      "https://www.course-api.com/images/store/extra-product-1.jpeg",
      "https://www.course-api.com/images/store/extra-product-3.jpeg",
    ],
    ratings: { average: 4.6, reviews: 75 },
    sizes: [
      {
        size: "40",
        stock: 10,
      },
      {
        size: "41",
        stock: 8,
      },
      {
        size: "42",
        stock: 6,
      },
      {
        size: "44",
        stock: 4,
      },
      {
        size: "45",
        stock: 10,
      },
    ],
    specifications: {
      color: "Red",
      size: "38",
      material: "Leather",
    },
    tags: ["heels", "women", "party", "formal"],
    seller: {
      name: "TrendShoe Hub",
      rating: 4.8,
      contact: "contact@trendyshoes.com",
    },
    discount: { percentage: 15, endDate: "2024-12-25" },
    shipping: { free: false, estimatedDelivery: "2-4 business days" },
    addedToCart: false,
    wishlist: false,
    reviews: [
      {
        userId: "90876",
        comment: "Comfortable and stylish!",
        rating: 5,
        date: "2024-11-15",
      },
    ],
    featured: true,
  },
  {
    id: "002",
    name: "Men's Leather Loafers",
    description: "Premium leather loafers suitable for casual and formal wear.",
    category: "Men Shoes",
    price: 6599,
    currency: "USD",
    brand: "EliteShoes",
    stock: 30,
    images: [
      "https://www.course-api.com/images/store/extra-product-2.jpeg",
      "https://www.course-api.com/images/store/product-6.jpeg",
      "https://www.course-api.com/images/store/extra-product-1.jpeg",
      "https://www.course-api.com/images/store/extra-product-3.jpeg",
      "https://www.course-api.com/images/store/extra-product-4.jpeg",
    ],
    ratings: { average: 4.7, reviews: 100 },
    sizes: [
      {
        size: "40",
        stock: 10,
      },
      {
        size: "41",
        stock: 8,
      },
      {
        size: "42",
        stock: 6,
      },
      {
        size: "44",
        stock: 4,
      },
      {
        size: "45",
        stock: 10,
      },
    ],
    specifications: {
      color: "Black",
      size: "42",
      material: "Genuine Leather",
    },
    tags: ["loafers", "men", "leather", "casual"],
    seller: {
      name: "Footwear Classics",
      rating: 4.9,
      contact: "support@footclassics.com",
    },
    shipping: { free: true, estimatedDelivery: "3-5 business days" },
    addedToCart: false,
    wishlist: false,
    reviews: [],
    featured: true,
  },
  {
    id: "003",
    name: "Baby Winter Jacket",
    description: "Warm and cozy jacket for babies during the winter season.",
    category: "Kids and Baby Clothing",
    price: 3599,
    currency: "USD",
    brand: "CozyKids",
    stock: 50,
    images: [
      "https://www.course-api.com/images/store/extra-product-3.jpeg",
      "https://www.course-api.com/images/store/product-6.jpeg",
      "https://www.course-api.com/images/store/extra-product-1.jpeg",
      "https://www.course-api.com/images/store/extra-product-2.jpeg",
      "https://www.course-api.com/images/store/extra-product-4.jpeg",
    ],
    ratings: { average: 4.9, reviews: 120 },
    sizes: [
      {
        size: "XS",
        stock: 10,
      },
      {
        size: "S",
        stock: 8,
      },
      {
        size: "M",
        stock: 6,
      },
      {
        size: "L",
        stock: 4,
      },
      {
        size: "XL",
        stock: 10,
      },
    ],
    specifications: {
      color: "Blue",
      size: "12 months",
      material: "Wool",
    },
    tags: ["baby", "winter", "jacket"],
    seller: {
      name: "Kids Boutique",
      rating: 4.5,
      contact: "help@kidsboutique.com",
    },
    newArrival: true,
    shipping: { free: true, estimatedDelivery: "4-6 business days" },
    addedToCart: false,
    wishlist: false,
    reviews: [],
  },

 
];
