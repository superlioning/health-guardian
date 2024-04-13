import React from "react";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";

function HomePage() {
  return (
    <Container className="my-5">
      <Carousel className="mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x300?text=Welcome+to+Our+Health+App"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Our Health App</h3>
            <p>
              Access and manage your health records securely and efficiently.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x300?text=Track+Your+Health"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Track Your Health</h3>
            <p>
              Manage daily wellness activities, and communicate with your
              healthcare providers.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x300?text=Advanced+Health+Insights"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Advanced Health Insights</h3>
            <p>
              Utilize data-driven insights to make informed health decisions.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card className="text-center shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              <Card.Title>Welcome to Our Health App!</Card.Title>
              <Card.Text>Sign up or log in to continue.</Card.Text>
              <Button
                variant="primary"
                size="lg"
                href="/signup"
                className="m-2"
              >
                Sign Up
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/login"
                className="m-2"
              >
                Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
