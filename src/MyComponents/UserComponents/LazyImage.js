import { useState } from "react";

const LazyImage = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <img
      src={imageLoaded ? src : ""}
      alt={alt}
      onLoad={handleImageLoad}
      style={{ opacity: imageLoaded ? 1 : 0, transition: "opacity 0.5s" }}
    />
  );
};

export default LazyImage;
