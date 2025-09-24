const orderConfirmedText = (orderData) => {
const formatCurrency = (amount) => {
  return `₦${amount.toLocaleString("en-NG")}`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Determine shipping address based on delivery method
let shippingAddress = "";

if (orderData.deliveryMethod === "delivery") {
  const addr = orderData.customerDetails.address;
  shippingAddress = `${addr.street}, ${addr.city}, ${addr.state}, ${addr.country}`;
} else {
  shippingAddress =
    orderData.pickupAddress !== "none"
      ? orderData.pickupAddress
      : "Pickup Station: " + orderData.pickupStation;
}

// Generate order items list
const orderItemsList = orderData.orderItems
  .map(
    (item) =>
      `- ${item.productName} (Qty: ${item.quantity}) - ${formatCurrency(
        item.price
      )}`
  )
  .join("\n  ");

return `
Order Confirmed
Your Order has been Confirmed - McLily Stores
--------------------------------
Order ID: ${orderData.orderId}
Order Date: ${formatDate(orderData.orderedAt)}

Customer Details:
Name: ${orderData.customerDetails.firstName} ${
  orderData.customerDetails.lastName
}
Email: ${orderData.customerDetails.email}
Phone: ${orderData.customerDetails.phoneNo}

Order Items:
  ${orderItemsList}

Order Summary:
Subtotal: ${formatCurrency(orderData.subtotal)}
Shipping: ${formatCurrency(orderData.shippingFee)}
Total: ${formatCurrency(orderData.totalAmount)}

Shipping Method: ${orderData.deliveryMethod}
Shipping Address: ${shippingAddress}

Payment Status: ${orderData.paymentStatus}
Payment Method: ${orderData.paymentMethod}

Thank you for your order!

If you have any questions, please contact our customer support.
`;
}

export default orderConfirmedText