import React from "react";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/Button";
import { Form } from "react-bootstrap";

export default function SForm({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form>
      <TextInputWithLabel
        label="Email address"
        type="email"
        placeholder="Enter email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <TextInputWithLabel
        label="Password"
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <SButton
        loading={isLoading}
        disabled={isLoading}
        action={handleSubmit}
        variant="primary"
      >
        Submit
      </SButton>
    </Form>
  );
}
