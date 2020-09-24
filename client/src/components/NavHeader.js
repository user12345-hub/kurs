import React, { useContext } from 'react'
import {useHistory, NavLink} from 'react-router-dom'
import {Navbar, Form, Button, Nav, FormControl, NavDropdown} from 'react-bootstrap'
import { AuthContext } from '../context/auth.context'

export const NavHeader = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="/">Collections app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link>
                    <NavLink to="/create">Create</NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink to="/collections">Collections</NavLink>
                </Nav.Link>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="mr-5">
                <a href="/" onClick={logoutHandler}>Logout</a>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}