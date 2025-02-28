"use client";
import React from "react";
import { ImArrowRight } from "react-icons/im";
import { motion } from "framer-motion";

const page = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-green-600 font-bold text-6xl animate-bounce">
          SUCCESS
        </p>
      </motion.div>

      <motion.h1
        className="text-2xl sm:text-5xl font-bold text-gray-900 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Your order has been placed!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Thank you for your purchase
      </motion.p>

      <motion.div
        className="flex gap-2 text-white items-center justify-center bg-cyan-600 p-4 rounded-3xl cursor-pointer
                    hover:bg-cyan-700 transition-colors duration-300 hover:scale-105 transform"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a href="/" className="font-bold text-xl">
          Continue Shopping
        </a>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ImArrowRight />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default page;
