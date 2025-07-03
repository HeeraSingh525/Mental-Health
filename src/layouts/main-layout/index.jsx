import { Box, Stack, Toolbar } from '@mui/material';
import { useState } from 'react';
import VerticalNavbar from './sidebar/VerticalNavbar';
import Topbar from './topbar/Topbar';
import Footer from './footer/Footer';
import { NavFunctionProvider } from './NavFunctionContext';

const drawerWidth = 345;

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <NavFunctionProvider>
      <Stack direction="row">
        <Topbar drawerWidth={drawerWidth} onHandleDrawerToggle={handleDrawerToggle} />

        <VerticalNavbar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onHandleDrawerClose={handleDrawerClose}
        />

        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            p: {
              xs: theme.spacing(4, 2),
              sm: theme.spacing(4, 5),
              lg: theme.spacing(4),
            },
            minHeight: '100vh',
            width: { xs: 1, sm: `calc(100% - ${drawerWidth}px)` },
            bgcolor: 'neutral.lighter',
          })}
        >
          <Toolbar />
          {children}
          <Footer />
        </Box>
      </Stack>
    </NavFunctionProvider>
  );
};

export default MainLayout;
