import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons'
import { Table, Modal, Button, Form } from 'react-bootstrap'
import Header from '../../components/Header'
import SignUpPage from '../employees/SignUpPage';
import axios from 'axios';

const ViewEmployee = () => {
  const [employeeDetails, setEmployeeDetails] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [roleid, setRoleId] = useState('')
  const [emp_id, setEmpId] = useState('')
  const [roleSelectApiData, setRoleSelectApiData] = useState([])
  const [roleApiData, setRoleApiData] = useState([])
  const [viewRoleshow, setViewRoleshow] = useState(false);

  const handleClose1 = () => setViewRoleshow(false);
  const handleShow1 = () => setViewRoleshow(true);

  const displayEmployee = async () => {
    const apiData = await axios.get("http://localhost:4004/company/getallemployee")
    setEmployeeDetails(apiData.data.response)
  }

  const modalEmpid = (emp_id) => {
    handleShow();
    setEmpId(emp_id)
  }

  // Delete Role
  const deleteRole = async (roleid) => {
    const apiData = await axios.delete(`http://localhost:4004/company/deleterole/:${roleid}`)
    console.log("Data delete Successfully", apiData)
    displayEmployee()
    handleClose1()
  }

  // show all role
  const RoleSelectdataShow = async (emp_id) => {
    const apiResponse = await axios.get(`http://localhost:4004/company/viewselectrole/:${emp_id}`)
    setRoleSelectApiData(apiResponse.data.response)
    handleShow1();
    // console.log(apiResponse.data.response, '...............apiResponse.................')
  }

  // post Role assign 
  const submitRoleAssign = async (e) => {
    e.preventDefault();
    const config = {
      "Content-Type": 'application/json'
    }
    const dataRole = { roleid, emp_id }

    const apiData = await axios.post(`http://localhost:4000/api/v1/roleassign`, dataRole, config)
    console.log(apiData, "submitdata")
    handleClose()
    setRoleId("")
    setEmpId("")
  }

  // Get all role
  const RoleDataget = async () => {
    const apiResponse = await axios.get(`http://localhost:4004/company/viewrole`)
    setRoleApiData(apiResponse.data.response)
    // console.log(apiResponse.data.response, '...............apiResponse.................')
  }

  useEffect(() => {
    displayEmployee()
    RoleDataget()
  }, [])

  return (
    <>
      <Header />
      <button type="button" className="btn btn-primary mb-2 mt-4" style={{marginLeft:"110px"}}><UserAddOutlined /><SignUpPage displayEmployee={displayEmployee} /></button>
      <Table striped bordered hover className='container'>
        <thead>
          <tr>
            <th>Emp_Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeDetails.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.emp_id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.hobbies}</td>
                <td>
                  <button type="button" className="btn btn-primary" onClick={() => {
                    RoleSelectdataShow(item.emp_id)
                  }}>View</button>&nbsp;
                  <button type="button" className="btn btn-primary" onClick={() => modalEmpid(item.emp_id)}>Assign Role</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Modal show={viewRoleshow} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>View Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>{roleSelectApiData.map((item, index) => {
          return (
            <div key={index}>
              <div className="d-flex" ><p>{item.rolename}</p>
                <Button onClick={() => deleteRole(item.roleid)} style={{ marginLeft: "75%" }}><DeleteOutlined /></Button></div>
            </div>
          )
        })}</Modal.Body>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Empid</Form.Label>
            <Form.Control type="text" placeholder="Enter empid" name="emp_id"
              value={emp_id}
              onChange={(e) => setEmpId(e.target.value)} />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            value={roleid}
            onChange={(e) => setRoleId(e.target.value)}
          >
            <option>Select Role</option>
            {roleApiData.map((item, index) => (
              <option key={index} value={item.roleid}>
                {item.roleid}&nbsp;&nbsp;{item.rolename}
              </option>
            ))}
          </Form.Select>
          <Button variant="primary" type="submit" onClick={submitRoleAssign}>
            Submit
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewEmployee