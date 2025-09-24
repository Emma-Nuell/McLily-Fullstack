import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ArrowLeft,
  ShoppingCart,
  Wifi,
  Server,
} from "lucide-react";

const Error = ({
    error = null,
    title = "Oops! Our shopping cart hit a speed bump! 🛒",
    message = "Don't worry, even the best online stores have their off days. We're probably just restocking our servers with fresh data!",
    showRetry = true,
    showHome = true,
    showBack = false,
    showCart = false,
    onRetry = () => window.location.reload(),
    onHome = () => window.location.href = '/',
    onBack = () => window.history.back(),
    onCart = () => window.location.href = '/cart',
    customActions = [],
    variant = 'default', // 'default', 'network', 'server', 'notfound'
}) => {

     const getVariantContent = (variant) => {
       switch (variant) {
         case "network":
           return {
             title: "Looks like your internet went shopping without you! 📶",
             message:
               "Your connection seems to be taking a coffee break. Check your internet and let's get back to shopping!",
             icon: Wifi,
             iconColor: "dark:text-orange-400 text-orange-700",
             bgColor: "bg-orange-100 dark:bg-orange-600/30",
             borderColor: "border-orange-200 dark:border-orange-800",
           };
         case "server":
           return {
             title: "Our servers are having a sale on errors! 🖥️",
             message:
               "It's not you, it's us! Our servers are probably arguing about which product is the best seller. Give us a moment!",
             icon: Server,
             iconColor: "dark:text-red-400 text-red-700",
             bgColor: "bg-red-100 dark:bg-red-600/30",
             borderColor: "border-red-200 dark:border-red-800",
           };
         case "notfound":
           return {
             title: "This page went shopping and never came back! 🔍",
             message:
               "The page you're looking for seems to have wandered off to explore other parts of the internet. Let's get you back on track!",
             icon: ShoppingCart,
             iconColor: "dark:text-purple-400 text-purple-700",
             bgColor: "bg-purple-100 dark:bg-purple-600/30",
             borderColor: "border-purple-200 dark:border-purple-800",
           };
         default:
           return {
             title: title,
             message: message,
             icon: AlertTriangle,
             iconColor: "dark:text-amber-400 text-amber-700",
             bgColor: "bg-amber-100 dark:bg-amber-600/30",
             borderColor: "border-amber-200 dark:border-amber-800",
           };
       }
    };
    
    const variantContent = getVariantContent(variant);
    const IconComponent = variantContent.icon;

      const getErrorMessage = (error) => {
        if (!error) return null;

        // React Query error structure
        if (error.data?.message) {
          return error.response.data.message;
        }
        if (error.response?.statusText) {
          return `${error.response.status}: ${error.response.statusText}`;
        }
        if (error.message) {
          return error.message;
        }
        if (typeof error === "string") {
          return error;
        }
        return "An unexpected error occurred";
      };

    const errorMessage = getErrorMessage(error);
    
      const retryMessages = [
        "Refreshing the magic...",
        "Convincing our servers...",
        "Bribing the internet...",
        "Reloading with extra love...",
        "Asking nicely this time...",
    ];
    
      const [isRetrying, setIsRetrying] = useState(false);
  const [retryMessage, setRetryMessage] = useState(retryMessages[0]);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryMessage(retryMessages[Math.floor(Math.random() * retryMessages.length)]);
    
    try {
      await onRetry();
    } catch (err) {
      console.error('Retry failed:', err);
    } finally {
      setTimeout(() => {
        setIsRetrying(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-11rem)] flex items-center justify-center p-4">
      <div
        className={`max-w-md w-full ${variantContent.bgColor} ${variantContent.borderColor} border rounded-lg p-8 text-center shadow-sm`}
      >
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-24 h-24 ${variantContent.bgColor} p-2 rounded-full flex items-center justify-center border-2 ${variantContent.borderColor}`}
          >
            <IconComponent
              className={` ${variantContent.iconColor}`}
              size={22}
            />
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">
          {variantContent.title}
        </h2>

        {/* Error Message */}
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {variantContent.message}
        </p>

        {/* Technical Error Details */}
        {errorMessage && (
          <div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 rounded-lg p-3 mb-6 text-left">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1 text-sm">
              Technical Details:
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Actions Row */}
          <div className="flex gap-3">
            {showRetry && (
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex-1 bg-primary-600 dark:bg-primary-300 hover:bg-primary-500 dark:hover:bg-primary-200 disabled:bg-teal-300 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw
                  className={` ${isRetrying ? "animate-spin" : ""}`}
                  size={18}
                />
                {isRetrying ? retryMessage : "Try Again"}
              </button>
            )}

            {showHome && (
              <button
                onClick={onHome}
                className="flex-1 border border-gray-300 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-transparent cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <Home className="" size={18} />
                Home
              </button>
            )}
          </div>

          {/* Secondary Actions Row */}
          {(showBack || showCart || customActions.length > 0) && (
            <div className="flex gap-3">
              {showBack && (
                <button
                  onClick={onBack}
                  className="flex-1 border border-gray-300 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-transparent cursor-pointer transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="" size={18} />
                  Go Back
                </button>
              )}

              {showCart && (
                <button
                  onClick={onCart}
                  className="flex-1 border border-gray-300 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-transparent cursor-pointer transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="" size={18} />
                  View Cart
                </button>
              )}

              {/* Custom Actions */}
              {customActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    action.variant === "primary"
                      ? "bg-primary-600 dark:bg-primary-300 hover:bg-primary-500 dark:hover:bg-primary-200 text-white"
                      : "border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-transparent cursor-pointer"
                  }`}
                >
                  {action.icon && <action.icon className="" size={18} />}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fun Footer Message */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Don&apos;t worry, our digital shopping assistants are on the case!
            🕵️‍♀️
          </p>
        </div>
      </div>
    </div>
  );
}

Error.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    variant: PropTypes.string,
    customActions: PropTypes.array,
    showBack: PropTypes.bool,
    showCart: PropTypes.bool,
    showHome: PropTypes.bool,
    showRetry: PropTypes.bool,
    onRetry: PropTypes.func,
    onBack: PropTypes.func,
    onCart: PropTypes.func,
    onHome: PropTypes.func,
    error: PropTypes.shape({})
}


// Usage examples as comments:
/*
// Basic usage with React Query error
<ErrorComponent 
  error={queryError} 
  onRetry={() => refetch()} 
/>

// Network error variant
<ErrorComponent 
  variant="network"
  error={networkError}
  onRetry={() => refetch()}
  showCart={true}
/>

// Server error with custom actions
<ErrorComponent 
  variant="server"
  error={serverError}
  onRetry={() => refetch()}
  customActions={[
    {
      label: 'Contact Support',
      onClick: () => window.open('/support'),
      icon: Mail,
      variant: 'secondary'
    }
  ]}
/>

// 404 Not Found
<ErrorComponent 
  variant="notfound"
  showRetry={false}
  showBack={true}
/>

// Custom error with all buttons
<ErrorComponent 
  title="Payment Failed! 💳"
  message="Your card decided to take a shopping break. Let's try a different payment method!"
  error={paymentError}
  showCart={true}
  showBack={true}
  customActions={[
    {
      label: 'Try Different Card',
      onClick: () => setShowPayment(true),
      variant: 'primary'
    }
  ]}
/>
*/

export default Error