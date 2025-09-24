const orderConfirmedTemplate = (orderData) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-NG", options);
  };

  // Calculate estimated delivery date range (5-7 business days from now)
  const orderDate = new Date(orderData.orderedAt);
  const estimatedStart = new Date(orderDate);
  estimatedStart.setDate(estimatedStart.getDate() + 7);
  const estimatedEnd = new Date(orderDate);
  estimatedEnd.setDate(estimatedEnd.getDate() + 10);

  const deliveryDateRange = `${formatDate(estimatedStart)} - ${formatDate(
    estimatedEnd
  )}`;

  // Determine shipping address based on delivery method
  let shippingAddress = "";
  let shippingName = "";

  if (orderData.deliveryMethod === "delivery") {
    const addr = orderData.customerDetails.address;
    shippingAddress = `${addr.street}, ${addr.city}, ${addr.state}, ${addr.country}`;
    shippingName = `${orderData.customerDetails.firstName} ${orderData.customerDetails.lastName}`;
  } else {
    // For pickup
    shippingAddress =
      orderData.pickupAddress !== "none"
        ? orderData.pickupAddress
        : "Pickup Station: " + orderData.pickupStation;

    shippingName = `${orderData.customerDetails.firstName} ${orderData.customerDetails.lastName}`;
  }

  const orderItemsHTML = orderData.orderItems
    .map(
      (item) => `
    <div class="order-item">
      <div class="item-image">
        <img src="${item.image}" alt="${
        item.productName
      }" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
      </div>
      <div class="item-details">
        <div class="item-name">${item.productName}</div>
        <div class="item-specs">Qty: ${item.quantity}</div>
        <div class="item-price">${formatCurrency(item.price)}</div>
      </div>
    </div>
  `
    )
    .join("");

  const baseUrl = "https://mclily-fullstack.onrender.com";
  const faqUrl = `${baseUrl}/faq`;
  const accountUrl = `${baseUrl}/account`;
  const supportUrl = `${baseUrl}/support`;
  const trackingUrl = `${baseUrl}/tracking/${orderData.orderId}`;

  const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed - McLily</title>
    <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        body {
            margin: 0;
            padding: 0;
            font-family: "Poppins", sans-serif;
            background-color: #ffffff;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            text-align: center;
            padding: 30px 20px;
            background: linear-gradient(135deg, hsl(160, 100%, 50%) 0%, hsl(160, 80%, 45%) 100%);
            border-radius: 0 0 20px 20px;
        }
        .logo {
            font-size: 50px;
            font-weight: bold;
            color: white;
            font-family: "Cormorant", serif;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .confirmation-badge {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin-top: 10px;
            display: inline-block;
            font-family: 'Crimson Text', serif;
        }
        .content {
            padding: 40px 30px;
            color: #333;
        }
        .greeting {
            font-size: 24px;
            color: hsl(160, 100%, 35%);
            margin-bottom: 15px;
            font-weight: 600;
        }
        .order-number {
            background: linear-gradient(45deg, #f8f9fa, #e9ecef);
            border-left: 4px solid hsl(160, 100%, 50%);
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
            text-align: center;
        }
        .order-number h3 {
            margin: 0 0 10px 0;
            color: hsl(160, 100%, 35%);
        }
        .order-id {
            font-size: 18px;
            font-weight: bold;
            color: #495057;
            font-family: monospace;
            background: white;
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
        }
        .fun-message {
            background: linear-gradient(135deg, hsl(160, 100%, 96%), hsl(160, 50%, 92%));
            border-radius: 15px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
            border: 2px solid hsl(160, 100%, 85%);
        }
        .fun-message .emoji {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .order-summary {
            border: 2px solid #e9ecef;
            border-radius: 15px;
            overflow: hidden;
            margin: 30px 0;
        }
        .summary-header {
            background: hsl(160, 100%, 50%);
            color: white;
            padding: 15px 20px;
            font-weight: bold;
            text-align: center;
        }
        .summary-content {
            padding: 0;
        }
        .order-item {
            display: flex;
            padding: 20px;
            border-bottom: 1px solid #e9ecef;
            align-items: center;
        }
        .order-item:last-child {
            border-bottom: none;
        }
        .item-image {
            width: 80px;
            height: 80px;
            background: #f8f9fa;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-size: 24px;
        }
        .item-details {
            flex: 1;
        }
        .item-name {
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }
        .item-specs {
            font-size: 14px;
            color: #6c757d;
            margin-bottom: 5px;
        }
        .item-price {
            font-weight: bold;
            color: hsl(160, 100%, 35%);
        }
        .order-totals {
            background: #f8f9fa;
            padding: 20px;
            border-top: 2px dashed hsl(160, 100%, 50%);
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .total-row.final {
            font-weight: bold;
            font-size: 18px;
            color: hsl(160, 100%, 35%);
            padding-top: 10px;
            border-top: 1px solid #dee2e6;
        }
        .shipping-info {
            display: flex;
            justify-content: space-between;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        .info-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            flex: 1;
            margin: 5px;
            min-width: 200px;
        }
        .info-box h4 {
            color: hsl(160, 100%, 35%);
            margin: 0 0 10px 0;
        }
        .track-button {
            display: inline-block;
            background: linear-gradient(135deg, hsl(160, 100%, 50%), hsl(160, 80%, 45%));
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(0, 255, 127, 0.3);
            transition: all 0.3s ease;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #6c757d;
            font-size: 14px;
            border-radius: 20px 20px 0 0;
            margin-top: 40px;
        }
        @media (max-width: 600px) {
            .logo {
                font-size: 50px;
            }
            .content {
                padding: 30px 20px;
            }
            .greeting {
                font-size: 20px;
                margin-bottom: 10px;
            }
            .order-item {
                flex-direction: column;
                text-align: center;
            }
            .item-image {
                margin: 0 0 15px 0;
            }
            .shipping-info {
                flex-direction: column;
            }
            .info-box {
                margin: 5px 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">McLily</div>
            <div class="confirmation-badge">✓ ORDER CONFIRMED</div>
        </div>
        
        <div class="content">
            <div class="greeting">Thanks ${
              orderData.customerDetails.firstName
            }! 🎉</div>
            
            <p>Your order has been confirmed and we're already getting it ready for you. Time to do a little happy dance! 💃</p>
            
            <div class="order-number">
                <h3>Your Order Number</h3>
                <div class="order-id">${orderData.orderId}</div>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #6c757d;">Keep this number handy for tracking</p>
            </div>
            
            <div class="fun-message">
                <div class="emoji">🚀</div>
                <p style="margin: 0;"><strong>Plot twist:</strong> Your new favorites are about to make every other item in your closet super jealous. We're not responsible for any fashion drama that ensues! 😄</p>
            </div>
            
            <div class="order-summary">
                <div class="summary-header">Order Summary</div>
                <div class="summary-content">
                    ${orderItemsHTML}
                    
                    <div class="order-totals">
                        <div class="total-row">
                            <span>Subtotal:</span>
                            <span>${formatCurrency(orderData.subtotal)}</span>
                        </div>
                        <div class="total-row">
                            <span>Shipping:</span>
                            <span>${formatCurrency(
                              orderData.shippingFee
                            )}</span>
                        </div>
                        <div class="total-row final">
                            <span>Total:</span>
                            <span>${formatCurrency(
                              orderData.totalAmount
                            )}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="shipping-info">
                <div class="info-box">
                    <h4>📦 ${
                      orderData.deliveryMethod === "delivery"
                        ? "Shipping To"
                        : "Pickup Information"
                    }</h4>
                    <p>${shippingName}<br>
                    ${shippingAddress}</p>
                </div>
                <div class="info-box">
                    <h4>🚚 Delivery Info</h4>
                    <p><strong>Method:</strong> ${orderData.deliveryMethod}<br>
                    <strong>Estimated Delivery:</strong><br>
                    ${deliveryDateRange}</p>
                </div>
            </div>
            
            <p><strong>What's next?</strong></p>
            <ul style="color: #495057;">
                <li>📧 You'll get an email when your order ships</li>
                <li>📱 Visit your profile on the website for any information</li>
                <li>💝 Get ready to strut your stuff in style!</li>
            </ul>
            
            <center>
                <a href="${trackingUrl}" class="track-button">Track Your Order</a>
            </center>
            
            <p><strong>Need help?</strong> Our customer service team is here for you! Just reply to this email or check our <a href="${faqUrl}" style="color: hsl(160, 100%, 50%);">FAQ section</a>.</p>
            
            <p>Thanks for choosing McLily – you've got excellent taste! 😉</p>
            
            <p>Happy styling!<br>
            <strong>The McLily Team</strong></p>
        </div>
        
        <div class="footer">
            <p><strong>Order #${
              orderData.orderId
            }</strong> | Placed on ${formatDate(orderData.orderedAt)}</p>
            <p>© 2025 McLily. All rights reserved.</p>
            <p><a href="${accountUrl}" style="color: #6c757d;">My Account</a> | <a href="${supportUrl}" style="color: #6c757d;">Customer Support</a></p>
        </div>
    </div>
</body>
</html>
  `;

  return emailHTML;
};

export default orderConfirmedTemplate;
