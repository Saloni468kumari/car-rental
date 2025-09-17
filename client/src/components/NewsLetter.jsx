import { motion } from "motion/react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("You have subscribed successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center justify-center text-center space-y-2
      max-md:px-4 my-10 mb-40"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:text-4xl text-2xl font-semibold"
      >
        Never Miss a Deal!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="md:text-lg text-gray-500/70 pb-8"
      >
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </motion.p>

      <motion.form
        onSubmit={handleSubscribe}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center justify-between max-w-2xl w-full h-12 md:h-14"
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          aria-label="Email address"
          placeholder="Enter your email id"
          required
        />

        <button
          type="submit"
          aria-label="Subscribe"
          className="md:px-12 px-8 h-full text-white bg-blue-600 hover:bg-blue-700 
          transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </motion.form>
    </motion.div>
  );
};

export default NewsLetter;
