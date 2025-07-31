import { useState, useEffect } from "react";
import { AlertCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";

const Error = () => {
  const [countdown, setCountdown] = useState(10);
  const [errorCode] = useState(404);
  const [errorMessage] = useState("Page not found");
  const [errorDescription] = useState(
    "The page you are looking for doesn't exist or has been moved."
  );


  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background flex flex-col items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden'>
        <div className='bg-red-600 p-6 flex items-center justify-center'>
          <AlertCircle className='text-white h-16 w-16' />
        </div>

        <div className='p-6'>
          <div className='text-center'>
            <h1 className='text-6xl font-bold text-gray-800 dark:text-gray-200 mb-2'>
              {errorCode}
            </h1>
            <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-500 mb-4'>
              {errorMessage}
            </h2>
            <p className='text-gray-600 mb-8'>{errorDescription}</p>

            {countdown > 0 && (
              <p className='text-sm text-gray-500 mb-6'>
                Redirecting to dashboard in {countdown} seconds...
              </p>
            )}

            <div className='flex flex-col md:flex-row gap-3 justify-center'>
              <button
                onClick={handleGoBack}
                className='inline-flex cursor-pointer items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <ArrowLeft className='mr-2 size-10' />
                Go Back
              </button>

              <button
                onClick={handleGoHome}
                className='inline-flex cursor-pointer items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <Home className='mr-2 size-10' />
                Dashboard
              </button>

              <button
                onClick={handleRefresh}
                className='inline-flex cursor-pointer items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <RefreshCw className='mr-2 size-10' />
                Try Again
              </button>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 dark:bg-slate-800 px-6 py-4 border-t border-gray-200 dark:border-slate-700'>
          <p className='text-xs text-center text-gray-500'>
            If you continue to experience issues, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Error;
