import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditDepartment = () => {
  const navigate = useNavigate();
  const locations = useLocation();
  const data = locations.state.data;
console.log("data",data)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deptInfo, setDeptInfo] = useState({
    id: data.id,
    departmentName: data.departmentName,
    categoryName: data.categoryName,
    location: data.location,
    salary: data.salary,
  });

  const {id, departmentName, categoryName, location, salary } =
    deptInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeptInfo({ ...deptInfo, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const apiData = await axios.put(
      `http://localhost:4004/company/updatedepartment/${id}`,
      deptInfo,
      headers
    );
    console.log(apiData, "api data");
    navigate("/view");
    handleClose();
  };

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Department Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter DeptId"
                name="id"
                value={deptInfo.id}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dept Name</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="departmentName"
                value={deptInfo.departmentName}
                onChange={handleChange}
              >
                <option>Select Department Name</option>
                <option value="Google IT soln pvt name">
                  Google IT soln pvt name
                </option>
                <option value="I-angram">Ipangram</option>
                <option value="Facebook">Facebook</option>
                <option value="Wipro">Wipro</option>
                <option value="Wallmart">Wallmart</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="categoryName"
                value={deptInfo.categoryName}
                onChange={handleChange}
              >
                <option>Select Category Name</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Product">Product</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={deptInfo.location}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>salary</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Phone Number"
                name="salary"
                value={deptInfo.salary}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditDepartment;
