import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../api/axios";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import { useAuth } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const addToCart = useCartStore((state) => state.addItem);
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlistStore();
  const { user } = useAuth();

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      toast.error("Product not found");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/products/${id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to leave a review");
      return;
    }
    try {
      await api.post(`/products/${id}/reviews`, { rating, comment: review });
      toast.success("Review submitted!");
      fetchReviews();
      setReview("");
      setRating(0);
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-300 dark:bg-gray-700 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={
                product.images?.[selectedImage] ||
                "https://via.placeholder.com/600"
              }
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </motion.div>

          {product.images?.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold dark:text-white mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < Math.floor(product.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  ({product.numReviews || 0} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Category: {product.category}
              </span>
            </div>

            <div className="text-3xl font-bold text-blue-600 mb-4">
              ${product.price}
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border-t dark:border-gray-700 pt-6">
            <div className="flex items-center gap-4 mb-4">
              <label className="font-semibold dark:text-white">Quantity:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-12 text-center dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.stock} in stock
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 btn-primary flex items-center justify-center gap-2 ${
                  product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaShoppingCart /> Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-lg border-2 transition ${
                  isInWishlist(product.id)
                    ? "bg-red-500 text-white border-red-500"
                    : "border-gray-300 dark:border-gray-600 hover:border-red-500"
                }`}
              >
                <FaHeart />
              </button>
              <button
                onClick={() => {
                  navigator.share?.({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                  });
                }}
                className="p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500"
              >
                <FaShare />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold dark:text-white mb-6">
          Customer Reviews
        </h2>

        {user && (
          <form
            onSubmit={handleSubmitReview}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8"
          >
            <h3 className="text-lg font-semibold dark:text-white mb-4">
              Write a Review
            </h3>
            <div className="mb-4">
              <label className="block mb-2 dark:text-white">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    <FaStar
                      className={
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                rows="4"
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Submit Review
            </button>
          </form>
        )}

        <div className="space-y-4">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold dark:text-white">
                    {rev.user?.name || "Anonymous"}
                  </span>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < rev.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
