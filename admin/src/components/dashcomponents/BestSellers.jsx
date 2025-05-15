import { useProductContext } from "../../context/index.js";
import { bestSellersTable } from "../../lib/constants.jsx";
import { useState } from "react";
import {
  Trash,
  Pen,
  Coffee,
  Plus,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  X,
} from "lucide-react";

const BestSellers = () => {
    const { bestSellers } = useProductContext();
    const [currentPage, setCurrentPage] = useState(1);
    let entriesPerPage = 5;

    const indexOfLastProduct = currentPage * entriesPerPage;
    const indexOfFirstProduct = indexOfLastProduct - entriesPerPage;
    const currentProducts = bestSellers.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    const totalPages = Math.ceil(bestSellers.length / entriesPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

 return (
   <div className='bg-white dark:bg-slate-800 p-6 rounded-md'>
     <div>
       <h2 className='dark:text-dark-text font-bold text-2xl'>Best Sellers</h2>
     </div>
     <div className='bg-white dark:bg-slate-800 rounded-lg pb-18 overflow-x-auto scrollbar-hidden'>
       <table className='min-w-full mt-10 border-separate border-spacing-y-6'>
         <thead className='bg-aquamine-7 dark:bg-slate-700'>
           <tr className='mb-10'>
             {bestSellersTable.map((detail, index) => {
               const isFirst = index === 0;
               const isLast = index === bestSellers.length - 1;

               return (
                 <th
                   scope='col'
                   key={index}
                   className={`px-6 py-8 text-left text-xs font-bold uppercase tracking-wider
                        ${isFirst ? "rounded-tl-xl rounded-bl-xl" : ""}
                        ${isLast ? "rounded-tr-xl rounded-br-xl" : ""}`}
                 >
                   {detail}
                 </th>
               );
             })}
           </tr>
         </thead>
         <tbody className='bg-white dark:bg-slate-800 mt-10 dark:text-dark-text'>
           {currentProducts.map((product, index) => (
             <tr
               key={product.id}
               className={`${
                 index % 2 === 0
                   ? "bg-white dark:bg-slate-800"
                   : "bg-aquamine-7 dark:bg-slate-700"
               } hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer`}
             >
               <td className='rounded-l-xl px-4 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                 <div className='flex items-center'>
                   <div className='h-20 w-20 flex-shrink-0'>
                     <img src={product.images[0]} alt={product.name} />
                   </div>
                   <div className='ml-6'>
                     <div className='font-medium text-black dark:text-dark-text text-xs max-w-[230px] max-sm:max-w-[170px] text-nowrap overflow-hidden overflow-ellipsis'>
                       {product.name}
                     </div>
                   </div>
                 </div>
               </td>

               <td className='px-4 py-6 whitespace-nowrap text-xs'>
                 #{product.id}
               </td>
               <td className='px-4 py-6 whitespace-nowrap text-xs'>
                 ₦{Number(product.price).toLocaleString()}
               </td>
               <td className='px-4 py-6 whitespace-nowrap text-xs rounded-r-xl'>
                 {product.visits}
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
     <div className='w-full h-1 bg-aquamine-5 dark:bg-dark-border my-10'></div>
     <div className='flex items-center justify-between mt-10 py-4 px-1 gap-6'>
       <div className='text-light-text-secondary dark:text-dark-text-secondary text-sm max-sm:text-xs'>
         Showing {indexOfFirstProduct + 1} to{" "}
         {Math.min(indexOfLastProduct, bestSellers.length)} of{" "}
         {bestSellers.length} entries
       </div>
       <div className='flex space-x-1 gap-3'>
         <button
           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
           disabled={currentPage === 1}
           className='px-2 py-2 cursor-pointer rounded-full w-19 h-19 max-sm:w-16 max-sm:h-16 border flex justify-center items-center disabled:opacity-50'
         >
           <ChevronLeft size={19} />
         </button>
         {pageNumbers.map((number) => (
           <button
             key={number}
             onClick={() => setCurrentPage(number)}
             className={`px-2 py-2 cursor-pointer rounded-full flex justify-center items-center w-19 h-19 max-sm:w-16 max-sm:h-16 ${
               currentPage === number
                 ? "bg-aquamine-5 dark:bg-dark-button dark:text-white"
                 : " hover:bg-aquamine-6 dark:hover:bg-dark-hover"
             }`}
           >
             {number}
           </button>
         ))}
         <button
           onClick={() =>
             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
           }
           disabled={currentPage === totalPages}
           className='px-2 py-2 cursor-pointer rounded-full flex justify-center items-center w-19 h-19 max-sm:w-16 max-sm:h-16 border disabled:opacity-50'
         >
           <ChevronRight size={19} />
         </button>
       </div>
     </div>
   </div>
 );
};
export default BestSellers;
