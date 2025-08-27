import { useParams, Link } from "react-router-dom";
// import { useProductContext } from "../context/product-context";
import React, { useEffect, useState } from "react";
import { AmountButtons, Error, PageHero } from "../components";
import {
  ProductImages,
  DescSpec,
  SizeSelector,
  Reviews,
  YouMayLike,
  DeliveryOptions,
} from "../components/singleproduct";
import { Stars1 } from "../components/products";
import { formatPrice, trackProductViewWithDetails } from "../utils/helpers";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import {
  FaRegCheckCircle,
  FaHome,
  FaRegHeart,
  FaHeart,
  FaCartPlus,
} from "react-icons/fa";
import { useCartContext } from "../context/cart-context";
import ProductsAPI from "../utils/endpoints/productsApi";
import { useSmartProduct } from "../hooks/productHooks";
import { useUserContext } from "../context";



const SingleProductPage = () => {
  const { productId } = useParams();
  const {data, isLoading, isError, error} = useSmartProduct(productId)

  const product = data?.data;
  const fromCache = data?.fromCache;
  const {
    name,
    description,
    stock,
    sizes,
    basePrice,
    images,
    brand,
    specifications,
    rating,
    reviews,
  } = product;

  // const navigate = useNavigate()
  const { addToCart, cart, toggleAmount } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(basePrice);
  const { isAuthenticated, isInWishlist, addToWishlist, removeFromWishlist, wishlistIsLoading } =
    useUserContext(); 


    useEffect(() => {
      if (product) {
        trackProductViewWithDetails(product);

        if (!fromCache) {
          const timeout = setTimeout(() => {
            ProductsAPI.trackVisit(product.productId).catch((error) => {
              console.error("Failed to track visit: ", error);
            });
          }, 1000);
    
          return () => clearTimeout(timeout);         
        }
      }

    }, [product, fromCache, productId]);
  
    useEffect(() => {
      if (selectedSize && sizes?.length > 0) {
        const selectedSizeData = sizes.find(
          (size) => size.value === selectedSize
        );
        setDisplayPrice(selectedSizeData?.price || basePrice);
      } else {
        setDisplayPrice(basePrice);
      }
    }, [selectedSize, sizes, basePrice]);
  
    
  
  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (isError || !product) {
    return (
      <Error error={error} />
    )
  }


  


  const available = stock > 0;

  const cartItemId = sizes.length > 0 ? `${productId}_${selectedSize}` : productId;
  const inCart = cart.find((item) => item.cartId === cartItemId);
  const maxQuantity =
    sizes.length > 0
      ? sizes.find((s) => s.value === selectedSize)?.stock || stock
      : stock;

  const increase = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      toggleAmount(inCart.cartId, "inc");
    } else {
      setQuantity((prev) => Math.min(prev + 1, maxQuantity));
    }
  };
  const decrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      toggleAmount(inCart.cartId, "dec");
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const size = sizes.find(
      (size) => size.value.toLowerCase() === selectedSize.toLowerCase()
    );

    addToCart(size, quantity, product);
  };

  const renderCartButton = () => {
    if (!available) {
      return (
        <button
          disabled={true}
          className='flex justify-center py-2 items-center gap-4 text-base bg-gray-300 dark:bg-gray-600 text-text rounded-md cursor-not-allowed'
        >
          Out Of Stock
        </button>
      );
    }

    if (inCart) {
      return (
        <AmountButtons
          quantity={inCart.quantity}
          increase={increase}
          decrease={decrease}
        />
      );
    }

    if (sizes.length > 0 && !selectedSize) {
      return (
        <button
          className='flex justify-center py-2 items-center gap-4 text-base bg-gray-300 text-text rounded-md cursor-not-allowed'
          disabled
        >
          <FaCartPlus /> Select Size
        </button>
      );
    }

    return (
      <button
        className='flex justify-center py-2 items-center gap-4 text-base bg-primary-400 dark:bg-primary-300 text-text hover:bg-primary-500 rounded-md cursor-pointer'
        onClick={handleAddToCart}
      >
        <FaCartPlus /> Add To Cart
      </button>
    );
  };




  const getLowestSizePrice = () => {
    if (!sizes || sizes.length === 0) return basePrice;
    return Math.min(...sizes.map((size) => size.price));
  };
  const getHighestSizePrice = () => {
    if (!sizes || sizes.length === 0) return basePrice;
    return Math.max(...sizes.map((size) => size.price));
  };

    const handleWishlistClick = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isAuthenticated) {
        // Redirect to login or show message
        alert("Please login to add items to your wishlist");
        return;
      }

      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    };



  return (
    <main className='bg-background mb-16'>
      <PageHero title={name} product />
      {/* dont remove py-0 */}
      <div className='section py-0 pb-10'>
        <div className=''>
          {/* Product Details */}
          <div className='text-text w-full bg-surface px-5 pb-6'>
            <ProductImages product={product} images={images} />
            <h2 className='capitalize whitespace-normal text-lg tracking-wide text-wrap'>
              {name}
            </h2>
            <p className='text-text'>
              Brand:{" "}
              <span className='text-gray-700 dark:text-gray-300'>{brand}</span>
            </p>
            <div className='text-lg font-medium  text-gray-800 my-2'>
              {sizes?.length > 0 ? (
                <>
                  <span className=''>
                    {!selectedSize ? (
                      <div className='price text-base font-semibold text-primary-600 dark:text-primary-200'>
                        {formatPrice(getLowestSizePrice())}
                        {getHighestSizePrice() > getLowestSizePrice() &&
                          ` - ${formatPrice(getHighestSizePrice())}`}
                      </div>
                    ) : (
                      <span className='price text-base font-semibold text-primary-600 dark:text-primary-200'>
                        {formatPrice(displayPrice)}
                      </span>
                    )}
                  </span>
                  {!selectedSize && (
                    <div className='italic mt-1 text-xs text-gray-500 dark:text-gray-400'>
                      (Price varies by size)
                    </div>
                  )}
                </>
              ) : (
                <span className='price text-base font-semibold text-primary-600 dark:text-primary-200'>
                  {formatPrice(basePrice)}
                </span>
              )}
            </div>
            {stock > 10 ? (
              <p className='text-sm text-gray-700 dark:text-gray-300 my-1'>
                In stock
              </p>
            ) : stock > 3 ? (
              <p className='text-sm text-amber-600'>few units left</p>
            ) : stock > 0 ? (
              <p className='text-sm text-red-500'>{stock} units left!</p>
            ) : (
              <p className='text-sm text-red-500 font-medium my-1'>
                OUT OF STOCK!!!
              </p>
            )}
            <Stars1 stars={rating.average} reviews={rating.reviewsCount} />

            {sizes.length > 0 && (
              <SizeSelector
                sizes={sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />
            )}
          </div>

          {/* Delivery Info */}
          <DeliveryOptions />

          {/* Product Description */}
          <DescSpec specifications={specifications} description={description} />

          {/* Reviews */}
          <div className='bg-surface text-text px-5 pb-10 mb-6'>
            <h5 className='mb-0.5'>Product Rating & Reviews</h5>
            <p className='rate text-sm text-gray-800 dark:text-gray-300 font-light mb-5 mt-2'>
              <span className='border border-primary-400 dark:border-primary-300 tracking-wider  rounded-sm p-1 px-2.5'>
                {rating.average}/5
              </span>{" "}
              ({rating.reviewsCount} ratings)
            </p>
            <hr className='grey border-t border-gray-300' />
            {reviews.length > 0 ? (
              <Reviews reviews={reviews} />
            ) : (
              <h5 className='no-rating text-center text-lg text-text'>
                No Customer Rating
              </h5>
            )}
          </div>

          <div>
            <YouMayLike product={product} />
          </div>

          {/* Fixed Cart Buttons */}
          <div className='fixed bottom-0 bg-surface w-full z-50 h-26 flex items-center justify-center border-t border-primary-400 dark:border-primary-300'>
            <div className='grid grid-cols-[1fr_1fr_6fr] items-center gap-4 px-10 py-4  w-full'>
              <Link
                to='/'
                className='flex justify-center p-4.5  items-center text-text rounded-md text-base border border-primary-400'
              >
                <FaHome />
              </Link>
              <button
                onClick={handleWishlistClick}
                disabled={wishlistIsLoading}
                className={`flex justify-center p-4.5 items-center rounded-md text-text text-base border border-primary-400 ${
                  isInWishlist(productId) ? "text-red-500" : ""
                }`}
                aria-label={
                  isInWishlist(productId)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <FaRegHeart />
              </button>
              {renderCartButton()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleProductPage;
