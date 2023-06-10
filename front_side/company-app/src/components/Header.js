import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">MYCompany</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        {localStorage.getItem('token') ? (
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Link to="/employeelist" style={{ textDecoration: "none" }}>Employee List</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link to="/viewemployee" style={{ textDecoration: "none" }}>View Employee</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link to="/view" style={{ textDecoration: "none" }}>View Department</Link>
                            </Nav>
                        ) : (<Link to='/login' style={{ textDecoration: "none" }}>Login</Link>)}
                        {localStorage.getItem('token') ? (<Button onClick={logOut} style={{ textDecoration: "none" }}>Logout</Button>) :
                            (<Link to='/login' style={{ textDecoration: "none" }}>Login</Link>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default Header