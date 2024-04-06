import { createSignal, createEffect } from "solid-js";
import { ButtonDarkMode } from "../ButtonDarkMode";

export const Navbar = ({ children }) => {
  const [darkMode, setDarkMode] = createSignal(localStorage.getItem("darkMode") === "true");

  createEffect(() => {
    document.body.classList.toggle("dark", darkMode());
    localStorage.setItem("darkMode", darkMode());
  });

  const handleDarkMode = () => {
    setDarkMode(!darkMode());
  };

  return (
    <>
      <div className="dark:bg-gray-800 flex gap-4 items-center justify-between w-full text-white py-5 px-7 dark:text-gray-200">
        <h1 className="text-2xl font-black text-black hover:opacity-80 dark:text-white dark:bg-gray-800">
          Daniel Vásquez
        </h1>

        <div className="flex">
          <label className="relative inline-flex items-center cursor-pointer text-black dark:text-white">
            <input
              onChange={handleDarkMode}
              type="checkbox" className="sr-only peer"
            />
            <ButtonDarkMode
              className="w-11 h-11 text-yellow-500 bg-blue-500 rounded-full dark:text-white dark:bg-black"
            />
          </label>
        </div>

      </div>
      {children}
    </>
  )
}
