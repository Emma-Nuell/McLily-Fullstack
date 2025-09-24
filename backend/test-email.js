import dotenv from "dotenv";
import { sendNewUserEmail } from "./utils/emailServices/sendNewUser.js";
import { sendConfirmationEmail } from "./utils/emailServices/sendOrderConfirmed.js";

dotenv.config();

const userData = {
  firstName: "Mcpaul",
  lastName: "Okoye",
  email: "okoyemcpaul86@gmail.com",
};

const orderData = {
  _id: "68c9eabf1bf5adcc660415d0",
  orderId: "ord_Jz6I47hi",
  userId: "user_XucM7H",
  customerDetails: {
    firstName: "Mcpaul",
    lastName: "Okoye",
    email: "okoyemcpaul86@gmail.com",
    phoneNo: "08083577046",
    address: {
      street:
        "Plot B32 Valencia Gardens Estate behind Sunnyvale estate, Dakwo District, Galadinmawa, Abuja",
      city: "Gwagwalada",
      state: "FCT",
      country: "Nigeria",
    },
  },
  orderItems: [
    {
      productId: "prod_h4Rm7osd",
      productName: "T-Shirts Short Sleeve Shorts Set - White",
      quantity: 4,
      price: 2500,
      image:
        "https://res.cloudinary.com/dtamm3ss1/image/upload/v1755201210/b18uz8drrlumgahpjfru.jpg",
      _id: "68c9eabf1bf5adcc660415d1",
    },
    {
      productId: "prod_f2Wf5Sqo",
      productName: "Unisex Baby Duvet Set",
      quantity: 1,
      price: 23999,
      image:
        "https://res.cloudinary.com/dtamm3ss1/image/upload/v1755200705/zwjylp5cgnjtadcyvbki.jpg",
      _id: {
        $oid: "68c9eabf1bf5adcc660415d2",
      },
    },
    {
      productId: "prod_b2Rm7ywd",
      productName: "Short Sleeve Shorts Set Gram - White",
      quantity: 2,
      price: 1450,
      image:
        "https://res.cloudinary.com/dtamm3ss1/image/upload/v1755200564/je48wcsbquyzalzkoe4q.jpg",
      _id: {
        $oid: "68c9eabf1bf5adcc660415d3",
      },
    },
    {
      productId: "prod_a7Wf9Gqy",
      productName: "Patterned Convenient Baby Bed With Net",
      quantity: 1,
      price: 13999,
      image:
        "https://res.cloudinary.com/dtamm3ss1/image/upload/v1755200717/f7giumix0al7uq82yafq.jpg",
      _id: {
        $oid: "68c9eabf1bf5adcc660415d4",
      },
    },
  ],
  itemCount: 8,
  subtotal: 50898,
  shippingFee: 0,
  totalAmount: 50898,
  deliveryMethod: "delivery",
  pickupStation: "none",
  pickupAddress: "none",
  paymentStatus: "paid",
  paymentMethod: "paystack",
  paymentDetails: {
    transactionId: "T155034137591654",
    paymentDate: "2025-09-16T22:55:06.522Z",
  },
  paymentGateway: "paystack",
  currency: "NGN",
  gatewayResponse: {
    id: 5343390674,
    domain: "test",
    status: "success",
    reference: "T155034137591654",
    receipt_number: null,
    amount: 5211800,
    message: null,
    gateway_response: "Successful",
    paid_at: "2025-09-16T22:55:03.000Z",
    created_at: "2025-09-16T22:54:59.000Z",
    channel: "card",
    currency: "NGN",
    ip_address: "197.211.57.31",
  },
  orderStatus: "Processing",
  statusHistory: [
    {
      status: "Processing",
      changedBy: "user_XucM7H",
      note: "Order created",
      _id: {
        $oid: "68c9eabf1bf5adcc660415d5",
      },
      changeAt: "2025-09-16T22:54:55.519Z",
    },
    {
      status: "paid",
      changeAt: "2025-09-16T22:55:06.523Z",
      changedBy: "paystack",
      note: "Payment verified successfully",
      _id: {
        $oid: "68c9eaca1bf5adcc660415df",
      },
    },
  ],
  deliveryTracking: {
    trackingNumber: "trk_K_A-31Igsp",
    carrier: "Not Assigned",
    estimatedDelivery: "2025-09-26T22:54:55.508Z",
    actualDelivery: null,
  },
  orderedAt: "2025-09-16T22:54:55.519Z",
  createdAt: {
    $date: "2025-09-16T22:54:55.526Z",
  },
  updatedAt: {
    $date: "2025-09-16T22:55:08.712Z",
  },
  __v: 1,
};

sendConfirmationEmail(orderData)
  .then((success) => {
    console.log("Test email sent:", success);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Test email failed:", error);
    process.exit(1);
  });
