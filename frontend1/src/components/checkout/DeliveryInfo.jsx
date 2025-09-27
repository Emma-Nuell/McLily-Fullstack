import React, { useState } from "react";
import PropTypes from "prop-types";
import { Check, Edit3, MapPin, Package, Plus, Truck } from "lucide-react";
import { useUserProfileContext } from "../../context";
import { useToast } from "../../context/Modal/useModal&Toast";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const mockSavedAddresses = [
  {
    id: 1,
    name: "Home",
    address: "123 Main Street, Victoria Island, Lagos",
    phone: "+234 901 234 5678",
    isDefault: true,
  },
  {
    id: 2,
    name: "Office",
    address: "45 Admiralty Way, Lekki Phase 1, Lagos",
    phone: "+234 901 234 5679",
    isDefault: false,
  },
];

const pickupStations = [
  {
    id: "stella-maris",
    name: "Stella Maris Schools",
    address: "12 Stella Maris Road, Abuja",
    price: 2500,
    operatingHours: "Mon-Fri: 8AM-4PM",
  },
  {
    id: "mclily-salon",
    name: "McLily Hair Salon",
    address: "34 Beauty Avenue, Ikeja, Lagos",
    price: 3700,
    operatingHours: "Mon-Sat: 9AM-7PM",
  },
  {
    id: "mclily-house",
    name: "McLily House",
    address: "78 McLily Street, Victoria Island, Lagos",
    price: 1500,
    operatingHours: "Mon-Sun: 8AM-8PM",
  },
  {
    id: "abuad",
    name: "Afe Babalola University",
    address: "Afe Babalola University, Ado-Ekiti, Ekiti state",
    price: 4000,
    operatingHours: "2ND and 4TH week Saturdays: 2PM-5PM",
  },
];

const DeliveryInfo = ({
  data,
  onProceed,
  setDeliveryMethod,
  deliveryMethod,
  setFormData,
  onBack,
}) => {
  const { addresses } = useUserProfileContext();
  const { showToast, TOAST_TYPES } = useToast();
const navigate = useNavigate()
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState(data.phoneNo || "")
   const {  updateProfile, isUpdatingProfile } =
      useUserProfileContext();
  // const [showAddressForm, setShowAddressForm] = useState(false);

const pickupDefault = {
  street: "Pickup",
  city: 'Pickup',
  state: "FCT",
  country: "Nigeria"
};

     const handlePhoneSubmit = async (e) => {
       e.preventDefault();

       try {
         await updateProfile({
           phoneNo: phoneNo.trim(),
         });

         showToast("Profile updated successfully", TOAST_TYPES.SUCCESS);
       } catch (error) {
         console.error("Error updating profile:", error);
         showToast("Error updating profile", TOAST_TYPES.ERROR);
       }
     };


  const handleSubmit = () => {
    if (!deliveryMethod) {
      showToast("Please select a delivery method", TOAST_TYPES.WARNING);
      return;
    }
    if (deliveryMethod === "pickup" && !selectedStation) {
      showToast("Please select a pickup station", TOAST_TYPES.WARNING);

      return;
    }
    if (deliveryMethod === "delivery" && !selectedAddress) {
      showToast("Please select or add a delivery address", TOAST_TYPES.WARNING);
      return;
    }

    if (deliveryMethod === "pickup" && selectedStation) {
      setFormData((prev) => ({
        ...prev,
        customerDetails: {
          ...prev.customerDetails,
          address: pickupDefault,
        },
        pickupStation: selectedStation.id,
        pickupAddress: selectedStation.address,
        deliveryMethod: "pickup",
        shippingFee: selectedStation.price,
      }));
    }

    if (deliveryMethod === "delivery" && selectedAddress) {
  setFormData((prev) => ({
    ...prev,
   customerDetails: {
    ...prev.customerDetails,
    address: selectedAddress,
   },
   deliveryMethod: "delivery",
  }));
    }

  

    onProceed();
  };

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
      <div className="border-b border-primary-300 dark:border-primary-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 flex items-center gap-3">
          <Truck className="text-primary-600 dark:text-primary-300" size={22} />
          Delivery Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Choose how you&apos;d like to receive your order
        </p>
      </div>

      <div className="p-6">
        {/* Delivery Method Selection */}
        <div className="space-y-4 mb-8">
          {/* Pickup Station Option */}
          <div
            className={`border-1 rounded-lg p-4 cursor-pointer transition-colors ${
              deliveryMethod === "pickup"
                ? "border-primary-300 dark:border-primary-100 bg-primary-50 dark:bg-primary-100/20"
                : "border-gray-200 dark:border-gray-500 hover:border-gray-300"
            }`}
            onClick={() => setDeliveryMethod("pickup")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full border-1 flex items-center justify-center ${
                  deliveryMethod === "pickup"
                    ? "border-primary-300 dark:border-primary-100 bg-primary-500"
                    : "border-gray-300 dark:border-gray-500"
                }`}
              >
                {deliveryMethod === "pickup" && (
                  <Check className="text-white" size={18} />
                )}
              </div>
              <Package
                className="text-primary-600 dark:text-primary-300"
                size={22}
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                  Pickup Station
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-500">
                  Collect your order from one of our pickup locations
                </p>
              </div>
            </div>
          </div>

          {/* Third Party Delivery Option */}
          <div
            className={`border-1 rounded-lg p-4 cursor-pointer transition-colors ${
              deliveryMethod === "delivery"
                ? "border-primary-300 dark:border-primary-100 bg-primary-50 dark:bg-primary-100/20"
                : "border-gray-200 dark:border-gray-500 hover:border-gray-300"
            }`}
            onClick={() => setDeliveryMethod("delivery")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full border-1 flex items-center justify-center ${
                  deliveryMethod === "delivery"
                    ? "border-primary-300 dark:border-primary-100 bg-primary-500"
                    : "border-gray-300 dark:border-gray-500"
                }`}
              >
                {deliveryMethod === "delivery" && (
                  <Check className="text-white" size={18} />
                )}
              </div>
              <Truck
                className="text-primary-600 dark:text-primary-300"
                size={20}
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                  Third Party Delivery
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-500">
                  Direct delivery to your address
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Station Selection */}
        {deliveryMethod === "pickup" && (
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4">
              Select Pickup Station
            </h3>
            <div className="space-y-3">
              {pickupStations.map((station) => (
                <div
                  key={station.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedStation === station
                      ? "border-primary-300 dark:border-primary-100 bg-primary-50 dark:bg-primary-100/20"
                      : "border-gray-200 dark:border-gray-500 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedStation(station)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full border-1 flex items-center justify-center mt-0.5 ${
                        selectedStation === station
                          ? "border-primary-300 dark:border-primary-100 bg-primary-500"
                          : "border-gray-300 dark:border-gray-500"
                      }`}
                    >
                      {selectedStation === station && (
                        <Check className="text-white" size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-200">
                          {station.name}
                        </h4>
                        <span className="font-semibold text-primary-600 dark:text-primary-300">
                          {formatCurrency(station.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <MapPin className="" size={14} />
                        <span>{station.address}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {station.operatingHours}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Third Party Delivery Selection */}
        {deliveryMethod === "delivery" && (
          <div className="mb-8">
            <div className="bg-blue-50 dark:bg-blue-600/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-blue-500 text-blue-900 mb-1">
                    Third Party Delivery Service
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    McLily uses a third-party delivery service to deliver
                    products to your location. The delivery fee depends solely
                    on the delivery service and will be paid directly to them
                    upon product delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between  items-center mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                Select Delivery Address
              </h3>
              <button
                onClick={() => navigate("/profile/addresses/new")}
                className="text-primary-600 dark:text-primary-300 hover:text-primary-700 font-medium flex items-center justify-end text-sm"
              >
                <Plus className="" size={20} />
                Add New Address
              </button>
            </div>

            {/* Address Form */}
            {/* {showAddressForm && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Add New Address
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Name
                    </label>
                    <input
                      type="text"
                      value={newAddress.name}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, name: e.target.value })
                      }
                      placeholder="e.g., Home, Office"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address
                    </label>
                    <textarea
                      value={newAddress.address}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          address: e.target.value,
                        })
                      }
                      placeholder="Enter complete address including area, city, and state"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phone: e.target.value })
                      }
                      placeholder="+234 901 234 5678"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleAddAddress}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Add Address
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )} */}

            {/* Saved Addresses */}
            {addresses.length > 0 ? (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAddress === address
                        ? "border-primary-300 dark:border-primary-100 bg-primary-50 dark:bg-primary-100/20"
                        : "border-gray-200 dark:border-gray-500 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full border-1 flex items-center justify-center mt-0.5 ${
                          selectedAddress === address
                            ? "border-primary-300 dark:border-primary-100 bg-primary-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                      >
                        {selectedAddress === address && (
                          <Check className=" text-white" size={18} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                            {address.addressName}
                            {address.isDefault && (
                              <span className="text-xs ml-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                          {address.street}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                          {address.city}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                          {address.state}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {address.phoneNo}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-900 dark:text-gray-200">
                <MapPin
                  className="mx-auto mb-3 text-gray-400 dark:text-gray-500"
                  size={26}
                />
                <p>No saved addresses yet</p>
                <p className="text-sm">Add an address to continue</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-primary-300 dark:border-primary-100">
          {!data.phoneNo && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4">
                Please enter a phone number for your account
              </h3>
              <div className="space-y-4">
                <input
                  type="tel"
                  inputMode="tel"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-3 text-text py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-0 focus:border-transparent"
                />
                <button
                  onClick={handlePhoneSubmit}
                  disabled={isUpdatingProfile}
                  className="px-4 py-2 dark:bg-primary-300 bg-primary-500 dark:text-text text-gray-900 text-sm font-medium rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors"
                >
                  {isUpdatingProfile ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
          )}
          <button
            className="flex-1 border border-gray-300 text-gray-700 dark:text-gray-500 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
            onClick={() => onBack()}
          >
            Back to Cart
          </button>
          <button
            className="flex-1 bg-primary-500 dark:bg-primary-300 hover:bg-primary-600 dark:hover:bg-primary-200 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
            onClick={handleSubmit}
          >
            Continue to Payment Method
          </button>
        </div>
      </div>
    </div>
  );
};

DeliveryInfo.propTypes = {
  data: PropTypes.shape({
      phoneNo: PropTypes.string
    }),
  onProceed: PropTypes.func,
  deliveryMethod: PropTypes.string,
  setDeliveryMethod: PropTypes.func,
  setFormData: PropTypes.func,
  onBack: PropTypes.func,
  formData: PropTypes.shape({})
};

export default DeliveryInfo;
