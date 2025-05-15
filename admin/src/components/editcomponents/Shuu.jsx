import React from "react";
import { Truck } from "lucide-react";

const Shuu = () => {
 return (
   <div className='flex gap-6 p-6'>
     {/* Main content - left side */}
     <div className='flex-1'>
       {/* Product List */}
       <div className='bg-white rounded-lg shadow p-6 mb-6'>
         <div className='flex justify-between items-center mb-6'>
           <h2 className='font-semibold'>All item</h2>
           <div className='relative'>
             <select className='appearance-none bg-white border rounded-lg px-4 py-2 pr-8'>
               <option>Sort</option>
               {/* Add sort options */}
             </select>
           </div>
         </div>

         {/* Product Items */}
         <div className='space-y-4'>
           {[1, 2, 3].map((item, index) => (
             <div key={index} className='flex items-center gap-4 border-b pb-4'>
               <img
                 src='/product-image.jpg'
                 alt='Product'
                 className='w-16 h-16 object-cover rounded'
               />
               <div className='flex-1'>
                 <p className='text-sm text-gray-600'>Product name</p>
                 <p className='font-medium'>Kristin Watson</p>
               </div>
               <div>
                 <p className='text-sm text-gray-600'>Quantity</p>
                 <p className='font-medium'>1</p>
               </div>
               <div>
                 <p className='text-sm text-gray-600'>Price</p>
                 <p className='font-medium'>$50.47</p>
               </div>
             </div>
           ))}
         </div>
       </div>

       {/* Cart Totals */}
       <div className='bg-white rounded-lg shadow p-6'>
         <h2 className='font-semibold mb-4'>Cart Totals</h2>
         <div className='space-y-3'>
           <div className='flex justify-between py-2'>
             <span className='text-gray-600'>Subtotal:</span>
             <span>$70.13</span>
           </div>
           <div className='flex justify-between py-2'>
             <span className='text-gray-600'>Shipping:</span>
             <span>$10.00</span>
           </div>
           <div className='flex justify-between py-2'>
             <span className='text-gray-600'>Tax (GST):</span>
             <span>$5.00</span>
           </div>
           <div className='flex justify-between py-2 font-semibold'>
             <span>Total price:</span>
             <span className='text-orange-500'>$90.58</span>
           </div>
         </div>
       </div>
     </div>

     {/* Right sidebar */}
     <div className='w-80 shrink-0'>
       {/* Summary */}
       <div className='bg-white rounded-lg shadow p-6 mb-6'>
         <h2 className='font-semibold mb-4'>Summary</h2>
         <div className='space-y-3'>
           <div className='flex justify-between'>
             <span className='text-gray-600'>Order ID</span>
             <span>#192847</span>
           </div>
           <div className='flex justify-between'>
             <span className='text-gray-600'>Date</span>
             <span>20 Nov 2023</span>
           </div>
           <div className='flex justify-between'>
             <span className='text-gray-600'>Total</span>
             <span className='text-orange-500'>$948.5</span>
           </div>
         </div>
       </div>

       {/* Shipping Address */}
       <div className='bg-white rounded-lg shadow p-6 mb-6'>
         <h2 className='font-semibold mb-4'>Shipping Address</h2>
         <p className='text-gray-600'>
           3517 W. Gray St. Utica, Pennsylvania 57867
         </p>
       </div>

       {/* Payment Method */}
       <div className='bg-white rounded-lg shadow p-6 mb-6'>
         <h2 className='font-semibold mb-4'>Payment Method</h2>
         <p className='text-gray-600'>
           Pay on Delivery (Cash/Card). Cash on delivery (COD) available.
           Card/Net banking acceptance subject to device availability.
         </p>
       </div>

       {/* Expected Date */}
       <div className='bg-white rounded-lg shadow p-6 mb-6'>
         <h2 className='font-semibold mb-4'>Expected Date Of Delivery</h2>
         <p className='text-green-500 mb-4'>20 Nov 2023</p>
         <button className='w-full flex items-center justify-center gap-2 text-blue-600 border border-blue-600 rounded-lg py-2'>
           <Truck className='w-5 h-5' />
           Track order
         </button>
       </div>
     </div>
   </div>
 );
}
export default Shuu