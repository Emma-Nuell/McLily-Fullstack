import React from "react";
import PropTypes from "prop-types";
import { ArrowRight, Calendar, CheckCircle, CreditCard, Mail, Package, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const mockOrderr = {
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

const OrderConfirmation = ({ order}) => {
  const navigate = useNavigate()
  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case "paystack":
        return {
          name: "Paystack Payment",
          icon: CreditCard,
          color: "text-blue-600",
        };
      case "cash_on_delivery":
        return {
          name: "Cash on Delivery",
          icon: Package,
          color: "text-green-600",
        };
      case "bank_transfer":
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
          color: "text-primary-600 dark:text-primary-300",
        };
      case "delivery":
        return {
          name: "Third Party Delivery",
          icon: Truck,
          color: "text-primary-600 dark:text-primary-300",
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
    navigate("/")
  };

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
             month: "long",
             day: "numeric",
             hour: "2-digit",
             minute: "2-digit",
           }).format(new Date(date));
         };
  return (
    <div className="bg-background-white rounded-md shadow-sm">
      {/* Success Header */}
      <div className="bg-primary-50 dark:bg-primary-100/20 border-b border-primary-300 dark:border-primary-100 p-8 text-center rounded-md">
        <div className="flex justify-center mb-4">
          <div className="w-26 h-26 bg-primary-500 dark:bg-primary-300 rounded-full flex items-center justify-center">
            <CheckCircle className=" text-white" size={32} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-base text-gray-700 dark:text-gray-400 mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <div className="bg-background-white rounded-lg p-4 inline-block border border-primary-200">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Order Number
          </p>
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-300">
            {order.orderId}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Email Confirmation Notice */}
        <div className="bg-blue-50 border dark:bg-blue-600/30 border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Mail
              className="text-blue-600 dark:text-blue-600 flex-shrink-0 mt-1"
              size={20}
            />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-500 mb-2">
                Check Your Email
              </h3>
              <p className="text-blue-800 dark:text-blue-400 mb-2 text-sm">
                A confirmation email has been sent to{" "}
                <strong>{order.customerDetails.email}</strong> with your order
                details and tracking information.
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                If you don&apos;t see it in your inbox, please check your spam
                or junk folder.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Order Details */}
          <div className="border border-primary-300 dark:border-primary-100 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center gap-2">
              <Calendar
                className="text-primary-600 dark:text-primary-300"
                size={20}
              />
              Order Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Order Date:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  {formatDate(order.orderedAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Estimated Delivery:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  {formatDate(order.deliveryTracking.estimatedDelivery)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 flex-1">
                  Payment Method:
                </span>
                <div className="flex items-center gap-2 text-gray-900 dark:text-gray-200">
                  <PaymentIcon
                    className={` ${paymentDisplay.color}`}
                    size={18}
                  />
                  <span className="font-medium">{paymentDisplay.name}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 flex-1">
                  Delivery Method:
                </span>
                <div className="flex items-center gap-2 text-gray-900 dark:text-gray-200">
                  <DeliveryIcon
                    className={` ${deliveryDisplay.color}`}
                    size={18}
                  />
                  <span className="font-medium">{deliveryDisplay.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="border border-primary-300 dark:border-primary-100 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4">
              Order Total
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping:</span>
                <span>
                  {order.shippingFee === 0
                    ? "To be decided"
                    : `${formatCurrency(order.shippingFee)}`}
                </span>
              </div>
              <div className="border-t border-primary-300 dark:border-primary-100 pt-2 mt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-200">
                  <span>Total:</span>
                  <span className="text-primary-600 dark:text-primary-300">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="border border-primary-300 dark:border-primary-100 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Package
              className=" text-primary-600 dark:text-primary-300"
              size={18}
            />
            Items Ordered ({order.orderItems.length})
          </h3>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 py-3 border-b border-primary-300 dark:border-primary-100 last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded border border-primary-300 dark:border-primary-100"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-200">
                    {item.productName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-600 dark:text-gray-400">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatCurrency(item.price)} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gray-50 dark:bg-surface border border-primary-300 dark:border-primary-100 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-3">
            What happens next?
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p className="flex items-start gap-2">
              <span className="w-10 h-10 bg-primary-500 dark:bg-primary-300 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              We&apos;ll process your order and prepare it for{" "}
              {order.deliveryMethod === "pickup" ? "pickup" : "delivery"}
            </p>
            <p className="flex items-start gap-2">
              <span className="w-10 h-10 bg-primary-500 dark:bg-primary-300 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              You&apos;ll receive updates via email about your order status
            </p>
            <p className="flex items-start gap-2">
              <span className="w-10 h-10 bg-primary-500 dark:bg-primary-300 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                3
              </span>
              {order.deliveryMethod === "pickup"
                ? "We'll notify you when your order is ready for pickup"
                : "Our delivery partner will contact you to arrange delivery"}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleContinueShopping}
            className="bg-primary-500 dark:bg-primary-300 dark:hover:bg-primary-200 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors shadow-sm inline-flex items-center gap-3"
          >
            Continue Shopping
            <ArrowRight className="" size={20} />
          </button>
        </div>

        {/* Support Contact */}
        <div className="text-center mt-6 pt-6 border-t border-primary-300 dark:border-primary-100">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help with your order? Contact us at{" "}
            <a
              href="mailto:mclilystores@gmail.com"
              className="text-primary-600 dark:text-primary-300 hover:text-primary-700 font-medium"
            >
              mclilystores@gmail.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+2348083577046"
              className="text-primary-600 dark:text-primary-300 hover:text-primary-700 font-medium"
            >
              +234 808 357 7046
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

OrderConfirmation.propTypes = {
  order: PropTypes.shape({
    customerDetails: PropTypes.shape({
      email: PropTypes.string,
    }),
    deliveryMethod: PropTypes.string,
    deliveryTracking: PropTypes.shape({
      estimatedDelivery: PropTypes.string,
    }),
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        price: PropTypes.number,
        productId: PropTypes.string,
        productName: PropTypes.string,
        quantity: PropTypes.number,
      })
    ),
    orderedAt: PropTypes.string,
    paymentMethod: PropTypes.string,
    shippingFee: PropTypes.number,
    totalAmount: PropTypes.number,
    subtotal: PropTypes.number,
    orderId: PropTypes.string,
  }),
};

export default OrderConfirmation;
