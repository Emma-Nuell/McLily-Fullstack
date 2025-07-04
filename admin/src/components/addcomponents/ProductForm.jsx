import { useEffect, useState } from "react";
import { useProductContext } from "../../context/index.js";
import {
  ProductName,
  BrandDesc,
  CatSub,
  ImageUplaod,
  PriceStock,
  Specifications,
  Featured,
  TagsInput,
} from "./index.js";
import { Form } from "radix-ui";

const ProductForm = () => {
  const { isEditMode, editProductData, editOff, createProduct, updateProduct } =
    useProductContext();

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(
    isEditMode ? editProductData.category : ""
  );
  const [subCategory, setSubCategory] = useState(
    isEditMode ? editProductData.subCategory : ""
  );
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [specifications, setSpecifications] = useState({});
  const [tags, setTags] = useState([]);
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [nameField, setNameField] = useState(false);
  const [categoryField, setCategoryField] = useState(false);
  const [imageField1, setImageField1] = useState(false);
  const [priceField, setPriceField] = useState(false);
  const [brandField, setBrandField] = useState(false);
  const [descField, setDescField] = useState(false);
  const [specField, setSpecField] = useState(false);
  const [tagsField, setTagsField] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setProductName(editProductData.name || "");
      setUploadedImages(editProductData.images || []);
      setBrandName(editProductData.brand || "");
      setProductDesc(editProductData.description || "");
      setSpecifications(editProductData.specifications || {});
      setTags(editProductData.tags || []);
      setStock(editProductData.stock || "");
      setPrice(editProductData.price || "");
      setSizes(editProductData.sizes || []);
      setFeatured(editProductData.featured || false);
    } else {
      setProductName("");
      setCategory("");
      setSubCategory("");
      setUploadedImages([]);
      setBrandName("");
      setProductDesc("");
      setSpecifications({});
      setTags([]);
      setStock("");
      setPrice("");
      setSizes([]);
      setFeatured(false);
    }
  }, [isEditMode, editProductData]);

  const clearField = () => {
    setProductName("");
    setCategory("");
    setSubCategory("");
    setUploadedImages([]);
    setPrice("");
    setStock("");
    setBrandName("");
    setProductDesc("");
    setSpecifications({});
    setTags([]);
    setSizes([]);
    setFeatured(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameField(false);
    setCategoryField(false);
    setImageField1(false);
    setPriceField(false);
    setBrandField(false);
    setDescField(false);
    setSpecField(false);
    setTagsField(false);

    const errors = {
      name: !productName,
      category: !category || !subCategory,
      imageEmpty: uploadedImages.length === 0,
      priceInvalid: !price || price <= 0 || isNaN(price),
      stockInvalid: stock < 1 || isNaN(stock) || !stock,
      brand: !brandName,
      description: !productDesc,
      specifications: Object.keys(specifications).length === 0,
      tags: tags.length === 0,
    };

    if (errors.name) return setNameField(true);
    if (errors.category) return setCategoryField(true);
    if (errors.imageEmpty) return setImageField1(true);
    if (errors.priceInvalid || errors.stockInvalid) return setPriceField(true);
    if (errors.brand) return setBrandField(true);
    if (errors.description) return setDescField(true);
    if (errors.specifications) return setSpecField(true);
    if (errors.tags) return setTagsField(true);

    const product = {
      name: productName,
      images: uploadedImages,
      category,
      subCategory,
      price,
      description: productDesc,
      tags,
      brand: brandName,
      stock,
      sizes: sizes.length > 0 ? sizes : null,
      specifications:
        specifications && Object.keys(specifications).length > 0
          ? specifications
          : null,
      featured: featured ? true : false,
    };

    try {

      if (editProductData?.productId) {
        await updateProduct({
          ...product,
          productId: editProductData.productId,
        });
      } else {
         await createProduct(product);
      }
      clearField();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Operation failed";
      console.error("Error:", errorMessage);
    }

  };

  useEffect(() => {
    if (!isEditMode) {
      setSubCategory("");
    }
  }, [category, isEditMode]);

  const handleCancelEdit = () => {
    editOff();
  };

  return (
    <Form.Root
      onSubmit={handleSubmit}
      className='bg-white dark:bg-slate-800 w-full p-6 rounded-lg shadow-md max-w-6xl mx-auto font-dm border-aquamine-4 border-2 dark:border-slate-500'
    >
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold mb-4 dark:text-white'>
          {isEditMode ? "Edit Product" : "Add Product"}
        </h2>
        {isEditMode && (
          <button
            onClick={handleCancelEdit}
            className='button dark:bg-slate-600  font-medium leading-none dark:text-white outline-none outline-offset-1 hover:bg-aquamine-3 dark:hover:bg-slate-500 focus-visible:outline-2 select-none'
          >
            Cancel Edit
          </button>
        )}
      </div>
      <ProductName
        productName={productName}
        setProductName={setProductName}
        nameField={nameField}
      />
      <CatSub
        category={category}
        setCategory={setCategory}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        categoryField={categoryField}
      />
      <ImageUplaod
        images={images}
        setImages={setImages}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
        imageField1={imageField1}
      />
      <PriceStock
        setStock={setStock}
        setPrice={setPrice}
        stock={stock}
        price={price}
        sizes={sizes}
        isEditMode={isEditMode}
        setSizes={setSizes}
        priceField={priceField}
      />
      <BrandDesc
        brandName={brandName}
        setBrandName={setBrandName}
        productDesc={productDesc}
        setProductDesc={setProductDesc}
        brandField={brandField}
        descField={descField}
      />
      <Specifications
        specificationsMain={specifications}
        setSpecifications={setSpecifications}
        onSave={(data) => setSpecifications(data)}
        specField={specField}
        isEditMode={isEditMode}
      />
      <TagsInput setTags={setTags} tags={tags} tagsField={tagsField} />
      <Featured setFeatured={setFeatured} featured={featured} />
      <Form.Field className='mt-8'>
        <Form.Submit asChild>
          <div className='flex justify-end mr-14 '>
            <button
              type='submit'
              onClick={(e) => handleSubmit(e)}
              // disabled={uploadedImages.length !== images.length || isUploading}
              className='button dark:bg-slate-600  font-medium leading-none dark:text-white outline-none outline-offset-1 hover:bg-aquamine-3 dark:hover:bg-slate-500 focus-visible:outline-2 select-none'
            >
              {isEditMode ? "Update Product" : "Add Product"}
            </button>
          </div>
        </Form.Submit>
      </Form.Field>
    </Form.Root>
  );
};

export default ProductForm;
