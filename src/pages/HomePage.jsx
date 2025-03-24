import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MntBar from "../components/MntBar";
import CatBar from "../components/CatBar";
import ClimbList from "../components/ClimbList";
const Home = () => {
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <MntBar />
        </Col>
        <Col md={9}>
            <CatBar/>
            <ClimbList/>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
