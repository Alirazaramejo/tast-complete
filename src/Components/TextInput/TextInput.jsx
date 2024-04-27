import React from "react";

const TextInput = ({ type, placeholder, value, onChange }) => {
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default TextInput;
