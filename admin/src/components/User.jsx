import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/index.js";
import { useModal, useToast } from "../context/Modal/useModal&Toast";
import { LogOut, User2 } from "lucide-react";
import { Description } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { logout, admin } = useAuthContext();
  const { showConfirmation, OPERATION_TYPES } = useModal();
  const { showToast, TOAST_TYPES } = useToast();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    showConfirmation({
      title: "Logout Confirmation",
      description: "Are you sure you want to logout?",
      operationType: OPERATION_TYPES.APPROVE,
      itemType: "logout",
      itemName: `logout`,
      onConfirm: async () => {
        try {
          await logout();
          showToast("Logout Successful, redirecting you", TOAST_TYPES.SUCCESS);
          navigate("/login");
        } catch (error) {
          showToast(
            `Logout failed: ${error.message || "Please try again"}`,
            TOAST_TYPES.ERROR
          );
        }
      },
    });
  };
  return (
    <div
      ref={dropdownRef}
      className='relative flex justify-end items-center mr-2'
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='cursor-pointer outline-none focus:outline-none dark:text-white'
      >
        <User2 className='text-xl' />
      </button>
      {isOpen && (
        <div className='absolute right-0 max-sm:-right-10 top-17 mt-2 p-6 w-auto max-sm:min-w-[220px] min-w-[280px] rounded-lg shadow-lg z-10 bg-white dark:bg-slate-800 dark:text-dark-text'>
          <div className='border-b-1 py-4 pt-1 border-light-border dark:border-dark-border'>
            <h3 className='font-extrabold text-xl'>Welcome {admin.name}</h3>
          </div>
          <div className='py-4'>
            <button
              onClick={handleLogout}
              className='bg-light-button dark:bg-dark-button w-full rounded-md p-4 cursor-pointer hover:bg-light-buttonhover dark:hover:bg-dark-buttonhover font-medium flex items-center gap-4 justify-center'
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default User;
