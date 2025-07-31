import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useProductContext } from "../context/index.js";
import axios from "axios";

const PhysicalSalesForm = () => {
  const { products: main } = useProductContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      phone: "",
      email: "",
    },
    paymentType: "",
    paymentMethod: "",
    amountPaid: 0,
    notes: "",
  });
  const [currentItem, setCurrentItem] = useState({
    productId: "",
    name: "",
    size: { form: "", value: "" },
    quantity: 1,
    price: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(main);
        setFilteredProducts(main);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [main]);
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);
  useEffect(() => {
    if (selectedProduct) {
      let price = selectedProduct.price;
      if (selectedProduct.sizes && currentItem.size.value) {
        const size = selectedProduct.sizes.find(
          (s) =>
            s.form === currentItem.size.form &&
            s.value === currentItem.size.value
        );
        if (size) {
          price = size.price;
        }
      }
      setCurrentItem((prev) => ({
        ...prev,
        price: price,
        productId: selectedProduct.productId,
        name: selectedProduct.name,
      }));
    }
  }, [selectedProduct, currentItem.size]);
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentItem((prev) => ({
      ...prev,
      productId: product.productId,
      name: product.name,
      size: { form: "", value: "" },
      price: product.price,
    }));
    setSearchTerm(product.name);
    setFilteredProducts([]);
  };

  const handleSizeChange = (e) => {
    const [form, value] = e.target.value.split("|");
    setCurrentItem((prev) => ({
      ...prev,
      size: { form, value },
    }));
  };
  const handleAddItem = () => {
    if (!selectedProduct) return;

    const itemTotal = currentItem.price * currentItem.quantity;

    setOrderItems((prev) => [
      ...prev,
      {
        ...currentItem,
        total: itemTotal,
      },
    ]);

    // Reset current item
    setSelectedProduct(null);
    setCurrentItem({
      productId: "",
      name: "",
      size: { form: "", value: "" },
      quantity: 1,
      price: 0,
    });
    setSearchTerm("");
  };
  const handleRemoveItem = (index) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const amountRemaining = totalAmount - formData.amountPaid;

      const orderData = {
        customer: formData.customer,
        items: orderItems,
        paymentType: formData.paymentType,
        paymentMethod: formData.paymentMethod,
        amountPaid: formData.amountPaid,
        amountRemaining: amountRemaining > 0 ? amountRemaining : 0,
        notes: formData.notes,
      };
  
      try {
        await axios.post("/physical", orderData);
      } catch (error) {
        console.error(error);
        
      }
       
      alert("Order created successfully!");

      // Reset form
      setOrderItems([]);
      setFormData({
        customer: {
          name: "",
          phone: "",
          email: "",
        },
        paymentType: "",
        paymentMethod: "",
        amountPaid: 0,
        notes: "",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order: " + error.message);
    }
  };

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const amountRemaining = totalAmount - formData.amountPaid;
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6 text-black dark:text-white'>
        Physical Sales Order
      </h1>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Customer Information */}
        <div className='bg-white dark:bg-slate-800 p-4 rounded shadow'>
          <h2 className='text-xl font-semibold mb-4 text-black dark:text-white'>
            Customer Information
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                Name *
              </label>
              <input
                type='text'
                required
                className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                value={formData.customer.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customer: { ...prev.customer, name: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                Phone *
              </label>
              <input
                type='tel'
                required
                className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                value={formData.customer.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customer: { ...prev.customer, phone: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                Email
              </label>
              <input
                type='email'
                className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                value={formData.customer.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customer: { ...prev.customer, email: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Add Products */}
        <div className='bg-white dark:bg-slate-800 p-4 rounded shadow'>
          <h2 className='text-xl font-semibold mb-4 text-black dark:text-white'>
            Add Products
          </h2>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
              Search Product *
            </label>
            <input
              type='text'
              className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Type to search products...'
            />

            {searchTerm && filteredProducts.length > 0 && (
              <ul className='mt-1 border border-gray-300 dark:border-slate-950 dark:text-white dark:bg-dark-surface rounded-md max-h-60 overflow-auto'>
                {filteredProducts.map((product) => (
                  <li
                    key={product.productId}
                    className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                    onClick={() => handleProductSelect(product)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedProduct && (
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div>
                  <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                    Size
                  </label>
                  <select
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:border-slate-950 dark:focus:shadow-slate-950 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px] dark:text-white'
                    onChange={handleSizeChange}
                    value={`${currentItem.size.form}|${currentItem.size.value}`}
                    required
                  >
                    <option
                      value=''
                      className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface'
                    >
                      Select size
                    </option>
                    {selectedProduct.sizes.map((size) => (
                      <option
                        key={`${size.form}-${size.value}`}
                        value={`${size.form}|${size.value}`}
                        className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface capitalize'
                      >
                        {size.value} ({size.stock} available)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                  Quantity
                </label>
                <input
                  type='number'
                  inputMode='numeric'
                  min='1'
                  className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                  value={currentItem.quantity}
                  onChange={(e) =>
                    setCurrentItem((prev) => ({
                      ...prev,
                      quantity: parseInt(e.target.value) || 1,
                    }))
                  }
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                  Price
                </label>
                <input
                  type='number'
                  inputMode='numeric'
                  min='0'
                  className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                  value={currentItem.price}
                  onChange={(e) =>
                    setCurrentItem((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>

              <div className='flex items-end'>
                <button
                  type='button'
                  className='inline-flex h-[35px] items-center justify-center rounded  bg-aquamine-4 px-[15px] font-medium leading-none  outline-none outline-offset-1 hover:bg-aquamine-3 dark:bg-slate-600 dark:hover:bg-slate-500 focus-visible:outline-2  select-none cursor-pointer dark:text-white'
                  onClick={handleAddItem}
                >
                  Add to Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        {orderItems.length > 0 && (
          <div className='bg-white dark:bg-slate-800 p-4 rounded shadow'>
            <h2 className='text-xl font-semibold mb-4 text-black dark:text-white'>
              Order Items
            </h2>
            <div className='overflow-x-auto scrollbar-hidden'>
              <table className='min-w-full divide-y divide-gray-200 mt-10 border-separate'>
                <thead className='bg-aquamine-7 dark:bg-slate-700'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Product
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Size
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Quantity
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Price
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Total
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white dark:bg-slate-800 mt-10 dark:text-dark-text'>
                  {orderItems.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "bg-white dark:bg-slate-800"
                          : "bg-aquamine-7 dark:bg-slate-700"
                      } hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer`}
                    >
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item.name}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item.size.value
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
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <button
                          type='button'
                          className='text-red-600 dark:text-red-700 cursor-pointer hover:text-red-900 dark:hover:text-red-600 hover:bg-gray-300 dark:hover:bg-gray-600'
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan='4'
                      className='px-6 py-4 text-right font-medium'
                    >
                      Total:
                    </td>
                    <td className='px-6 py-4 font-bold'>
                      ₦{totalAmount.toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div className='bg-white dark:bg-slate-800 text-black dark:text-white p-4 rounded shadow'>
          <h2 className='text-xl font-semibold mb-4'>Payment Information</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                Payment Type *
              </label>
              <select
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:border-slate-950 dark:focus:shadow-slate-950 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                value={formData.paymentType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value,
                  }))
                }
                required
              >
                <option
                  value=''
                  className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface'
                >
                  Select Payment Type
                </option>
                <option
                  value='full'
                  className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface'
                >
                  Paid in full
                </option>
                <option
                  value='credit'
                  className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface'
                >
                  Credit (Installments)
                </option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                Payment Method *
              </label>
              <select
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:border-slate-950 dark:focus:shadow-slate-950 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value,
                  }))
                }
                required
              >
                <option
                  value=''
                  className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface'
                >
                  Select Payment Method
                </option>
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
              <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                Amount Paid
              </label>
              <input
                type='number'
                inputMode='numeric'
                min='0'
                className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                value={formData.amountPaid}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    amountPaid: parseFloat(e.target.value) || 0,
                  }))
                }
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
                Amount Remaining
              </label>
              <input
                type='number'
                className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 dark:bg-slate-900 dark:border-slate-950 mt-2'
                value={amountRemaining.toFixed(2)}
                readOnly
              />
            </div>
          </div>

          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-900 dark:text-gray-200'>
              Notes
            </label>
            <textarea
              className='box-border inline-flex mt-2 w-full max-w-5xl appearance-none items-center justify-center rounded px-2.5 py-4 text-[15px] leading-none dark:text-white outline-none
           selection:text-white font-poppins pl-6 resize-none border-aquamine-4 dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 scrollbar-hidden'
              rows='3'
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button
            type='submit'
            className='button dark:bg-slate-600  font-medium leading-none dark:text-white outline-none outline-offset-1 hover:bg-aquamine-3 dark:hover:bg-slate-500 focus-visible:outline-2 select-none'
            disabled={orderItems.length === 0}
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhysicalSalesForm;
