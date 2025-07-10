import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import IconifyIcon from '../../../components/base/IconifyIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyNotifications = [
  { id: 1, title: 'New message from Ananya', time: '2 mins ago', icon: 'mdi:email-outline' },
  {
    id: 2,
    title: 'Rahul completed his session',
    time: '10 mins ago',
    icon: 'mdi:check-circle-outline',
  },
  { id: 3, title: 'Server backup completed', time: '1 hour ago', icon: 'mdi:cloud-check-outline' },
  { id: 4, title: 'New user registered', time: 'Today, 9:00 AM', icon: 'mdi:account-plus-outline' },
  { id: 5, title: 'Weekly report ready', time: 'Yesterday', icon: 'mdi:file-chart-outline' },
];

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openNotifications = () => {
    navigate(`/Notifications`);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          bgcolor: 'warning.light',
          p: 1.2,
          '&:hover': { bgcolor: 'warning.main' },
        }}
      >
        <Badge variant="dot" color="error">
          <IconifyIcon
            icon="clarity:notification-line"
            sx={{ fontSize: 24, color: 'warning.contrastText' }}
          />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 8,
          sx: {
            width: 320,
            borderRadius: 2,
            mt: 1.5,
            overflow: 'hidden',
          },
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box px={2} py={1.5}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />

        <Box
          sx={{
            maxHeight: 300,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: 6,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ccc',
              borderRadius: 3,
            },
          }}
        >
          {dummyNotifications.map((notif) => (
            <MenuItem
              key={notif.id}
              onClick={handleClose}
              sx={{
                alignItems: 'flex-start',
                py: 1.2,
                gap: 1.5,
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              <IconifyIcon
                icon={notif.icon}
                sx={{ fontSize: 22, color: 'primary.main', mt: 0.5 }}
              />
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="medium">
                    {notif.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {notif.time}
                  </Typography>
                }
              />
            </MenuItem>
          ))}

          {dummyNotifications.length === 0 && (
            <Typography variant="body2" sx={{ px: 2, py: 2, color: 'text.secondary' }}>
              No new notifications
            </Typography>
          )}
        </Box>

        <Divider />
        <Box px={2} py={1.5}>
          <Button fullWidth size="small" variant="outlined" onClick={openNotifications}>
            View All
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default Notification;
