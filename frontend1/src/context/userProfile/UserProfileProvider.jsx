import React  from "react";
import PropTypes from "prop-types";
import UserProfileContext from "./UserProfileContext.jsx";
import { useAddAddress, useChangePassword, useDeleteAddress, useSetDefaultAddress, useUpdateAddress, useUpdateProfile, useUserAddresses, useUserProfile } from "../../hooks/userProfileHooks.js";



export const UserProfileProvider = ({ children }) => {
   const {
     data: profileData,
     isLoading: profileLoading,
     error: profileError,
   } = useUserProfile();
   const {
     data: addressesData,
     isLoading: addressesLoading,
     error: addressesError,
   } = useUserAddresses();
     const updateProfileMutation = useUpdateProfile();
     const addAddressMutation = useAddAddress();
     const updateAddressMutation = useUpdateAddress();
     const deleteAddressMutation = useDeleteAddress();
     const setDefaultAddressMutation = useSetDefaultAddress();
     const changePasswordMutation = useChangePassword();


  const value = {
    // Profile data
    user: profileData?.user,
    isLoading: profileLoading || addressesLoading,
    error: profileError || addressesError,

    // Addresses
    addresses: addressesData?.addresses || [],

    // Mutations
    updateProfile: updateProfileMutation.mutateAsync,
    addAddress: addAddressMutation.mutateAsync,
    updateAddress: updateAddressMutation.mutateAsync,
    deleteAddress: deleteAddressMutation.mutateAsync,
    setDefaultAddress: setDefaultAddressMutation.mutateAsync,
    changePassword: changePasswordMutation.mutateAsync,

    // Loading states
    isUpdatingProfile: updateProfileMutation.isLoading,
    isAddingAddress: addAddressMutation.isLoading,
    isUpdatingAddress: updateAddressMutation.isLoading,
    isDeletingAddress: deleteAddressMutation.isLoading,
    isSettingDefaultAddress: setDefaultAddressMutation.isLoading,
    isChangingPassword: changePasswordMutation.isLoading,
  };
  return (
    <UserProfileContext.Provider
      value={value}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

UserProfileProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProfileProvider
