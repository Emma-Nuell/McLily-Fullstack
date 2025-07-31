import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CheckCircle, Clock, Eye, Package, Search, Star } from 'lucide-react';

const Ratings = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBy, setFilterBy] = useState("all");
    const [sortBy, setSortBy] = useState("recent");

    const [products] = useState([
      {
        _id: 1,
        productId: "prod1",
        productName: "iPhone 14 Pro Max",
        image:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
        category: "Electronics",
        purchaseDate: new Date("2024-07-20"),
        orderId: "ORD-2024-001234",
        price: 850000,
        hasRated: false,
        canRate: true,
        deliveredDate: new Date("2024-07-24"),
        daysSinceDelivery: 2,
      },
      {
        _id: 2,
        productId: "prod2",
        productName: "AirPods Pro (2nd Gen)",
        image:
          "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
        category: "Electronics",
        purchaseDate: new Date("2024-07-20"),
        orderId: "ORD-2024-001234",
        price: 120000,
        hasRated: true,
        canRate: true,
        deliveredDate: new Date("2024-07-24"),
        daysSinceDelivery: 2,
        userRating: 5,
        ratedDate: new Date("2024-07-25"),
      },
      {
        _id: 3,
        productId: "prod3",
        productName: 'iPad Pro 12.9"',
        image:
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
        category: "Tablets",
        purchaseDate: new Date("2024-07-18"),
        orderId: "ORD-2024-001233",
        price: 520000,
        hasRated: false,
        canRate: true,
        deliveredDate: new Date("2024-07-22"),
        daysSinceDelivery: 4,
      },
      {
        _id: 4,
        productId: "prod4",
        productName: "Sony WH-1000XM5",
        image:
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop",
        category: "Audio",
        purchaseDate: new Date("2024-07-15"),
        orderId: "ORD-2024-001232",
        price: 195000,
        hasRated: false,
        canRate: false, // Still processing/not delivered
        deliveredDate: null,
        daysSinceDelivery: null,
      },
      {
        _id: 5,
        productId: "prod5",
        productName: "MacBook Air M2",
        image:
          "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
        category: "Computers",
        purchaseDate: new Date("2024-07-10"),
        orderId: "ORD-2024-001231",
        price: 650000,
        hasRated: false,
        canRate: false, // Order was cancelled
        deliveredDate: null,
        daysSinceDelivery: null,
      },
      {
        _id: 6,
        productId: "prod6",
        productName: "Samsung Galaxy Watch 5",
        image:
          "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
        category: "Wearables",
        purchaseDate: new Date("2024-07-05"),
        orderId: "ORD-2024-001230",
        price: 180000,
        hasRated: true,
        canRate: true,
        deliveredDate: new Date("2024-07-08"),
        daysSinceDelivery: 18,
        userRating: 4,
        ratedDate: new Date("2024-07-10"),
      },
      {
        _id: 7,
        productId: "prod7",
        productName: "Apple Watch Series 9",
        image:
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
        category: "Wearables",
        purchaseDate: new Date("2024-06-28"),
        orderId: "ORD-2024-001229",
        price: 245000,
        hasRated: false,
        canRate: true,
        deliveredDate: new Date("2024-07-02"),
        daysSinceDelivery: 24,
      },
      {
        _id: 8,
        productId: "prod8",
        productName: "Dell XPS 13",
        image:
          "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300&h=300&fit=crop",
        category: "Computers",
        purchaseDate: new Date("2024-06-15"),
        orderId: "ORD-2024-001228",
        price: 780000,
        hasRated: true,
        canRate: true,
        deliveredDate: new Date("2024-06-20"),
        daysSinceDelivery: 36,
        userRating: 5,
        ratedDate: new Date("2024-06-22"),
      },
    ]);
  
      const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 0,
        }).format(amount);
      };

      const formatDate = (date) => {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(new Date(date));
      };

      const getDaysText = (days) => {
        if (days === 1) return "1 day ago";
        if (days < 7) return `${days} days ago`;
        if (days < 14) return "1 week ago";
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return `${Math.floor(days / 30)} months ago`;
      };

      const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`${
              index < rating
                ? "fill-yellow-400 dark:fill-yellow-500 text-yellow-400 dark:text-yellow-500"
                : "text-gray-300 dark:text-gray-500"
            }`}
            size={14}
          />
        ));
      };

      const handleRateProduct = (productId) => {
        console.log("Navigate to rating page for product:", productId);
        // Handle navigation to rating page
      };

      const handleViewProduct = (productId) => {
        console.log("View product details:", productId);
        // Handle navigation to product details
      };

      const categories = [
        ...new Set(products.map((product) => product.category)),
      ];

      const filteredProducts = products.filter((product) => {
        const matchesSearch = product.productName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesFilter =
          filterBy === "all" ||
          (filterBy === "pending" && !product.hasRated && product.canRate) ||
          (filterBy === "completed" && product.hasRated) ||
          (filterBy === "unavailable" && !product.canRate) ||
          filterBy === product.category;

        return matchesSearch && matchesFilter;
      });

      const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
          case "recent":
            return new Date(b.purchaseDate) - new Date(a.purchaseDate);
          case "oldest":
            return new Date(a.purchaseDate) - new Date(b.purchaseDate);
          case "name":
            return a.productName.localeCompare(b.productName);
          case "price-high":
            return b.price - a.price;
          case "price-low":
            return a.price - b.price;
          default:
            return 0;
        }
      });

      const stats = {
        total: products.length,
        pending: products.filter((p) => !p.hasRated && p.canRate).length,
        completed: products.filter((p) => p.hasRated).length,
        unavailable: products.filter((p) => !p.canRate).length,
      };
  return (
    <div className='bg-gray-50 dark:bg-surface'>
      {/* Header */}
      <div className='bg-background-white border-b border-primary-300 dark:border-primary-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center'>
              <Star className='text-yellow-500 mr-3' size={26} />
              <div>
                <h1 className='text-xl font-bold text-gray-900 dark:text-gray-200'>
                  Rate Your Products
                </h1>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>
                  Share your experience with products you have purchased
                </p>
              </div>
            </div>

            <div className='mt-4 sm:mt-0 flex items-center space-x-4'>
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                <span className='font-medium'>{stats.pending} pending</span> •
                <span className='font-medium ml-1'>
                  {stats.completed} completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8'>
          <div className='bg-background-white rounded-lg shadow-md border p-4 border-primary-300 dark:border-primary-100'>
            <div className='flex items-center'>
              <Package
                className='text-blue-600 dark:text-blue-700 mr-5'
                size={21}
              />
              <div>
                <p className='text-xl font-bold text-gray-900 dark:text-gray-200'>
                  {stats.total}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Total Products
                </p>
              </div>
            </div>
          </div>

          <div className='bg-background-white rounded-lg shadow-md border p-4 border-primary-300 dark:border-primary-100'>
            <div className='flex items-center'>
              <Clock
                className=' text-orange-600 dark:text-orange-700 mr-5'
                size={21}
              />
              <div>
                <p className='text-xl font-bold text-gray-900 dark:text-gray-200'>
                  {stats.pending}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Pending Ratings
                </p>
              </div>
            </div>
          </div>

          <div className='bg-background-white rounded-lg shadow-md border p-4 border-primary-300 dark:border-primary-100'>
            <div className='flex items-center'>
              <CheckCircle
                className=' text-green-600 dark:text-green-700 mr-5'
                size={21}
              />
              <div>
                <p className='text-2xl font-bold text-gray-900 dark:text-gray-200'>
                  {stats.completed}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Completed
                </p>
              </div>
            </div>
          </div>

          <div className='bg-background-white rounded-lg shadow-md border p-4 border-primary-300 dark:border-primary-100'>
            <div className='flex items-center'>
              <Star
                className='text-yellow-500 dark:text-yellow-600 mr-5'
                size={21}
              />
              <div>
                <p className='text-xl font-bold text-gray-900 dark:text-gray-200'>
                  {stats.completed > 0
                    ? (
                        products
                          .filter((p) => p.hasRated)
                          .reduce((sum, p) => sum + p.userRating, 0) /
                        stats.completed
                      ).toFixed(1)
                    : "0.0"}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Average Rating
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className='bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-6 mb-6'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={16}
              />
              <input
                type='text'
                placeholder='Search products to rate...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-14 pr-4 text-base text-gray-900 dark:text-gray-300 placeholder:text-gray-500 py-2 border border-primary-300 dark:border-primary-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-300 outline-0 focus:border-transparent'
              />
            </div>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className='px-4 py-2 border text-base text-gray-900 dark:text-gray-300  border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-0 focus:border-transparent'
            >
              <option value='all' className='bg-surface'>
                All Products
              </option>
              <option value='pending' className='bg-surface'>
                Pending Ratings
              </option>
              <option value='completed' className='bg-surface'>
                Already Rated
              </option>
              <option value='unavailable' className='bg-surface'>
                Cannot Rate
              </option>
              <optgroup label='Categories' className='bg-surface'>
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className='bg-surface'
                  >
                    {category}
                  </option>
                ))}
              </optgroup>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='px-4 py-2 border text-base text-gray-900 dark:text-gray-300  border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-0 focus:border-transparent'
            >
              <option value='recent' className='bg-surface'>
                Most Recent
              </option>
              <option value='oldest' className='bg-surface'>
                Oldest First
              </option>
              <option value='name' className='bg-surface'>
                Product Name
              </option>
              <option value='price-high' className='bg-surface'>
                Price: High to Low
              </option>
              <option value='price-low' className='bg-surface'>
                Price: Low to High
              </option>
            </select>
          </div>
        </div>

        {/* Products List */}
        {sortedProducts.length === 0 ? (
          <div className='text-center py-12'>
            <Star className=' text-gray-300 mx-auto mb-4' size={32} />
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-200 mb-2'>
              {products.length === 0
                ? "No products to rate"
                : "No products match your search"}
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              {products.length === 0
                ? "Purchase some products to start rating them"
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sortedProducts.map((product) => (
              <div
                key={product._id}
                className='bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 hover:shadow-lg transition-shadow'
              >
                <div className='relative'>
                  <img
                    src={product.image}
                    alt={product.productName}
                    className='w-full h-116 object-cover rounded-t-lg'
                  />

                  {/* Status Badge */}
                  <div className='absolute top-3 right-3'>
                    {product.hasRated ? (
                      <span className='px-3 py-1 bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900 text-sm font-medium rounded-full flex items-center'>
                        <CheckCircle className=' mr-1' size={16} />
                        Rated
                      </span>
                    ) : product.canRate ? (
                      <span className='px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-300 dark:text-orange-900 text-sm font-medium rounded-full flex items-center'>
                        <Clock className='mr-1' size={16} />
                        Pending
                      </span>
                    ) : (
                      <span className='px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-300 dark:text-gray-900 text-sm font-medium rounded-full'>
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>

                <div className='p-6'>
                  <div className='mb-5'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-200 mb-1'>
                      {product.productName}
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {product.category}
                    </p>
                  </div>

                  <div className='space-y-2 mb-4'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-600 dark:text-gray-400'>
                        Order ID:
                      </span>
                      <span className='text-gray-900 dark:text-gray-200 font-mono'>
                        {product.orderId}
                      </span>
                    </div>

                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-600 dark:text-gray-400'>
                        Purchased:
                      </span>
                      <span className='text-gray-900 dark:text-gray-200'>
                        {formatDate(product.purchaseDate)}
                      </span>
                    </div>

                    {product.deliveredDate && (
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600 dark:text-gray-400'>
                          Delivered:
                        </span>
                        <span className='text-gray-900 dark:text-gray-200'>
                          {getDaysText(product.daysSinceDelivery)}
                        </span>
                      </div>
                    )}

                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-600 dark:text-gray-400'>
                        Price:
                      </span>
                      <span className='text-gray-900 dark:text-gray-200 font-semibold'>
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>

                  {/* Current Rating (if rated) */}
                  {product.hasRated && (
                    <div className='mb-4 p-3 bg-green-50  dark:bg-green-300 rounded-lg'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-green-800 font-medium'>
                          Your Rating:
                        </span>
                        <div className='flex items-center space-x-1'>
                          {renderStars(product.userRating)}
                          <span className='text-sm text-green-800 ml-2 tracking-wider'>
                            {product.userRating}/5
                          </span>
                        </div>
                      </div>
                      <p className='text-xs text-green-700 mt-1'>
                        Rated on {formatDate(product.ratedDate)}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className='flex space-x-2'>
                    {product.canRate && (
                      <button
                        onClick={() => handleRateProduct(product.productId)}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${
                          product.hasRated
                            ? "border border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-200"
                            : "bg-yellow-500  text-white hover:bg-yellow-600"
                        }`}
                      >
                        <Star className='mr-2' size={16} />
                        {product.hasRated ? "Update Rating" : "Rate Product"}
                      </button>
                    )}

                    <button
                      onClick={() => handleViewProduct(product.productId)}
                      className='px-4 py-2 border border-primary-300 dark:border-primary-10 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center'
                    >
                      <Eye className='mr-1 text-primary-600 dark:text-primary-300' size={16} />
                      View
                    </button>
                  </div>

                  {/* Cannot Rate Message */}
                  {!product.canRate && (
                    <div className='mt-4 p-3 bg-gray-50 rounded-lg'>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {product.deliveredDate
                          ? "Rating period has expired"
                          : "Product must be delivered before rating"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Ratings.propTypes = {}

export default Ratings