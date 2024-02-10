import { createSignal, createEffect } from "solid-js";
import { Link } from "react-router-dom";

export const Navbar = ({ children }) => {
  const [darkMode, setDarkMode] = createSignal(true);

  createEffect(() => {
    document.body.classList.toggle("dark", darkMode());
  });

  const handleDarkMode = () => {
    setDarkMode(!darkMode())
  }

  return (
    <>
      <div className="dark:bg-gray-800 flex flex-col gap-4 items-center justify-between w-full text-white p-4 sm:flex-row dark:text-gray-200">
        <h1 className="text-2xl font-black text-black hover:opacity-80 cursor-pointer dark:text-white dark:bg-gray-800">
          Daniel Vásquez
        </h1>

        <div className="flex gap-2 items-center">
          <span className="text-lg font-medium text-gray-900 dark:text-gray-300">
            Dark
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              onChange={handleDarkMode}
              type="checkbox" value="" className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className="text-lg font-medium text-gray-900 dark:text-gray-300">
            Light
          </span>
        </div>

      </div>
      {children}
    </>
  )
}
