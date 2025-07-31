import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    //common validations
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      activeForm === "signup" &&
      !validatePassword(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, and number";
    }

    if (activeForm === "signup") {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (activeForm === "login") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Login data", {
          email: formData.email,
          password: formData.password,
        });
        navigate("/");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Signup data", formData);
        navigate("/");
      }
    } catch (error) {
      setErrors({ form: "An error occured. Please try again" });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchForm = (form) => {
    setActiveForm(form);
    setErrors({});
  };

  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const passwordStrength =
    activeForm === "signup" ? getPasswordStrength(formData.password) : 0;

  return (
    <div className='min-h-screen bg-gradient-to-br from-white dark:from-background to-primary-50 dark:to-background flex items-center justify-center p-5'>
      <div className='w-full max-w-md bg-background-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300'>
        {/* header */}
        <div className='bg-gradient-to-r from-primary-500 dark:from-primary-300 to-primary-500 dark:to-primary-300 text-white p-8 text-center'>
          <div className='w-34 h-34 bg-background-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
            <img src={Logo} alt='logo' className='w-[84%]' />
          </div>
          <h1 className='text-4xl font-bold mb-2 font-comorant dark:text-gray-900'>
            McLily
          </h1>
        </div>

        {/* form container */}
        <div className='p-6'>
          {errors.form && (
            <div className='mb-4 p-3 bg-red-100 text-red-700 roudned-lg text-sm'>
              {errors.form}
            </div>
          )}

          {/* login */}
          <div
            className={`transition-all duration-500 ${
              activeForm === "login" ? "block animate-fadeIn" : "hidden"
            }`}
          >
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center'>
              Welcome Back
            </h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4 transition-transform duration-200'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  inputMode='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-1 ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-primary-50 bg-primary-50 dark:bg-surface"
                  } focus:border-primary-300  focus:bg-background-white focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-200 dark:focus:border-primary-300 transition-all outline-none`}
                  required
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                )}
              </div>
              <div className='mb-4 transition-transform duration-200'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-1 ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-primary-50 bg-primary-50 dark:bg-surface"
                  } focus:border-primary-300 focus:bg-background-white dark:focus:ring-primary-200 dark:focus:border-primary-300 focus:ring-1 focus:ring-primary-100 transition-all outline-none`}
                  required
                />
                {errors.password && (
                  <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
                )}
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full mt-2 py-3 px-4 bg-gradient-to-r from-primary-500 dark:from-primary-300 to-primary-500 dark:to-primary-300 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:translate-y-0.5 transition-all duration-300 mb-4 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer'
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
              <div className='text-center mb-4'>
                <button
                  type='button'
                  className='text-primary-500 dark:text-primary-300 text-sm font-medium hover:text-primary-600 transition-colors'
                  onClick={() =>
                    alert("Password reset functionality would go here")
                  }
                >
                  Forgot your password?
                </button>
              </div>
            </form>

            <div className='flex items-center my-6'>
              <div className='flex-grow border-t border-gray-300'></div>
              <span className='mx-4 text-gray-500 text-sm dark:text-gray-400'>
                New to McLily?
              </span>
              <div className='flex-grow border-t border-gray-300'></div>
            </div>
            <div className='text-center'>
              <button
                onClick={() => switchForm("signup")}
                className='text-primary-500 dark:text-primary-300 font-semibold hover:text-primary-400 transition-colors'
              >
                Create an account
              </button>
            </div>
          </div>

          {/* sign up */}
          <div
            className={`transition-all duration-500 ${
              activeForm === "signup" ? "block animate-fadeIn" : "hidden"
            }`}
          >
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center'>
              Join McLily
            </h2>
            <form onSubmit={handleSubmit}>
              <div className='flex gap-4 mb-4'>
                <div className='flex-1 transition-transform duration-200'>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-1 ${
                      errors.firstName
                        ? "border-red-300 bg-red-50"
                        : "border-primary-50 bg-primary-50 dark:bg-surface"
                    } focus:border-primary-300 focus:bg-white dark:focus:ring-primary-200 dark:focus:border-primary-300 focus:ring-1 outline-none focus:ring-primary-100 transition-all`}
                    required
                  />
                  {errors.firstName && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className='flex-1 transition-transform duration-200'>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-1 ${
                      errors.lastName
                        ? "border-red-300 bg-red-50"
                        : "border-primary-50 bg-primary-50 dark:bg-surface"
                    } focus:border-primary-300 focus:bg-white focus:ring-1 dark:focus:ring-primary-200 dark:focus:border-primary-300 outline-none focus:ring-primary-100 transition-all`}
                    required
                  />
                  {errors.lastName && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className='mb-4 transition-transform duration-200'>
                <label
                  htmlFor='signupEmail'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='signupEmail'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-1 ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-primary-50 bg-primary-50 dark:bg-surface"
                  } focus:border-primary-300 focus:bg-white focus:ring-1 dark:focus:ring-primary-200 dark:focus:border-primary-300 outline-none focus:ring-primary-100 transition-all`}
                  required
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                )}
              </div>
              <div className='mb-4 transition-transform duration-200'>
                <label
                  htmlFor='signupPassword'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='signupPassword'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-1 ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-primary-50 bg-primary-50 dark:bg-surface"
                  } focus:border-primary-300 focus:bg-white focus:ring-1 dark:focus:ring-primary-200 dark:focus:border-primary-300 outline-none focus:ring-primary-100 transition-all`}
                  required
                />
                {activeForm === "signup" && (
                  <div className='mt-2'>
                    <div className='flex gap-1 mb-1'>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i <= passwordStrength
                              ? passwordStrength <= 2
                                ? "bg-red-400"
                                : passwordStrength <= 4
                                ? "bg-yellow-400"
                                : "bg-green-400"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs ${
                        passwordStrength <= 2
                          ? "text-red-600"
                          : passwordStrength <= 4
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {passwordStrength <= 2
                        ? "Weak"
                        : passwordStrength <= 4
                        ? "Moderate"
                        : "Strong"}{" "}
                      password
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
                )}
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-3 mt-2 px-4 bg-gradient-to-r from-primary-500 to-primary-500 dark:from-primary-300 dark:to-primary-300 dark:text-gray-200 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mb-4 disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            <div className='flex items-center my-6'>
              <div className='flex-grow border-t border-gray-300'></div>
              <span className='mx-4 text-gray-500 dark:text-gray-400 text-sm'>
                Already have an account?
              </span>
              <div className='flex-grow border-t border-gray-300'></div>
            </div>
            <div className='text-center'>
              <button
                onClick={() => switchForm("login")}
                className='text-primary-500 dark:text-primary-300 font-semibold hover:text-primary-400 transition-colors'
              >
                Sign in instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
