import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Package,
  RefreshCw,
  Bell,
  Heart,
  ArrowLeft,
  Home,
  Mail,
  Clock,
} from "lucide-react";

const EmptyCategory = ({
  category = "products",
  onNotifyMe = null,
  onBrowseOther = null,
  onGoHome = () => (window.location.href = "/"),
  onGoBack = () => window.history.back(),
  showNotifyMe = false,
  showBrowseOther = true,
  customMessage = null,
  isRestocking = true,
}) => {

      const [isAnimating, setIsAnimating] = useState(true);
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

    const categoryConfigs = {
      "women-clothes": {
        title: "Our Fashion Fairies Are Busy Restocking! ✨",
        message:
          "Looks like our women's clothes collection was so amazing, it literally flew off the digital shelves! Our style scouts are out hunting for the next trendy treasures just for you.",
        icon: "👗",
        bgGradient: "from-pink-100 to-purple-100",
        accentColor: "teal-500",
        suggestions: [
          "Check out our accessories",
          "Browse men's fashion",
          "Explore new arrivals",
        ],
      },
      "women-shoes": {
        title: "Every Step Taken, Every Shoe Sold! 👠",
        message:
          "Our shoe collection was so popular, we've temporarily run out of ways to make you walk in style! But don't worry - our cobbler elves are working overtime to restock the magic.",
        icon: "👠",
        bgGradient: "from-rose-100 to-pink-100",
        accentColor: "rose-500",
        suggestions: [
          "Browse handbags",
          "Check out jewelry",
          "View clothing collection",
        ],
      },
      "baby-products": {
        title: "The Little Ones Cleaned Us Out! 👶",
        message:
          "Our baby products were so cute, even the stork wanted some! We're currently restocking with extra cuddles and giggles. Your little sunshine will have to wait just a tiny bit longer.",
        icon: "🍼",
        bgGradient: "from-blue-100 to-cyan-100",
        accentColor: "cyan-500",
        suggestions: [
          "Browse kids toys",
          "Check maternity wear",
          "View family essentials",
        ],
      },
      anime: {
        title: "Sold Out Faster Than Goku's Kamehameha! ⚡",
        message:
          "Konnichiwa! Our anime collection was so kawaii, it disappeared faster than a ninja in the night! We're currently on a quest to restock with even more epic merchandise. Ganbatte!",
        icon: "🎌",
        bgGradient: "from-indigo-100 to-purple-100",
        accentColor: "indigo-500",
        suggestions: [
          "Browse manga collection",
          "Check gaming gear",
          "View cosplay accessories",
        ],
      },
      electronics: {
        title: "Tech So Good, It Short-Circuited Our Stock! ⚡",
        message:
          "Our electronics were so cutting-edge, they literally cut through our entire inventory! Our tech wizards are downloading fresh stock as we speak.",
        icon: "💻",
        bgGradient: "from-blue-100 to-indigo-100",
        accentColor: "blue-500",
        suggestions: [
          "Browse accessories",
          "Check smart home",
          "View mobile devices",
        ],
      },
      jewelry: {
        title: "Sparkled Right Off Our Shelves! ✨",
        message:
          "Our jewelry collection was so dazzling, customers couldn't resist taking every last piece! We're currently mining for more gems and crafting new sparkles for you.",
        icon: "💎",
        bgGradient: "from-yellow-100 to-amber-100",
        accentColor: "amber-500",
        suggestions: ["Browse watches", "Check accessories", "View gift items"],
      },
      "home-decor": {
        title: "Home Sweet Sold-Out Home! 🏡",
        message:
          "Our home decor was so cozy, everyone wanted to take it home (literally)! We're currently redecorating our warehouse to bring you more beautiful pieces.",
        icon: "🏡",
        bgGradient: "from-green-100 to-teal-100",
        accentColor: "green-500",
        suggestions: [
          "Browse furniture",
          "Check lighting",
          "View kitchen essentials",
        ],
      },
    };

    const defaultConfig = {
      title: "Whoops! Our Shelves Are Having a Spa Day! 🧖‍♀️",
      message:
        "Looks like our products were so irresistible, they've all found new homes! Don't worry - our shopping genies are working their magic to restock everything with love and care.",
      icon: "📦",
      bgGradient: "from-gray-100 to-blue-100",
      accentColor: "teal-500",
      suggestions: [
        "Browse other categories",
        "Check new arrivals",
        "View bestsellers",
      ],
    };

    const config = categoryConfigs[category] || defaultConfig;

    const restockingMessages = [
      "Restocking with extra love...",
      "Hunting for amazing deals...",
      "Negotiating with our suppliers...",
      "Quality-checking new arrivals...",
      "Arranging products by cuteness level...",
      "Teaching new products our company values...",
    ];

    const [currentMessage, setCurrentMessage] = useState(restockingMessages[0]);

    useEffect(() => {
      if (isRestocking) {
        const interval = setInterval(() => {
          setCurrentMessage((prev) => {
            const currentIndex = restockingMessages.indexOf(prev);
            const nextIndex = (currentIndex + 1) % restockingMessages.length;
            return restockingMessages[nextIndex];
          });
        }, 3000);
        return () => clearInterval(interval);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRestocking]);

    const handleNotifyMe = () => {
      setNotificationSent(true);
      if (onNotifyMe) onNotifyMe();
    };
    
  return (
    <div
      className={`min-h-96 bg-gradient-to-br ${config.bgGradient} rounded-lg p-8 text-center relative overflow-hidden`}
    >
      {/* Background Animation */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className={`w-64 h-64 bg-${
            config.accentColor
          } rounded-full absolute -top-32 -right-32 ${
            isAnimating ? "animate-pulse" : ""
          }`}
        ></div>
        <div
          className={`w-48 h-48 bg-${
            config.accentColor
          } rounded-full absolute -bottom-24 -left-24 ${
            isAnimating ? "animate-pulse" : ""
          }`}
        ></div>
      </div>

      {/* Main Content */}
      <div className='relative z-10 max-w-2xl mx-auto'>
        {/* Animated Icon */}
        <div className='text-8xl mb-6 relative'>
          <span className={isAnimating ? "animate-bounce" : ""}>
            {config.icon}
          </span>
          {isRestocking && (
            <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2'>
              <RefreshCw
                className={`h-6 w-6 text-${config.accentColor} animate-spin`}
              />
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className='text-3xl font-bold text-gray-800 mb-4'>
          {customMessage || config.title}
        </h2>

        {/* Message */}
        <p className='text-lg text-gray-700 mb-8 leading-relaxed'>
          {config.message}
        </p>

        {/* Restocking Status */}
        {isRestocking && (
          <div
            className={`bg-white bg-opacity-70 rounded-lg p-4 mb-8 border-l-4 border-${config.accentColor}`}
          >
            <div className='flex items-center justify-center gap-3 mb-2'>
              <Clock className={`h-5 w-5 text-${config.accentColor}`} />
              <span className='font-semibold text-gray-800'>
                Currently Restocking
              </span>
            </div>
            <p
              className={`text-${config.accentColor} font-medium animate-pulse`}
            >
              {currentMessage}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className='space-y-4 mb-8'>
          {/* Primary Actions */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {showNotifyMe && (
              <button
                onClick={handleNotifyMe}
                disabled={notificationSent}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  notificationSent
                    ? "bg-green-500 text-white"
                    : `bg-${config.accentColor} hover:bg-opacity-90 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
                }`}
              >
                {notificationSent ? (
                  <>
                    <Heart className='h-5 w-5' />
                    We&apos;ll Notify You! 💕
                  </>
                ) : (
                  <>
                    <Bell className='h-5 w-5' />
                    Notify Me When Back
                  </>
                )}
              </button>
            )}

            {showBrowseOther && (
              <button
                onClick={onBrowseOther}
                className='px-6 py-3 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-lg font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2'
              >
                <Package className='h-5 w-5' />
                Browse Other Categories
              </button>
            )}
          </div>

          {/* Secondary Actions */}
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <button
              onClick={onGoBack}
              className='px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center justify-center gap-2'
            >
              <ArrowLeft className='h-4 w-4' />
              Go Back
            </button>
            <button
              onClick={onGoHome}
              className='px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center justify-center gap-2'
            >
              <Home className='h-4 w-4' />
              Home
            </button>
          </div>
        </div>

        {/* Suggestions */}
        {config.suggestions && (
          <div className='bg-white bg-opacity-60 rounded-lg p-6'>
            <h3 className='font-semibold text-gray-800 mb-3'>
              While You Wait, How About:
            </h3>
            <div className='flex flex-wrap gap-2 justify-center'>
              {config.suggestions.map((suggestion, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 bg-${config.accentColor} bg-opacity-20 text-${config.accentColor} rounded-full text-sm font-medium cursor-pointer hover:bg-opacity-30 transition-all`}
                  onClick={() => console.log(`Navigate to: ${suggestion}`)}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Fun Footer */}
        <div className='mt-8 text-sm text-gray-600'>
          <p>
            💡 <strong>Pro tip:</strong> Our restocked items usually come with
            surprise discounts!
          </p>
        </div>

        {/* Email Notification Success */}
        {notificationSent && (
          <div className='mt-4 bg-green-100 border border-green-200 rounded-lg p-4 flex items-center justify-center gap-2'>
            <Mail className='h-5 w-5 text-green-600' />
            <span className='text-green-800 font-medium'>
              Perfect! We&apos;ll email you the moment we restock. Keep an eye on
              your inbox! 📧
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

EmptyCategory.propTypes = {
    category: PropTypes.string,
    onNotifyMe: PropTypes.func,
    onBrowseOther: PropTypes.func,
    onGoBack: PropTypes.func,
    onGoHome: PropTypes.func,
    showNotifyMe: PropTypes.bool,
    showBrowseOther: PropTypes.bool,
    customMessage: PropTypes.string,
    isRestocking: PropTypes.bool,
}

// Usage examples:
/*
// Basic usage
<EmptyCategory category="women-clothes" />

// With custom handlers
<EmptyCategory 
  category="anime"
  onNotifyMe={() => console.log('User wants notification')}
  onBrowseOther={() => navigate('/categories')}
/>

// Custom message
<EmptyCategory 
  category="jewelry"
  customMessage="Our gems are on vacation! ✈️"
  isRestocking={false}
/>

// Minimal version
<EmptyCategory 
  category="electronics"
  showNotifyMe={false}
  showBrowseOther={false}
/>
*/


export default EmptyCategory