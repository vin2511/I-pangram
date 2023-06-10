import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

const AddDepartment = ({ departmentDataget }) => {
  const [empinfo, setEmpInfo] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deptInfo, setDeptInfo] = useState({
    departmentName: "",
    categoryName: "",
    location: "",
    salary: "",
    emp_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeptInfo({ ...deptInfo, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const apiData = await axios.post(
      "http://localhost:4004/company/adddepartment",
      deptInfo,
      headers
    );
    console.log(apiData, "api data");
    setDeptInfo({
      departmentName: "",
      categoryName: "",
      location: "",
      salary: "",
      emp_id: "",
    });
    departmentDataget();
    handleClose();
  };

  const getEmployeeData = async () => {
    const apiData = await axios.get("http://localhost:4004/company/getallemployee");
    setEmpInfo(apiData.data.data, "apiData");
  };
  useEffect(() => {
    getEmployeeData();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Dept Name</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="departmentName"
                value={deptInfo.departmentName}
                onChange={handleChange}
              >
                <option>Select Department Name</option>
                <option value="Google IT soln pvt">
                  Google IT soln pvt name
                </option>
                <option value="Ipangram">Ipangram</option>
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
                <option>Select Category</option>
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
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={deptInfo.salary}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Emp_Id</Form.Label>
              <Form.Select
                aria-label="Default select example"
                type="text"
                placeholder="Enter Emp_id"
                name="emp_id"
                value={deptInfo.emp_id}
                onChange={handleChange}
              >
                <option>Select Emp_Id</option>
                {empinfo.map((item, index) => (
                  <option key={index} value={item.emp_id}>
                    {item.emp_id}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddDepartment;
