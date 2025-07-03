import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconifyIcon from '../../../components/base/IconifyIcon';
import CollapsedItems from './CollapsedItems';
import { useNavFunction } from '../NavFunctionContext';

const NavItem = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const { setNavItemFunction } = useNavFunction();

  const handleCollapsedItem = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setNavItemFunction(() => () => {
      setConfirmLogout(true);
    });
  }, []);

  const handleLogoutConfirm = () => {
    localStorage.clear();
    setConfirmLogout(false);
    navigate('/authentication/sign-in');
  };

  const handleLogoutCancel = () => {
    setConfirmLogout(false);
  };

  const { name, path, icon, svgIcon: SvgIcon, active, items } = item;

  const Icon = icon ? (
    <IconifyIcon icon={icon} fontSize={32} />
  ) : SvgIcon ? (
    <SvgIcon sx={{ fontSize: 32 }} />
  ) : null;

  return (
    <>
      <ListItem
        sx={{
          flexDirection: 'column',
          alignItems: 'stretch',
          p: 0,
          opacity: active ? 1 : 0.5,
          display: active ? 'inline-block' : 'none',
        }}
      >
        <ListItemButton
          selected={location.pathname === path}
          component={path ? Link : 'div'}
          href={item.pathName !== 'sign-in' ? path : undefined}
          onClick={(e) => {
            handleCollapsedItem(); // call your existing handler

            if (item.pathName === 'sign-in') {
              e.preventDefault(); // stop navigation
              setConfirmLogout(true); // open logout confirmation modal/dialog
            }
          }}
          sx={[
            location.pathname === path && {
              '.MuiListItemIcon-root': {
                color: 'common.white',
              },
            },
            {
              '&:hover .MuiListItemIcon-root': {
                color: 'common.white',
              },
            },
            { pl: 3, py: 2 },
          ]}
        >
          <ListItemIcon sx={{ mr: 3, color: 'primary.light', transition: 'color 0.3s' }}>
            {Icon}
          </ListItemIcon>
          <ListItemText primary={name} sx={[location.pathname === path && { fontWeight: 600 }]} />
          {items && <IconifyIcon icon={open ? 'ph:caret-up-bold' : 'ph:caret-down-bold'} />}
        </ListItemButton>

        {items && <CollapsedItems items={items} open={open} />}
      </ListItem>

      {/* Logout Confirmation Modal */}
      <Dialog open={confirmLogout} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out? All data will be cleared.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavItem;
