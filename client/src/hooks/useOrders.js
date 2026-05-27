import { useState, useEffect } from "react";
import api from "../api/axios";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders/my-orders");
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await api.post("/orders", orderData);
      await fetchOrders();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Failed to create order");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/cancel`);
      await fetchOrders();
    } catch (err) {
      throw new Error(err.response?.data?.error || "Failed to cancel order");
    }
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    cancelOrder,
    refetch: fetchOrders,
  };
};
