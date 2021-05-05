import React from "react";

import Header from "../../templates/header";
import Sidebar from "../../templates/sidebar";
import DashboardBody from "./dashboardBody";

import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Container className="d-flex justify-content-center">
        <Row>
          <Col>
            <DashboardBody />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
