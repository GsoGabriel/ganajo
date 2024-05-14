import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../../../Assets/ganajo-logo.png';
import { useAdminContext } from '../../../Context/AdminContext.tsx';
import { NavBarLink } from '../../../DTOs/NavBarLink';
import commonNavItems from './commonUserNavBarItems.ts';
import adminNavItens from './adminUserNavBarItems.ts';
import { Link, useNavigate } from 'react-router-dom';
import ButtonCarrinho from '../Buttons/Carrinho/ButtonCarrinho.tsx';

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [navItems, setNavItems] = React.useState<NavBarLink[]>(commonNavItems);
  const navigate = useNavigate();
  const { admin } = useAdminContext();

  React.useEffect(() => {
    setNavItems(admin !== undefined ? adminNavItens : commonNavItems);
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
    <AppBar position="static" sx={{ background: 'linear-gradient(to bottom, #dcdcdc, #ffffff)', borderBottom: '0.5px solid #ccc', boxShadow: '1px 2px 3px gray' }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={admin !== undefined ? '/homeAdmin' : '/'}>
            <img src={Logo} alt="Logo" className="d-inline-block align-top" style={{ height: 80, color:'black' }} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map(item => (
              <Button
                key={item.Id}
                component={Link}
                to={item.Link}
                sx={{ mx: 1, color: 'orange', fontWeight: 1000 }} 
                onClick={() => handleNavigation(item.Link)}
              >
                {item.Title}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'orange'}}>
            {admin === undefined && (
              <ButtonCarrinho onClick={ () => navigate('/carrinho')}/>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
