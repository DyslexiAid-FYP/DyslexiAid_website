// File: src/components/Button.jsx
import React from 'react';

const Button = ({ styles, onClick }) => (
  <button
    className={`py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] rounded-[12px] text-primary outline-none ${styles}`}
    onClick={onClick} // Ensure onClick is passed to the button
  >
    Start Test
  </button>
);

export default Button;






