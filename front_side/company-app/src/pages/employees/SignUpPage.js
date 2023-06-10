import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignupForm = ({ displayEmployee }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [signupInfo, setSignupInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    hobbies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    hobbies: Yup.string().required("Hobbies are required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not more than 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      )
      .required("Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const apiData = await axios.post(
      "http://localhost:4004/company/signup",
      signupInfo,
      headers
    );
    console.log(apiData, "api data");
    displayEmployee();
    handleClose();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              gender: "",
              hobbies: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={touched.firstName && !!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={touched.lastName && !!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    isValid={touched.gender && !errors.gender}
                    isInvalid={touched.gender && !!errors.gender}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="hobbies">
                  <Form.Label>Hobbies</Form.Label>
                  <Form.Control
                    type="text"
                    name="hobbies"
                    value={values.hobbies}
                    onChange={handleChange}
                    isValid={touched.hobbies && !errors.hobbies}
                    isInvalid={touched.hobbies && !!errors.hobbies}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.hobbies}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignupForm;
