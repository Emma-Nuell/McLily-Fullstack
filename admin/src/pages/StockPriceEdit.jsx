import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import { useProductContext } from "../context/index.js";

const StockPriceEdit = () => {
  const { products: main } = useProductContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    stock: "",
    price: "",
    size: { form: "", value: "" },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get("/api/products/selection");
        setProducts(main);
        setFilteredProducts(main);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [main]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.productId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setFormData({
      stock: product.stock,
      price: product.price,
      size: { form: "", value: "" },
    });
    setSuccess("");
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updates = {};
      if (formData.stock !== "" && formData.stock !== selectedProduct.stock) {
        updates.stock = parseInt(formData.stock);
      }
      if (formData.price !== "" && formData.price !== selectedProduct.price) {
        updates.price = parseFloat(formData.price);
      }

      // Only send size if the product has sizes and a size is selected
      const sizeUpdate =
        selectedProduct.sizes?.length > 0 && formData.size.value
          ? { size: formData.size }
          : null;

      const response = await axios.patch(
        `/api/products/${selectedProduct.productId}/stock-price`,
        { ...updates, ...sizeUpdate }
      );

      // Update local state with the changes
      setSelectedProduct(response.data);
      setFormData({
        stock: response.data.stock,
        price: response.data.price,
        size: { form: "", value: "" },
      });
      setSuccess("Product updated successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Update price when size changes
  useEffect(() => {
    if (selectedProduct?.sizes?.length > 0 && formData.size.value) {
      const size = selectedProduct.sizes.find(
        (s) => s.form === formData.size.form && s.value === formData.size.value
      );
      if (size) {
        setFormData((prev) => ({
          ...prev,
          stock: size.stock,
          price: size.price,
        }));
      }
    }
  }, [formData.size, selectedProduct]);

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <h1 className='text-2xl font-bold mb-6'>Product Stock & Price Editor</h1>

      {/* Product Search */}
      <div className='bg-white dark:bg-slate-800 p-4 rounded shadow mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Select Product</h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Search Products
          </label>
          <input
            type='text'
            className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Type product name or ID...'
          />

          {searchTerm && filteredProducts.length > 0 && (
            <ul className='mt-1 border border-gray-300 dark:border-slate-950 dark:text-white dark:bg-dark-surface rounded-md max-h-60 overflow-auto'>
              {filteredProducts.map((product) => (
                <li
                  key={product.productId}
                  className='p-2 hover:bg-gray-100 cursor-pointer flex justify-betwee dark:hover:bg-gray-800'
                  onClick={() => handleProductSelect(product)}
                >
                  <span>{product.name}</span>
                  <span className='text-gray-500 dark:text-gray-400 text-sm'>
                    ID: {product.productId} | Stock: {product.stock} | Price: ₦
                    {product.price.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {selectedProduct && (
        <div className='bg-white dark:bg-slate-800 p-4 rounded shadow'>
          <h2 className='text-xl font-semibold mb-4'>
            Editing: {selectedProduct.name} ({selectedProduct.productId})
          </h2>

          {success && (
            <div className='mb-4 p-3 bg-green-100 text-green-700 rounded'>
              {success}
            </div>
          )}
          {error && (
            <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Size Selection (if product has sizes) */}
            {selectedProduct.sizes?.length > 0 && (
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Size Variation
                </label>
                <select
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:border-slate-950 dark:focus:shadow-slate-950 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px] dark:text-white'
                  value={`${formData.size.form}|${formData.size.value}`}
                  onChange={(e) => {
                    const [form, value] = e.target.value.split("|");
                    setFormData((prev) => ({
                      ...prev,
                      size: { form, value },
                      stock: "",
                      price: "",
                    }));
                  }}
                >
                  <option
                    value='|'
                    className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface capitalize'
                  >
                    Select size (default is main product)
                  </option>
                  {selectedProduct.sizes.map((size) => (
                    <option
                      key={`${size.form}-${size.value}`}
                      value={`${size.form}|${size.value}`}
                      className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md dark:bg-dark-surface capitalize'
                    >
                      {size.form}: {size.value} (Stock: {size.stock}, Price: ₦
                      {size.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Stock Field */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Stock
                </label>
                <input
                  type='number'
                  min='0'
                  inputMode='numeric'
                  className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stock: e.target.value,
                    }))
                  }
                  placeholder={selectedProduct.stock}
                />
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  Current: {selectedProduct.stock}
                </p>
              </div>

              {/* Price Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Price (₦)
                </label>
                <input
                  type='number'
                  inputMode='numeric'
                  min='0'
                  className='input w-full box-border max-w-5xl mt-2 appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  placeholder={selectedProduct.price}
                />
                <p className='mt-1 text-sm text-gray-500'>
                  Current: ₦{selectedProduct.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-end'>
              <button
                type='submit'
                className='inline-flex h-[35px] items-center justify-center rounded  bg-aquamine-4 px-[15px] font-medium leading-none  outline-none outline-offset-1 hover:bg-aquamine-3 dark:bg-slate-600 dark:hover:bg-slate-500 focus-visible:outline-2  select-none cursor-pointer dark:text-white'
                disabled={
                  loading ||
                  (formData.stock === "" &&
                    formData.price === "" &&
                    (!selectedProduct.sizes?.length > 0 ||
                      formData.size.value === ""))
                }
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default StockPriceEdit