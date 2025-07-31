import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft, Edit, MapPin, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([
    {
      _id: 1,
      firstName: "Mcpaul",
      lastName: "Okoye",
      street:
        "Plot B32 valencia garden estate behind suunyvale estate dakwo district",
      state: "Federal Capital Territory",
      city: "ABUJA- APO CENTRAL",
      phoneNo: "+2348083577046",
      isDefault: true,
    },
    {
      _id: 2,
      firstName: "Mcpaul",
      lastName: "Okoye",
      street: "Afe babalola university abuad hostel 1",
      state: "Ekiti",
      city: "Afebabalola",
      phoneNo: "+2348083577046",
      isDefault: false,
    },
    {
      _id: 3,
      firstName: "Ijeoma",
      lastName: "Aneke",
      street: "Plot 10 block 27 road 9 isheri-north G.R.A????",
      state: "Lagos",
      city: "ISHERI MAGODO",
      phoneNo: "+234901992921",
      isDefault: false,
    },
    {
      _id: 4,
      firstName: "Mcpaul",
      lastName: "Okoye",
      street:
        "Plot B32 valencia garden estate dakwo district behind sunnyvale estate",
      state: "Federal Capital Territory",
      city: "ABUJA- APO CENTRAL",
      phoneNo: "+234905176056",
      isDefault: false,
    },
  ]);

  const handleSetDefault = (addressId) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr._id === addressId,
      }))
    );
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
    }
  };

  const handleEditAddress = (addressId) => {
    console.log("Edit address:", addressId);
    // Navigate to edit address page
    alert(`Edit address with ID: ${addressId}`);
  };

  const handleAddNewAddress = () => {
    console.log("Add new address");
    // Navigate to add new address page
    alert("Navigate to Add New Address page");
  };

   const navigate = useNavigate();
  
    const handleBack = () => {
      navigate(-1);
    };

  const EmptyAddressBook = () => (
    <div className='flex flex-col items-center justify-center py-16 px-8'>
      <div className='w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6'>
        <MapPin className=' text-gray-500' size={32} />
      </div>
      <h3 className='text-text text-xl font-medium mb-3'>
        No Addresses Added
      </h3>
      <p className='dark:text-gray-400 text-gray-600 text-center text-sm mb-8 leading-relaxed'>
        You havent added any delivery addresses yet. Add your first address to
        get started with faster checkout.
      </p>
      <button
        onClick={handleAddNewAddress}
        className='bg-gradient-to-r from-primary-400 dark:from-primary-200 to-primary-500 dark:to-primary-300 hover:from-primary-600 dark:hover:from-primary-300 hover:to-primary-700 dark:hover:to-primary-400 text-text px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center space-x-2'
      >
        <Plus size={20} />
        <span>Add Your First Address</span>
      </button>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-surface'>
      {/* Header */}
      <div className='bg-background-white shadow-lg border-primary-300 dark:border-primary-100 text-text px-4 py-7 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <ArrowLeft
            onClick={handleBack}
            className='cursor-pointer hover:text-primary-400 transition-colors'
            size={20}
          />
          <h1 className='text-lg font-medium'>
            Address book ({addresses.length})
          </h1>
        </div>
      </div>

      <div className='pb-20'>
        {addresses.length === 0 ? (
          <EmptyAddressBook />
        ) : (
          <div className='px-4 py-4 space-y-4 mb-20'>
            {addresses.map((address) => (
              <div
                key={address._id}
                className='bg-background-white rounded-lg p-4 pb-2 shadow-md text-text border-primary-300 dark:border-primary-100 border'
              >
                {/* Address Header */}
                <div className='flex justify-between items-start mb-3'>
                  <div className='flex-1'>
                    <div className='flex items-center justify-start gap-3'>
                      <span className='font-medium text-lg'>
                        {address.firstName}
                      </span>
                      <span className='font-medium text-lg'>
                        {address.lastName}
                      </span>
                    </div>
                    <p className='text-gray-700 dark:text-gray-300 text-sm mt-1 leading-relaxed'>
                      {address.street}
                    </p>
                    <p className='text-gray-700 dark:text-gray-300 text-sm'>
                      {address.state}
                    </p>
                    <p className='text-gray-700 dark:text-gray-300 text-sm'>
                      {address.city}
                    </p>
                    <p className='text-gray-700 dark:text-gray-300 text-sm mt-2'>
                      {address.phoneNo}
                    </p>
                  </div>
                </div>

                {/* Default Address Badge */}
                {address.isDefault && (
                  <div className='flex items-center space-x-2 mb-3'>
                    <div className='w-5 h-5 bg-green-500 rounded-full'></div>
                    <span className='text-green-500 dark:text-green-600 text-sm font-medium'>
                      Default Address
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className='flex items-center justify-between py-5 border-t border-primary-300 dark:border-primary-100'>
                  <button
                    onClick={() => handleSetDefault(address._id)}
                    disabled={address.isDefault}
                    className={`text-sm font-medium transition-colors ${
                      address.isDefault
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-primary-600 dark:text-primary-300 hover:text-primary-500 hover:dark:text-primary-200"
                    }`}
                  >
                    {address.isDefault ? "Default Address" : "Set As Default"}
                  </button>

                  <div className='flex items-center space-x-4'>
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className='text-primary-600 dark:text-primary-300 hover:text-primary-500 hover:dark:text-primary-200 transition-colors'
                    >
                      <Trash2 className='' size={18} />
                    </button>
                    <button
                      onClick={() => handleEditAddress(address._id)}
                      className='text-primary-600 dark:text-primary-300 hover:text-primary-500 hover:dark:text-primary-200 transition-colors'
                    >
                      <Edit className='' size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Add New Address Button */}
      {addresses.length > 0 && (
        <div className='fixed bottom-0 left-0 right-0 p-4 bg-background-white'>
          <button
            onClick={handleAddNewAddress}
            className='w-full bg-gradient-to-r from-primary-400 dark:from-primary-200 to-primary-400 dark:to-primary-200 hover:from-primary-600 dark:hover:from-primary-300 hover:to-primary-700 dark:hover:to-primary-400  text-white font-medium py-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg'
          >
            Add New Address
          </button>
        </div>
      )}
    </div>
  );
};

AddressPage.propTypes = {};

export default AddressPage;
