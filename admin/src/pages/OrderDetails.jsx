import { useParams, useLocation, useNavigate } from "react-router-dom";
import {  useOrderContext } from "../context/index.js";
import { useCallback, useEffect, useState } from "react";
import { Truck, ArrowLeftCircle } from "lucide-react";
import {ChangeStatus} from "../components/ordercomponents/index.js"

const OrderDetails = () => {
  const { fetchSingleOrder, singleOrder: order } = useOrderContext();
  const [isOpen, setIsOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    const from = location.state?.from;
    if (from) {
      navigate(`${from.pathname}?page=${from.page}`);
    } else {
      navigate("/orders");
    }
  };

  const checkStatusClick = useCallback(() => {
    const from = location.state?.from;
    if (from) {
     setIsOpen(from.isOpen)
    }
  }, [location.state?.from]);
 
  const { id } = useParams();

  useEffect(() => {
    fetchSingleOrder(id);
    checkStatusClick()
  }, [id, fetchSingleOrder, checkStatusClick]);
  

  return (
    <div className='p-6'>
      <div className='p-6 mb-6 flex justify-between'>
        <h2 className='font-bold text-2xl dark:text-dark-text'>
          Order Details
        </h2>
        <button
          onClick={goBack}
          className='text-light-button dark:text-dark-button cursor-pointer'
        >
          <ArrowLeftCircle size={30} />
        </button>
      </div>
      <div className='flex gap-6 max-md:flex-col'>
        <div className='flex-1'>
          {/* Product List */}

          <div className='bg-white dark:bg-slate-800 dark:text-dark-text rounded-lg shadow-lg p-8 mb-10'>
            <div className='flex justify-between items-center mb-6 p-4'>
              <h2 className='font-semibold text-lg'>All items</h2>
            </div>
            <div className='overflow-x-auto scrollbar-hidden bg-white dark:bg-slate-800'>
              <table className='border-separate border-spacing-y-6 min-w-full'>
                <tbody className='bg-white dark:bg-slate-800 mt-10 dark:text-dark-text'>
                  {[1, 2, 4].map((item, index) => (
                    <tr key={index} className=''>
                      <td className='p-8'>
                        <div className='h-23 w-23 max-sm:h-20 max-sm:w-20 flex-shrink-0 flex items-center'>
                          <img src={order.image} alt='Product' />
                        </div>
                      </td>
                      <td className='p-8'>
                        <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                          Product name
                        </p>
                        <p className='font-medium max-w-[250px] max-sm:max-w-[170px] text-nowrap overflow-hidden overflow-ellipsis'>
                          {order.productName}
                        </p>
                      </td>
                      <td className='p-8'>
                        <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                          Quantity
                        </p>
                        <p className='font-medium'>x{order.quantity}</p>
                      </td>
                      <td className='p-8'>
                        <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                          Price
                        </p>
                        <p className='font-medium'>
                          ₦{Number(order.price).toLocaleString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8'>
            <table className='mt-10 border-separate border-spacing-y-6 min-w-full'>
              <thead className='bg-aquamine-7 dark:bg-slate-700'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-8 text-left text-sm font-bold uppercase tracking-wider
                       rounded-tl-xl rounded-bl-xl'
                  >
                    Cart Total
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-8 text-left text-sm font-bold uppercase tracking-wider
                       rounded-tr-xl rounded-br-xl'
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white dark:bg-slate-800 mt-10 dark:text-dark-text'>
                <tr>
                  <td className='px-4 py-6 whitespace-nowrap max-sm:text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                    Subtotal:
                  </td>
                  <td className='px-4 py-6 whitespace-nowrap max-sm:text-sm'>
                    ₦{Number(order.subtotal).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className='px-4 py-6 whitespace-nowrap max-sm:text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                    Shipping:
                  </td>
                  <td className='px-4 py-6 whitespace-nowrap max-sm:text-sm'>
                    ₦{Number(order.shipping).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className='px-4 py-6 whitespace-nowrap max-sm:text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                    Tax (GST):
                  </td>
                  <td className='px-4 py-6 whitespace-nowrap max-sm:text-sm'>
                    ₦{Number(order.tax).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className='px-4 py-6 whitespace-nowrap max-sm:text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                    Total price:
                  </td>
                  <td className='px-4 py-6 whitespace-nowrap max-sm:text-sm text-orange-600'>
                    ₦{Number(order.total).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar */}
        <div className='w-240 shrink-0 max-md:w-full'>
          {/* Summary */}
          <div className='bg-white dark:bg-slate-800 dark:text-dark-text rounded-lg shadow-lg p-10 mb-10'>
            <h2 className='font-semibold mb-4'>Summary</h2>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-light-text-secondary dark:text-dark-text-secondary'>
                  Order ID
                </span>
                <span>#{order.orderId}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-light-text-secondary dark:text-dark-text-secondary'>
                  Date
                </span>
                <span>{order.orderDate}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-light-text-secondary dark:text-dark-text-secondary'>
                  Total
                </span>
                <span className='text-orange-600'>₦{order.total}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className='bg-white dark:bg-slate-800 dark:text-dark-text rounded-lg shadow-lg p-10 mb-10'>
            <h2 className='font-semibold mb-4'>Shipping Address</h2>
            <p className='text-light-text-secondary dark:text-dark-text-secondary'>
              {order.shippingAddress}
            </p>
          </div>

          {/* Payment Method */}
          <div className='bg-white dark:bg-slate-800 dark:text-dark-text rounded-lg shadow-lg p-10 mb-10'>
            <h2 className='font-semibold mb-4'>Payment Method</h2>
            <p className='text-light-text-secondary dark:text-dark-text-secondary'>
              Pay on Delivery (Cash/Card). Cash on delivery (COD) available.
              Card/Net banking acceptance subject to device availability.
            </p>
          </div>

          {/* Expected Date */}
          <div className='bg-white dark:bg-slate-800 dark:text-dark-text rounded-lg shadow-lg p-10 mb-10'>
            <h2 className='font-semibold mb-4'>Expected Date Of Delivery</h2>
            <p className='text-green-500 mb-4'>20 Nov 2023</p>
            <button className='w-full flex items-center justify-center gap-2 cursor-pointer text-blue-600 border border-blue-600 rounded-lg py-2'>
              <Truck size={20} />
              Track order
            </button>
          </div>
          <ChangeStatus
            order={order}
            currentStatus={order.status}
            orderId={order.orderId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
