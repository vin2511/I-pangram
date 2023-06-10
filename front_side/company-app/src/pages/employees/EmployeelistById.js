import React from 'react'
import Header from '../../components/Header'
import { ListGroup } from 'react-bootstrap'

const EmployeelistById = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Header />
      <div className="container overflow-hidden">
        <div className="row gy-5">
          <div className="col-4">
            <div className="p-3"></div>
          </div>
          <div className="col-4">
            <div className="p-3 ">
              <ListGroup>
                <ListGroup.Item>First Name: &nbsp;&nbsp;{userData.firstname}</ListGroup.Item>
                <ListGroup.Item>Last Name: &nbsp;&nbsp;{userData.lastname}</ListGroup.Item>
                <ListGroup.Item>Email: &nbsp;&nbsp;{userData.email}</ListGroup.Item>
                <ListGroup.Item>Gender: &nbsp;&nbsp;{userData.gender}</ListGroup.Item>
                <ListGroup.Item>Hobbies: &nbsp;&nbsp;{userData.hobbies}</ListGroup.Item>
              </ListGroup>
            </div>
          </div>
          <div className="col-4">
            <div className="p-3"></div>
          </div>
        </div>
      </div>

    </>
  )
}

export default EmployeelistById