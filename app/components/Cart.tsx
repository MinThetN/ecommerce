"use client";
import React, { useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ImBin } from "react-icons/im";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";

const Cart = () => {
  // Go back to home page
  const {
    totalQuantity,
    cartItems,
    showCart,
    setShowCart,
    updateItemQuantity,
    removeItem,
  }: any = useContext(CartContext);
  const handleClose = () => {
    setShowCart(!showCart);
  };
  // api endpoint
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cartItems }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.log("Error during checkout", error);
    }
  };

  return (
    <AnimatePresence>
      {showCart && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="cart-wrapper fixed top-0 right-0 w-full h-screen bg-black/50 z-50"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="cart-container fixed top-0 right-0 w-full sm:w-[450px] h-screen bg-white px-4 py-6"
          >
            <button
              className="cart-heading flex items-center gap-2 mb-6"
              onClick={handleClose}
            >
              <IoMdArrowRoundBack className="text-2xl hover:bg-neutral-300 rounded-full" />
              <span className="heading text-xl font-semibold">Your Cart</span>
              <span className="cart-num-items font-medium text-gray-600">
                {" "}
                ( {totalQuantity} items )
              </span>
            </button>

            <div className="flex flex-col h-[calc(100vh-120px)]">
              {totalQuantity === 0 ? (
                <div className="empty-cart flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <PiShoppingBagOpenDuotone className="text-6xl mx-auto mb-4" />
                    <h3 className="text-xl font-medium">Your cart is empty</h3>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-auto px-0 sm:px-4 py-2">
                    <div className="space-y-4">
                      {cartItems.map((product: any) => (
                        <div
                          className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-xl shadow-md"
                          key={product._id}
                        >
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              loader={() => urlFor(product.images[0]).url()}
                              src={urlFor(product.images[0]).url()}
                              alt={product.name}
                              width={96}
                              height={96}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0 space-y-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                              {product.name}
                            </h3>
                            <p className="text-lg sm:text-xl font-bold text-blue-950">
                              ${product.price}
                            </p>
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                              <div className="flex items-center gap-1 sm:gap-2 bg-neutral-100 rounded-3xl px-2 py-1">
                                <button
                                  onClick={() =>
                                    updateItemQuantity(
                                      product._id,
                                      (product.quantity || 1) - 1
                                    )
                                  }
                                  className="text-lg hover:bg-neutral-300 p-2 rounded-full transition-colors"
                                >
                                  <FiMinus />
                                </button>
                                <span className="text-sm sm:text-md font-medium min-w-[20px] text-center">
                                  {product.quantity || 1}
                                </span>
                                <button
                                  onClick={() =>
                                    updateItemQuantity(
                                      product._id,
                                      (product.quantity || 1) + 1
                                    )
                                  }
                                  className="text-lg hover:bg-neutral-300 p-2 rounded-full transition-colors"
                                >
                                  <FiPlus />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(product._id)}
                                className="text-red-500 hover:bg-red-500 hover:text-white rounded-full p-1.5 sm:p-2 text-lg transition-colors"
                              >
                                <ImBin />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t bg-white px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-base sm:text-lg font-semibold">
                        Subtotal
                      </span>
                      <span className="text-lg sm:text-xl font-bold">
                        $
                        {cartItems
                          .reduce(
                            (total: number, item: any) =>
                              total + item.price * (item.quantity || 1),
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="text-xl w-full h-12 rounded-3xl bg-neutral-900 text-white relative overflow-hidden group z-10
                                hover:text-white duration-1000 hover:scale-[1.05] active:scale-[1.2]"
                      onClick={handleCheckout}
                    >
                      <span className="absolute bg-emerald-600 w-full h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all">
                        {" "}
                      </span>
                      <span className="absolute bg-emerald-700 w-full h-36 -left-0 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                      Pay With Stripe
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;

// w-full bg-blue-800 text-white py-3 rounded-xl font-medium transform transition-all duration-300
// hover:bg-neutral-100 hover:text-black hover:border-blue-800 hover:border-2 hover:scale-[1.07]
// active:scale-[0.98] hover:shadow-lg
