import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';
import { ChevronDown, ChevronUp, Clipboard, Lock, Phone, Shield, User } from 'lucide-react';
import Logo from '../../assets/logo.svg';

const AccountManagement = () => {

      const [profileExpanded, setProfileExpanded] = useState(false);
      const [securityExpanded, setSecurityExpanded] = useState(false);

      const toggleProfileSection = () => {
        setProfileExpanded(!profileExpanded);
      };

      const toggleSecuritySection = () => {
        setSecurityExpanded(!securityExpanded);
      };
  return (
    <div className='bg-gray-50 dark:bg-surface  page-100'>
      <div className='max-w-md mx-auto'>
        <div className='mt-6'>
          <div className='px-4 mb-6'>
            <div className='flex justify-center mb-4'>
              <div className='w-32 h-32 bg-white rounded-full flex items-center justify-center'>
                <div className='w-26 h-26 bg-white rounded-full flex items-center justify-center'>
                  <img src={Logo} alt='Logo' className='w-[96%]' />
                </div>
              </div>
            </div>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-200 text-center'>
              Hello Okoye Mcpaul
            </h2>
          </div>

          <div className='bg-background-white rounded-lg mx-4 mb-4 shadow-md'>
            <div
              className='flex items-center justify-between px-4 py-4 cursor-pointer'
              onClick={toggleProfileSection}
            >
              <div className='flex items-center space-x-3'>
                <div className='w-18 h-18 bg-gray-100 dark:bg-surface rounded-full flex items-center justify-center'>
                  <User
                    className=' text-primary-600 dark:text-primary-300'
                    size={18}
                  />
                </div>
                <span className='text-gray-800 dark:text-gray-200 font-medium'>
                  Profile Details
                </span>
              </div>
              {profileExpanded ? (
                <ChevronUp
                  className=' text-primary-400 dark:text-primary-300'
                  size={16}
                />
              ) : (
                <ChevronDown
                  className=' text-primary-400 dark:text-primary-300'
                  size={16}
                />
              )}
            </div>

            {profileExpanded && (
              <div className='border-t border-primary-300 dark:border-primary-100'>
                <div className='px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-primary-300 dark:border-primary-100 last:border-b-0 flex space-x-3'>
                  <Clipboard
                    className=' text-primary-600 dark:text-primary-300'
                    size={18}
                  />
                  <span className='text-gray-700 dark:text-gray-300 font-medium'>
                    Basic Details
                  </span>
                </div>
                <div className='px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'>
                  <div className='flex items-center space-x-3'>
                    <Phone
                      className='text-primary-600 dark:text-primary-300'
                      size={18}
                    />
                    <span className='text-gray-700 dark:text-gray-300 font-medium'>
                      Edit Phone Number
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='bg-background-white rounded-lg mx-4 mb-4 shadow-md'>
            <div
              className='flex items-center justify-between px-4 py-4 cursor-pointer'
              onClick={toggleSecuritySection}
            >
              <div className='flex items-center space-x-3'>
                <div className='w-18 h-18 bg-gray-100 dark:bg-surface rounded-full flex items-center justify-center'>
                  <Lock
                    className=' text-primary-600 dark:text-primary-300'
                    size={18}
                  />
                </div>
                <span className='text-gray-800 dark:text-gray-200 font-medium'>
                  Security Settings
                </span>
              </div>
              {securityExpanded ? (
                <ChevronUp
                  className='text-primary-400 dark:text-primary-300'
                  size={16}
                />
              ) : (
                <ChevronDown
                  className='text-primary-400 dark:text-primary-300'
                  size={16}
                />
              )}
            </div>

            {securityExpanded && (
              <div className='border-t border-primary-300 dark:border-primary-100'>
                <div className='px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-primary-300 dark:border-primary-100'>
                  <div className='flex items-center space-x-3'>
                    <Lock
                      className='text-primary-600 dark:text-primary-300'
                      size={18}
                    />
                    <span className='text-gray-700 dark:text-gray-300 font-medium'>
                      Change Password
                    </span>
                  </div>
                </div>
                <div className='px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'>
                  <div className='flex items-center space-x-3'>
                    <Shield
                      className=' text-red-500 dark:text-red-700'
                      size={18}
                    />
                    <span className='text-red-500 font-medium'>
                      Delete Account
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='flex justify-center mt-12 mb-8'>
          <div className='flex items-center space-x-4'>
            <span className='text-2xl font-bold text-gray-800 dark:text-gray-200 font-comorant'>
              McLily
            </span>
            <div className='w-22 h-22 bg-white rounded-full flex items-center justify-center'>
              <img src={Logo} alt='logo' className='w-[90%]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AccountManagement.propTypes = {}

export default AccountManagement