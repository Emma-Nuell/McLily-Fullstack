import React from 'react'
import PropTypes from 'prop-types'
import { ArrowLeft, Package, ShoppingCart } from 'lucide-react';

const mockCartItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    quantity: 1,
    size: null,
    color: "Matte Black",
    variation: "Premium Edition",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
    description:
      "Premium quality wireless headphones with active noise cancellation",
    sku: "WBH-001-BLK",
  },
  {
    id: 2,
    name: "Smartphone Case",
    price: 24.99,
    quantity: 2,
    size: "iPhone 14 Pro",
    color: "Clear",
    variation: "Protective Case",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=120&h=120&fit=crop",
    description: "Military-grade drop protection with crystal clear design",
    sku: "SPC-014-CLR",
  },
  {
    id: 3,
    name: "USB-C Cable",
    price: 15.99,
    quantity: 1,
    size: "6ft",
    color: "White",
    variation: "Fast Charging",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop",
    description: "USB-C to USB-A cable with fast charging support",
    sku: "USB-006-WHT",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 45.99,
    quantity: 1,
    size: null,
    color: "Space Gray",
    variation: "Ergonomic Design",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=120&h=120&fit=crop",
    description: "Ergonomic wireless mouse with precision tracking",
    sku: "WM-001-GRY",
  },
];

 const formatCurrency = (amount) => {
   return new Intl.NumberFormat("en-NG", {
     style: "currency",
     currency: "NGN",
     minimumFractionDigits: 0,
   }).format(amount);
 };

const CartReview = ({ items = mockCartItems, onProceed, onBackToCart }) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 9.99;
   
    const total = subtotal + shipping;

    if (items.length === 0) {
      return (
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center'>
          <ShoppingCart className='mx-auto h-16 w-16 text-gray-300 mb-4' />
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            No items to review
          </h2>
          <p className='text-gray-600 mb-6'>
            Your cart appears to be empty. Please add items to continue.
          </p>
          <button
            className='bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors'
            onClick={onBackToCart || (() => window.history.back())}
          >
            Back to Shopping
          </button>
        </div>
      );
    }
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
      {/* Header */}
      <div className='border-b border-gray-100 p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-3'>
              <Package className='h-6 w-6 text-primary-500' />
              Order Review
            </h2>
            <p className='text-gray-600 mt-1'>
              Please review your order before proceeding
            </p>
          </div>
          <div className='text-right'>
            <p className='text-sm text-gray-500'>Order Summary</p>
            <p className='text-lg font-semibold text-primary-600'>
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className='p-6'>
        <div className='space-y-6'>
          {items.map((item) => (
            <div
              key={item.id}
              className='border-b border-gray-100 pb-6 last:border-b-0 last:pb-0'
            >
              <div className='flex gap-6'>
                {/* Product Image */}
                <div className='flex-shrink-0'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-24 h-24 object-cover rounded-lg border border-gray-200'
                  />
                </div>

                {/* Product Details */}
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='text-lg font-semibold text-gray-900 leading-tight'>
                      {item.name}
                    </h3>
                    <div className='text-right ml-4'>
                      <p className='text-lg font-bold text-gray-900'>
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className='text-gray-600 text-sm mb-3 leading-relaxed'>
                    {item.description}
                  </p>

                  {/* Product Specifications */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3'>
                    {item.sku && (
                      <div className='bg-gray-50 rounded px-3 py-2'>
                        <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>
                          SKU
                        </p>
                        <p className='text-sm font-medium text-gray-900'>
                          {item.sku}
                        </p>
                      </div>
                    )}

                    <div className='bg-gray-50 rounded px-3 py-2'>
                      <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>
                        Quantity
                      </p>
                      <p className='text-sm font-medium text-gray-900'>
                        {item.quantity}
                      </p>
                    </div>

                    {item.color && (
                      <div className='bg-gray-50 rounded px-3 py-2'>
                        <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>
                          Color
                        </p>
                        <p className='text-sm font-medium text-gray-900'>
                          {item.color}
                        </p>
                      </div>
                    )}

                    {item.size && (
                      <div className='bg-gray-50 rounded px-3 py-2'>
                        <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>
                          Size
                        </p>
                        <p className='text-sm font-medium text-gray-900'>
                          {item.size}
                        </p>
                      </div>
                    )}

                    {item.variation && (
                      <div className='bg-gray-50 rounded px-3 py-2'>
                        <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>
                          Variation
                        </p>
                        <p className='text-sm font-medium text-gray-900'>
                          {item.variation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className='mt-8 border-t border-gray-200 pt-8'>
          <div className='max-w-md ml-auto'>
            <div className='bg-gray-50 rounded-lg p-6'>
              <h3 className='font-semibold text-gray-900 mb-4 text-center'>
                Order Total
              </h3>
              <div className='space-y-3'>
                <div className='flex justify-between text-gray-600'>
                  <span>
                    Subtotal ({items.length} item{items.length !== 1 ? "s" : ""}
                    ):
                  </span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Shipping:</span>
                  <span>
                    {shipping === 0 ? "FREE" : `${formatCurrency(shipping)}`}
                  </span>
                </div>
                <div className='border-t border-gray-300 pt-3 mt-4'>
                  <div className='flex justify-between text-xl font-bold'>
                    <span className='text-gray-900'>Total:</span>
                    <span className='text-primary-600'>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Cart Notice */}
        <div className='mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex items-center gap-3'>
            <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-sm font-bold'>i</span>
            </div>
            <div className='flex-1'>
              <p className='text-blue-800 text-sm'>
                <strong>Need to make changes?</strong> You can modify
                quantities, remove items, or continue shopping by going back to
                your cart.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 mt-8'>
          <button
            className='flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center gap-2'
            onClick={onBackToCart || (() => window.history.back())}
          >
            <ArrowLeft className='h-5 w-5' />
            Back to Cart
          </button>
          <button
            className='flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center gap-2'
            onClick={onProceed}
          >
            Continue to Delivery
            <Package className='h-5 w-5' />
          </button>
        </div>
      </div>
    </div>
  );
};



CartReview.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  onBackToCart: PropTypes.func,
  onProceed: PropTypes.func,
}


export default CartReview