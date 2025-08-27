import React, { useState } from "react";
import PropTypes from "prop-types";
import { Calculator, Package, ShoppingCart, Truck } from "lucide-react";

const OrderSummary = ({
  cartItems = [],
  deliveryMethod = null,
  selectedStation = null,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const mockCartItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Smartphone Case",
      price: 24.99,
      quantity: 2,
    },
    {
      id: 3,
      name: "USB-C Cable",
      price: 15.99,
      quantity: 1,
    },
  ];
  const items = cartItems.length > 0 ? cartItems : mockCartItems;

  // Pickup station prices
  const pickupStations = {
    "stella-maris": { name: "Stella Maris Schools", price: 5.0 },
    "mclily-salon": { name: "McLily Hair Salon", price: 3.5 },
    "mclily-house": { name: "McLily House", price: 2.0 },
  };

  // Calculate subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate delivery cost based on delivery method
  const getDeliveryInfo = () => {
    if (!deliveryMethod) {
      return { cost: null, description: "To be determined" };
    }

    switch (deliveryMethod.method) {
      case "pickup":
        if (selectedStation && pickupStations[selectedStation]) {
          const station = pickupStations[selectedStation];
          return {
            cost: station.price,
            description: `Pickup at ${station.name}`,
          };
        }
        return { cost: null, description: "Select pickup station" };

      case "delivery":
        return {
          cost: null,
          description: "Paid to delivery service",
        };

      default:
        return { cost: null, description: "To be determined" };
    }
  };

  const deliveryInfo = getDeliveryInfo();
  const total = subtotal + (deliveryInfo.cost || 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
      {/* Header */}
      <div className='border-b border-gray-100 p-4 flex justify-between items-center'>
        <h3 className='font-semibold text-gray-900 flex items-center gap-2'>
          <Calculator className='h-5 w-5 text-primary-500' />
          Order Summary
        </h3>
        <button
          onClick={(prev) => setShowDetails(!prev)}
          className='text-primary-600 hover:text-primary-700 text-sm font-medium'
        >
          {showDetails ? "View Details" : "Close Details"}
        </button>
      </div>

      {showDetails && (
        <div>
          {/* items summary */}
          <div className='p-4 border-b border-gray-100'>
            <div className='flex items-center justify-between mb-3'>
              <span className='font-medium text-gray-700 flex items-center gap-2'>
                <ShoppingCart className='h-4 w-4' />
                Items ({items.length})
              </span>
            </div>
            <div className='space-y-2'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='flex justify-between items-center text-sm'
                >
                  <div className='flex-1'>
                    <span className='text-gray-900'>{item.name}</span>
                    <span className='text-gray-500 ml-2'>×{item.quantity}</span>
                  </div>
                  <span className='font-medium text-gray-900'>
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Cost Breakdown */}
          <div className='p-4'>
            <div className='space-y-3'>
              {/* Subtotal */}
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>Subtotal:</span>
                <span className='font-medium'>{formatCurrency(subtotal)}</span>
              </div>

              {/* Delivery */}
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  {deliveryMethod?.method === "pickup" ? (
                    <Package className='h-4 w-4 text-primary-500' />
                  ) : (
                    <Truck className='h-4 w-4 text-primary-500' />
                  )}
                  <span className='text-gray-600'>
                    {deliveryMethod?.method === "pickup"
                      ? "Pickup Fee:"
                      : "Delivery:"}
                  </span>
                </div>
                <div className='text-right'>
                  {deliveryInfo.cost !== null ? (
                    <span className='font-medium'>
                      {formatCurrency(deliveryInfo.cost)}
                    </span>
                  ) : (
                    <span className='text-gray-500 text-sm'>
                      {deliveryInfo.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery Method Description */}
              {deliveryMethod && (
                <div className='text-xs text-gray-500 pl-6'>
                  {deliveryInfo.description}
                </div>
              )}

              {/* Third Party Delivery Notice */}
              {deliveryMethod?.method === "delivery" && (
                <div className='bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-800'>
                  <strong>Note:</strong> Delivery fee will be paid directly to
                  the delivery service
                </div>
              )}

              {/* Divider */}
              <div className='border-t border-gray-200 pt-3'>
                {/* Total */}
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-semibold text-gray-900'>
                    Total:
                  </span>
                  <div className='text-right'>
                    <div className='text-xl font-bold text-primary-600'>
                      {formatCurrency(total)}
                    </div>
                    {deliveryInfo.cost === null &&
                      deliveryMethod?.method === "delivery" && (
                        <div className='text-xs text-gray-500'>
                          + delivery fee
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

OrderSummary.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({})),
  deliveryMethod: PropTypes.string,
  selectedStation: PropTypes.string,
};

export default OrderSummary;
