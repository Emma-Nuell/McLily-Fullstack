import React from "react";
import Chart from "react-apexcharts";

const SalesByCategory = ({ data, value, percent }) => {
  const options = {
    chart: {
      type: "pie",
    },
    labels: ["Men", "Women", "Accessories", "Teens & Kids", "Babies"],
    colors: ["#10B981", "#3B82F6", "#A78BFA", "#FBBF24", "#F87171"],
    legend: {
      labels: {
        colors: ["#6a7282", "#6a7282", "#6a7282", "#6a7282", "#6a7282"],
      },
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      markers: { radius: 4 },
    },
    tooltip: {
      y: {
        formatter: (val) => `₦${val.toLocaleString()}`,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      colors: ["#fff"],
    },
  };

  const series = data || [10400, 9800, 4500, 3100, 2000];

  return (
    <div className='bg-white dark:bg-slate-800 rounded-xl  shadow-md dark:text-white p-6 w-full md:max-w-sm'>
      <div className='flex items-center justify-start mb-12'>
        <h2 className='text-2xl font-semibold dark:text-white'>
          Sales by Category
        </h2>
      </div>
      <div className='flex flex-col items-start mb-12 gap-4'>
        <div>
          <p className='text-xs text-gray-500'>
            Total {new Date().toDateString()}
          </p>
        </div>
              <div className='flex items-center justify-center gap-6'>
                  <div className="flex items-center">
                      
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
            ₦{value.toLocaleString()}
          </h3>
                  </div>
          <div className='text-[16px] text-green-500 font-medium flex items-center justify-start'>
            +{percent}%
          </div>
        </div>
      </div>
      <Chart options={options} series={series} type='pie' height={320} />
    </div>
  );
};
export default SalesByCategory;
