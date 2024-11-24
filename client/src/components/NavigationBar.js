import React, { useContext } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { AuthContext } from "../context/AuthContext";

const NavigationBar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar color="dark" dark expand="md" className="mb-4">
            <NavbarBrand href="/">LMS</NavbarBrand>
            <Nav className="ml-auto" navbar>
                {user ? (
                    <>
                        <NavItem>
                            <NavLink href="/courses">Courses</NavLink>
                        </NavItem>
                        {user.role === "Instructor" && (
                            <NavItem>
                                <NavLink href="/create-course">Create Course</NavLink>
                            </NavItem>
                        )}
                        <NavItem>
                            <Button color="danger" onClick={logout} className="ml-2">
                                Logout
                            </Button>
                        </NavItem>
                    </>
                ) : (
                    <>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/register">Register</NavLink>
                        </NavItem>
                    </>
                )}
            </Nav>
        </Navbar>
    );
};

export default NavigationBar;