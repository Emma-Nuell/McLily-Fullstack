import React from "react";
import PropTypes from "prop-types";
import { statesAndCities } from "../../utils/constants";
import { useState } from "react";
import { useEffect } from "react";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddressForm = ({ mode = "add", existingAddress = null }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
    state: "",
    city: "",
    address: "",
    additionalInfo: "",
    isDefault: false,
  });

  useEffect(() => {
    if (mode === "edit" && existingAddress) {
      // Parse phone numbers to separate country code and number
      const parsePhoneNumber = (fullPhone) => {
        if (!fullPhone) return { code: "+234", number: "" };
        const match = fullPhone.match(/^(\+\d+)(.+)$/);
        return match
          ? { code: match[1], number: match[2] }
          : { code: "+234", number: fullPhone };
      };

      const primaryPhone = parsePhoneNumber(existingAddress.phoneNo);
      const additionalPhone = parsePhoneNumber(
        existingAddress.additionalPhoneNo
      );

      setFormData({
        firstName:
          existingAddress.firstName ||
          existingAddress.name?.split(" ")[0] ||
          "",
        lastName:
          existingAddress.lastName ||
          existingAddress.name?.split(" ").slice(1).join(" ") ||
          "",
        phoneNumber: primaryPhone.number,
        additionalPhoneNumber: additionalPhone.number,
        state: existingAddress.state || "",
        city: existingAddress.city || "",
        address: existingAddress.street || "",
        additionalInfo: existingAddress.additionalInfo || "",
        isDefault: existingAddress.isDefault || false,
      });

      setCountryCode(primaryPhone.code);
      if (additionalPhone.number) {
        setAdditionalCountryCode(additionalPhone.code);
      }
    }
  }, [mode, existingAddress]);

  const [countryCode, setCountryCode] = useState("+234");
  const [additionalCountryCode, setAdditionalCountryCode] = useState("+234");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Reset city when state changes
    if (field === "state") {
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
    }
  };

  const validateForm = () => {
    const required = ["firstName", "phoneNumber", "state", "city", "address"];
    const missingFields = required.filter((field) => !formData[field].trim());

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const addressData = {
      ...formData,
      //   id: mode === "edit" ? existingAddress?.id : Date.now(), // Use existing ID or generate new one
      street: formData.address,
      phoneNo: `${countryCode}${formData.phoneNumber}`,
      additionalPhoneNo: formData.additionalPhoneNumber
        ? `${additionalCountryCode}${formData.additionalPhoneNumber}`
        : "",
    };

    if (mode === "edit") {
      console.log("Address updated:", addressData);
      alert("Address updated successfully!");
    } else {
      console.log("Address saved:", addressData);
      alert("Address saved successfully!");
    }

    // Here you would typically call an API or update parent component state
    // onSave?.(addressData);
  };

  const getCurrentCities = () => {
    return formData.state ? statesAndCities[formData.state] || [] : [];
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className='min-h-screen bg-white dark:bg-background-white'>
      {/* Header */}
      <div className='bg-background-white shadow-md border-b border-primary-300 dark:border-primary-100 text-text px-4 py-7 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <ArrowLeft
            onClick={handleBack}
            className='cursor-pointer hover:text-primary-400 transition-colors'
            size={20}
          />
          <h1 className='text-lg font-medium'>
            {mode === "edit" ? "Edit address" : "Add new address"}
          </h1>
        </div>
      </div>

      <div className='px-4 py-6 space-y-6'>
        {/* First Name - Required */}
        <div>
          <label className='dark:text-gray-200 text-gray-900 text-sm block mb-2'>
            First Name <span className='text-red-600 dark:text-red-800'>*</span>
          </label>
          <input
            type='text'
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className=' dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent'
            placeholder='Enter first name'
          />
        </div>

        {/* Last Name */}
        <div>
          <label className='dark:text-gray-200 text-gray-900 text-sm block mb-2'>
            Last Name <span className='text-red-600 dark:text-red-800'>*</span>
          </label>
          <input
            type='text'
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className='dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent'
            placeholder='Enter last name'
          />
        </div>

        {/* Phone Number - Required */}
        <div>
          <label className='dark:text-gray-200 text-gray-900 text-sm block mb-2'>
            Phone Number{" "}
            <span className='text-red-600 dark:text-red-800'>*</span>
          </label>
          <div className='flex space-x-3'>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className='dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent appearance-none cursor-pointer min-w-[80px]'
            >
              <option value='+234'>+234</option>
              <option value='+1'>+1</option>
              <option value='+44'>+44</option>
              <option value='+33'>+33</option>
            </select>
            <input
              type='tel'
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className='flex-1 dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent'
              placeholder='Enter phone number'
            />
          </div>
        </div>

        {/* Additional Phone Number */}
        <div>
          <label className='dark:text-gray-200 text-gray-900 text-sm block mb-2'>
            Additional Phone Number
          </label>
          <div className='flex space-x-3'>
            <select
              value={additionalCountryCode}
              onChange={(e) => setAdditionalCountryCode(e.target.value)}
              className='dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent appearance-none cursor-pointer min-w-[80px]'
            >
              <option value='+234'>+234</option>
              <option value='+1'>+1</option>
              <option value='+44'>+44</option>
              <option value='+33'>+33</option>
            </select>
            <input
              type='tel'
              value={formData.additionalPhoneNumber}
              onChange={(e) =>
                handleInputChange("additionalPhoneNumber", e.target.value)
              }
              className='flex-1 dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent'
              placeholder='Additional Phone Number'
            />
          </div>
        </div>

        {/* State - Required */}
        <div>
          <label className='dark:text-gray-200 text-gray-900 text-sm block mb-2'>
            State <span className='text-red-600 dark:text-red-800'>*</span>
          </label>
          <div className='relative'>
            <select
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className='dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent appearance-none cursor-pointer'
            >
              <option value='' className='bg-surface'>
                Select State
              </option>
              {Object.keys(statesAndCities).map((state) => (
                <option key={state} value={state} className='bg-surface'>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
              size={18}
            />
          </div>
        </div>

        {/* City - Required */}
        <div>
          <label className='dark:text-gray-200 text-gray-900 text-sm block mb-2'>
            City <span className='text-red-600 dark:text-red-800'>*</span>
          </label>
          <div className='relative'>
            <select
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              disabled={!formData.state}
              className='dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <option value='' className='bg-surface'>
                Select City
              </option>
              {getCurrentCities().map((city) => (
                <option key={city} value={city} className='bg-surface'>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
              size={18}
            />
          </div>
        </div>

        {/* Address - Required */}
        <div>
          <label className='dark:text-gray-200 text-gray-900 text-sm block mb-2'>
            Address <span className='text-red-600 dark:text-red-800'>*</span>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className='dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent resize-none h-22 scrollbar-hidden'
            placeholder='Enter your full address'
          />
        </div>

        {/* Additional Information */}
        <div>
          <label className='dark:text-gray-200 text-gray-900 text-sm block mb-2'>
            Additional information
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) =>
              handleInputChange("additionalInfo", e.target.value)
            }
            className='dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent resize-none h-22 scrollbar-hidden'
            placeholder='Any additional delivery instructions'
          />
        </div>

        {/* Set as Default Address */}
        <div className='flex items-center space-x-3 pt-4'>
          <label className=' relative cursor-pointer'>
            <input
              type='checkbox'
              id='default-address'
              checked={formData.isDefault}
              onChange={(e) => handleInputChange("isDefault", e.target.checked)}
              className='sr-only peer'
            />
            <div className='w-22 h-12 bg-gray-300 peer-checked:bg-primary-300 rounded-full transition-all duration-300'></div>
            <div className='absolute left-2 top-2 w-8 h-8 bg-white rounded-full peer-checked:translate-x-10 transition-transform duration-300'></div>
          </label>
          <label
            htmlFor='default-address'
            className='dark:text-gray-200 text-gray-900 text-sm cursor-pointer'
          >
            Set as Default Address
          </label>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className='w-full bg-gradient-to-r from-primary-400 dark:from-primary-200 to-primary-400 dark:to-primary-200 hover:from-primary-600 dark:hover:from-primary-300 hover:to-primary-700 dark:hover:to-primary-400  text-white font-medium py-4 rounded-lg transition-all duration-200 transform  active:scale-95 shadow-lg mt-8'
        >
          {mode === "edit" ? "Update Address" : "Save"}
        </button>
      </div>
    </div>
  );
};

AddressForm.propTypes = {
  mode: PropTypes.oneOf(["add", "edit"]),
  existingAddress: PropTypes.shape({}),
};

export default AddressForm;
