import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./signIn.scss";
import {
  Form,
  Col,
  Row,
  FormControl,
  Navbar,
  Button,
  Nav,
  FormLabel,
} from "react-bootstrap";

import { createUser } from "../../../reduxStore/auth";

const SignIn = ({ createUser }) => {
  const [validated, setValidated] = useState(false);
  const [signUpValues, setSignUpValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    releaseYear: Number,
    genre: "",
    title: "",
    soulGiven: null,
  });

  useEffect(() => {}, []);

  const handleChange = (e, id) => {
    const value = e.target.value;
    setSignUpValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      createUser(signUpValues);
    }
    setValidated(true);
    event.preventDefault();
  };

  const displaySignIn = () => {
    if (false) {
      return <div></div>;
    }
    return (
      <>
        <Navbar bg="primary">
          <Navbar.Brand className="text-white mr-auto h1">
            Bookface
          </Navbar.Brand>
          <Form inline className="mt-0" onSubmit={handleSubmit}>
            <Nav className="d-flex flex-column" id="emailContainer">
              <FormLabel className="text-white justify-content-start">
                Email
              </FormLabel>
              <FormControl className="mr-3" />
              <Nav className="justify-content-start">
                {/* <FormControl id="cb" type="checkbox" className="mr-1" /> */}
                <FormLabel className="text-secondary h6 small">
                  Nothing to see here.
                </FormLabel>
              </Nav>
            </Nav>
            <Nav className="d-flex flex-column">
              <FormLabel className="text-white justify-content-start">
                Password
              </FormLabel>
              <FormControl className="mr-3" />
              <FormLabel className="h6 small text-secondary justify-content-start">
                Forgot your password? Too Bad.
              </FormLabel>
            </Nav>
            <Button id="SignIn" className="border border-white">
              Sign In
            </Button>
          </Form>
        </Navbar>

        <Nav className="d-flex justify-content-end mt-4 mr-5">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className=""
          >
            <Form.Group>
              <Form.Label className="h2 mb-0">Sign Up</Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label className="h6 small mb-0">
                It's free and always will be. Maybe.
              </Form.Label>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Control
                  required
                  type="text"
                  placeholder="Author's First Name"
                  onChange={(e) => handleChange(e, "firstName")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Control
                  required
                  type="text"
                  placeholder="Author's Last Name"
                  onChange={(e) => handleChange(e, "lastName")}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridEmail">
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                onChange={(e) => handleChange(e, "email")}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => handleChange(e, "password")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridConfirmedPassword">
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => handleChange(e, "confirmedPassword")}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridTitle">
              <Form.Label className="h6">Enter Book Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Title"
                onChange={(e) => handleChange(e, "title")}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridYear">
                <Form.Label className="h6">Enter Release Year</Form.Label>
                <Form.Control
                  required
                  type="number"
                  min={0}
                  max={2025}
                  placeholder="Year"
                  onChange={(e) => handleChange(e, "releaseYear")}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <Form.Label className="h6">Enter Book Genre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Genre"
                  onChange={(e) => handleChange(e, "genre")}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
              <Form.Check
                required
                type="checkbox"
                label="I agree to sign over my soul."
                onChange={() =>
                  true ? (signUpValues.soulGiven = true) : false
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Nav>
      </>
    );
  };
  return <div id="sign-in">{displaySignIn()}</div>;
};

export default connect(
  (state) => {
    return {};
  },
  { createUser }
)(SignIn);