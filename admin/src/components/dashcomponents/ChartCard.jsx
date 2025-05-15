import React from "react";
import Chart from "react-apexcharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const ChartCard = ({
  title,
  value,
  percentage,
  data,
  icon,
  color = "#0ea5e9",
}) => {
  const chartOptions = {
    chart: {
      type: "line",
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      x: { show: false },
      y: {
        formatter: (val) => val.toLocaleString(),
      },
    },
    colors: [color],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.7,
        opacityFrom: 0.65,
        opacityTo: 0,
        stops: [0, 99, 100],
      },
    },
  };

  const chartSeries = [
    {
      name: "Data",
      data: data || [10, 20, 15, 30, 25, 35],
    },
  ];
  return (
    <div className='bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[240px]'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center gap-6'>
          <div className='relative w-34 h-34 flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 48 52'
              className='absolute inset-0 w-full h-full'
              fill='none'
            >
              <path
                d='M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z'
                fill={color}
              ></path>
            </svg>
            <span className='z-10 text-white'>{icon}</span>
          </div>
          <div className='flex flex-col items-start justify-start'>
            <p className='text-lg font-light text-gray-500 dark:text-gray-400'>
              {title}
            </p>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
              {value}
            </h3>
          </div>
        </div>
        <div
          className={`text-sm font-medium flex items-center gap-4 justify-center dark:text-dark-text-secondary text-light-text-secondary `}
        >
          {percentage >= 0 ? (
            <TrendingUp
              size={22}
              className={`${
                percentage >= 0 ? "text-green-800" : "text-red-500"
              }`}
            />
          ) : (
            <TrendingDown
              size={22}
              className={`${
                percentage >= 0 ? "text-green-800" : "text-red-500"
              }`}
            />
          )}
          {percentage}%
        </div>
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type='area'
        height={60}
      />
    </div>
  );
};
export default ChartCard;
