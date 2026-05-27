import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSun,
  FaMoon,
  FaBars,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import useCartStore from "../store/cartStore";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  // ✅ FIXED ZUSTAND SELECTOR
  const cartItemsCount = useCartStore((state) => state.getCount());

  const navigate = useNavigate();

  const navLinks = [
    { name: "Shop", path: "/" },
    ...(user?.role === "admin" ? [{ name: "Admin", path: "/admin" }] : []),
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* LEFT SIDE */}
            <div className="flex items-center">
              {/* LOGO */}
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopHub
                </span>
              </Link>

              {/* DESKTOP NAV */}
              <div className="hidden md:flex md:ml-6 md:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4">
              {/* DARK MODE */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? (
                  <FaSun className="text-yellow-500 text-xl" />
                ) : (
                  <FaMoon className="text-gray-700 dark:text-gray-200 text-xl" />
                )}
              </button>

              {/* WISHLIST */}
              <Link
                to="/wishlist"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FaHeart className="text-gray-700 dark:text-gray-200 text-xl" />
              </Link>

              {/* CART */}
              <button
                onClick={() => useCartStore.getState().toggleCart()}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FaShoppingCart className="text-gray-700 dark:text-gray-200 text-xl" />

                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* USER */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <FaUser className="text-gray-700 dark:text-gray-200" />

                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {user.name}
                    </span>
                  </button>

                  {/* DROPDOWN */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 py-1 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Orders
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Login
                </button>
              )}

              {/* MOBILE MENU */}
              <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FaBars className="text-gray-700 dark:text-gray-200 text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navbar;
