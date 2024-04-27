import React from "react";

const ImageDisplay = ({ url, name, price }) => {
  return (
    <div>
      <img src={url} alt={`Image`} height="200px" width="200px" />
      <p>Name: {name}</p>
      <p>Price: {price}</p>
    </div>
  );
};

export default ImageDisplay;
