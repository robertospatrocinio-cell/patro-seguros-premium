import React from "react";

export const BrandText = ({ 
  brand, 
  className = "" 
}: { 
  brand: string, 
  className?: string 
}) => {
  const brands: Record<string, { color: string, label: string }> = {
    "ifood": { color: "text-red-600", label: "iFood" },
    "keeta": { color: "text-green-600", label: "Keeta" },
    "99": { color: "text-yellow-500", label: "99" }
  };

  const lowerBrand = brand.toLowerCase();
  const config = brands[lowerBrand];

  if (!config) return <>{brand}</>;

  return (
    <span className={`font-bold ${config.color} ${className}`}>
      {config.label}
    </span>
  );
};

export const highlightBrands = (text: string | React.ReactNode): React.ReactNode => {
  if (typeof text !== 'string') return text;

  // Case-insensitive regex for the brands
  const parts = text.split(/(iFood|Keeta|99)/gi);
  
  return parts.map((part, i) => {
    const lowerPart = part.toLowerCase();
    if (lowerPart === 'ifood') return <BrandText key={i} brand="ifood" />;
    if (lowerPart === 'keeta') return <BrandText key={i} brand="keeta" />;
    if (lowerPart === '99') return <BrandText key={i} brand="99" />;
    return part;
  });
};
