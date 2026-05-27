import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../api/axios";
import io from "socket.io-client";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();

    // Socket connection for real-time updates
    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

    socket.on("order-status-update", (data) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === data.orderId
            ? { ...order, orderStatus: data.status }
            : order,
        ),
      );
      if (selectedOrder?._id === data.orderId) {
        setSelectedOrder((prev) => ({ ...prev, orderStatus: data.status }));
      }
    });

    return () => socket.disconnect();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/my-orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "processing":
        return <FaBox className="text-blue-500" />;
      case "shipped":
        return <FaTruck className="text-purple-500" />;
      case "delivered":
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaBox />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold dark:text-white mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <FaBox className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            You haven't placed any orders yet
          </p>
          <Link to="/" className="btn-primary inline-block mt-4">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Order #{order._id.slice(-8)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(order.orderStatus)}`}
                  >
                    {getStatusIcon(order.orderStatus)}
                    <span className="capitalize">{order.orderStatus}</span>
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="space-y-2">
                    {order.items.slice(0, 2).map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || "https://via.placeholder.com/50"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold dark:text-white">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Qty: {item.quantity} × ${item.price}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-sm text-gray-500">
                        +{order.items.length - 2} more items
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 mt-4 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Amount
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <FaEye /> View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold dark:text-white">
                  Order Details
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold dark:text-white mb-2">
                    Order Information
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Order ID: {selectedOrder._id}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Date: {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Payment Method: {selectedOrder.paymentMethod}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold dark:text-white mb-2">
                    Shipping Address
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedOrder.shippingAddress.street}
                    <br />
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.state}{" "}
                    {selectedOrder.shippingAddress.zipCode}
                    <br />
                    {selectedOrder.shippingAddress.country}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold dark:text-white mb-2">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-3 border-b dark:border-gray-700 pb-3"
                      >
                        <img
                          src={item.image || "https://via.placeholder.com/60"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <p className="font-semibold dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="flex justify-between font-bold">
                    <span className="dark:text-white">Total</span>
                    <span className="text-xl text-blue-600">
                      ${selectedOrder.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
