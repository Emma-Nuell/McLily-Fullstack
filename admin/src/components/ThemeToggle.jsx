import { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import ThemeContext from "../context/theme/Themecontext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className='transition ease-in-out duration-500 rounded-full p-2'>
      {theme === "dark" ? (
        <Sun
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className='text-gray-500 text-2xl dark:text-white cursor-pointer'
        />
      ) : (
        <Moon
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className=' text-2xl dark:text-gray-400 cursor-pointer'
        />
      )}
    </div>
  );
};
export default ThemeToggle;
