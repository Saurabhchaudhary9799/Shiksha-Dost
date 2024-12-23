import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import company_logo from "../../assets/company_logo.png";
import { useForm } from "react-hook-form";
import { FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Sidebar from "@/components/ui/Sidebar";
import SearchContainer from "@/components/ui/SearchContainer";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const { register, handleSubmit } = useForm();

  // on search
  const onSearch = (data) => {
    console.log("Search Query:", data.query);
  };

  // state management
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSideBar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      document.documentElement.classList.toggle("dark", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Set initial theme
    if (isDarkMode) document.documentElement.classList.add("dark");
  }, [isDarkMode]);

  return (
    <nav
      className={`header shadow-md mb-10 bg-white ${
        isSticky ? "fixed top-0 left-0 w-full z-50" : ""
      } transition duration-300 ease-in`}
    >
      <div className="container flex items-center justify-between gap-x-5 md:gap-x-10 mx-auto px-4">
        {/* Logo */}
        <a href="/">
          <img
            className="company-logo w-16 h-16 xl:w-24 xl:h-24"
            src={company_logo}
            alt="Company Logo"
          />
        </a>

        {/* Header List */}
        <div className="hidden xl:flex items-center gap-x-5 font-semibold">
          <a href="#" className="header-item">
            MBBS Abroad
          </a>
          <div className="relative">
            <button
              className="flex items-center gap-x-1"
              onClick={toggleDropdown}
            >
              All Courses
              <span>
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown absolute left-0 mt-2 w-48 bg-[#0B545D] rounded shadow-md text-white p-3 z-10">
                <a href="#" className="group flex justify-between p-2 border-b">
                  JEE{" "}
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    <FaChevronRight />
                  </span>
                </a>
                <a href="#" className="group flex justify-between p-2 border-b">
                  NEET{" "}
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    <FaChevronRight />
                  </span>
                </a>
                <a href="#" className="group flex justify-between p-2">
                  CUET{" "}
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    <FaChevronRight />
                  </span>
                </a>
              </div>
            )}
          </div>
          <a href="/mentors" className="header-item">
            Mentors
          </a>
          <a href="#" className="header-item">
            Articles
          </a>
        </div>

        {/* Search Box and Menu */}
        <div className="flex gap-x-5 items-center">
          {/* Search Input (Hidden on Mobile) */}
          <form onSubmit={handleSubmit(onSearch)} className="hidden xl:flex">
            <input
              {...register("query")}
              placeholder="Search"
              className="px-2 py-1 rounded-l-full border bg-gray-100  text-black"
            />
            <button className="px-2 py-1 bg-[#0B545D] text-white rounded-r-full">
              <IoSearchOutline />
            </button>
          </form>

          {/* Theme Toggle Button */}
          {/* <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600"
            layout
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? (
              <IoMdSunny className="text-yellow-400" size={20} />
            ) : (
              <IoMdMoon className="text-gray-800" size={20} />
            )}
          </motion.button> */}

          {/* Search Icon for Mobile */}
          <button onClick={toggleMobileSearch} className="text-2xl xl:hidden">
            <IoSearchOutline />
          </button>

          {/* Hamburger Menu */}
          <div className="text-2xl xl:hidden" onClick={toggleSideBar}>
            <GiHamburgerMenu />
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-x-3">
          {user ? (
            <div>
              <span>Welcome, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link
              to={"/register"}
              className="px-2 py-2 rounded bg-[#0B545D] text-white"
              aria-label="Signup to Shiksha-Dost"
            >
              <span>Get Started</span>
            </Link>
          )}
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <SearchContainer
              toggleMobileSearch={toggleMobileSearch}
              onSearch={onSearch}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && <Sidebar toggleSideBar={toggleSideBar} />}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Header;
