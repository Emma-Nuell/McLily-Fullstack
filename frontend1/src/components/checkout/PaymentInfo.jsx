import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AlertTriangle,
  ArrowLeftRight,
  Banknote,
  Check,
  CreditCard,
  Shield,
} from "lucide-react";
import { useCreateOrder, useVerifyPayment } from "../../hooks/orderHooks";
import { useQueryClient } from "@tanstack/react-query";
import { usePaystackPayment } from "react-paystack";
import { useToast } from "../../context/Modal/useModal&Toast";

const PaymentInfo = ({
  onProceed,
  setPaymentMethod,
  clearCart,
  orderData,
  total_amount,
  paymentMethod,
  onBack,
}) => {
  const createOrderMutation = useCreateOrder();
  const verifyPaymentMutation = useVerifyPayment();
  const queryClient = useQueryClient();
  const { showToast, TOAST_TYPES } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // const isProcessing =
  //   createOrderMutation.isPending

  //payment calculation
  const paystackFeePercentage = 2.2;
  const paystackFixedFee = 100;

  const calculateTotalAmount = (baseAmount) => {
    const calculatedFee =
      (paystackFeePercentage / 100) * baseAmount + paystackFixedFee;
    const totalFee = Math.min(calculatedFee, 2500); //cap at 2000
    return Math.round(baseAmount + totalFee);
  };

  const totalAmount = calculateTotalAmount(total_amount);

  const paystackConfig = (reference) => ({
    publicKey: import.meta.env.VITE_PUBLIC_KEY_PAYSTACK,
    email: orderData.customerDetails.email,
    amount: totalAmount * 100,
    ref: reference,
    metadata: {
      custom_fields: [
        {
          display_name: "First Name",
          variable_name: "first_name",
          value: orderData.customerDetails.firstName,
        },
        {
          display_name: "Last Name",
          variable_name: "last_name",
          value: orderData.customerDetails.lastName,
        },
      ],
    },
  });

  const onPaymentSuccess = async (response, orderId) => {
    console.log(response);

    try {
      // Verify payment with your backend
      const verification = await verifyPaymentMutation.mutateAsync({
        reference: response.reference,
        orderId: orderId,
      });
      if (verification.success) {
        showToast("Payment successful! Order confirmed.", TOAST_TYPES.SUCCESS);
        queryClient.invalidateQueries(["user-orders"]);
        clearCart();
        console.log(verification.order, verification);

        onProceed(verification.order);
      } else {
        showToast("Payment verification failed", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      showToast("Error verifying payment", TOAST_TYPES.ERROR);
    }
  };

  const onPaymentClose = () => {
    showToast("Payment cancelled", TOAST_TYPES.INFO);
    setIsProcessing(false);
  };

  const handleCashOnDelivery = async () => {
    try {
      const orderResponse = await createOrderMutation.mutateAsync({
        ...orderData,
        paymentMethod: paymentMethod,
      });

      if (orderResponse.success) {
        showToast("Order placed successfully!", TOAST_TYPES.SUCCESS);
        queryClient.invalidateQueries(["user-orders"]);
        clearCart();
        console.log(orderResponse.order, orderResponse);

        onProceed(orderResponse.order);
      } else {
        showToast(
          "Failed to create order: " + orderResponse.message,
          TOAST_TYPES.ERROR
        );
      }
    } catch (error) {
      console.error("Cash on delivery error:", error);
      showToast("Error creating order", TOAST_TYPES.ERROR);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaystackPayment = async () => {
    setIsProcessing(true);

    try {
      // First create the order to get order ID
      const orderResponse = await createOrderMutation.mutateAsync({
        ...orderData,
        paymentMethod: "paystack",
        paymentStatus: "pending", // Set as pending until payment verification
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || "Failed to create order");
      }
      console.log(orderResponse);

      const orderId = orderResponse.order.orderId;

      // Initialize Paystack payment with order ID as reference
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const initializePayment = usePaystackPayment(paystackConfig(orderId));

      initializePayment({
        onSuccess: (response) => onPaymentSuccess(response, orderId),
        onClose: onPaymentClose,
      });
    } catch (error) {
      console.error("Paystack payment initiation error:", error);
      showToast(
        "Error initiating payment: " + error.message,
        TOAST_TYPES.ERROR
      );
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      showToast("Please select a payment method", TOAST_TYPES.ERROR);
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === "paystack") {
        await handlePaystackPayment();
      } else if (
        ["cash_on_delivery", "bank_transfer"].includes(paymentMethod)
      ) {
        await handleCashOnDelivery();
      } else {
        showToast("Unsupported payment method", TOAST_TYPES.ERROR);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      showToast("Error processing payment", TOAST_TYPES.ERROR);
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: "paystack",
      name: "Pay Now with Paystack",
      description: "Secure online payment with card or bank transfer",
      icon: CreditCard,
      iconColor: "dark:text-blue-400 text-blue-700",
      bgColor: "bg-blue-50 dark:bg-blue-600/30",
      borderColor: "border-blue-200 dark:border-blue-800 ",
      benefits: [
        "Instant payment confirmation",
        "Secure encryption",
        "Multiple payment options",
      ],
      disclaimer:
        "Heads up! Paystack may add a small transaction fee. This is separate from the product price.",
      isRecommended: true,
    },
    {
      id: "cash_on_delivery",
      name: "Cash on Delivery",
      description: "Pay with cash when your order arrives",
      icon: Banknote,
      iconColor: "text-green-700 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-600/30",
      borderColor: "border-green-200 dark:border-green-800",
      benefits: [
        "Pay only when you receive your order",
        "No online transaction required",
      ],
      disclaimer:
        "Please have the exact amount ready as we are not subject to having exact change on delivery",
    },
    {
      id: "bank_transfer",
      name: "Transfer on Delivery",
      description: "Pay via bank transfer when your order arrives",
      icon: ArrowLeftRight,
      iconColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-600/30",
      borderColor: "border-purple-200 dark:border-purple-800",
      benefits: [
        "Digital payment on delivery",
        "Bank transfer security",
        "No cash handling required",
      ],
    },
  ];

  const handleMethodSelect = (methodId) => {
    setPaymentMethod(methodId);
  };

  return (
    <div className="bg-background-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="border-b border-primary-300 dark:border-primary-100  p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 flex items-center gap-3">
          <CreditCard
            className="text-primary-600 dark:text-primary-300"
            size={22}
          />
          Payment Method
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Choose how you&apos;d like to pay for your order
        </p>
      </div>

      <div className="p-6 mt-6">
        {/* Payment Methods */}
        <div className="space-y-4 mb-8">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            const isSelected = paymentMethod === method.id;

            return (
              <div
                key={method.id}
                className={`relative border-1 rounded-lg p-6 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary-300 dark:border-primary-100 bg-primary-50 dark:bg-primary-100/20 shadow-sm"
                    : "border-gray-200 dark:border-gray-500 hover:border-gray-300 hover:shadow-sm"
                }`}
                onClick={() => handleMethodSelect(method.id)}
              >
                {/* Recommended Badge */}
                {method.isRecommended && (
                  <div className="absolute -top-9 left-4 bg-primary-500 dark:bg-primary-300 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Recommended
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Radio Button */}
                  <div
                    className={`w-10 h-10 rounded-full border-1 flex items-center justify-center mt-1 ${
                      isSelected
                        ? "border-primary-300 dark:border-primary-100 bg-primary-500"
                        : "border-gray-300 dark:border-gray-500"
                    }`}
                  >
                    {isSelected && <Check className="text-white" size={18} />}
                  </div>

                  {/* Method Icon */}
                  <div
                    className={`p-2 rounded-md ${method.bgColor} ${method.borderColor} border`}
                  >
                    <IconComponent
                      className={` ${method.iconColor}`}
                      size={18}
                    />
                  </div>

                  {/* Method Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-lg mb-1">
                      {method.name}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                      {method.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-1 mb-3">
                      {method.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400"
                        >
                          <Check className="text-green-500" size={15} />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Disclaimer for Cash on Delivery */}
                    {method.disclaimer && (
                      <div className="bg-amber-50 dark:bg-amber-600/30 dark:border-amber-800 border border-amber-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle
                            className="text-amber-600 flex-shrink-0 mt-0.5"
                            size={16}
                          />
                          <div>
                            <h4 className="font-medium text-amber-800 dark:text-amber-500 mb-1">
                              Important Notice
                            </h4>
                            <p className="text-sm text-amber-700 dark:text-amber-400">
                              {method.disclaimer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 dark:bg-surface border border-primary-300 dark:border-primary-100 rounded-lg p-4 mb-8">
          <div className="">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-200 flex items-center gap-3 mb-2">
                <Shield className="text-primary-600" size={24} />
                Secure Payments
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                All online transactions are secured with bank-level encryption.
                Your payment information is never stored on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Method Summary */}
        {paymentMethod && (
          <div className="border-primary-300 dark:border-primary-100 bg-primary-50 dark:bg-primary-100/20 border rounded-lg p-4 mb-8">
            <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">
              Selected Payment Method
            </h4>
            <div className="flex items-center gap-3">
              {(() => {
                const method = paymentMethods.find(
                  (m) => m.id === paymentMethod
                );
                const IconComponent = method.icon;
                return (
                  <>
                    <IconComponent
                      className={`${method.iconColor}`}
                      size={20}
                    />
                    <span className="font-medium dark:text-gray-400 text-gray-800">
                      {method.name}
                    </span>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-primary-300 dark:border-primary-100">
          <button
            className="flex-1 border border-gray-300 text-gray-700 dark:text-gray-500 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            onClick={() => onBack()}
          >
            Back to Delivery
          </button>

          {paymentMethod === "paystack" ? (
            <button
              className="flex-1 bg-primary-500 dark:bg-primary-300 hover:bg-primary-600 dark:hover:bg-primary-200 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              <CreditCard className="" size={20} />
              Pay Now with Paystack
            </button>
          ) : (
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors shadow-sm ${
                paymentMethod
                  ? "bg-primary-500 dark:bg-primary-300 hover:bg-primary-600 dark:hover:bg-primary-200  text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!paymentMethod || isProcessing}
            >
              Confirm Order
            </button>
          )}
        </div>

        {/* Additional Info */}
        {paymentMethod && paymentMethod !== "paystack" && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {paymentMethod === "cash"
                ? "You will pay with cash when your order is delivered"
                : "You will complete the bank transfer when your order is delivered"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

PaymentInfo.propTypes = {
  onProceed: PropTypes.func,
  orderData: PropTypes.shape({
    customerDetails: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
  setPaymentMethod: PropTypes.func,
  setPaymentReference: PropTypes.func,
  paymentMethod: PropTypes.string,
  clearCart: PropTypes.func,
  total_amount: PropTypes.number,
  onBack: PropTypes.func,
};

export default PaymentInfo;
