import React from "react";
import PropTypes from "prop-types";
import { ArrowRight, Calendar, CheckCircle, CreditCard, Mail, Package, Truck } from "lucide-react";

const mockOrder = {
  orderNumber:
    "MCL-2024-" +
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0"),
  orderDate: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  estimatedDelivery: new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  items: [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
    },
    {
      id: 2,
      name: "Smartphone Case",
      price: 24.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=80&h=80&fit=crop",
    },
  ],
  subtotal: 139.97,
  shipping: 5.0,
  tax: 11.2,
  total: 156.17,
  paymentMethod: "paystack",
  deliveryMethod: "pickup",
  customerEmail: "customer@example.com",
};

const OrderConfirmation = ({ order = mockOrder }) => {
  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case "paystack":
        return {
          name: "Paystack Payment",
          icon: CreditCard,
          color: "text-blue-600",
        };
      case "cash":
        return {
          name: "Cash on Delivery",
          icon: Package,
          color: "text-green-600",
        };
      case "transfer":
        return {
          name: "Transfer on Delivery",
          icon: ArrowRight,
          color: "text-purple-600",
        };
      default:
        return {
          name: "Payment Method",
          icon: CreditCard,
          color: "text-gray-600",
        };
    }
  };

  const getDeliveryMethodDisplay = (method) => {
    switch (method) {
      case "pickup":
        return {
          name: "Pickup Station",
          icon: Package,
          color: "text-primary-600",
        };
      case "delivery":
        return {
          name: "Third Party Delivery",
          icon: Truck,
          color: "text-primary-600",
        };
      default:
        return {
          name: "Delivery Method",
          icon: Truck,
          color: "text-gray-600",
        };
    }
  };

  const paymentDisplay = getPaymentMethodDisplay(order.paymentMethod);
  const deliveryDisplay = getDeliveryMethodDisplay(order.deliveryMethod);
  const PaymentIcon = paymentDisplay.icon;
  const DeliveryIcon = deliveryDisplay.icon;

  const handleContinueShopping = () => {
    // Navigate to home page - you can implement your routing logic here
    window.location.href = "/";
  };

   const formatCurrency = (amount) => {
     return new Intl.NumberFormat("en-NG", {
       style: "currency",
       currency: "NGN",
       minimumFractionDigits: 0,
     }).format(amount);
   };
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
      {/* Success Header */}
      <div className='bg-primary-50 border-b border-primary-100 p-8 text-center'>
        <div className='flex justify-center mb-4'>
          <div className='w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center'>
            <CheckCircle className='h-10 w-10 text-white' />
          </div>
        </div>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Order Confirmed!
        </h1>
        <p className='text-lg text-gray-700 mb-4'>
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <div className='bg-white rounded-lg p-4 inline-block border border-primary-200'>
          <p className='text-sm font-medium text-gray-600 mb-1'>Order Number</p>
          <p className='text-2xl font-bold text-primary-600'>
            {order.orderNumber}
          </p>
        </div>
      </div>

      <div className='p-6'>
        {/* Email Confirmation Notice */}
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8'>
          <div className='flex items-start gap-4'>
            <Mail className='h-6 w-6 text-blue-600 flex-shrink-0 mt-1' />
            <div>
              <h3 className='font-semibold text-blue-900 mb-2'>
                Check Your Email
              </h3>
              <p className='text-blue-800 mb-2'>
                A confirmation email has been sent to{" "}
                <strong>{order.customerEmail}</strong> with your order details
                and tracking information.
              </p>
              <p className='text-sm text-blue-700'>
                If you don&apos;t see it in your inbox, please check your spam or
                junk folder.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary Cards */}
        <div className='grid md:grid-cols-2 gap-6 mb-8'>
          {/* Order Details */}
          <div className='border border-gray-200 rounded-lg p-6'>
            <h3 className='font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <Calendar className='h-5 w-5 text-primary-500' />
              Order Details
            </h3>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Order Date:</span>
                <span className='font-medium'>{order.orderDate}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Estimated Delivery:</span>
                <span className='font-medium text-primary-600'>
                  {order.estimatedDelivery}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>Payment Method:</span>
                <div className='flex items-center gap-2'>
                  <PaymentIcon className={`h-4 w-4 ${paymentDisplay.color}`} />
                  <span className='font-medium'>{paymentDisplay.name}</span>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>Delivery Method:</span>
                <div className='flex items-center gap-2'>
                  <DeliveryIcon
                    className={`h-4 w-4 ${deliveryDisplay.color}`}
                  />
                  <span className='font-medium'>{deliveryDisplay.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className='border border-gray-200 rounded-lg p-6'>
            <h3 className='font-semibold text-gray-900 mb-4'>Order Total</h3>
            <div className='space-y-2'>
              <div className='flex justify-between text-gray-600'>
                <span>Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Shipping:</span>
                <span>
                  {order.shipping === 0
                    ? "FREE"
                    : `${formatCurrency(order.shipping)}`}
                </span>
              </div>
              <div className='border-t border-gray-200 pt-2 mt-3'>
                <div className='flex justify-between text-xl font-bold'>
                  <span>Total:</span>
                  <span className='text-primary-600'>
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className='border border-gray-200 rounded-lg p-6 mb-8'>
          <h3 className='font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <Package className='h-5 w-5 text-primary-500' />
            Items Ordered ({order.items.length})
          </h3>
          <div className='space-y-4'>
            {order.items.map((item) => (
              <div
                key={item.id}
                className='flex items-center gap-4 py-3 border-b border-gray-100 last:border-b-0'
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-12 h-12 object-cover rounded border border-gray-200'
                />
                <div className='flex-1'>
                  <h4 className='font-medium text-gray-900'>{item.name}</h4>
                  <p className='text-sm text-gray-600'>
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>
                    {formatCurrency((item.price * item.quantity))}
                  </p>
                  <p className='text-sm text-gray-600'>
                    {formatCurrency(item.price)} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What's Next */}
        <div className='bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8'>
          <h3 className='font-semibold text-gray-900 mb-3'>
            What happens next?
          </h3>
          <div className='space-y-2 text-sm text-gray-700'>
            <p className='flex items-start gap-2'>
              <span className='w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5'>
                1
              </span>
              We&apos;ll process your order and prepare it for{" "}
              {order.deliveryMethod === "pickup" ? "pickup" : "delivery"}
            </p>
            <p className='flex items-start gap-2'>
              <span className='w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5'>
                2
              </span>
              You&apos;ll receive updates via email about your order status
            </p>
            <p className='flex items-start gap-2'>
              <span className='w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5'>
                3
              </span>
              {order.deliveryMethod === "pickup"
                ? "We'll notify you when your order is ready for pickup"
                : "Our delivery partner will contact you to arrange delivery"}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className='text-center'>
          <button
            onClick={handleContinueShopping}
            className='bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors shadow-sm inline-flex items-center gap-3'
          >
            Continue Shopping
            <ArrowRight className='h-5 w-5' />
          </button>
        </div>

        {/* Support Contact */}
        <div className='text-center mt-6 pt-6 border-t border-gray-100'>
          <p className='text-sm text-gray-600'>
            Need help with your order? Contact us at{" "}
            <a
              href='mailto:support@mclily.com'
              className='text-primary-600 hover:text-primary-700 font-medium'
            >
              support@mclily.com
            </a>{" "}
            or call{" "}
            <a
              href='tel:+2349012345678'
              className='text-primary-600 hover:text-primary-700 font-medium'
            >
              +234 901 234 5678
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

OrderConfirmation.propTypes = {
  order: PropTypes.shape({}),
};

export default OrderConfirmation;
