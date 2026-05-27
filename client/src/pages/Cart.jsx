import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useCartStore from "../store/cartStore";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Looks like you haven't added any items yet
        </p>
        <Link to="/" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6"
      >
        <FaArrowLeft /> Continue Shopping
      </button>

      <h1 className="text-3xl font-bold dark:text-white mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4"
            >
              <img
                src={item.images?.[0] || "https://via.placeholder.com/100"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-lg font-semibold dark:text-white hover:text-blue-600">
                      {item.name}
                    </h3>
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>

                <p className="text-blue-600 font-bold mb-2">${item.price}</p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    <FaMinus size={12} className="mx-auto" />
                  </button>
                  <span className="w-12 text-center dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    <FaPlus size={12} className="mx-auto" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal
                </span>
                <span className="dark:text-white">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>
                <span className="dark:text-white">Free</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span className="dark:text-white">Total</span>
                  <span className="text-blue-600 text-xl">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="btn-primary w-full mb-3"
            >
              Proceed to Checkout
            </button>

            <button onClick={clearCart} className="btn-secondary w-full">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
