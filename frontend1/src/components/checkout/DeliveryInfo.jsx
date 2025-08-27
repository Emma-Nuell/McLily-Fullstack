import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Check, Edit3, MapPin, Package, Plus, Truck } from 'lucide-react';

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
    price: 5.0,
    operatingHours: "Mon-Fri: 8AM-4PM",
  },
  {
    id: "mclily-salon",
    name: "McLily Hair Salon",
    address: "34 Beauty Avenue, Ikeja, Lagos",
    price: 3.5,
    operatingHours: "Mon-Sat: 9AM-7PM",
  },
  {
    id: "mclily-house",
    name: "McLily House",
    address: "78 McLily Street, Victoria Island, Lagos",
    price: 2.0,
    operatingHours: "Mon-Sun: 8AM-8PM",
  },
];

const DeliveryInfo = ({ data, onSubmit }) => {
    const [deliveryMethod, setDeliveryMethod] = useState(
      data?.method || "pickup"
    );
    const [selectedStation, setSelectedStation] = useState(
      data?.stationId || ""
    );
    const [selectedAddress, setSelectedAddress] = useState(
      data?.addressId || ""
    );
    const [savedAddresses, setSavedAddresses] = useState(mockSavedAddresses);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
      name: "",
      address: "",
      phone: "",
    });
  
    const handleAddAddress = () => {
      if (newAddress.name && newAddress.address && newAddress.phone) {
        const address = {
          id: Date.now(),
          ...newAddress,
          isDefault: savedAddresses.length === 0,
        };
        setSavedAddresses([...savedAddresses, address]);
        setSelectedAddress(address.id);
        setNewAddress({ name: "", address: "", phone: "" });
        setShowAddressForm(false);
      }
  };
  
    const handleSubmit = () => {
      if (deliveryMethod === "pickup" && !selectedStation) {
        alert("Please select a pickup station");
        return;
      }
      if (deliveryMethod === "delivery" && !selectedAddress) {
        alert("Please select or add a delivery address");
        return;
      }

      const deliveryData = {
        method: deliveryMethod,
        ...(deliveryMethod === "pickup"
          ? {
              stationId: selectedStation,
              station: pickupStations.find((s) => s.id === selectedStation),
            }
          : {
              addressId: selectedAddress,
              address: savedAddresses.find((a) => a.id === selectedAddress),
            }),
      };

      onSubmit(deliveryData);
  };
  
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
      <div className='border-b border-gray-100 p-6'>
        <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-3'>
          <Truck className='h-6 w-6 text-primary-500' />
          Delivery Information
        </h2>
        <p className='text-gray-600 mt-1'>
          Choose how you&apos;d like to receive your order
        </p>
      </div>

      <div className='p-6'>
        {/* Delivery Method Selection */}
        <div className='space-y-4 mb-8'>
          {/* Pickup Station Option */}
          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              deliveryMethod === "pickup"
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setDeliveryMethod("pickup")}
          >
            <div className='flex items-center gap-3'>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  deliveryMethod === "pickup"
                    ? "border-primary-500 bg-primary-500"
                    : "border-gray-300"
                }`}
              >
                {deliveryMethod === "pickup" && (
                  <Check className='h-3 w-3 text-white' />
                )}
              </div>
              <Package className='h-5 w-5 text-primary-600' />
              <div>
                <h3 className='font-semibold text-gray-900'>Pickup Station</h3>
                <p className='text-sm text-gray-600'>
                  Collect your order from one of our pickup locations
                </p>
              </div>
            </div>
          </div>

          {/* Third Party Delivery Option */}
          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              deliveryMethod === "delivery"
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setDeliveryMethod("delivery")}
          >
            <div className='flex items-center gap-3'>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  deliveryMethod === "delivery"
                    ? "border-primary-500 bg-primary-500"
                    : "border-gray-300"
                }`}
              >
                {deliveryMethod === "delivery" && (
                  <Check className='h-3 w-3 text-white' />
                )}
              </div>
              <Truck className='h-5 w-5 text-primary-600' />
              <div>
                <h3 className='font-semibold text-gray-900'>
                  Third Party Delivery
                </h3>
                <p className='text-sm text-gray-600'>
                  Direct delivery to your address
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Station Selection */}
        {deliveryMethod === "pickup" && (
          <div className='mb-8'>
            <h3 className='font-semibold text-gray-900 mb-4'>
              Select Pickup Station
            </h3>
            <div className='space-y-3'>
              {pickupStations.map((station) => (
                <div
                  key={station.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedStation === station.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedStation(station.id)}
                >
                  <div className='flex items-start gap-3'>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        selectedStation === station.id
                          ? "border-primary-500 bg-primary-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedStation === station.id && (
                        <Check className='h-3 w-3 text-white' />
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between items-start mb-2'>
                        <h4 className='font-semibold text-gray-900'>
                          {station.name}
                        </h4>
                        <span className='font-bold text-primary-600'>
                          ${formatCurrency(station.price)}
                        </span>
                      </div>
                      <div className='flex items-center gap-2 text-sm text-gray-600 mb-1'>
                        <MapPin className='h-4 w-4' />
                        <span>{station.address}</span>
                      </div>
                      <p className='text-sm text-gray-500'>
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
          <div className='mb-8'>
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-white text-sm font-bold'>i</span>
                </div>
                <div>
                  <h4 className='font-semibold text-blue-900 mb-1'>
                    Third Party Delivery Service
                  </h4>
                  <p className='text-sm text-blue-800'>
                    McLily uses a third-party delivery service to deliver
                    products to your location. The delivery fee depends solely
                    on the delivery service and will be paid directly to them
                    upon product delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-semibold text-gray-900'>
                Select Delivery Address
              </h3>
              <button
                onClick={() => setShowAddressForm(true)}
                className='text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 text-sm'
              >
                <Plus className='h-4 w-4' />
                Add One Time Address
              </button>
            </div>

            {/* Address Form */}
            {showAddressForm && (
              <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                <h4 className='font-medium text-gray-900 mb-3'>
                  Add New Address
                </h4>
                <div className='space-y-3'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Address Name
                    </label>
                    <input
                      type='text'
                      value={newAddress.name}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, name: e.target.value })
                      }
                      placeholder='e.g., Home, Office'
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
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
                      placeholder='Enter complete address including area, city, and state'
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-20 resize-none'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phone: e.target.value })
                      }
                      placeholder='+234 901 234 5678'
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                    />
                  </div>
                  <div className='flex gap-3 pt-2'>
                    <button
                      onClick={handleAddAddress}
                      className='bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium'
                    >
                      Add Address
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className='border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Addresses */}
            {savedAddresses.length > 0 ? (
              <div className='space-y-3'>
                {savedAddresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className='flex items-start gap-3'>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          selectedAddress === address.id
                            ? "border-primary-500 bg-primary-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedAddress === address.id && (
                          <Check className='h-3 w-3 text-white' />
                        )}
                      </div>
                      <div className='flex-1'>
                        <div className='flex justify-between items-start mb-1'>
                          <h4 className='font-semibold text-gray-900 flex items-center gap-2'>
                            {address.name}
                            {address.isDefault && (
                              <span className='text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded'>
                                Default
                              </span>
                            )}
                          </h4>
                          <button className='text-gray-400 hover:text-gray-600'>
                            <Edit3 className='h-4 w-4' />
                          </button>
                        </div>
                        <p className='text-sm text-gray-600 mb-1'>
                          {address.address}
                        </p>
                        <p className='text-sm text-gray-500'>{address.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8 text-gray-500'>
                <MapPin className='h-12 w-12 mx-auto mb-3 text-gray-300' />
                <p>No saved addresses yet</p>
                <p className='text-sm'>Add an address to continue</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100'>
          <button
            className='flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors'
            onClick={() => window.history.back()}
          >
            Back to Cart
          </button>
          <button
            className='flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-sm'
            onClick={handleSubmit}
          >
            Continue to Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}



DeliveryInfo.propTypes = {
  data: PropTypes.shape({
    method: PropTypes.string,
    stationId: PropTypes.string,
    addressId: PropTypes.string,
  }),
  onSubmit: PropTypes.func
}


export default DeliveryInfo