import { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Avatar,
  IconButton,
  InputAdornment,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, PhotoCamera } from '@mui/icons-material';
import axios from 'axios';

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [adminName, setAdminName] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const [adminPasswordConfirm, setAdminPasswordConfirm] = useState();
  const [adminData, setAdminData] = useState();
  const [profilePic, setProfilePic] = useState('/avatar.png');
  const token = localStorage.getItem('authToken');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    vertical: 'top',
    horizontal: 'right',
  });

  const fetchAdminData = async () => {
    try {
      const response = await axios.get('http://172.236.30.193:8008/api/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminData(response.data.data[0]);
      setAdminName(response.data.data[0].name);
      setProfilePic(response.data.data[0].profile);
      console.log('fetchAdminData', adminData);
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleSave = async () => {
    if (adminPassword || adminPasswordConfirm) {
      if (!adminPassword || !adminPasswordConfirm) {
        handleClickAlert({
          message: 'Please confirm your new password.',
          severity: 'error',
        });
        return;
      }
      if (adminPassword !== adminPasswordConfirm) {
        handleClickAlert({
          message: 'Passwords do not match!',
          severity: 'error',
        });
        return;
      }
    }
    try {
      const formData = new FormData();
      formData.append('name', adminName);
      if (profilePic) {
        formData.append('profile', profilePic);
      }
      if (adminPassword) {
        formData.append('password', adminPassword);
      }
      const response = await axios.post('http://172.236.30.193:8008/api/admin/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        handleClickAlert({
          message: response.data?.message || 'User updated successfully!',
          severity: 'success',
        });
      } else {
        handleClickAlert({
          message: 'Something went wrong. Please try again.',
          severity: 'error',
        });
      }
    } catch (err) {
      handleClickAlert({
        message: err.response?.data?.message || 'Failed to update Admin. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleClickAlert = ({ vertical = 'top', horizontal = 'right', message, severity }) => {
    setSnackbar({
      open: true,
      message,
      severity,
      vertical,
      horizontal,
    });
  };

  const handleCloseAlert = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Admin Profile Settings
        </Typography>
        {/* Profile Section */}
        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={2}>
            <Box position="relative" display="inline-block">
              <Avatar
                src={
                  profilePic
                    ? profilePic instanceof File
                      ? URL.createObjectURL(profilePic)
                      : `http://172.236.30.193:8008/${profilePic}`
                    : ''
                }
                alt="Admin-profile"
                sx={{ width: 80, height: 80 }}
              />

              <IconButton
                color="primary"
                component="label"
                sx={{ position: 'absolute', bottom: -8, right: -8 }}
              >
                <PhotoCamera fontSize="small" />
                <input type="file" accept="image/*" hidden onChange={handleProfilePicChange} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Full Name"
              value={adminName || ''}
              onChange={(event) => {
                setAdminName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField fullWidth label="Email" value={adminData?.email || ''} disabled />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Security Section */}
        <Typography variant="h6" gutterBottom>
          Account Security
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              onChange={(event) => {
                setAdminPassword(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={(event) => {
                setAdminPasswordConfirm(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Preferences */}
        <Typography variant="h6" gutterBottom>
          Preferences
        </Typography>
        <FormControlLabel
          control={
            <Switch checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
          }
          label="Email Notifications"
        />
        <FormControlLabel
          control={<Switch checked={smsNotif} onChange={(e) => setSmsNotif(e.target.checked)} />}
          label="SMS Notifications"
        />

        <Divider sx={{ my: 3 }} />

        {/* Save Button */}
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ fontWeight: 400 }}>
          Save Changes
        </Button>
      </Paper>

      {/* Alert toast Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        key={snackbar.vertical + snackbar.horizontal}
        anchorOrigin={{ vertical: snackbar.vertical, horizontal: snackbar.horizontal }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Settings;
