import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../../../Assets/ganajo-logo.png';
import ButtonClose from '../Buttons/Carrinho/ButtonCarrinho.tsx';
import { Link } from 'react-router-dom';

/* NavBarLink */
import { NavBarLink } from '../../../DTOs/NavBarLink';
import commonNavItems from './commonUserNavBarItems.ts';
import adminNavItens from './adminUserNavBarItems.ts';
import { useEffect, useState } from 'react';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [navItems, setNavItems] = React.useState<NavBarLink[]>(commonNavItems);

  useEffect(() => {
    setIsAdmin(true);
    setNavItems(isAdmin ? adminNavItens : commonNavItems);
  }, [isAdmin]) 

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className=''>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img src={Logo} alt="Logo" className="d-inline-block align-top"/>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navItems.map(item => (
                <MenuItem key={item.Id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{item.Title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map(item => (
              <Button
                key={item.Id}
                href={item.Link}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              {item.Title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ButtonClose onClick={undefined}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

/* import React, { useEffect, useState } from 'react';
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



export default MenuNavbar; */