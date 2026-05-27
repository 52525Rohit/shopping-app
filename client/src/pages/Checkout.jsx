import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import api from "../api/axios";
import useCartStore from "../store/cartStore";
import { useAuth } from "../context/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
    country: user?.address?.country || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Create order
      const orderResponse = await api.post("/orders", {
        items: items.map((item) => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images?.[0],
        })),
        shippingAddress: address,
        paymentMethod: "stripe",
        totalAmount: getTotalPrice(),
      });

      const order = orderResponse.data;

      // Create payment intent
      const {
        data: { clientSecret },
      } = await api.post("/payment/create-payment-intent", {
        orderId: order._id,
      });

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: address.street,
              city: address.city,
              state: address.state,
              postal_code: address.zipCode,
              country: address.country,
            },
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        clearCart();
        navigate("/orders");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Checkout failed: " + (error.response?.data?.error || error.message),
      );
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Address */}
      <div>
        <h3 className="text-lg font-semibold dark:text-white mb-4">
          Shipping Address
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Street Address"
            value={address.street}
            onChange={(e) =>
              setAddress({
                ...address,
                street: e.target.value,
              })
            }
            className="input-field"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({
                  ...address,
                  city: e.target.value,
                })
              }
              className="input-field"
              required
            />

            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({
                  ...address,
                  state: e.target.value,
                })
              }
              className="input-field"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="ZIP Code"
              value={address.zipCode}
              onChange={(e) =>
                setAddress({
                  ...address,
                  zipCode: e.target.value,
                })
              }
              className="input-field"
              required
            />

            <input
              type="text"
              placeholder="Country"
              value={address.country}
              onChange={(e) =>
                setAddress({
                  ...address,
                  country: e.target.value,
                })
              }
              className="input-field"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div>
        <h3 className="text-lg font-semibold dark:text-white mb-4">
          Payment Details
        </h3>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Total */}
      <div className="border-t dark:border-gray-700 pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold dark:text-white">Total Amount:</span>

          <span className="text-2xl font-bold text-blue-600">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay $${getTotalPrice().toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

const Checkout = () => {
  const { items } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/");
    }
  }, [items, navigate]);

  if (items.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold dark:text-white mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold dark:text-white mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/50"}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold dark:text-white">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Qty: {item.quantity} × ${item.price}
                  </p>
                </div>

                <p className="font-semibold dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
