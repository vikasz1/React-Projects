import React from "react";

const Input = ({ name, label, value, error, onChange, focus,type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus={focus}
        value={value}
        id={name}
        type={type}
        name={name}
        className="form-control"
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
