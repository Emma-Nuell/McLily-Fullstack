const newUserTemplate = (userData) => {
 const firstName = userData.firstName

  const baseUrl = "https://mclily-fullstack.onrender.com";
  const privacyUrl = `${baseUrl}/legal`;


 const emailHTML = `
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to McLily!</title>
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
            padding: 26px 20px;
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
        .content {
            padding: 40px 30px;
            color: #333;
        }
        .greeting {
            font-size: 24px;
            color: hsl(160, 100%, 35%);
            margin-bottom: 16px;
            font-weight: 600;
        }
        .fun-message {
            background: linear-gradient(45deg, #f8f9fa, #e9ecef);
            border-left: 4px solid hsl(160, 100%, 50%);
            padding: 18px;
            margin: 20px 0;
            border-radius: 8px;
            font-style: italic;
            color: #495057;
        }
        .features {
            display: flex;
            justify-content: center;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        .feature-item {
            text-align: center;
            flex: 1;
            min-width: 90px;
            margin: 10px;
        }
        .feature-icon {
            width: 40px;
            height: 40px;  
            border-radius: 50%;
            margin: 0 auto 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
        .cta-button {
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
        .social-links {
            margin: 20px 0;
        }
        .social-link {
            display: inline-block;
            margin: 0 10px;
            color: hsl(160, 100%, 50%);
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            .features {
                flex-direction: column;
                margin-bottom: 10px;
            }
            .greeting {
                font-size: 20px;
            }
            .footer {
                margin-top: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">McLily</div>
            <p style="color: white; margin: 8px 0 0 0; font-size: 18px; font-family: 'Playfair display', serif;">Step into Style</p>
        </div>
        
        <div class="content">
            <div class="greeting">Hey ${firstName}! 👋</div>
            
            <p>Welcome to the McLily family! We're absolutely thrilled to have you join our community of style enthusiasts.</p>
            
            <div class="fun-message">
                <strong>🛍️ Fun fact: </strong> Around here, “ordinary” is off the table—whether it’s clothes, accessories, or those unexpected gems you didn’t know you needed
            </div>
            
            <p>Here's what makes shopping with us so special:</p>
            
            <div class="features">
                <div class="feature-item">
                    <div class="feature-icon">👠</div>
                    <h4>Premium Shoes</h4>
                    <p>Step up your game</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">👕</div>
                    <h4>Trendy Clothes</h4>
                    <p>Express yourself</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">💎</div>
                    <h4>Chic Accessories</h4>
                    <p>Perfect the look</p>
                </div>
            </div>
            
            <p>Ready to explore? Your style journey starts now!</p>
            
            <center>
                <a href="${baseUrl}" class="cta-button">Start Shopping</a>
            </center>
            
            <p><strong>✨ Pro tip:</strong> Your next favorite piece might already be waiting—check our website regularly for what’s new and trending.🎉</p>
            
            <p>If you have any questions or need styling advice, our friendly team is here to help. Just hit reply to this email!</p>
            
            <p>Happy shopping!<br>
            <strong>The McLily Team</strong></p>
        </div>
        
        <div class="footer">
            <!-- <div class="social-links">
                <a href="[FACEBOOK_URL]" class="social-link">Facebook</a>
                <a href="[INSTAGRAM_URL]" class="social-link">Instagram</a>
                <a href="[TWITTER_URL]" class="social-link">Twitter</a>
            </div> -->
            <p>© 2025 McLily. All rights reserved.</p>
            <p>You're receiving this email because you signed up for a McLily account.</p>
            <!-- <p><a href="[UNSUBSCRIBE_URL]" style="color: #6c757d;">Unsubscribe</a> | </p> -->
            <p><a href="${privacyUrl}" style="color: #6c757d;">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
 `;

 return emailHTML
};

export default newUserTemplate;
