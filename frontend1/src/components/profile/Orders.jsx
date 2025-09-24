import React from "react";
import PropTypes from "prop-types";
import {
  CheckCircle,
  Clock,
  Eye,
  Package,
  RotateCcw,
  Search,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useOrderContext, useUserContext } from "../../context";
import Loading from "../Loading";
import Error from "../Error";
import IsAuthenticated from "../IsAuthenticated";

const Orders = () => {
  const {orders, isLoading, error} = useOrderContext()
  const {isAuthenticated} = useUserContext()
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };


    if (!isAuthenticated) {
      return (
        <main className="min-h-screen flex items-center justify-center p-4 dark:bg-background-white bg-gray-100">
          <IsAuthenticated page="orders"/>
        </main>
      );
    }

      if (isLoading) {
        return <Loading message="Loading your orders..." />;
      }

      if (error) {
        return <Error message="Failed to load orders" error={error} />;
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
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  const getStatusIcon = (status) => {
    const iconProps = { className: "w-12 h-12" };
    switch (status) {
      case "Processing":
        return <Clock {...iconProps} className=' text-yellow-500' size={18} />;
      case "Shipped":
        return <Truck {...iconProps} className=' text-blue-500' size={18} />;
      case "Delivered":
        return (
          <CheckCircle
            {...iconProps}
            className=' text-green-500'
            size={16}
          />
        );
      case "Cancelled":
        return <X {...iconProps} className=' text-red-500' size={18} />;
      case "Returned":
        return <RotateCcw {...iconProps} className=' text-orange-500' size={18} />;
      default:
        return (
          <Package {...iconProps} className=' text-gray-500' size={18} />
        );
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Processing:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-300/80 dark:text-yellow-900",
      Pending:
        "bg-gray-100 text-gray-800 dark:bg-gray-300/80 dark:text-gray-900",
      Shipped: "bg-blue-100 text-blue-800 dark:bg-blue-300/80 dark:text-blue-900",
      Out_for_delivery:
        "bg-purple-100 text-purple-800 dark:bg-purple-300/80 dark:text-purple-900",
      Delivered:
        "bg-green-100 text-green-800 dark:bg-green-300/80 dark:text-green-900",
      Cancelled: "bg-red-100 text-red-800 dark:bg-red-300/80 dark:text-red-900",
      Returned:
        "bg-orange-100 text-orange-800 dark:bg-orange-300/80 dark:text-orange-900",
    };
    return colors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-300/80 dark:text-gray-900";
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      paid: "bg-green-100 text-green-800 dark:bg-green-300/80 dark:text-green-900",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-300/80 dark:text-yellow-900",
      failed: "bg-red-100 text-red-800 dark:bg-red-300/80 dark:text-red-900",
      refunded: "bg-purple-100 text-purple-800 dark:bg-purple-300/80 dark:text-purple-900",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-300/80 dark:text-gray-900"
    );
  };

  const filterOrdersByDate = (order) => {
    const now = new Date();
    const orderDate = new Date(order.orderDate);

    switch (dateFilter) {
      case "last-30-days":
        return (now - orderDate) / (1000 * 60 * 60 * 24) <= 30;
      case "last-3-months":
        return (now - orderDate) / (1000 * 60 * 60 * 24) <= 90;
      case "last-6-months":
        return (now - orderDate) / (1000 * 60 * 60 * 24) <= 180;
      default:
        return true;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderItems.some((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;
    const matchesDate = filterOrdersByDate(order);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleViewOrder = (orderId) => {
    navigate(`/profile/orders/${orderId}`)
  };

  const handleReorder = (order) => {
    console.log("Reorder:", order.orderId);
  };

  const handleTrackOrder = (trackingNumber) => {
    console.log("Track order:", trackingNumber);
  };

  const orderStatuses = [
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
  ];
  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;
  const totalSpent = orders.reduce(
    (sum, order) =>
      order.paymentStatus === "paid" ? sum + order.totalAmount : sum,
    0
  );


  return (
    <div className='bg-gray-50 dark:bg-surface min-h-screen'>
      {/* Header */}
      <div className='bg-background-white border-b border-primary-300 dark:border-primary-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center gap-2'>
                <Package
                  className='text-primary-600 dark:text-primary-300 mr-3'
                  size={25}
                />
                <div>
                  <h1 className='text-xl font-bold text-gray-900 dark:text-gray-200'>
                    My Orders
                  </h1>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {totalOrders} orders • {completedOrders} delivered
                  </p>
                </div>
              </div>
              <div className='flex items-center pr-2'>
                <button
                  onClick={handleBack}
                  className='bg-transparent border-none text-lg cursor-pointer flex items-center justify-center text-gray-800 dark:text-gray-300 hover:text-text-secondary transition-colors'
                >
                  <FaArrowLeft />
                </button>
              </div>
            </div>

            <div className='mt-4 sm:mt-0 flex items-center space-x-4'>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                <span className='font-medium'>Total Spent: </span>
                <span className='text-lg font-semibold text-gray-900 dark:text-gray-300'>
                  {formatCurrency(totalSpent)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Filters */}
        <div className='bg-background-white rounded-lg shadow-md border p-6 mb-6 border-primary-300 dark:border-primary-100'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search
                className=' absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={16}
              />
              <input
                type='text'
                placeholder='Search by order ID or product name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-16 pr-4 text-base text-gray-900 dark:text-gray-300 placeholder:text-gray-500 py-2 border border-primary-300 dark:border-primary-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-300 outline-0 focus:border-transparent'
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='px-4 py-2 border text-base text-gray-900 dark:text-gray-300  border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-0 focus:border-transparent'
            >
              <option value='all' className='bg-surface'>
                All Status
              </option>
              {orderStatuses.map((status) => (
                <option key={status} value={status} className='bg-surface'>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className='px-4 py-2 bg-transparent border text-base text-gray-900 dark:text-gray-300 border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-0 focus:border-transparent'
            >
              <option value='all' className='bg-surface'>
                All Time
              </option>
              <option value='last-30-days' className='bg-surface'>
                Last 30 Days
              </option>
              <option value='last-3-months' className='bg-surface'>
                Last 3 Months
              </option>
              <option value='last-6-months' className='bg-surface'>
                Last 6 Months
              </option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className='text-center py-12'>
            <Package className='text-gray-300 mx-auto mb-4' size={42} />
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-200 mb-2'>
              {orders.length === 0
                ? "No orders yet"
                : "No orders match your search"}
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              {orders.length === 0
                ? "When you place your first order, it will appear here"
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        ) : (
          <div className='space-y-8'>
            {filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className='bg-background-white rounded-lg shadow-sm border border-primary-300 dark:border-primary-100'
              >
                {/* Order Header */}
                <div className='p-6 border-b border-primary-300 dark:border-primary-100'>
                  <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                    <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4'>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-200'>
                          Order #{order.orderId}
                        </h3>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          Placed on {formatDate(order.orderedAt)} •{" "}
                          {order.itemCount} item{order.itemCount > 1 ? "s" : ""}
                        </p>
                      </div>

                      <div className='flex items-center space-x-3'>
                        <div className='flex items-center'>
                          {getStatusIcon(order.orderStatus)}
                          <span
                            className={`ml-3 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                        <span
                          className={`px-4 py-2 capitalize rounded-full text-sm font-medium ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <div className='mt-4 lg:mt-0 text-right'>
                      <p className='text-xl font-bold text-gray-900 dark:text-gray-300'>
                        {formatCurrency(order.totalAmount)}
                      </p>
                      {order.deliveryTracking?.estimatedDelivery &&
                        !order.deliveryTracking.actualDelivery && (
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Est. delivery:{" "}
                            {formatDate(
                              order.deliveryTracking.estimatedDelivery
                            )}
                          </p>
                        )}
                      {order.deliveryTracking?.actualDelivery && (
                        <p className='text-sm text-green-600 dark:text-green-700'>
                          Delivered:{" "}
                          {formatDate(order.deliveryTracking.actualDelivery)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className='p-6'>
                  <div className='space-y-4'>
                    {order.orderItems.map((item, index) => (
                      <div key={index} className='flex items-center space-x-4'>
                        <img
                          src={item.image}
                          alt={item.productName}
                          className='w-26 h-26 object-cover rounded-md'
                        />
                        <div className='flex-1'>
                          <h4 className='font-medium text-gray-900 dark:text-gray-200 line-clamp-2'>
                            {item.productName}
                          </h4>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='font-semibold text-gray-900 dark:text-gray-200'>
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className='px-6 py-4 bg-gray-50 dark:bg-surface border-t border-primary-300 dark:border-primary-100rounded-b-lg'>
                  <div className='flex flex-wrap gap-3'>
                    <button
                      onClick={() => handleViewOrder(order.orderId)}
                      className='px-4 py-2 dark:bg-primary-300 bg-primary-500 dark:text-text text-gray-900 text-sm font-medium rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors flex items-center'
                    >
                      <Eye className=' mr-2' size={16} />
                      View Details
                    </button>

                    {order.trackingNumber &&
                      (order.orderStatus === "Shipped" ||
                        order.orderStatus === "Out_for_delivery") && (
                        <button
                          onClick={() =>
                            handleTrackOrder(
                              order.deliveryTracking.trackingNumber
                            )
                          }
                          className='px-4 py-2 dark:bg-primary-300 bg-primary-500 dark:text-text text-gray-900 text-sm font-medium rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors flex items-center'
                        >
                          <Truck className=' mr-2' size={16} />
                          Track Order
                        </button>
                      )}

                    {(order.orderStatus === "Delivered" ||
                      order.orderStatus === "Cancelled") && (
                      <button
                        onClick={() => handleReorder(order)}
                        className='px-4 py-2 border dark:border-primary-100 border-primary-300 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center'
                      >
                        <RotateCcw className=' mr-2' size={16} />
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Orders.propTypes = {};

export default Orders;
