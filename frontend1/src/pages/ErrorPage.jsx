import { Link, useNavigate } from "react-router-dom"
import {Home, ArrowLeft, Search, ShoppingCart, Package, AlertCircle, RefreshCw, Star, Tag, Heart, User, Truck, Gift} from "lucide-react"
import React, { useEffect, useState } from "react"

const ErrorPage = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    setIsAnimating(true)
  }, [])

  const quickLinks = [
    {
      icon: Home,
      label: "Home",
      color: "bg-primary-500 dark:bg-primary-300",
      link: "/",
    },
    { icon: Search, label: "Search", color: "bg-teal-500 dark:bg-teal-800", link: "/" },
    {
      icon: ShoppingCart,
      label: "Cart",
      color: "bg-primary-600 dark:bg-primary-100",
      link: "/cart",
    },
    {
      icon: User,
      label: "Account",
      color: "bg-teal-600 dark:bg-teal-700",
      link: "/account",
    },
    {
      icon: Heart,
      label: "Wishlist",
      color: "bg-primary-600 dark:bg-primary-200",
      link: "/wishlist",
    },
    {
      icon: Truck,
      label: "Orders",
      color: "bg-teal-400 dark:bg-teal-600",
      link: "/orders",
    },
  ];

  const handleGoBack = () => {
    window.history.back()
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  

  return (
    <section className='page-100 bg-background-white flex flex-col'>
      <div className='flex-1 flex items-center justify-center px-4 py-8'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* animated elements */}
          <div className='relative mb-8'>
            <div className='absolute inset-0 flex items-center justify-center opacity-20'>
              <Package
                className={`text-cyan-500 ${
                  isAnimating ? "animate-bounce" : ""
                }`}
                size={54}
              />
              <Gift
                className={`w-24 h-24 text-teal-500 -ml-8 ${
                  isAnimating ? "animate-pulse" : ""
                  }`}
                size={48}
              />
            </div>

            <div className='relative z-10'>
              <h1 className='text-8xl md:text-9xl font-bold text-primary-600 dark:text-primary-300'>
                4{" "}
                <span className='relative'>
                  0{" "}
                  <ShoppingCart className='absolute top-4 left-1/2 transform -translate-x-1/2 text-teal-500' size={18}/>
                </span>
                4
              </h1>
              <div className='flex items-center justify-center mb-6'>
                <AlertCircle
                  className='text-orange-500 mr-2'
                  size={20}
                />
                <span className='text-lg font-semibold text-gray-700 dark:text-gray-200'>
                  PRODUCT NOT FOUND
                </span>
                <AlertCircle className='text-orange-500 ml-2' size={20} />
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-r from-primary-50 dark:from-surface to-teal-50 dark:to-surface rounded-xl p-8 mb-8 border border-primary-100 dark:border-gray-600'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-300 mb-4'>
              Oops! This item is out of stock... in our URLs! 📦
            </h2>
            <p className='dark:text-gray-400 text-gray-600  text-lg mb-6'>
              The page you are looking for seems to have been{" "}
              <span className='font-semibold text-primary-600 dark:text-primary-300'>sold out</span>{" "}
              or moved to a different shelf. Dont worry, we have plenty of other
              amazing products for you!
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-6'>
              <button
                onClick={handleGoBack}
                className='group bg-primary-600 dark:bg-primary-300 hover:bg-primary-500 dark:hover:bg-primary-200 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
              >
                <span className='flex items-center justify-center'>
                  <ArrowLeft
                    className='mr-2 group-hover:-translate-x-1 transition-transform duration-300'
                    size={20}
                  />
                  Go Back
                </span>
              </button>

              <button
                onClick={handleGoHome}
                className='group bg-white dark:bg-gray-100 hover:bg-gray-50 text-primary-600 dark:text-primary-300 border-2 border-primary-600 dark:border-primary-300 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
              >
                <span className='flex items-center justify-center'>
                  <Home className='mr-2 group-hover:scale-110 transition-transform duration-300' size={20} />
                  Shop Home
                </span>
              </button>
            </div>
          </div>

          <div className='bg-surface rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700'>
            <h3 className='text-xl font-bold text-gray-900 dark:text-gray-300 mb-6'>
              Quick Navigation
            </h3>
            <div className='grid grid-cols-3 md:grid-cols-6 gap-4'>
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => navigate(link.link)}
                  className={`group ${link.color} hover:scale-105 text-white p-4 rounded-lg transition-all duration-300 transform hover:shadow-lg`}
                >
                  <link.icon className=' mx-auto mb-2 group-hover:scale-110 transition-transform duration-300' size={18} />
                  <span className='text-sm font-medium'>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className='mt-8 text-center'>
            <p className='text-gray-500 dark:text-gray-400 text-sm mb-2'>
              Need help finding something specific?
            </p>
            <button className='text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-300'>
              Contact Customer Support →
            </button>
          </div>

          <div className='fixed top-70 left-10 opacity-40'>
            <Tag className=' text-primary-400 animate-pulse' size={36} />
          </div>
          <div className='fixed bottom-20 right-10 opacity-30'>
            <Gift className='text-teal-400 animate-bounce' size={36} />
          </div>
        </div>
      </div>
    </section>
  );
}


export default ErrorPage