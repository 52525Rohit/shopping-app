import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import useWishlistStore from "../store/wishlistStore";
import useCartStore from "../store/cartStore";

const Wishlist = () => {
  const { items, removeItem, moveToCart } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FaHeart className="text-6xl text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Your wishlist is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Save your favorite items here
        </p>
        <Link to="/" className="btn-primary inline-block">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold dark:text-white mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={item.images?.[0] || "https://via.placeholder.com/300"}
                alt={item.name}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="p-4">
              <Link to={`/product/${item.id}`}>
                <h3 className="text-lg font-semibold dark:text-white hover:text-blue-600 mb-2">
                  {item.name}
                </h3>
              </Link>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  ${item.price}
                </span>
                <span className="text-sm text-gray-500">In Stock</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => moveToCart(item, addToCart)}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Move to Cart
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
