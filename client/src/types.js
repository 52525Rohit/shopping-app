// src/types.js

export const PAGES = {
  HOME: "home",
  COLLECTION: "collection",
  PRODUCT: "product",
  CHECKOUT: "checkout",
};

export const Product = {
  id: "",
  name: "",
  price: 0,
  currency: "",
  category: "",
  tag: "",
  image: "",
  images: [],
  description: "",
  colors: [],
  sizes: [],
};

export const CartItem = {
  product: Product,
  qty: 1,
  size: "",
  color: "",
};

export default {
  PAGES,
  Product,
  CartItem,
};
