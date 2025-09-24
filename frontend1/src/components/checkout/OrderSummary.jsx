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
      productName: "Wireless Bluetooth Headphones",
      price: 89.99,
      quantity: 1,
    },
    {
      id: 2,
      productName: "Smartphone Case",
      price: 24.99,
      quantity: 2,
    },
    {
      id: 3,
      productName: "USB-C Cable",
      price: 15.99,
      quantity: 1,
    },
  ];
  const items = cartItems.length > 0 ? cartItems : mockCartItems;

  // Pickup station prices
  const pickupStations = {
    "stella-maris": { name: "Stella Maris Schools", price: 2500 },
    "mclily-salon": { name: "McLily Hair Salon", price: 3700 },
    "mclily-house": { name: "McLily House", price: 1500 },
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

    switch (deliveryMethod) {
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
    <div className="bg-background-white rounded-lg shadow-sm">
      {/* Header */}
      <div className=" p-4 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
          <Calculator
            className="text-primary-600 dark:text-primary-300"
            size={18}
          />
          Order Summary
        </h3>
        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-200   text-sm font-medium"
        >
          {showDetails ? "Close Details" : "View Details"}
        </button>
      </div>

      {showDetails && (
        <div>
          {/* items summary */}
          <div className="p-4 border-b border-primary-300 dark:border-primary-100">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-700 dark:text-gray-400 flex text-sm items-center gap-2">
                <ShoppingCart className="" size={20} />
                Items ({items.length})
              </span>
            </div>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex-1">
                    <span className="text-gray-900 dark:text-gray-200">
                      {item.productName}
                    </span>
                    <span className="text-gray-500 ml-2">×{item.quantity}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-200">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Cost Breakdown */}
          <div className="p-4">
            <div className="space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal:
                </span>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {/* Delivery */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {deliveryMethod?.method === "pickup" ? (
                    <Package
                      className=" text-primary-600 dark:text-primary-300"
                      size={18}
                    />
                  ) : (
                    <Truck
                      className="text-primary-600 dark:text-primary-300"
                      size={16}
                    />
                  )}
                  <span className="text-gray-600 dark:text-gray-400">
                    {deliveryMethod?.method === "pickup"
                      ? "Pickup Fee:"
                      : "Delivery:"}
                  </span>
                </div>
                <div className="text-right">
                  {deliveryInfo.cost !== null ? (
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      {formatCurrency(deliveryInfo.cost)}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      {deliveryInfo.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery Method Description */}
              {deliveryMethod && (
                <div className="text-xs text-gray-500 pl-6">
                  {deliveryInfo.description}
                </div>
              )}

              {/* Third Party Delivery Notice */}
              {deliveryMethod?.method === "delivery" && (
                <div className="bg-blue-50 dark:bg-blue-600/30 border border-blue-200 dark:border-blue-800  rounded p-2 text-xs text-blue-800 dark:text-blue-400">
                  <strong>Note:</strong> Delivery fee will be paid directly to
                  the delivery service
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-primary-300 dark:border-primary-100 pt-3">
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    Total:
                  </span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary-600 dark:text-primary-300">
                      {formatCurrency(total)}
                    </div>
                    {deliveryInfo.cost === null &&
                      deliveryMethod?.method === "delivery" && (
                        <div className="text-xs text-gray-500">
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
