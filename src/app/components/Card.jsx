// components/Card.js

import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
      {children} {/* This will render the content passed to the card */}
    </div>
  );
};

export default Card;
