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
import ButtonCarrinho from '../Buttons/Carrinho/ButtonCarrinho.tsx';
import { Link, useNavigate } from 'react-router-dom';

/* NavBarLink */
import { NavBarLink } from '../../../DTOs/NavBarLink';
import commonNavItems from './commonUserNavBarItems.ts';
import adminNavItens from './adminUserNavBarItems.ts';
import { useEffect } from 'react';
import { useAdminContext } from '../../../Context/AdminContext.tsx';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [navItems, setNavItems] = React.useState<NavBarLink[]>(commonNavItems);

 const navigate = useNavigate();
 const {admin} = useAdminContext();


  useEffect(() => {
    setNavItems(admin !== undefined ? adminNavItens : commonNavItems);
  }, [admin]) 

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    // setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const GoToCarrinho = () => {
    navigate('/carrinho');
  };

  const GoTo = (rote:string) => {
    navigate(rote);
  };

  return (
    <AppBar position="static" color="warning" className='' sx={{position: 'relative' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={admin !== undefined ? '/homeAdmin' : '/'}>
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

          <Box sx={{ display: { xs: 'flex', md: 'none' }, position: 'absolute', right: 30}}>
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
                <MenuItem key={item.Id} onClick={() => GoTo(item.Link)}>
                  <Typography textAlign="center">{item.Title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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

          <Box sx={{ flexGrow: 0}}>
            {
              admin === undefined ? <ButtonCarrinho onClick={() => GoToCarrinho()}/> : ''
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;