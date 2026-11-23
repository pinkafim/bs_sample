import React, { useState } from 'react';
import { getJeansSvgDataUri } from '../utils/placeholderImage';

interface ProductImageProps {
  src: string;
  alt: string;
  colorHex: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  colorHex,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);
  const fallback = getJeansSvgDataUri(colorHex, alt);

  return (
    <img
      src={failed ? fallback : src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover bg-[#F1F5F9] ${className}`}
      loading="lazy"
    />
  );
};
