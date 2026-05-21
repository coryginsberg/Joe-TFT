import React from 'react';

export const CrestLogo: React.FC = () => {
  return (
    <svg className="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Golden TFT Hexagon/Shield Logo Symbol */}
      <polygon 
        points="50,5 90,25 90,75 50,95 10,75 10,25" 
        fill="none" 
        stroke="#c89b3c" 
        strokeWidth="6"
      />
      <polygon 
        points="50,15 80,30 80,70 50,85 20,70 20,30" 
        fill="none" 
        stroke="#f0c265" 
        strokeWidth="2" 
        strokeDasharray="5 3"
      />
      <circle cx="50" cy="50" r="18" fill="#c89b3c"/>
      <polygon points="50,38 58,55 42,55" fill="#05040a"/>
    </svg>
  );
};
