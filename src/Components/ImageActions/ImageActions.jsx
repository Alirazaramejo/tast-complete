import React from "react";

const ImageActions = ({ onEdit, onDelete }) => {
  return (
    <div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ImageActions;
