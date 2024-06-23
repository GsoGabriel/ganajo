import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from '../../../Assets/ganajo-logo.png';
import { useAdminContext } from '../../../Context/AdminContext.tsx';
import { NavBarLink } from '../../../DTOs/NavBarLink';
import commonNavItems from './commonUserNavBarItems.ts';
import adminNavItems from './adminUserNavBarItems.ts';
import { Link, useNavigate } from 'react-router-dom';
import ButtonCarrinho from '../Buttons/Carrinho/ButtonCarrinho.tsx';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [navItems, setNavItems] = React.useState<NavBarLink[]>(commonNavItems);
  const navigate = useNavigate();
  const { admin } = useAdminContext();

  React.useEffect(() => {
    setNavItems(admin !== undefined ? adminNavItems : commonNavItems);
  }, [admin]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to bottom, #d6d2d2, #ffffff, #ffffff, #ffffff, #ffffff)', borderBottom: '0.5px solid #ccc', boxShadow: '1px 2px 3px gray' }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={admin !== undefined ? '/homeAdmin' : '/'}>
            <img src={Logo} alt="Logo" className="d-inline-block align-top" style={{ height: 80, color:'black' }} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          {/* Ícone de hambúrguer para dispositivos móveis */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                color: 'orange', 
                mr: 1, 
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Botões de navegação para dispositivos maiores */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '1rem', alignItems: 'center' }}>
            {navItems.map(item => (
              <Button
                key={item.Id}
                component={Link}
                to={item.Link}
                sx={{ color: 'orange', fontWeight: 600 }}
                onClick={() => handleNavigation(item.Link)}
              >
                {item.Title}
              </Button>
            ))}
          </Box>

          {/* Ícone do carrinho para dispositivos maiores */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', alignItems: 'center' }}>
            {admin === undefined && (
              <ButtonCarrinho onClick={() => navigate('/carrinho')} />
            )}
          </Box>

          {/* Menu de navegação para dispositivos móveis */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {navItems.map(item => (
              <MenuItem key={item.Id} onClick={() => handleNavigation(item.Link)}>
                {item.Title}
              </MenuItem>
            ))}
          </Menu>

          {/* Ícone de carrinho para dispositivos móveis */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto', alignItems: 'center' }}>
            {admin === undefined && (
              <ButtonCarrinho onClick={() => navigate('/carrinho')} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
