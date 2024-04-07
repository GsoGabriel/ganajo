import React, { useEffect, useState } from 'react';
import Logo from '../Assets/ganajo-logo.png';
import { MdOutlineShoppingCart } from "react-icons/md";
import commonNavItems from './commonUserNavBarItems.ts';
import adminNavItens from './adminUserNavBarItems.ts';
import './Navbar.css';
import { NavBarLink } from '../DTOs/NavBarLink';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

function MenuNavbar() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [navItems, setNavItems] = useState<NavBarLink[]>(commonNavItems);

  useEffect(() => {
    setIsAdmin(true);
    setNavItems(isAdmin ? adminNavItens : commonNavItems);
  }, [isAdmin])

  return (
    <Navbar expand="lg" className="">
      <Container className='container nav_container'>
        <Navbar.Brand href="/">
          <Image src={Logo} alt="Logo" width="30" height="30" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            {navItems.map(item => (
              <Nav.Link key={item.Id} href={item.Link}>{item.Title}</Nav.Link>
            ))}
          </Nav>
          <button className="theme_icon"><MdOutlineShoppingCart/></button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuNavbar;