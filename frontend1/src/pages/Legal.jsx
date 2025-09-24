/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Legal = () => {

    const [activeSection, setActiveSection] = useState('terms');

      const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setActiveSection(sectionId);
        }
    };
    
     useEffect(() => {
       const handleScroll = () => {
         const sections = [
           "terms",
           "privacy",
           "shipping",
           "returns",
           "contact",
         ];
         let currentSection = "";

         sections.forEach((sectionId) => {
           const section = document.getElementById(sectionId);
           if (section) {
             const rect = section.getBoundingClientRect();
             if (rect.top <= 100 && rect.bottom >= 100) {
               currentSection = sectionId;
             }
           }
         });

         if (currentSection) {
           setActiveSection(currentSection);
         }
       };

       window.addEventListener("scroll", handleScroll);
       return () => window.removeEventListener("scroll", handleScroll);
     }, []);

      const NavButton = ({ sectionId, children }) => (
        <button
          onClick={() => scrollToSection(sectionId)}
          className={`px-4 py-2 rounded transition-colors ${
            activeSection === sectionId
              ? "bg-primary-600 dark:bg-primary-200 text-white"
              : "bg-primary-500 dark:bg-primary-300 text-white hover:bg-primary-600 dark:hover:bg-primary-200 cursor-pointer"
          }`}
        >
          {children}
        </button>
      );

      const Section = ({ id, title, children }) => (
        <section id={id} className="mb-16">
          <div className="bg-background-white rounded-lg shadow-lg p-8 ">
            <h2 className="text-2xl font-bold mb-4 text-primary-700 dark:text-primary-300">
              {title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              <strong>Last Updated:</strong> Tuesday, August 12, 2025
            </p>
            {children}
          </div>
        </section>
      );

      const SubSection = ({ title, children, className = "" }) => (
        <div className={`space-y-3 ${className}`}>
          <h3 className='text-xl font-semibold mb-3'>{title}</h3>
          {children}
        </div>
      );

      const SubSubSection = ({ title, children }) => (
        <div className='mt-4'>
          <h4 className='font-semibold mb-2'>{title}</h4>
          {children}
        </div>
      );

      const BulletList = ({ items }) => (
        <ul className='list-disc pl-6 space-y-2'>
          {items.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
  return (
    <div className="bg-gray-50 dark:bg-surface text-gray-900 dark:text-gray-200 min-h-screen">
      {/* Header */}
      <header className="bg-primary-500 dark:bg-primary-300 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-2xl font-bold">
            McLily Stores - Legal Information
          </h1>
          <p className="text-white/90 mt-2">
            Terms, Policies & Legal Requirements
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-50 dark:bg-surface border-b border-primary-300 dark:border-primary-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-4">
            <NavButton sectionId="terms">Terms & Conditions</NavButton>
            <NavButton sectionId="privacy">Privacy Policy</NavButton>
            <NavButton sectionId="shipping">Shipping & Refunds</NavButton>
            <NavButton sectionId="returns">Returns & Cancellations</NavButton>
            <NavButton sectionId="contact">Contact & Social</NavButton>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Terms and Conditions */}
        <Section id="terms" title="Terms and Conditions">
          <div className="space-y-6">
            <SubSection title="1. Introduction">
              <p>
                Welcome to <strong>McLily Stores</strong> (&apos;we,&apos;
                &quot;us,&quot; or &quot;our&quot;). By accessing or using our
                website at mclily-fullstack.onrender.com, you agree to comply
                with and be bound by these Terms and Conditions. If you do not
                agree with these terms, please do not use our website.
              </p>
            </SubSection>

            <SubSection title="2. Products & Services">
              <BulletList
                items={[
                  "McLily specializes in fashion items including clothing and shoes",
                  "All product descriptions, images, and prices are provided for informational purposes",
                  "We reserve the right to modify or discontinue products without prior notice",
                  "Colors may appear differently on your device due to screen settings",
                ]}
              />
            </SubSection>

            <SubSection title="3. Orders & Payments">
              <BulletList
                items={[
                  "All orders are subject to product availability and confirmation",
                  "Prices are listed in Nigerian Naira (₦) and include applicable taxes",
                  "We reserve the right to change prices without prior notice",
                  "Payment is processed securely via Paystack",
                  "Orders are confirmed via email once payment is successful",
                  "We may cancel orders due to pricing errors or product unavailability",
                ]}
              />
            </SubSection>

            <SubSection title="4. User Account & Responsibilities">
              <BulletList
                items={[
                  "Provide accurate and complete information during registration and checkout",
                  "Maintain the confidentiality of your account credentials",
                  "Notify us immediately of any unauthorized account access",
                  "Do not engage in fraudulent activities or misuse our website",
                  "You are responsible for all activities under your account",
                ]}
              />
            </SubSection>

            {/* <SubSection title='5. Intellectual Property'>
              <p>
                All content on this website, including text, graphics, logos,
                images, and software, is the property of McLily Stores and is
                protected by copyright and other intellectual property laws. You
                may not reproduce, distribute, or use any content without our
                written permission.
              </p>
            </SubSection> */}

            <SubSection title="6. Limitation of Liability">
              <BulletList
                items={[
                  "McLily Stores is not liable for delays caused by third-party shipping providers",
                  "We are not responsible for indirect, incidental, or consequential damages",
                  "Our total liability shall not exceed the amount paid for the specific order",
                  "We do not guarantee uninterrupted or error-free website operation",
                ]}
              />
            </SubSection>
            {/* 
            <SubSection title='7. Governing Law'>
              <p>
                These terms are governed by the laws of the Federal Republic of
                Nigeria. Any disputes will be resolved in the courts of Nigeria.
              </p>
            </SubSection> */}

            <SubSection title="8. Changes to Terms">
              <p>
                We reserve the right to update these terms at any time. Changes
                will be posted on this page with an updated &quot;Last
                Modified&quot; date. Continued use of our website after changes
                constitutes acceptance of the new terms.
              </p>
            </SubSection>
          </div>
        </Section>

        {/* Privacy Policy */}
        <Section id="privacy" title="Privacy Policy">
          <div className="space-y-6">
            <SubSection title="1. Information We Collect">
              <SubSubSection title="Personal Information:">
                <BulletList
                  items={[
                    "Name, email address, phone number",
                    "Billing and shipping addresses",
                    "Order history and preferences",
                    "Communication records with our support team",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Payment Information:">
                <BulletList
                  items={[
                    "Payment details are processed securely by Paystack",
                    "We do not store or have access to your complete credit card information",
                    "Only transaction references and payment status are retained",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Technical Information:">
                <BulletList
                  items={[
                    "IP address, browser type, device information",
                    "Website usage patterns and preferences",
                    "Cookies and similar tracking technologies",
                  ]}
                />
              </SubSubSection>
            </SubSection>

            <SubSection title="2. How We Use Your Information">
              <BulletList
                items={[
                  "Process and fulfill your orders",
                  "Communicate about orders, promotions, and updates",
                  "Improve our website and services",
                  "Prevent fraud and ensure security",
                  "Comply with legal obligations",
                  "Provide customer support",
                ]}
              />
            </SubSection>

            <SubSection title="3. Information Sharing">
              <p className="mb-3">We may share your information with:</p>
              <BulletList
                items={[
                  "<strong>Shipping Partners:</strong> Name and delivery address for order fulfillment",
                  "<strong>Payment Processors:</strong> Paystack for secure payment processing",
                  "<strong>Legal Authorities:</strong> When required by law or to protect our rights",
                  "<strong>Service Providers:</strong> Third parties that help us operate our business",
                ]}
              />
              <p className="mt-3 font-semibold">
                We never sell your personal information to third parties.
              </p>
            </SubSection>

            <SubSection title="4. Data Security">
              <BulletList
                items={[
                  "We implement industry-standard security measures",
                  "SSL encryption protects data transmission",
                  "Regular security audits and updates",
                  "Limited employee access to personal information",
                  "However, no system is 100% secure, and we cannot guarantee absolute security",
                ]}
              />
            </SubSection>

            <SubSection title="5. Your Rights">
              <BulletList
                items={[
                  "Access your personal information",
                  "Request correction of inaccurate data",
                  "Request deletion of your data (subject to legal requirements)",
                  "Opt-out of marketing communications",
                  "Request data portability",
                ]}
              />
              <p className="mt-3">
                To exercise these rights, contact us using the information
                provided below.
              </p>
            </SubSection>

            <SubSection title="6. Cookies Policy">
              <p>
                We use cookies to enhance your browsing experience, analyze
                website traffic, and personalize content. You can control cookie
                settings in your browser, but disabling cookies may affect
                website functionality.
              </p>
            </SubSection>
          </div>
        </Section>

        {/* Shipping & Refund Policy */}
        <Section id="shipping" title="Shipping & Refund Policy">
          <div className="space-y-6">
            <SubSection title="Shipping Information">
              <SubSubSection title="Delivery Partners:">
                <BulletList
                  items={[
                    "Currently partnering with reliable third-party logistics providers",
                    "Shipping fees are paid by customer upon delivery (Cash on Delivery available)",
                    "Future expansion: McLily plans to introduce its own delivery service",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Delivery Timeframes:">
                <BulletList
                  items={[
                    "<strong>Lagos & Abuja:</strong> 1-3 business days",
                    "<strong>Other Major Cities:</strong> 3-5 business days",
                    "<strong>Remote Areas:</strong> 5-7 business days",
                    "Delivery times may vary due to weather, holidays, or carrier delays",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Shipping Costs:">
                <BulletList
                  items={[
                    "Calculated based on delivery location and package weight",
                    "Displayed during checkout process",
                    "Free shipping promotions may apply during special offers",
                  ]}
                />
              </SubSubSection>
            </SubSection>

            <SubSection title="Order Processing">
              <BulletList
                items={[
                  "Orders are processed within 1-2 business days",
                  "You'll receive tracking information via email/SMS",
                  "Orders placed on weekends/holidays are processed the next business day",
                  "We may contact you for order verification or clarification",
                ]}
              />
            </SubSection>

            <SubSection title="Refund Policy">
              <SubSubSection title="Eligible for Refunds:">
                <BulletList
                  items={[
                    "Failed or canceled deliveries due to our error",
                    "Items returned within our return policy timeframe",
                    "Payment processing errors or duplicate charges",
                    "Items damaged during shipping (with photo evidence)",
                    "Incorrect items sent (different from what was ordered)",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Refund Process:">
                <BulletList
                  items={[
                    "Refunds are processed to the original payment method",
                    "Processing time: 5-10 business days after approval",
                    "Refund confirmation sent via email",
                    "Bank processing may take additional 3-5 business days",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Non-Refundable Items:">
                <BulletList
                  items={[
                    "Items damaged by customer misuse",
                    "Items returned without original packaging/tags",
                    "Items returned after the return period expires",
                    "Customized or personalized items",
                  ]}
                />
              </SubSubSection>
            </SubSection>
          </div>
        </Section>

        {/* Cancellation & Returns Policy */}
        <Section id="returns" title="Cancellation & Returns Policy">
          <div className="space-y-6">
            <SubSection title="Order Cancellation">
              <SubSubSection title="When You Can Cancel:">
                <BulletList
                  items={[
                    'Orders can only be canceled during the "Processing" phase (before shipping)',
                    "Cancellation requests must be made within 2 hours of order placement",
                    "Contact us immediately via WhatsApp <strong>(+234 803 725 6630)</strong> or email",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Cancellation Process:">
                <BulletList
                  items={[
                    "Provide your order number and reason for cancellation",
                    "Cancellation confirmation sent within 1-2 hours",
                    "Full refund processed if payment was already made",
                    "No cancellation fees for eligible orders",
                  ]}
                />
              </SubSubSection>
            </SubSection>

            <SubSection title="Returns Policy">
              <SubSubSection title="Return Conditions:">
                <BulletList
                  items={[
                    "Items must be unused and in original condition",
                    "All original tags, labels, and packaging must be intact",
                    "Returns accepted within <strong>7 days</strong> of delivery",
                    "Items must not show signs of wear, damage, or alteration",
                    "Original receipt or order confirmation required",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Return Process:">
                <BulletList
                  items={[
                    "<strong>Step 1:</strong> Contact us via WhatsApp (+234 803 725 6630) or email",
                    "<strong>Step 2:</strong> Provide order details and reason for return",
                    "<strong>Step 3:</strong> Receive return authorization and instructions",
                    "<strong>Step 4:</strong> Package items securely and ship to our address",
                    "<strong>Step 5:</strong> Receive confirmation once items are inspected",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Return Shipping:">
                <BulletList
                  items={[
                    "Customer responsible for return shipping costs (unless item is faulty)",
                    "We recommend using trackable shipping methods",
                    "McLily not responsible for items lost during return shipping",
                    "Original shipping costs are non-refundable (except for faulty items)",
                  ]}
                />
              </SubSubSection>

              <SubSubSection title="Items We Cannot Accept for Return:">
                <BulletList
                  items={[
                    "Undergarments and intimate apparel",
                    "Items returned after 7-day period",
                    "Items damaged by customer",
                    "Items without original tags or packaging",
                    "Sale or clearance items (unless faulty)",
                  ]}
                />
              </SubSubSection>
            </SubSection>

            <SubSection title="Exchange Policy">
              <BulletList
                items={[
                  "Exchanges available for size and color variations (subject to availability)",
                  "Same return conditions apply to exchanges",
                  "Price differences for upgraded items must be paid",
                  "Contact us to check availability before returning for exchange",
                ]}
              />
            </SubSection>

            <SubSection title="Faulty or Damaged Items">
              <BulletList
                items={[
                  "Report defects or damages within 24 hours of delivery",
                  "Provide clear photos of the issue",
                  "We cover return shipping costs for faulty items",
                  "Full refund or free replacement offered",
                  "Extended return period (up to 14 days) for manufacturing defects",
                ]}
              />
            </SubSection>
          </div>
        </Section>

        {/* Contact & Social Media */}
        <Section id="contact" title="Contact Information & Social Media">
          <div className="space-y-6">
            <SubSection title="Contact Details">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Customer Support:</h4>
                  <ul className="space-y-2">
                    <li>
                      <strong>WhatsApp:</strong> +234 803 725 6630
                    </li>
                    <li>
                      <strong>Phone:</strong> +234 803 725 6630
                    </li>
                    <li>
                      <strong>Email:</strong> mclilystores@gmail.com
                    </li>
                    <li>
                      <strong>Response Time:</strong> Within 24 hours
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Business Hours:</h4>
                  <ul className="space-y-2">
                    <li>
                      <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                    </li>
                    <li>
                      <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                    </li>
                    <li>
                      <strong>Sunday:</strong> Closed
                    </li>
                    <li>
                      <strong>Public Holidays:</strong> Closed
                    </li>
                  </ul>
                </div>
              </div>
            </SubSection>

            <SubSection title="Mailing Address">
              <div className="bg-gray-50 dark:bg-surface p-4 rounded-lg">
                <p>
                  <strong>McLily Stores</strong>
                  <br />
                  Plot B32 Valencia Gardens Estate, Dakwo District, Galadinmawa
                  <br />
                  Abuja, Federal Capital Territory
                  <br />
                  Nigeria
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  *Please contact us before sending any items to this address
                </p>
              </div>
            </SubSection>

            <SubSection title="Social Media Links">
              <div className="bg-gradient-to-r from-primary-100 to-primary-200 p-6 rounded-lg">
                <p className="mb-4">
                  <strong>Connect with McLily Stores:</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-3">Current Platforms:</h4>
                    <ul className="space-y-2">
                      <li>
                        ✅ <strong>WhatsApp Business:</strong> +234 803 725 6630
                      </li>
                      <li>
                        🔄 <strong>Instagram:</strong> Coming Soon
                      </li>
                      <li>
                        🔄 <strong>Facebook:</strong> Coming Soon - McLily
                        Stores
                      </li>
                      <li>
                        🔄 <strong>Twitter/X:</strong> Coming Soon
                      </li>
                      <li>
                        🔄 <strong>Snapchat:</strong> Coming Soon
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Future Platforms:</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>📱 TikTok</li>
                      {/* <li>📌 Pinterest</li> */}
                      <li>💼 LinkedIn</li>
                      {/* <li>📺 YouTube</li> */}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-background-white rounded">
                  <p className="text-sm">
                    <strong>Note:</strong> Our social media presence is
                    currently under development. Follow our WhatsApp Business
                    account for the latest updates and announcements about new
                    platform launches.
                  </p>
                </div>
              </div>
            </SubSection>

            <SubSection title="Complaint Resolution">
              <div className="space-y-3">
                <p>
                  <strong>Step 1:</strong> Contact our customer support team via
                  WhatsApp or email
                </p>
                <p>
                  <strong>Step 2:</strong> Provide detailed information about
                  your concern
                </p>
                <p>
                  <strong>Step 3:</strong> Receive acknowledgment within 24
                  hours
                </p>
                <p>
                  <strong>Step 4:</strong> Resolution provided within 3-5
                  business days
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  We are committed to resolving all customer concerns promptly
                  and fairly.
                </p>
              </div>
            </SubSection>
          </div>
        </Section>

        {/* Footer */}
        {/* <footer className='bg-gray-50 rounded-lg p-6 text-center'>
          <div className='space-y-3'>
            <p className='text-lg font-semibold text-primary-700'>McLily Stores</p>
            <p className='text-gray-600'>
              Your trusted online destination for fashion and footwear
            </p>
            <div className='flex justify-center items-center space-x-6 text-sm text-gray-500'>
              <span>Website: mclily-fullstack.onrender.com</span>
              <span>•</span>
              <span>WhatsApp: +234 803 725 6630</span>
            </div>
            <p className='text-xs text-gray-400'>
              © 2025 McLily Stores. All rights reserved.
            </p>
          </div>
        </footer> */}
      </main>
    </div>
  );
}

Legal.propTypes = {};

export default Legal