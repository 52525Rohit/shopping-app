import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addItem);
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlistStore();
  const { user } = useAuth();

  const handleWishlist = () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold dark:text-white hover:text-blue-600 transition">
              {product.name}
            </h3>
          </Link>
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full transition ${
              isInWishlist(product.id)
                ? "text-red-500 hover:text-red-600"
                : "text-gray-400 hover:text-red-500"
            }`}
          >
            <FaHeart />
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              {product.rating || 0} ({product.numReviews || 0})
            </span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.category}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`btn-primary flex items-center gap-2 ${
              product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaShoppingCart size={16} />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
