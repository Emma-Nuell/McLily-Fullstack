import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Grid, Heart, List, Search, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useUserContext } from "../../context";
import { Link } from "react-router-dom";
import Error from "../Error";

const Wishlist = () => {
  const { isAuthenticated, wishlistItems, wishlistIsLoading, wishlistError } = useUserContext()
  const [viewMode, setViewMode] = useState("grid");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [wishlistItemss, setWishlistItems] = useState([
    {
      _id: 1,
      productId: "prod1",
      name: "iPhone 14 Pro Max",
      price: 850000,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      category: "Electronics",
      rating: {
        average: 4.8,
        reviewsCount: 245,
      },
      stock: 5,
      addedAt: new Date("2024-07-15"),
      description: "Latest iPhone with Pro camera system and A16 Bionic chip",
    },
    {
      _id: 2,
      productId: "prod2",
      name: "AirPods Pro (2nd Gen)",
      price: 120000,
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
      category: "Electronics",
      rating: {
        average: 4.7,
        reviewsCount: 189,
      },
      stock: 8,
      addedAt: new Date("2024-07-18"),
      description: "Active Noise Cancellation and Spatial Audio",
    },
    {
      _id: 3,
      productId: "prod3",
      name: "MacBook Air M2",
      price: 650000,
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      category: "Computers",
      rating: {
        average: 4.9,
        reviewsCount: 312,
      },
      stock: 0,
      addedAt: new Date("2024-07-10"),
      description: "Supercharged by M2 chip, 13.6-inch Liquid Retina display",
    },
    {
      _id: 4,
      productId: "prod4",
      name: "Samsung Galaxy Watch 5",
      price: 180000,
      image:
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
      category: "Wearables",
      rating: {
        average: 4.5,
        reviewsCount: 98,
      },
      stock: 3,
      addedAt: new Date("2024-07-20"),
      description: "Advanced health monitoring and fitness tracking",
    },
    {
      _id: 5,
      productId: "prod5",
      name: "Sony WH-1000XM5",
      price: 195000,
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
      category: "Audio",
      rating: {
        average: 4.8,
        reviewsCount: 156,
      },
      stock: 6,
      addedAt: new Date("2024-07-12"),
      description: "Industry-leading noise cancellation headphones",
    },
    {
      id: 6,
      productId: "prod6",
      name: 'iPad Pro 12.9"',
      price: 520000,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      category: "Tablets",
      rating: {
        average: 4.7,
        reviewsCount: 203,
      },
      stock: 0,
      addedAt: new Date("2024-07-08"),
      description: "M2 chip, Liquid Retina XDR display, Apple Pencil support",
    },
  ]);

    if (!isAuthenticated) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='text-center'>
            <div className='text-6xl mb-4'>❤️</div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Please Login
            </h2>
            <p className='text-gray-600 mb-6'>
              You need to be logged in to view your wishlist.
            </p>
            <Link
              to='/auth'
              className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            >
              Login Now
            </Link>
          </div>
        </div>
      );
    }

    if (wishlistIsLoading) {
      return <div>Loading...</div>
    }

    if (wishlistError) {
      return <Error error={wishlistError} />;
    }


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((items) => items.filter((item) => item.id !== itemId));
  };

  const addToCart = (item) => {
    // Handle add to cart logic
    console.log("Added to cart:", item.name);
  };

   const categories = [...new Set(wishlistItems.map(item => item.category))];

  const filteredItems = wishlistItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         filterBy === 'in-stock' && item.inStock ||
                         filterBy === 'out-of-stock' && !item.inStock ||
                         filterBy === item.category;
    return matchesSearch && matchesFilter;
  });

  const WishlistCard = ({ item, isListView = false }) => (
    <div
      className={`bg-background-white border-primary-300 dark:border-primary-100 rounded-lg shadow-md border hover:shadow-lg transition-shadow ${
        isListView ? "flex items-center p-4" : "p-4"
      }`}
    >
      <div
        className={`relative ${
          isListView ? "w-44 h-44 flex-shrink-0" : "aspect-square mb-4"
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          className='w-full h-full object-cover rounded-lg'
        />
        {!item.stock > 0 && (
          <div className='absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center'>
            <span className='text-white font-medium text-sm text-center'>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div
        className={`${isListView ? "ml-6 flex-1 flex justify-between" : ""}`}
      >
        <div className={`${isListView ? "flex-1 pr-6" : ""}`}>
          <div className={`${isListView ? "mb-2" : ""}`}>
            <h3
              className={`font-semibold text-gray-900 dark:text-gray-200 mb-1 line-clamp-2 ${
                isListView ? "text-base" : "text-lg"
              }`}
            >
              {item.name}
            </h3>
            <p
              className={`text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2`}
            >
              {item.description}
            </p>
          </div>

          <div
            className={`${
              isListView
                ? "flex items-center justify-between mb-2"
                : "flex items-center mb-2"
            }`}
          >
            <div className='flex items-center'>
              <Star className='fill-yellow-400 text-yellow-400' size={14} />
              <span className='text-sm text-gray-600 dark:text-gray-300 ml-1'>
                {item.rating.average} ({item.rating.reviewsCount} reviews)
              </span>
            </div>
          </div>

          <div
            className={`${
              isListView
                ? "flex items-center justify-between"
                : "flex items-center space-x-2 mb-3"
            }`}
          >
            <div className='flex items-center space-x-2'>
              <span
                className={`font-semibold text-gray-900 dark:text-gray-200 text-lg`}
              >
                {formatCurrency(item.price)}
              </span>
            </div>
            {isListView && (
              <span className='text-xs text-gray-400 dark:text-gray-300'>
                Added {formatDate(item.addedAt)}
              </span>
            )}
          </div>

          {!isListView && (
            <span className='text-xs text-gray-400 dark:text-gray-300 block mb-3'>
              Added {formatDate(item.addedAt)}
            </span>
          )}
          <div
            className={`w-full ${
              isListView ? "flex gap-1 justify-between" : "flex space-x-2"
            }`}
          >
            <button
              onClick={() => addToCart(item)}
              disabled={!item.stock > 0}
              className={`${
                isListView ? "px-4 py-3 text-sm" : "flex-1 px-3 py-2 text-sm"
              } bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center`}
            >
              <ShoppingCart className='mr-2' size={14} />
              {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              onClick={() => removeFromWishlist(item._id)}
              className={`${
                isListView ? "px-4 py-3 text-sm" : "px-3 py-2 text-sm"
              } border border-primary-300 dark:border-primary-100 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center`}
            >
              <Trash2 className=' mr-2' size={14} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='bg-gray-50 dark:bg-surface'>
      {/* Header */}
      <div className='bg-background-white border-b border-primary-300 dark:border-primary-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center'>
              <Heart className='text-red-500 mr-3' size={22} />
              <div>
                <h1 className='text-xl font-bold text-gray-900 dark:text-gray-200'>
                  My Wishlist
                </h1>
                <p className='text-gray-600 dark:text-gray-300'>
                  {wishlistItems.length} items saved
                </p>
              </div>
            </div>

            <div className='sm:mt-0 flex items-center space-x-3'>
              <div className='flex gap-1 border p-1 border-primary-300 dark:border-primary-100 rounded-lg'>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-primary-600 dark:bg-primary-300 text-text rounded-l-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-md"
                  } transition-colors`}
                >
                  <Grid className='' size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-primary-600 dark:bg-primary-300 text-text rounded-r-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-md"
                  } transition-colors`}
                >
                  <List className='' size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Filters and Search */}
        <div className='flex flex-col sm:flex-row gap-4 mb-8'>
          <div className='relative flex-1'>
            <Search
              className=' absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={16}
            />
            <input
              type='text'
              placeholder='Search your wishlist...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-14 pr-4 text-sm text-gray-900 dark:text-gray-300 placeholder:text-gray-500 py-3 border border-primary-300 dark:border-primary-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-300 outline-0 focus:border-transparent'
            />
          </div>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className='px-4 py-3 border text-sm text-gray-900 dark:text-gray-300  border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-0 focus:border-transparent'
          >
            <option value='all' className='bg-surface'>
              All Items
            </option>
            <option value='in-stock' className='bg-surface'>
              In Stock
            </option>
            <option value='out-of-stock' className='bg-surface'>
              Out of Stock
            </option>
            {categories.map((category) => (
              <option key={category} value={category} className='bg-surface'>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Wishlist Items */}
        {filteredItems.length === 0 ? (
          <div className='text-center py-12'>
            <Heart className=' text-gray-300 mx-auto mb-4' size={32} />
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-200 mb-2'>
              {wishlistItems.length === 0
                ? "Your wishlist is empty"
                : "No items match your search"}
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              {wishlistItems.length === 0
                ? "Start adding products you love to see them here"
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredItems.map((item) => (
              <WishlistCard key={item.id} item={item} isListView={false} />
            ))}
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredItems.map((item) => (
              <WishlistCard key={item.id} item={item} isListView={true} />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {filteredItems.length > 0 && (
          <div className='mt-8 bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4'>
              Quick Actions
            </h3>
            <div className='flex flex-wrap gap-3'>
              <button
                onClick={() => {
                  const inStockItems = filteredItems.filter(
                    (item) => item.stock > 0
                  );
                  inStockItems.forEach((item) => addToCart(item));
                }}
                className='px-4 py-2 bg-primary-600 dark:bg-primary-300 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors flex items-center'
              >
                <ShoppingCart className=' mr-2' size={16} />
                Add All Available to Cart
              </button>

              <button
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to clear your entire wishlist?"
                    )
                  ) {
                    setWishlistItems([]);
                  }
                }}
                className='px-4 py-2 border text-red-600 dark:text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center outline-0'
              >
                <Trash2 className='mr-2' size={16} />
                Clear Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Wishlist.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        productId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            average: PropTypes.number.isRequired,
            reviewsCount: PropTypes.number.isRequired,
        }).isRequired,
        stock: PropTypes.number.isRequired,
        addedAt: PropTypes.instanceOf(Date).isRequired,
        description: PropTypes.string.isRequired,
    }),
    isListView: PropTypes.bool,
};

export default Wishlist;
