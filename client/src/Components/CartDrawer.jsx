import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import useCartStore from "../store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    isOpen,
    toggleDrawer,
  } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleDrawer}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold dark:text-white">
                Shopping Cart
              </h2>
              <button
                onClick={toggleDrawer}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    Your cart is empty
                  </p>
                  <Link
                    to="/"
                    onClick={toggleDrawer}
                    className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border rounded-lg dark:border-gray-700"
                    >
                      <img
                        src={
                          item.images?.[0] || "https://via.placeholder.com/100"
                        }
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-blue-600 font-bold">${item.price}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="w-8 text-center dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            <FaPlus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-red-500 hover:text-red-600"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t dark:border-gray-700 p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold dark:text-white">Total:</span>
                  <span className="text-xl font-bold text-blue-600">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  onClick={toggleDrawer}
                  className="btn-primary w-full text-center block"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
