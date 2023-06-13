import React from "react";
import { Form } from "react-bootstrap";

export default function SearchInput({ handleChange, query, disabled }) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        disabled={disabled}
        type="text"
        placeholder="Masukkan pencarian disini"
        value={query}
        name="query"
        onChange={handleChange}
      />
    </Form.Group>
  );
}
