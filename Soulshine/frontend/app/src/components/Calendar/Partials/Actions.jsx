import { motion } from "framer-motion";
import React from "react";
import './../../../App.css';

const Actions = ({ setDate, date, selectRange, setSelectRange }) => {
  return (
    <motion.div
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
      {/* <button
        style={{
          color: selectRange ? "#6f48eb" : "#524d4d",
          cursor: "pointer",
          marginTop: "1rem",
          width: "10rem",
          height: "3rem",
          border: "none",
          outline: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "0.5rem",
          boxShadow: "0 12px 14px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => {
          setSelectRange(!selectRange);
          setDate(new Date());
        }}
      >
        Select Range
      </button> */}
    </motion.div>
  );
};

export default Actions;
