import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import SNavAccess from "../NavAccess";
import { useNavigate } from "react-router-dom";
import {
  accessCategories,
  accessEvents,
  accessOrders,
  accessParticipant,
  accessPayments,
  accessTalents,
  accessOrganizers,
  accessAdmin,
} from "../../const/access";

export default function SNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <SNavAccess
            role={role}
            roles={accessCategories.lihat}
            action={() => navigate("/")}
          >
            Home
          </SNavAccess>
          <SNavAccess
            role={role}
            roles={accessCategories.lihat}
            action={() => navigate("/categories")}
          >
            Categories
          </SNavAccess>
          <SNavAccess
            role={role}
            roles={accessTalents.lihat}
            action={() => navigate("/talents")}
          >
            Talents
          </SNavAccess>
          <SNavAccess
            role={role}
            roles={accessPayments.lihat}
            action={() => navigate("/payments")}
          >
            Payments
          </SNavAccess>
          <SNavAccess
            role={role}
            roles={accessEvents.lihat}
            action={() => navigate("/events")}
          >
            Events
          </SNavAccess>
          <SNavAccess
            role={role}
            roles={accessOrders.lihat}
            action={() => navigate("/orders")}
          >
            Order
          </SNavAccess>
          <SNavAccess
            role={role}
            roles={accessOrganizers.lihat}
            action={() => navigate("/organizers")}
          >
            Organizers
          </SNavAccess>
          <SNavAccess
            role={role}
            roles={accessAdmin.lihat}
            action={() => navigate("/admins")}
          >
            Admins
          </SNavAccess>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
