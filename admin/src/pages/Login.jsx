import { useThemeContext, useAuthContext } from "../context/index.js";
import { MclilyLoader } from "../components/Loaders/index.js";
import { Sun, Moon, Lock, Mail, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, loading, error } = useAuthContext();
  const { theme, setTheme } = useThemeContext();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate("/")
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <MclilyLoader />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 transition-all duration-500 bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-slate-700 dark:to-slate-800'>
      
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className='fixed top-6 right-6 p-3 rounded-full transition-all duration-300 bg-white text-gray-700 hover:bg-gray-50 shadow-lg dark:bg-slate-900 dark:text-white dark:hover:bg-slate-600'
        aria-label='Toggle Theme'
        title='Toggle Theme'
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className='w-full max-w-md mx-auto transition-all duration-500 bg-white shadow-xl dark:bg-slate-900 dark:shadow-2xl rounded-2xl p-8'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-25 h-25 rounded-full mb-4 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400'>
            <Lock size={24} />
          </div>
          <h1 className='text-2xl font-bold mb-2 text-gray-900 dark:text-white'>
            McLily Admin
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Sign in to your admin dashboard
          </p>
        </div>

        {error && (
          <div className='mb-6 p-4 rounded-lg border-l-4 bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300'>
            <p className='text-sm font-medium'>{error}</p>
          </div>
        )}

        <div className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Email Address
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='size-10 text-gray-400' />
              </div>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-15 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-600 dark:border-slate-500 dark:text-white dark:placeholder-gray-400 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder='admin@mclily.com'
                autoComplete='email'
              />
            </div>
            {errors.email && (
              <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Password
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='size-10 text-gray-400' />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-15 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-600 dark:border-slate-500 dark:text-white dark:placeholder-gray-400 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder='Enter your password'
                autoComplete='current-password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:hover:text-gray-300 hover:text-gray-600 '
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className='mt-1 text-sm text-red-500'>{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className='w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 cursor-pointer'
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
