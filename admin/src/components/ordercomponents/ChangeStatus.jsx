import { useEffect, useState } from "react"


const ChangeStatus = ({ currentStatus,  isOpen, setIsOpen, onStatusChange, isUpdating}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  
  useEffect(() => {
    setSelectedStatus(currentStatus);
  },[currentStatus])
    

    const orderStatuses = [
      { id: "Pending", label: "Pending" },
      { id: "Processing", label: "Processing" },
      { id: "Shipped", label: "Shipped" },
      { id: "Out_for_delivery", label: "Out for Delivery" },
      { id: "Delivered", label: "Delivered" },
      { id: "Cancelled", label: "Cancelled" },
      { id: "Returned", label: "Returned" },
      { id: "Refunded", label: "Refunded" },
    ];

    function getStatusColor(status) {
      switch (status) {
        case "Pending":
          return "bg-yellow-500";
        case "Processing":
          return "bg-blue-500";
        case "Shipped":
          return "bg-purple-500";
        case "Out_for_delivery":
          return "bg-indigo-500";
        case "Delivered":
          return "bg-green-500";
        case "Cancelled":
          return "bg-red-500";
        case "Returned":
          return "bg-orange-500";
        case "Refunded":
          return "bg-pink-500";
        default:
          return "bg-gray-500";
      }
    }

    const handleSubmit = () => {
      if (selectedStatus !== currentStatus) {
        onStatusChange(selectedStatus);
      }
      setIsOpen(false);
    };
    return (
      <div className='relative'>
        <div className='bg-white dark:bg-slate-800 dark:text-dark-text rounded-lg shadow-lg p-10 mb-10'>
          <button
            className='w-full text-center cursor-pointer bg-blue-600 text-white rounded-lg py-2'
            onClick={() => setIsOpen(true)}
          >
            {isUpdating ? "Updating..." : "Update Status"}
          </button>
        </div>

        {isOpen && (
          <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className='bg-white dark:bg-dark-overlaybg rounded-lg p-6 w-full max-md:max-w-sm max-w-[350px]  dark:text-dark-text'>
              <h3 className='text-lg font-medium mb-4'>Change Order Status</h3>
              <p className='text-light-text-secondary dark:text-dark-text-secondary mb-4'>
                Current Status:{" "}
                <span className='font-semibold'>
                  {orderStatuses.find((s) => s.id === currentStatus)?.label ||
                    currentStatus}
                </span>
              </p>

              <div className='space-y-7 max-h-60 overflow-y-auto scrollbar-hidden mb-4'>
                {orderStatuses.map((status) => (
                  <div
                    key={status.id}
                    className={`p-3 rounded cursor-pointer ${
                      selectedStatus == status.id
                        ? "bg-blue-100 border border-blue-500 dark:bg-blue-400/70"
                        : "hover:bg-gray-100 border border-gray-200 dark:border-dark-overlayborder dark:hover:bg-dark-overlaybtnhover rounded-md shadow-md"
                    }`}
                    onClick={() => setSelectedStatus(status.id)}
                  >
                    <div className='flex items-center'>
                      <div
                        className={`w-4 h-4 rounded-full mr-3 ${getStatusColor(
                          status.id
                        )}`}
                      ></div>
                      <span>{status.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex justify-end space-x-4 mt-6'>
                <button
                  className='px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-overlaybtnhover'
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className='px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600'
                  onClick={handleSubmit}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
export default ChangeStatus