import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { physicalOrder2 } from "../lib/constants";
import { ArrowLeft } from "lucide-react";

const PhysicalOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentNotes, setPaymentNotes] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // const response = await axios.get(`/api/physical-orders/${orderId}`);
        setOrder(physicalOrder2);
        setLoading(false);
      } catch (err) {
        setError("Failed to load order details");
        setLoading(false);
        console.error("Error fetching order:", err);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentAmount <= 0) {
      setError("Payment amount must be greater than 0");
      return;
    }

    try {
      await axios.patch(`/api/physical-orders/${orderId}/payment`, {
        amount: parseFloat(paymentAmount),
        method: paymentMethod,
        notes: paymentNotes,
      });

      // Refresh order data
      const response = await axios.get(`/api/physical-orders/${orderId}`);
      setOrder(response.data);

      // Reset form
      setPaymentAmount(0);
      setPaymentNotes("");

      // Show success message
      alert("Payment updated successfully!");
    } catch (err) {
      setError(
        "Failed to update payment: " +
          (err.response?.data?.error || err.message)
      );
      console.error("Error updating payment:", err);
    }
  };

  if (loading)
    return <div className='text-center py-8'>Loading order details...</div>;
  if (error)
    return <div className='text-center py-8 text-red-600'>{error}</div>;
  if (!order) return <div className='text-center py-8'>Order not found</div>;

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <button
        onClick={() => navigate(-1)}
        className='mb-4 flex items-center text-light-button dark:text-dark-button cursor-pointer'
      >
        <ArrowLeft className='mr-2' size={20} />
        Back to Orders
      </button>

      <div className='bg-white dark:bg-slate-800 dark:text-dark-text shadow-lg overflow-hidden'>
        {/* Order Header */}
        <div className='px-6 py-4 border-b border-gray-200 bg-white dark:bg-slate-800'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
                Order #{order.orderId}
              </h2>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                Created on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className='mt-2 md:mt-0'>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : order.status === "partially_paid"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status.replace("_", " ").toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Customer and Payment Summary */}
        <div className='px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-200 mb-2'>
              Customer Information
            </h3>
            <div className='space-y-1'>
              <p>
                <span className='font-medium'>Name:</span> {order.customer.name}
              </p>
              <p>
                <span className='font-medium'>Phone:</span>{" "}
                {order.customer.phone}
              </p>
              {order.customer.email && (
                <p>
                  <span className='font-medium'>Email:</span>{" "}
                  {order.customer.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-200 mb-2'>
              Payment Summary
            </h3>
            <div className='space-y-1'>
              <p>
                <span className='font-medium'>Total Amount:</span> ₦
                {order.totalAmount.toFixed(2)}
              </p>
              <p>
                <span className='font-medium'>Amount Paid:</span> ₦
                {order.amountPaid.toFixed(2)}
              </p>
              <p>
                <span className='font-medium'>Amount Remaining:</span> ₦
                {order.amountRemaining.toFixed(2)}
              </p>
              <p>
                <span className='font-medium'>Payment Method:</span>{" "}
                {order.paymentMethod.charAt(0).toUpperCase() +
                  order.paymentMethod.slice(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className='px-6 py-4 border-t border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-200 mb-3'>
            Order Items
          </h3>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-aquamine-7 dark:bg-slate-700'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Product
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Size
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Qty
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Price
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white dark:bg-slate-800 divide-y divide-gray-200'>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className='px-6 py-4 whitespace-nowrap'>{item.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {item.size?.value
                        ? `${item.size.form}: ${item.size.value}`
                        : "N/A"}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {item.quantity}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      ₦{item.price.toFixed(2)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      ₦{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History */}
        {order.paymentHistory && order.paymentHistory.length > 0 && (
          <div className='px-6 py-4 border-t border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-200 mb-3'>
              Payment History
            </h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-aquamine-7 dark:bg-slate-700'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                      Date
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                      Amount
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                      Method
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white dark:bg-slate-800 divide-y divide-gray-200'>
                  {order.paymentHistory.map((payment, index) => (
                    <tr key={index}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {new Date(payment.date).toLocaleString()}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        ₦{payment.amount.toFixed(2)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {payment.method.charAt(0).toUpperCase() +
                          payment.method.slice(1)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {payment.notes || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Update Payment Form */}
        <div className='px-6 py-4 border-t border-gray-200 bg-white dark:bg-slate-800'>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-200 mb-3'>
            Record New Payment
          </h3>

          {error && (
            <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label
                  htmlFor='paymentAmount'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Amount *
                </label>
                <input
                  type='number'
                  id='paymentAmount'
                  inputMode='numeric'
                  min='0.01'
                  max={order.amountRemaining}
                  className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  required
                />
                <p className='mt-1 text-sm text-gray-500'>
                  Maximum: ₦{order.amountRemaining.toFixed(2)}
                </p>
              </div>

              <div>
                <label
                  htmlFor='paymentMethod'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Payment Method *
                </label>
                <select
                  id='paymentMethod'
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:border-slate-950 dark:focus:shadow-slate-950 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option
                    value='cash'
                    className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface'
                  >
                    Cash
                  </option>
                  <option
                    value='card'
                    className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface'
                  >
                    Card
                  </option>
                  <option
                    value='transfer'
                    className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface'
                  >
                    Bank Transfer
                  </option>
                  <option
                    value='credit'
                    className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface'
                  >
                    Credit
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='paymentNotes'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Notes
                </label>
                <textarea
                  id='paymentNotes'
                  className='box-border inline-flex mt-2 w-full max-w-5xl appearance-none items-center justify-center rounded px-2.5 py-4 text-[15px] leading-none dark:text-white outline-none
           selection:text-white font-poppins pl-6 resize-none border-aquamine-4 dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 scrollbar-hidden'
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                />
              </div>
            </div>

            <div className='mt-6 flex justify-end'>
              <button
                type='submit'
                className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                disabled={order.status === "completed"}
              >
                Record Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhysicalOrderDetails;
