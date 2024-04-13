import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { useUser } from "../context/UserContext";
import { Container, Form, Button, Alert } from "react-bootstrap";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const { localSav } = useUser(); // Get the localSav function from the context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      if (data.login) {
        localSav(data.login); // Update the user context and localStorage
        navigate("/"); // Redirect to home or dashboard
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <Container className="my-5">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error.message}
        </Alert>
      )}
    </Container>
  );
}

export default LoginPage;
