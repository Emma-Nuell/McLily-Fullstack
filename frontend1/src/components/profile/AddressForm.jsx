import React from "react";
import PropTypes from "prop-types";
import { statesAndCities } from "../../utils/constants";
import { useState } from "react";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserProfileContext } from "../../context";
import { useToast } from "../../context/Modal/useModal&Toast";

const AddressForm = () => {
    const { addAddress, updateAddress, isAddingAddress, isUpdatingAddress } =
      useUserProfileContext();
      const location = useLocation()
      const {editingAddress: address, isEditing} = location.state || {}
        const {showToast, TOAST_TYPES} = useToast()

        
      

  const [formData, setFormData] = useState({
    addressName: address?.addressName || "Home",
    firstName: address?.firstName || "",
    lastName: address?.lastName || "",
    phoneNo: address?.phoneNo || "",
    additionalPhoneNo: address?.additionalPhoneNo || null,
    street: address?.street || "",
    city: address?.city || "",
    state: address?.state || "",
    country: address?.country || "Nigeria",
    additionalInfo: address?.additionalInfo || "",
    isDefault: address?.isDefault || false,
  });

  const [errors, setErrors] = useState({});

   const handleSubmit = async (e) => {
     e.preventDefault();

     const newErrors = {};
     const requiredFields = [
       "firstName",
       "lastName",
       "phoneNo",
       "street",
       "city",
       "state",
     ];

     requiredFields.forEach((field) => {
       if (!formData[field].trim()) {
         newErrors[field] = `${
           field.charAt(0).toUpperCase() + field.slice(1)
         } is required`;
       }
     });

     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }

     try {
       if (isEditing) {
         await updateAddress({ addressId: address._id, ...formData });
          navigate(-1);
       } else {
         await addAddress(formData);
         showToast("Address saved successfully", TOAST_TYPES.SUCCESS);
         navigate(-1)
       }

       setErrors({});

     } catch (error) {
       console.error("Error saving address:", error);
         showToast("Error saving profile", TOAST_TYPES.ERROR);

     }
   };


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



  const getCurrentCities = () => {
    return formData.state ? statesAndCities[formData.state] || [] : [];
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen bg-white dark:bg-background-white">
      {/* Header */}
      <div className="bg-background-white shadow-md border-b border-primary-300 dark:border-primary-100 text-text px-4 py-7 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ArrowLeft
            onClick={handleBack}
            className="cursor-pointer hover:text-primary-400 transition-colors"
            size={20}
          />
          <h1 className="text-lg font-medium">
            {isEditing ? "Edit Address" : "Add New Address"}
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* address name */}
        <div>
          <label
            htmlFor="addressName"
            className="dark:text-gray-200 text-gray-900 text-sm block mb-2"
          >
            Address Name
          </label>
          <select
            id="addressName"
            value={formData.addressName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, addressName: e.target.value }))
            }
            className="dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent appearance-none cursor-pointer"
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* First Name - Required */}
        <div>
          <label className="dark:text-gray-200 text-gray-900 text-sm block mb-2">
            First Name <span className="text-red-600 dark:text-red-800">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className=" dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent"
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="dark:text-gray-200 text-gray-900 text-sm block mb-2">
            Last Name <span className="text-red-600 dark:text-red-800">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent"
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Phone Number - Required */}
        <div>
          <label className="dark:text-gray-200 text-gray-900 text-sm block mb-2">
            Phone Number{" "}
            <span className="text-red-600 dark:text-red-800">*</span>
          </label>
          <div className="flex space-x-3">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent appearance-none cursor-pointer min-w-[80px]"
            >
              <option value="+234">+234</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+33">+33</option>
            </select>
            <input
              type="tel"
              value={formData.phoneNo}
              onChange={(e) => handleInputChange("phoneNo", e.target.value)}
              className="flex-1 dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent"
              placeholder="Enter phone number"
            />
            {errors.phoneNo && (
              <p className="text-red-600 text-sm mt-1">{errors.phoneNo}</p>
            )}
          </div>
        </div>

        {/* Additional Phone Number */}
        <div>
          <label className="dark:text-gray-200 text-gray-900 text-sm block mb-2">
            Additional Phone Number
          </label>
          <div className="flex space-x-3">
            <select
              value={additionalCountryCode}
              onChange={(e) => setAdditionalCountryCode(e.target.value)}
              className="dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent appearance-none cursor-pointer min-w-[80px]"
            >
              <option value="+234">+234</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+33">+33</option>
            </select>
            <input
              type="tel"
              value={formData.additionalPhoneNo ?? ""}
              onChange={(e) =>
                handleInputChange("additionalPhoneNo", e.target.value)
              }
              className="flex-1 dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent"
              placeholder="Additional Phone Number"
            />
          </div>
        </div>

        {/* State - Required */}
        <div>
          <label className="dark:text-gray-200 text-gray-900 text-sm block mb-2">
            State <span className="text-red-600 dark:text-red-800">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="" className="bg-surface">
                Select State
              </option>
              {Object.keys(statesAndCities).map((state) => (
                <option key={state} value={state} className="bg-surface">
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>
          {errors.phoneNo && (
            <p className="text-red-600 text-sm mt-1">{errors.phoneNo}</p>
          )}
        </div>

        {/* City - Required */}
        <div>
          <label className="dark:text-gray-200 text-gray-900 text-sm block mb-2">
            City <span className="text-red-600 dark:text-red-800">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              disabled={!formData.state}
              className="dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-surface">
                Select City
              </option>
              {getCurrentCities().map((city) => (
                <option key={city} value={city} className="bg-surface">
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>
          {errors.city && (
            <p className="text-red-600 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* Address - Required */}
        <div>
          <label className="dark:text-gray-200 text-gray-900 text-sm block mb-2">
            Street Address{" "}
            <span className="text-red-600 dark:text-red-800">*</span>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange("street", e.target.value)}
            className="dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent resize-none h-22 scrollbar-hidden"
            placeholder="Enter your full address"
          />
          {errors.street && (
            <p className="text-red-600 text-sm mt-1">{errors.street}</p>
          )}
        </div>

        {/* Additional Information */}
        <div>
          <label className="dark:text-gray-200 text-gray-900 text-sm block mb-2">
            Additional information
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) =>
              handleInputChange("additionalInfo", e.target.value)
            }
            className="dark:bg-surface bg-gray-50  px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent resize-none h-22 scrollbar-hidden"
            placeholder="Any additional delivery instructions"
          />
        </div>

        {/* Set as Default Address */}
        <div className="flex items-center space-x-3 pt-4">
          <label className=" relative cursor-pointer">
            <input
              type="checkbox"
              id="default-address"
              checked={formData.isDefault}
              onChange={(e) => handleInputChange("isDefault", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-22 h-12 bg-gray-300 peer-checked:bg-primary-300 rounded-full transition-all duration-300"></div>
            <div className="absolute left-2 top-2 w-8 h-8 bg-white rounded-full peer-checked:translate-x-10 transition-transform duration-300"></div>
          </label>
          <label
            htmlFor="default-address"
            className="dark:text-gray-200 text-gray-900 text-sm cursor-pointer"
          >
            Set as Default Address
          </label>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-primary-400 dark:from-primary-200 to-primary-400 dark:to-primary-200 hover:from-primary-600 dark:hover:from-primary-300 hover:to-primary-700 dark:hover:to-primary-400  text-white font-medium py-4 rounded-lg transition-all duration-200 transform  active:scale-95 shadow-lg mt-8"
        >
          {isAddingAddress || isUpdatingAddress
            ? "Saving..."
            : isEditing
            ? "Update Address"
            : "Add Address"}
        </button>
      </div>
    </div>
  );
};

AddressForm.propTypes = {
  mode: PropTypes.oneOf(["add", "edit"]),
  address: PropTypes.shape({}),
};

export default AddressForm;
