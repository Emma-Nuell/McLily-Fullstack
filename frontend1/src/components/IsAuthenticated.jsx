import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Lock,
  ShoppingBag,
  Heart,
  MapPin,
  Star,
  Shield,
  User,
  LogIn,
  UserPlus,
  Clock,
  Package,
} from "lucide-react";

const IsAuthenticated = ({
  page = "general",
  onLogin = () => (window.location.href = "/auth"),
  onSignup = () => (window.location.href = "/auth"),
  onGoBack = () => window.history.back(),
  showBackButton = true,
  customTitle = null,
  customMessage = null,
}) => {
  // Page-specific configurations
  const pageConfigs = {
    "orders": {
      title: "Your Shopping Adventures Await! 🛍️",
      message:
        "Ready to take a trip down memory lane? Your order history is like a diary of all the amazing things you've bought! But first, we need to make sure it's really you.",
      icon: ShoppingBag,
      iconColor: "text-teal-700 dark:text-teal-400",
      bgGradient:
        "from-teal-100 to-cyan-100 dark:from-teal-600/30 dark:to-cyan-600/30",
      borderColor: "border-teal-200 dark:border-teal-800",
      benefits: [
        "Track all your past orders",
        "Reorder your favorite items easily",
        "Download invoices and receipts",
        "See delivery status and history",
      ],
      primaryAction: "Login to View Orders",
      secondaryAction: "New here? Create Account",
    },
    wishlist: {
      title: "Your Wishlist is Waiting for You! 💝",
      message:
        "Aww, someone has their eye on some special items! Your wishlist is like your personal treasure chest of dreams. Let's unlock it so you can see all those amazing products you've been saving for later.",
      icon: Heart,
      iconColor: "text-pink-700 dark:text-pink-400",
      bgGradient:
        "from-pink-100 to-rose-100 dark:from-pink-600/30 dark:to-rose-600/30",
      borderColor: "border-pink-200 dark:border-pink-800",
      benefits: [
        "Save items for later",
        "Get notified of price drops",
        "Share your wishlist with friends",
        "Never lose track of favorites",
      ],
      primaryAction: "Login to See Wishlist",
      secondaryAction: "Sign up to Start Saving",
    },
    addresses: {
      title: "Let's Get Your Addresses Organized! 📍",
      message:
        "Home sweet home! And work, and that friend's place where you always order stuff... We keep all your addresses safe and secure so shopping is super convenient. Just need to verify it's you first!",
      icon: MapPin,
      iconColor: "text-blue-700 dark:text-blue-400",
      bgGradient:
        "from-blue-100 to-indigo-100 dark:from-blue-600/30 dark:to-indigo-600/30",
      borderColor: "border-blue-200 dark:border-blue-800",
      benefits: [
        "Save multiple delivery addresses",
        "Quick checkout with saved locations",
        "Set default shipping preferences",
        "Manage billing addresses securely",
      ],
      primaryAction: "Login to Manage Addresses",
      secondaryAction: "Create Account to Save Addresses",
    },
    "ratings-reviews": {
      title: "Your Voice Matters! Share Your Experience ⭐",
      message:
        "Ready to spill the tea on your recent purchases? Your reviews help other shoppers make great decisions, and we love hearing what you think! But first, let's make sure you're logged into your account.",
      icon: Star,
      iconColor: "text-yellow-700 dark:text-yellow-400",
      bgGradient:
        "from-yellow-100 to-amber-100 dark:from-yellow-600/30 dark:to-amber-600/30",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      benefits: [
        "Rate and review your purchases",
        "Help other customers decide",
        "Get exclusive reviewer benefits",
        "Build your reviewer reputation",
      ],
      primaryAction: "Login to Write Reviews",
      secondaryAction: "Join to Share Your Thoughts",
    },
    security: {
      title: "Fort Knox Level Security Ahead! 🔒",
      message:
        "This is where the magic happens - your security settings! Password changes, two-factor authentication, and all that important stuff. It's super secure (obviously), so we need to double-check it's really you.",
      icon: Shield,
      iconColor: "text-red-700 dark:text-red-400",
      bgGradient:
        "from-red-100 to-orange-100 dark:from-red-600/30 dark:to-orange-600/30",
      borderColor: "border-red-200 dark:border-red-800",
      benefits: [
        "Change your password securely",
        "Enable two-factor authentication",
        "Manage login sessions",
        "View security activity logs",
      ],
      primaryAction: "Login for Security Settings",
      secondaryAction: "Create Secure Account",
    },
    profile: {
      title: "Your Personal Space Awaits! 👤",
      message:
        "This is your corner of our website - where you can update your info, preferences, and make everything just the way you like it. It's like your digital home, and we want to make sure only you have the key!",
      icon: User,
      iconColor: "text-purple-700 dark:text-purple-400",
      bgGradient:
        "from-purple-100 to-indigo-100 dark:from-purple-600/30 dark:to-indigo-600/30",
      borderColor: "border-purple-200 dark:border-purple-800",
      benefits: [
        "Update your personal information",
        "Manage communication preferences",
        "Set your shopping preferences",
        "Upload and change profile picture",
      ],
      primaryAction: "Login to Your Profile",
      secondaryAction: "Create Your Profile",
    },
  };

  // Default configuration
  const defaultConfig = {
    title: "Oops! This Area is Members Only! 🎭",
    message:
      "Looks like you've stumbled into our VIP section! This area is reserved for our awesome registered members. Don't worry though - joining the club is quick, easy, and totally worth it!",
    icon: Lock,
    iconColor: "text-gray-700 dark:text-gray-400",
    bgGradient:
      "from-gray-100 to-blue-100 dark:from-gray-600/30 dark:to-blue-600/30",
    borderColor: "border-gray-200 dark:border-gray-800",
    benefits: [
      "Access all protected features",
      "Personalized shopping experience",
      "Faster checkout process",
      "Exclusive member benefits",
    ],
    primaryAction: "Login to Continue",
    secondaryAction: "Create New Account",
  };

  const config = pageConfigs[page] || defaultConfig;
  const IconComponent = config.icon;

   const [isLoggingIn, setIsLoggingIn] = useState(false);
   const [isSigningUp, setIsSigningUp] = useState(false);

     const handleLogin = async () => {
       setIsLoggingIn(true);
       try {
         await onLogin();
       } finally {
         setIsLoggingIn(false);
       }
     };

     const handleSignup = async () => {
       setIsSigningUp(true);
       try {
         await onSignup();
       } finally {
         setIsSigningUp(false);
       }
     };
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`max-w-2xl w-full bg-gradient-to-br ${config.bgGradient} border ${config.borderColor} rounded-xl p-8 text-center shadow-lg`}
      >
        {/* Lock Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className={`w-24 h-24 bg-gradient-to-b ${config.bgGradient} p-2 rounded-full flex items-center justify-center shadow-lg border-2 ${config.borderColor}`}
            >
              <IconComponent className={` ${config.iconColor}`} size={26} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
          {customTitle || config.title}
        </h1>

        {/* Message */}
        <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          {customMessage || config.message}
        </p>

        {/* Benefits */}
        <div className="bg-surface bg-opacity-70 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center justify-center gap-2">
            <Package
              className=" text-primary-600 dark:text-primary-300"
              size={18}
            />
            What You&apos;ll Get Access To:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {config.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <div
                  className={`w-2 h-2 rounded-full ${config.iconColor.replace(
                    "text-",
                    "bg-"
                  )}`}
                ></div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-6">
          {/* Primary Action - Login */}
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-3 ${
              isLoggingIn
                ? "bg-gray-400 cursor-not-allowed"
                : `bg-gradient-to-l ${config.bgGradient} hover:opacity-90 ${config.iconColor} shadow-lg`
            }`}
          >
            {isLoggingIn ? (
              <>
                <div className="w-10 h-10 border-2 border-primary-300 dark:border-primary-100 border-t-transparent rounded-full animate-spin"></div>
                Taking you to login...
              </>
            ) : (
              <>
                <LogIn className="" size={18} />
                {config.primaryAction}
              </>
            )}
          </button>

          {/* Secondary Action - Signup */}
          <button
            onClick={handleSignup}
            disabled={isSigningUp}
            className={`w-full py-3 px-6 ${
              config.borderColor
            } bg-transparent cursor-pointer text-gray-900 dark:text-gray-200 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-3 ${
              isSigningUp ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSigningUp ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-300 dark:border-primary-100 border-t-transparent rounded-full animate-spin"></div>
                Creating your account...
              </>
            ) : (
              <>
                <UserPlus className="" size={18} />
                {config.secondaryAction}
              </>
            )}
          </button>
        </div>

        {/* Back Button */}
        {showBackButton && (
          <button
            onClick={onGoBack}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <Clock className="" size={18} />
            Maybe Later - Go Back
          </button>
        )}

        {/* Fun Footer Message */}
        <div className="mt-8 pt-6 border-t border-primary-300 dark:border-primary-100">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Fun fact:</strong> Registered users get first dibs on flash
            sales! 🏃‍♀️💨
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <Shield className="" size={16} />
          <span>Your data is protected with bank-level security</span>
        </div>
      </div>
    </div>
  );
};

IsAuthenticated.propTypes = {
  page: PropTypes.string,
  onLogin: PropTypes.func,
  onSignup: PropTypes.func,
  onGoBack: PropTypes.func,
  showBackButton: PropTypes.bool,
  customTitle: PropTypes.string,
  customMessage: PropTypes.string,
};


// Usage examples:
/*
// Order history page
<IsAuthenticated 
  page="order-history"
  onLogin={() => navigate('/login?redirect=orders')}
  onSignup={() => navigate('/signup?redirect=orders')}
/>

// Wishlist page
<IsAuthenticated 
  page="wishlist"
  onLogin={() => handleLogin('/wishlist')}
/>

// Security settings
<IsAuthenticated 
  page="security"
  showBackButton={false}
/>

// Custom message
<IsAuthenticated 
  page="profile"
  customTitle="Almost there! 🎯"
  customMessage="Just one quick login and you'll be managing your profile like a pro!"
/>

// Reviews page
<IsAuthenticated 
  page="ratings-reviews"
  onLogin={() => loginWithRedirect('/reviews')}
  onSignup={() => signupWithRedirect('/reviews')}
/>
*/

export default IsAuthenticated;
