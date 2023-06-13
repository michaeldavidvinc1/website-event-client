import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import SForm from "./form";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";

function PageSignin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData(`/cms/auth/signin`, form);
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role,
          res.data.data.email,
          res.data.data.refreshToken
        )
      );
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        type: "danger",
        message: err?.response?.data?.msg ?? "Internal Server Error",
      });
    }
  };

  return (
    <Container md={12}>
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert message={alert.message} type={alert.type} />}
      </div>
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Title className="text-center">Form Login</Card.Title>
        <Card.Body>
          <SForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PageSignin;
