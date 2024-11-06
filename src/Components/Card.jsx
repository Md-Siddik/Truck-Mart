import React from 'react';

const Card = ({ title, description, icon, borderColor, styleClasses, buttonText, onButtonClick }) => {
  return (
    <div className={`shadow-lg rounded-lg p-6 border-t-4 ${borderColor} ${styleClasses}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <div className="text-5xl icon-pulse">{icon}</div>
      </div>
      <p className="text-gray-600">{description}</p>
      <button 
        onClick={onButtonClick} 
        className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-full shadow-lg 
        hover:from-purple-600 hover:to-blue-600 focus:ring-4 focus:ring-purple-300 transform active:scale-95 transition-transform"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;