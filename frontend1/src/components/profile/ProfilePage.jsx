import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Calendar,
  Camera,
  ChevronRight,
  CreditCard,
  Edit3,
  Heart,
  HelpCircle,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  Settings,
  Shield,
  Star,
  StarIcon,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useOrderContext,
  useUserContext,
  useUserProfileContext,
} from "../../context";
import { useToast } from "../../context/Modal/useModal&Toast";
import Loading from "../Loading";
import Error from "../Error";

const ProfilePage = () => {
  const { user, updateProfile, isUpdatingProfile, isLoading, error } =
    useUserProfileContext();
  const { isAuthenticated, wishlistItems, signOut } = useUserContext();
  const { ordersSummary } = useOrderContext();
  const { showToast, TOAST_TYPES } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: [""],
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (user && !initialized.current) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNo: user.phoneNo || "",
      });
      initialized.current = true;
    }
  }, [user]);
  const [errors, setErrors] = useState({});

  // eslint-disable-next-line no-unused-vars
  const [userProfile] = useState({
    firstName: "Johnson",
    lastName: "Adebayo",
    email: "adebayo.johnson@email.com",
    phoneNo: "+234 901 234 5678",
    createdAt: new Date("2023-03-15"),
    address: [
      {
        _id: 1,
        addressName: "Home",
        isDefault: true,
        street: "15 Victoria Island Street",
        city: "Lagos",
        state: "Lagos State",
        country: "Nigeria",
      },
      {
        _id: 2,
        addressName: "Office",
        isDefault: false,
        street: "42 Admiralty Way",
        city: "Lekki",
        state: "Lagos State",
        country: "Nigeria",
      },
    ],
  });

  if (isLoading) {
    return <Loading message="Loading your profile..." />;
  }

  if (error) {
    return <Error message="Failed to load profile" error={error} />;
  }

  const handleInputChange = (e, field) => {
    // Handle regular field changes
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const formatCurrency = (amount) => {
    if (!amount) return 0;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(new Date(date));
  };

  const navigationItems = [
    {
      id: "orders",
      label: "Order History",
      icon: Package,
      description: "View and track your orders",
      badge: ordersSummary.totalOrders,
      color: "text-blue-600 dark:text-blue-800",
      bgColor: "bg-blue-50 dark:bg-blue-300",
      path: "/profile/orders",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      description: "Your saved items",
      badge: wishlistItems?.length || null,
      color: "text-red-600 dark:text-red-800",
      bgColor: "bg-red-50 dark:bg-red-300",
      path: "/profile/wishlist",
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
      description: "Manage delivery addresses",
      color: "text-green-600 dark:text-green-800",
      bgColor: "bg-green-50 dark:bg-green-300",
      path: "/profile/addresses",
    },
    {
      id: "ratings",
      label: "Ratings & Reviews",
      icon: StarIcon,
      description: "Rate products and share experiences",
      color: "text-yellow-600 dark:text-yellow-800",
      bgColor: "bg-yellow-50 dark:bg-yellow-300",
      path: "/profile/ratings",
    },
    //  {
    //    id: "payment",
    //    label: "Payment Methods",
    //    icon: CreditCard,
    //    description: "Cards and payment options",
    //    color: "text-purple-600",
    //    bgColor: "bg-purple-50",
    //  },
    //  {
    //    id: "notifications",
    //    label: "Notifications",
    //    icon: Bell,
    //    description: "Email and SMS preferences",
    //    color: "text-yellow-600",
    //    bgColor: "bg-yellow-50",
    //  },
    // {
    //   id: "security",
    //   label: "Security",
    //   icon: Shield,
    //   description: "Password and security settings",
    //   color: "text-indigo-600 dark:text-indigo-800",
    //   bgColor: "bg-indigo-50 dark:bg-indigo-300",
    //   path: "/profile/account",
    // },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      description: "FAQs and customer support",
      color: "text-orange-600 dark:text-orange-800",
      bgColor: "bg-orange-50 dark:bg-orange-300",
      path: "/profile/help",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateProfile({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phoneNo: formData.phoneNo.trim(),
      });

      setErrors({});
      setIsEditing(false);
      showToast("Profile updated successfully", TOAST_TYPES.SUCCESS);
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Error updating profile", TOAST_TYPES.ERROR);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const ProfileOverview = () => (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
            Profile Information
          </h2>
          {isAuthenticated && (
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-300 border cursor-pointer border-primary-300 dark:border-primary-100 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-200 transition-colors flex items-center"
          >
            <Edit3 className="mr-2" size={14} />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <div className="w-18 h-18 bg-primary-500 dark:bg-primary-300 rounded-full flex items-center justify-center text-text text-base font-medium">
              {user?.firstName?.charAt(0) || "U"}
            </div>
            {isEditing && (
              <button className="absolute bottom-2 right-2 p-2 bg-primary-500 dark:bg-primary-300 text-white rounded-full hover:bg-primary-700 dark:hover:bg-primary-200 transition-colors">
                <Camera className="" size={16} />
              </button>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                {isEditing ? (
                  <div className="space-y-8">
                    <input
                      type="text"
                      required
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange(e, "firstName")}
                      className="w-full px-3 py-2 text-text border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent outline-0"
                    />
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange(e, "lastName")}
                      className="w-full px-3 text-text py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent outline-0"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-gray-300">
                    {user?.lastName || "Guest"} {user?.firstName || "User"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <p className="text-gray-900 dark:text-gray-300 flex items-center">
                  <Mail className="mr-2 text-gray-400" size={14} />
                  {user?.email || "logintoview@gmail.com"}
                </p>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="tel"
                      inputMode="tel"
                      value={formData.phoneNo}
                      onChange={(e) => handleInputChange(e, "phoneNo")}
                      placeholder="+234 800 000 0000"
                      className="w-full px-3 text-text py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-0 focus:border-transparent"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-900 dark:text-gray-300 flex items-center">
                      <Phone className="mr-2 text-gray-400" size={14} />
                      {user?.phoneNo || "+234 800 000 0000"}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Member Since
                </label>
                <p className="text-gray-900 dark:text-gray-300 flex items-center">
                  <Calendar className="mr-2 text-gray-400" size={14} />
                  {formatDate(user?.createdAt) || "Join McLily Today"}
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isUpdatingProfile}
                  className="px-4 py-2 dark:bg-primary-300 bg-primary-500 dark:text-text text-gray-900 text-sm font-medium rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors"
                >
                  {isUpdatingProfile ? "Updating..." : "Update Profile"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={isUpdatingProfile}
                  className="px-4 py-2 border dark:border-primary-100 border-primary-300 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-6 text-center">
          <Package
            className="text-blue-600 dark:text-blue-700 mx-auto mb-2"
            size={24}
          />
          <p className="text-xl font-bold text-gray-900 dark:text-gray-200">
            {ordersSummary.totalOrders || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Orders
          </p>
        </div>

        <div className="bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-6 text-center">
          <CreditCard
            className="text-green-600 dark:text-green-700 mx-auto mb-2"
            size={24}
          />
          <p className="text-xl font-bold text-gray-900 dark:text-gray-200">
            {formatCurrency(ordersSummary.totalSpent)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Spent
          </p>
        </div>

        <div className="bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-6 text-center">
          <Heart
            className=" text-red-600 dark:text-red-700 mx-auto mb-2"
            size={24}
          />
          <p className="text-xl font-bold text-gray-900 dark:text-gray-200">
            {wishlistItems?.length || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Wishlist Items
          </p>
        </div>
      </div>

      {/* Recent Addresses */}
      <div className="bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            Saved Addresses
          </h3>
          {isAuthenticated && user?.address?.length > 0 && (
            <button
              onClick={() => handleNavigation("/profile/addresses")}
              className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-400 font-medium"
            >
              Manage All
            </button>
          )}
        </div>
        <div className="space-y-4">
          {user?.address.map((address) => (
            <div
              key={address._id}
              className="flex items-start justify-between p-4 border  border-primary-300 dark:border-primary-100 rounded-lg"
            >
              <div className="flex items-start">
                <MapPin
                  className="text-gray-400 dark:text-gray-300 mt-0.5 mr-3"
                  size={18}
                />
                <div>
                  <div className="flex items-center space-x-4 mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-200">
                      {address.addressName}
                    </h4>
                    {address.isDefault && (
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-200 text-primary-800 dark:text-primary-900 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {!isAuthenticated && (
            <div>
              <h2 className="text-gray-600 dark:text-gray-300 text-center">
                Login to view your saved addresses
              </h2>
            </div>
          )}
        </div>
      </div>
      {isAuthenticated && (
        <div className="bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-6 mt-6">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center cursor-pointer px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
          >
            <LogOut className="mr-2" size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-surface">
      {/* Header */}
      <div className="bg-background-white border-b border-primary-300 dark:border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <User
                className="text-primary-600 dark:text-primary-300 mr-3"
                size={26}
              />
              <div>
                <h1 className="text-lg font-bold text-text">
                  Hey, {user?.lastName || "John"} {user?.firstName || "Doe"}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Manage your profile and account settings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-6 py-10">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-6">
                Account Menu
              </h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center justify-between p-3 mb-4 rounded-lg text-left transition-colors ${
                    activeTab === "overview"
                      ? "bg-primary-100 dark:bg-primary-100 text-primary-700 dark:text-primary-400 border-primary-200"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300 text-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <Settings className="mr-3" size={20} />
                    <span className="font-medium">Overview</span>
                  </div>
                </button>

                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className="w-full flex items-center justify-between p-3 rounded-lg text-left dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center">
                      <div className={`p-2.5 rounded-lg ${item.bgColor} mr-5`}>
                        <item.icon className={`${item.color}`} size={19} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-200">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span className="px-2.5 py-1.5 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-800 text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700"
                        size={18}
                      />
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && <ProfileOverview />}

            {/* Add other tab content here */}
            {activeTab !== "overview" && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {navigationItems.find((item) => item.id === activeTab)
                    ?.label || "Content"}
                </h2>
                <p className="text-gray-600">
                  This section is under development.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  onSuccess: PropTypes.func,
};

export default ProfilePage;
