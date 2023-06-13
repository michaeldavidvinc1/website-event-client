import React from "react";
import { Form } from "react-bootstrap";

export default function TextInput({
  name,
  value,
  type,
  onChange,
  placeholder,
}) {
  return (
    <Form.Control
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
