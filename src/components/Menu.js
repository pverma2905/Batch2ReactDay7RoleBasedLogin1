import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Menu() {
    return (
        <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
                <Link to="/" className="nav-link">Home</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/register" className="nav-link">Register</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/login" className="nav-link">Login</Link>
            </Nav.Item>

        </Nav>
    )
}

