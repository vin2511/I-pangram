import React, { useState } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBInput } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const apiData = await axios.post(`http://localhost:4004/company/login`, loginInfo, headers);

    if (apiData.data.status === 200) {
      localStorage.setItem("token", apiData.data.token);
      
      localStorage.setItem("userData", JSON.stringify(apiData.data.user));
      switch (apiData?.data?.user?.role_name) {
        case "Manager":
          navigate("/view");
          break;
        case "employee":
          navigate("/employeelist");
          break;
      }
      toast.success("Successfully Login");
    } else {
      toast.error("Invalid Credentials");
    }
    setLoginInfo({
      email: "",
      password: "",
    });
  };

  return (
    <MDBContainer  fluid className="p-3 my-5" style={{ width: "80%" }}>
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src=""
            alt=""
          />
        </MDBCol>

        <MDBCol col="4" md="6">
        <h3 className="mb-4 text-uppercase fw-bold">Login </h3>
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            id="formControlLg"
            type="email"
            size="lg"
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            type="password"
            size="lg"
            required
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <Link to="/register" style={{ textDecoration: "none" }}>
              SignUp
            </Link>
          </div>
          <Button className="mb-4 w-100" onClick={submitData}>
            Sign in
          </Button>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
