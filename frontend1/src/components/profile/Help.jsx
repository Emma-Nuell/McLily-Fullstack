import React from 'react'
import PropTypes from 'prop-types'
import { faqData} from "../../utils/constants.jsx"
import { ChevronDown, ChevronUp, Mail, MessageCircle, Package, CreditCard, Shield, ShoppingCart, Clock, Phone, Headphones, Send, HelpCircle  } from 'lucide-react';
import { useState } from 'react';

const Help = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      alert(
        "Your message has been sent successfully! We'll get back to you within 24 hours."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleWhatsAppTechnical = () => {
    const phoneNumber = "+2349012345678"; // IT Support WhatsApp number
    const message = encodeURIComponent(
      "Hi! I need technical support with the website."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleWhatsAppSales = () => {
    const phoneNumber = "+2349087654321"; // Sales Support WhatsApp number
    const message = encodeURIComponent(
      "Hi! I need help with sales, products, or my order."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-surface'>
      {/* Header */}
      <div className='border-b bg-background-white rounded-lg shadow-md border-primary-300 dark:border-primary-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='text-center'>
            <HelpCircle
              className='text-primary-600 dark:text-primary-300 mx-auto mb-4'
              size={32}
            />
            <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-200 mb-2'>
              Help & Support
            </h1>
            <p className='text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              We are here to help! Get in touch with us through any of the
              options below or browse our frequently asked questions.
            </p>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div>
            <div className='bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-8'>
              <div className='flex items-center mb-6'>
                <Mail
                  className='text-primary-600 dark:text-primary-300 mr-3'
                  size={22}
                />
                <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-200'>
                  Send us a Message
                </h2>
              </div>

              <div className='space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='dark:text-gray-200 text-gray-900  text-sm block mb-2'
                    >
                      Full Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className=' px-4 focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent'
                      placeholder='Enter your full name'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='dark:text-gray-200 text-gray-900 text-sm block mb-2'
                    >
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className='px-4 focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent'
                      placeholder='Enter your email'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='subject'
                    className='dark:text-gray-200 text-gray-900 text-sm block mb-2'
                  >
                    Subject *
                  </label>
                  <select
                    id='subject'
                    name='subject'
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 bg-transparent border text-base text-gray-900 dark:text-gray-300 border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-0 focus:border-transparent'
                  >
                    <option value='' className='bg-surface'>
                      Select a subject
                    </option>
                    <option value='order-issue' className='bg-surface'>
                      Order Issue
                    </option>
                    <option value='product-question' className='bg-surface'>
                      Product Question
                    </option>
                    <option value='payment-problem' className='bg-surface'>
                      Payment Problem
                    </option>
                    <option value='technical-issue' className='bg-surface'>
                      Technical Issue
                    </option>
                    <option value='shipping-inquiry' className='bg-surface'>
                      Shipping Inquiry
                    </option>
                    <option value='return-refund' className='bg-surface'>
                      Return/Refund
                    </option>
                    <option value='account-help' className='bg-surface'>
                      Account Help
                    </option>
                    <option value='other' className='bg-surface'>
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='dark:text-gray-200 text-gray-900 text-sm block mb-2'
                  >
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className=' px-4  focus:outline-none transition-colors w-full text-base text-gray-900 dark:text-gray-300  py-3 border border-primary-300 rounded-lg dark:border-primary-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-200 outline-0 focus:border-transparent resize-none scrollbar-hidden'
                    placeholder='Please describe your issue or question in detail...'
                  />
                </div>

                <button
                  type='button'
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className='w-full px-6 py-3 dark:bg-primary-300 bg-primary-500  dark:text-text text-gray-900 text-base font-medium rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors flex items-center justify-center'
                >
                  {isSubmitting ? (
                    <>
                      <div className='animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-2'></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className='mr-2' size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </div>

              <div className='mt-8 pt-8 border-t border-primary-300 dark:border-primary-100'>
                <p className='text-sm text-gray-600 dark:text-gray-400 text-center'>
                  We typically respond within <strong>24 hours</strong> during
                  business days.
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Support & Contact Info */}
          <div className='space-y-8'>
            {/* WhatsApp Support */}
            <div className='bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-8'>
              <div className='flex items-center mb-6'>
                <MessageCircle className='text-green-600 mr-3' size={20} />
                <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-200'>
                  WhatsApp Support
                </h2>
              </div>

              <p className='text-gray-600 dark:text-gray-400 mb-6 text-sm'>
                Get instant help through WhatsApp. Choose the type of support
                you need:
              </p>

              <div className='space-y-4'>
                <button
                  onClick={handleWhatsAppTechnical}
                  className='w-full p-6 border-2 border-red-200 dark:border-red-400/70 rounded-lg hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-800/10 transition-colors text-left group'
                >
                  <div className='flex items-start'>
                    <div className='p-3 bg-red-100 dark:bg-red-400  rounded-lg mr-4 group-hover:bg-red-200 transition-colors'>
                      <Headphones
                        className=' text-red-600 dark:text-red-900'
                        size={20}
                      />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-base font-semibold text-gray-900 dark:text-gray-200 mb-2'>
                        Technical Support
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 mb-3'>
                        Issues with the website, login problems, payment errors,
                        or app-related questions.
                      </p>
                      <div className='flex items-center text-green-600  font-medium'>
                        <MessageCircle className='mr-2' size={14} />
                        Chat with IT Support
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleWhatsAppSales}
                  className='w-full p-6 border-2 border-blue-200 dark:border-blue-400/70 rounded-lg hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800/10 transition-colors text-left group'
                >
                  <div className='flex items-start'>
                    <div className='p-3 bg-blue-100 dark:bg-blue-400 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors'>
                      <ShoppingCart
                        className='text-blue-600 dark:text-blue-900'
                        size={20}
                      />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2'>
                        Sales & Orders
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 mb-3'>
                        Product inquiries, order status, shipping questions,
                        returns, and general sales support.
                      </p>
                      <div className='flex items-center text-green-600 font-medium'>
                        <MessageCircle className=' mr-2' size={14} />
                        Chat with Sales Team
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div className='mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
                <div className='flex items-center'>
                  <Clock className=' text-green-600 mr-2' size={22} />
                  <span className='text-xs font-medium text-green-800'>
                    WhatsApp Support Hours: 8:00 AM - 10:00 PM (Mon-Sat)
                  </span>
                </div>
              </div>
            </div>

            {/* Other Contact Methods */}
            <div className='bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100 p-8'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-200 mb-6'>
                Other Ways to Reach Us
              </h3>

              <div className='space-y-4'>
                <div className='flex items-center'>
                  <Phone className=' text-gray-400 mr-4' size={18} />
                  <div>
                    <p className='font-medium text-gray-900 dark:text-gray-200'>
                      Call Us
                    </p>
                    <p className='text-gray-600 dark:text-gray-400'>
                      +234 901 234 5678
                    </p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <Mail className=' text-gray-400 mr-4' size={18} />
                  <div>
                    <p className='font-medium text-gray-900 dark:text-gray-200'>
                      Email
                    </p>
                    <p className='text-gray-600 dark:text-gray-400'>
                      support@yourstore.com
                    </p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <Clock className=' text-gray-400 mr-4' size={18} />
                  <div>
                    <p className='font-medium text-gray-900 dark:text-gray-200'>
                      Business Hours
                    </p>
                    <p className='text-gray-600 dark:text-gray-400'>
                      Mon-Fri: 8AM-8PM, Sat: 9AM-6PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mt-16'>
          <div className='text-center mb-12'>
            <h2 className='text-xl font-bold text-gray-900 dark:text-gray-200 mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Find quick answers to common questions. Cant find what you are
              looking for? Contact us directly.
            </p>
          </div>

          <div className='space-y-8'>
            {faqData.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className='bg-background-white rounded-lg shadow-md border border-primary-300 dark:border-primary-100'
              >
                <div className='p-6 border-b border-primary-300 dark:border-primary-100'>
                  <div className='flex items-center'>
                    <category.icon
                      className='text-primary-600 dark:text-primary-300 mr-3'
                      size={18}
                    />
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-200'>
                      {category.category}
                    </h3>
                  </div>
                </div>

                <div className='divide-y divide-primary-300 dark:divide-primary-100'>
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    const isExpanded = expandedFAQ === globalIndex;

                    return (
                      <div key={faqIndex}>
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className='w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
                        >
                          <div className='flex items-center justify-between'>
                            <h4 className='text-base font-medium text-gray-900 dark:text-gray-200 pr-4'>
                              {faq.question}
                            </h4>
                            {isExpanded ? (
                              <ChevronUp
                                className=' text-gray-500 flex-shrink-0'
                                size={16}
                              />
                            ) : (
                              <ChevronDown
                                className=' text-gray-500 flex-shrink-0'
                                size={16}
                              />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className='px-6 pb-4'>
                            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 bg-primary-600 dark:bg-primary-200 rounded-lg p-8 text-center'>
          <h3 className='text-2xl font-bold text-white mb-4'>
            Still Need Help?
          </h3>
          <p className='text-blue-100 mb-6'>
            Our support team is standing by to assist you with any questions or
            concerns.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={handleWhatsAppSales}
              className='px-6 py-3 bg-green-500 dark:bg-green-600 text-white font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center'
            >
              <MessageCircle className=' mr-2' size={14} />
              Chat on WhatsApp
            </button>
            <a
              href='mailto:support@yourstore.com'
              className='px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center'
            >
              <Mail className='mr-2' size={14} />
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

Help.propTypes = {}

export default Help