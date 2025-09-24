import React from 'react'
import PropTypes from 'prop-types'
import { Calendar, CheckCircle, CreditCard, Mail, MapPin, Package, Phone, Truck } from 'lucide-react';
import ProfileNavbar from './ProfileNavbar';
import { useParams } from 'react-router-dom';
import { useSmartOrder } from '../../hooks/orderHooks';
import Error from '../Error';
import Loading from '../Loading';

const OrderDetail = () => {
  const {orderId} = useParams()
  const {data, isLoading, isError, error} = useSmartOrder(orderId)

   const order = data
  //  const fromCache = data?.fromCache;

     if (isLoading) {
       return <Loading message="Loading order details..." />;
     }

     if (isError || !order) {
       return <Error message="Order not found" error={error} />;
     }

     
    // eslint-disable-next-line no-unused-vars
    const orders = {
      orderId: "ORD-2024-001234",
      customerDetails: {
        name: "Adebayo Johnson",
        email: "adebayo.johnson@email.com",
        phone: "+234 901 234 5678",
        address: {
          street: "15 Victoria Island Street",
          city: "Lagos",
          state: "Lagos State",
          country: "Nigeria",
        },
      },
      orderItems: [
        {
          productId: "prod1",
          productName: "iPhone 14 Pro Max",
          quantity: 1,
          price: 850000,
          image:
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
        },
        {
          productId: "prod2",
          productName: "AirPods Pro",
          quantity: 2,
          price: 120000,
          image:
            "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
        },
      ],
      subtotal: 1090000,
      shippingFee: 5000,
      totalAmount: 1095000,
      paymentStatus: "paid",
      paymentMethod: "paystack",
      paymentDetails: {
        transactionId: "TXN-789456123",
        paymentDate: new Date("2024-07-20T10:30:00Z"),
        currency: "NGN",
      },
      orderStatus: "Shipped",
      deliveryTracking: {
        trackingNumber: "TRK-123456789",
        carrier: "DHL Express",
        estimatedDelivery: new Date("2024-07-26T00:00:00Z"),
      },
      orderedAt: new Date("2024-07-20T09:15:00Z"),
      statusHistory: [
        {
          status: "Processing",
          changeAt: new Date("2024-07-20T09:15:00Z"),
          changedBy: "system",
        },
        {
          status: "Shipped",
          changeAt: new Date("2024-07-22T14:30:00Z"),
          changedBy: "admin",
        },
      ],
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
    
      const getStatusColor = (status) => {
        const colors = {
          Processing:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-400 dark:text-yellow-900",
          Pending:
            "bg-gray-100 text-gray-800 dark:bg-gray-400 dark:text-gray-900",
          Shipped:
            "bg-blue-100 text-blue-800 dark:bg-blue-400 dark:text-blue-900",
          Out_for_delivery:
            "bg-purple-100 text-purple-800 dark:bg-purple-400 dark:text-purple-900",
          Delivered:
            "bg-green-100 text-green-800 dark:bg-green-400 dark:text-green-900",
          Cancelled:
            "bg-red-100 text-red-800 dark:bg-red-400 dark:text-red-900",
        };
        return (
          colors[status] ||
          "bg-gray-100 text-gray-800 dark:bg-gray-400 dark:text-gray-900"
        );
      };

      const getPaymentStatusColor = (status) => {
        const colors = {
          paid: "bg-green-100 text-green-800 dark:bg-green-400 dark:text-green-900",
          pending:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-400 dark:text-yellow-900",
          failed: "bg-red-100 text-red-800 dark:bg-red-400 dark:text-red-900",
          refunded:
            "bg-purple-100 text-purple-800 dark:bg-purple-400 dark:text-purple-900",
        };
        return (
          colors[status] ||
          "bg-gray-100 text-gray-800 dark:bg-gray-400 dark:text-gray-900"
        );
      };
  return (
    <div className="bg-gray-50 min-h-screen dark:bg-surface py-8">
      {/* <ProfileNavbar title={"Order Details"} /> */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-lg shadow-md border p-6 mb-6 py-10 bg-background-white border-primary-300 dark:border-primary-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200">
                Order #{order.orderId}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                Placed on {formatDate(order.orderedAt)}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-4">
              <span
                className={`px-5 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus.replace("_", " ")}
              </span>
              <span
                className={`px-5 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(
                  order.paymentStatus
                )}`}
              >
                Payment {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-background-white rounded-lg shadow-md border  border-primary-300 dark:border-primary-100">
              <div className="p-6 py-8 border-b mb-4 border-primary-300 dark:border-primary-100">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 flex items-center">
                  <Package
                    className="mr-2 text-primary-600 dark:text-primary-300"
                    size={18}
                  />
                  Order Items
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 border rounded-lg border-primary-300 dark:border-primary-100"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-26 h-26 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-200 line-clamp-2">
                          {item.productName}
                        </h3>
                        <p className="text-gray-600 text-sm dark:text-gray-300">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm text-gray-900 dark:text-gray-200">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-background-white rounded-lg shadow-md border  border-primary-300 dark:border-primary-100">
              <div className="p-6 border-b border-primary-300 dark:border-primary-100">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 flex items-center">
                  <Calendar
                    className="mr-3 text-primary-600 dark:text-primary-300"
                    size={18}
                  />
                  Order Timeline
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {order.statusHistory.map((status, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <CheckCircle className="text-green-500" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-300">
                          {status.status}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(status.changeAt)}
                        </p>
                        {/* <p className='text-sm text-gray-500 dark:text-gray-200'>
                          Updated by {status.changedBy}
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tracking Information */}
            {order.deliveryTracking.trackingNumber && (
              <div className="bg-background-white rounded-lg shadow-md border  border-primary-300 dark:border-primary-100">
                <div className="p-6 border-b border-primary-300 dark:border-primary-100">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 flex items-center">
                    <Truck
                      className="mr-3 text-primary-600 dark:text-primary-300"
                      size={18}
                    />
                    Shipping & Tracking
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tracking Number
                      </p>
                      <p className="text-gray-900 dark:text-gray-200">
                        {order.deliveryTracking.trackingNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Carrier
                      </p>
                      <p className="text-gray-900 dark:text-gray-200">
                        {order.deliveryTracking.carrier}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Estimated Delivery
                      </p>
                      <p className="text-gray-900 dark:text-gray-200">
                        {formatDate(order.deliveryTracking.estimatedDelivery)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-background-white rounded-lg shadow-md border  border-primary-300 dark:border-primary-100">
              <div className="p-6 border-b border-primary-300 dark:border-primary-100">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  Order Summary
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="text-gray-900 dark:text-gray-200">
                      {formatCurrency(order.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="text-gray-900 dark:text-gray-200">
                      {formatCurrency(order.shippingFee)}
                    </span>
                  </div>
                  <div className="border-t pt-3 border-primary-300 dark:border-primary-100">
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-200">
                        Total
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-200">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-background-white rounded-lg shadow-md border  border-primary-300 dark:border-primary-100">
              <div className="p-6 border-b border-primary-300 dark:border-primary-100">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 flex items-center">
                  <CreditCard
                    className=" mr-3 text-primary-600 dark:text-primary-300"
                    size={18}
                  />
                  Payment Details
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payment Method
                    </p>
                    <p className="text-gray-900 dark:text-gray-200 capitalize">
                      {order.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Transaction ID
                    </p>
                    <p className="text-gray-900 dark:text-gray-200 text-sm break-all">
                      {order.paymentDetails.transactionId || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payment Date
                    </p>
                    <p className="text-gray-900 dark:text-gray-200">
                      {order.paymentDetails.paymentDate
                        ? formatDate(order.paymentDetails.paymentDate)
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-background-white rounded-lg shadow-md border  border-primary-300 dark:border-primary-100">
              <div className="p-6 border-b border-primary-300 dark:border-primary-100">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 flex items-center">
                  <MapPin
                    className="mr-2 text-primary-600 dark:text-primary-300"
                    size={18}
                  />
                  Customer Details
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-200">
                      {order.customerDetails.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail
                      className=" text-gray-400 dark:text-gray-300"
                      size={16}
                    />
                    <p className="text-gray-900 dark:text-gray-200 text-sm">
                      {order.customerDetails.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone
                      className="text-gray-400 dark:text-gray-300"
                      size={16}
                    />
                    <p className="text-gray-900 dark:text-gray-200 text-sm">
                      {order.customerDetails.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Delivery Address
                    </p>
                    <p className="text-gray-900 dark:text-gray-200 text-sm mt-2">
                      {order.customerDetails.address.street}
                      <br />
                      {order.customerDetails.address.city},{" "}
                      {order.customerDetails.address.state}
                      <br />
                      {order.customerDetails.address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderDetail.propTypes = {}

export default OrderDetail