import { useEffect, useRef } from "react";
import { io } from "socket.io-client"; // npm install socket.io-client
import toast from "react-hot-toast";

export function useAdminSocket() {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL?.replace("/api", ""));
    socket.current.emit("join-admin");

    socket.current.on("order-updated", ({ orderId, status }) => {
      toast(`📦 Order ${orderId} → ${status}`, { icon: "🔔" });
    });

    socket.current.on("new-order", (order) => {
      toast.success(`🛒 New order: ₹${order.totalPrice}`);
    });

    return () => socket.current?.disconnect();
  }, []);
}
