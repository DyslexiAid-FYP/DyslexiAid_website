import { useState } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ThankYouPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 text-white rounded-2xl p-6 max-w-md  w-full shadow-lg relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <button
          className="absolute top-3 right-3 text-white/70 hover:text-white"
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold mb-2">Thank You!</h2>
        <p className="text-white/80 mb-4">
          Thank you for completing our dyslexia tests. We have emailed you the results.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition w-full"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleTestCompletion = (testNumber) => {
    if (testNumber === 4) {
      setShowPopup(true);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <button
        onClick={() => handleTestCompletion(4)}
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
      >
        Submit Results
      </button>
      <ThankYouPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default Popup;
