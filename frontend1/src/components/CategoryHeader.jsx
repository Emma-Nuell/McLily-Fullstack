import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Sparkles,
  Heart,
  Baby,
  Zap,
  ShoppingBag,
  Crown,
  Star,
  Gift,
} from "lucide-react";
import { categoryConfigs } from '../utils/constants';

const CategoryHeader = ({
  category = "women-shoes",
  productCount = 0,
  showAnimation = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [showAnimation]);


      const defaultConfig = {
        greeting: "Welcome to Shopping Paradise! 🛍️",
        subtitle: "Discover amazing products",
        vibe: "Your perfect find is just a click away",
        bgGradient: "from-teal-500 via-cyan-500 to-blue-500",
        textColor: "text-white",
        icon: ShoppingBag,
        particles: ["🛍️", "✨", "🎁", "⭐"],
        animation: "fade-in",
      };

      const config = categoryConfigs[category] || defaultConfig;
    const IconComponent = config.icon;
    
      const getAnimationClass = (animation) => {
        const baseClass = isVisible
          ? "opacity-100 transform translate-y-0 scale-100"
          : "opacity-0 transform translate-y-4 scale-95";

        switch (animation) {
          case "slide-in-right":
            return isVisible
              ? "opacity-100 transform translate-x-0"
              : "opacity-0 transform translate-x-8";
          case "slide-in-left":
            return isVisible
              ? "opacity-100 transform translate-x-0"
              : "opacity-0 transform -translate-x-8";
          case "bounce-in":
            return isVisible
              ? "opacity-100 transform scale-100"
              : "opacity-0 transform scale-75";
          case "zoom-in":
            return isVisible
              ? "opacity-100 transform scale-100"
              : "opacity-0 transform scale-110";
          case "twinkle":
            return `${baseClass} ${isVisible ? "animate-pulse" : ""}`;
          default:
            return baseClass;
        }
    };
    
      const FloatingParticles = ({ particles }) => {
        return (
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            {particles.map((particle, index) => (
              <div
                key={index}
                className={`absolute text-2xl animate-bounce opacity-70 ${
                  isVisible ? "animate-bounce" : "opacity-0"
                }`}
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${30 + (index % 2) * 20}%`,
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: `${2 + (index % 3)}s`,
                }}
              >
                {particle}
              </div>
            ))}
          </div>
        );
      };


  return (
    <div
      className={`relative bg-gradient-to-br ${config.bgGradient} rounded-lg overflow-hidden mb-8`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-10">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} opacity-5 transform -skew-x-12 animate-pulse`}
        ></div>
      </div>

      {/* Floating Particles */}
      <FloatingParticles particles={config.particles} />

      {/* Main Content */}
      <div
        className={`relative z-10 px-8 py-12 text-center ${config.textColor}`}
      >
        <div
          className={`transition-all duration-1000 ease-out ${getAnimationClass(
            config.animation
          )}`}
        >
          {/* Icon */}
          {/* <div className='flex justify-center mb-6'>
            <div className='w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm'>
              <IconComponent className='h-8 w-8 text-white' />
            </div>
          </div> */}

          {/* Main Greeting */}
          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
            {config.greeting}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl mb-4 font-light opacity-90">
            {config.subtitle}
          </p>

          {/* Vibe Description */}
          <p className="text-base mb-4 opacity-80 max-w-2xl mx-auto">
            {config.vibe}
          </p>

          {/* Product Count */}
          {productCount > 0 && (
            <div className="inline-flex items-center gap-2  bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium">
              <Gift className="" size={16} />
              <span>
                {productCount.toLocaleString()} amazing products waiting for you
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-white opacity-10"></div>
    </div>
  );
};

CategoryHeader.propTypes = {
    category: PropTypes.string,
    productCount: PropTypes.number,
    showAnimation: PropTypes.bool,
    particles: PropTypes.array
}

/*
// Basic usage
<CategoryHeader category="anime" productCount={245} />

// Women's shoes with product count
<CategoryHeader category="women-shoes" productCount={189} />

// Custom category (falls back to default)
<CategoryHeader category="custom-category" productCount={50} />

// Without animation
<CategoryHeader 
  category="baby-products" 
  productCount={156} 
  showAnimation={false} 
/>
*/

export default CategoryHeader