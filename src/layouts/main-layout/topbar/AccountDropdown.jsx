import {
  Avatar,
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Profile from '../../../assets/Profile.webp';
import IconifyIcon from '../../../components/base/IconifyIcon';
import { Link as RouterLink } from 'react-router-dom';
import { useNavFunction } from '../NavFunctionContext';
import axios from 'axios';

const menuItems = [
  {
    id: 1,
    label: 'My Account',
    icon: 'material-symbols:account-box-sharp',
    pathName: '/Settings',
  },
  {
    id: 2,
    label: 'Logout',
    icon: 'uiw:logout',
    pathName: 'authentication/sign-in',
  },
];

const AccountDropdown = () => {
  const [anchorEl, setAnchorEl] = useState();
  const [profileImg, setProfileImg] = useState(Profile);
  const open = Boolean(anchorEl);
  const { navItemFunction } = useNavFunction();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const accountMenuItems = menuItems.map((menuItem) => {
    if (menuItem.label === 'Logout') {
      return (
        <MenuItem
          key={menuItem.id}
          onClick={() => {
            handleClose();
            navItemFunction(); // 👈 Your custom logout function from context
          }}
          sx={{
            '&:hover .account-menu-icon': { color: 'common.white' },
          }}
        >
          <ListItemIcon>
            <IconifyIcon
              icon={menuItem.icon}
              sx={{ color: 'primary.main' }}
              className="account-menu-icon"
            />
          </ListItemIcon>
          <Typography variant="body1">{menuItem.label}</Typography>
        </MenuItem>
      );
    }

    const fetchAmdinProfile = async () => {
      try {
        const response = await axios.get('http://172.236.30.193:8008/api/admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setProfileImg(response.data.data[0].profile);
      } catch (err) {
        console.error('Error fetching admin profile:', err);
      }
    };

    useEffect(() => {
      fetchAmdinProfile();
    }, []);

    return (
      <MenuItem
        key={menuItem.id}
        onClick={handleClose}
        component={RouterLink}
        to={menuItem.pathName}
        rel="noopener noreferrer"
        sx={{
          '&:hover .account-menu-icon': { color: 'common.white' },
        }}
      >
        <ListItemIcon>
          <IconifyIcon
            icon={menuItem.icon}
            sx={{ color: 'primary.main' }}
            className="account-menu-icon"
          />
        </ListItemIcon>
        <Typography variant="body1">{menuItem.label}</Typography>
      </MenuItem>
    );
  });

  return (
    <>
      <Button
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ px: { xs: 1, sm: 2 }, minWidth: 'auto' }}
      >
        <Avatar
          sx={{
            width: { xs: 48, sm: 60 },
            height: { xs: 48, sm: 60 },
            borderRadius: 4,
            mr: { xs: 0, xl: 2.5 },
          }}
          alt="User Profile"
          src={profileImg ? `http://172.236.30.193:8008/${profileImg}` : Profile}
        />
        <Box sx={{ display: { xs: 'none', xl: 'block' } }}>
          <Stack direction="row" alignItems="center" columnGap={6}>
            <Typography variant="h6" component="p" color="primary.darker" gutterBottom>
              Musfiq
            </Typography>
            <IconifyIcon icon="ph:caret-down-bold" fontSize={16} color="primary.darker" />
          </Stack>
          <Typography variant="subtitle2" textAlign="left" color="primary.lighter">
            Admin
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={() => {
          handleClose();
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {accountMenuItems}
      </Menu>
    </>
  );
};

export default AccountDropdown;
