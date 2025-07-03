// src/pages/Settings.jsx

import { useState } from 'react';
import {
  Container,
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
} from '@mui/material';
import { Visibility, VisibilityOff, PhotoCamera } from '@mui/icons-material';

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePic, setProfilePic] = useState('/avatar.png');

  const handleProfilePicChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Settings saved.');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Profile Settings
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Profile Section */}
        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={2}>
            <Box position="relative" display="inline-block">
              <Avatar src={profilePic} alt="Heera Singh" sx={{ width: 56, height: 56 }} />
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
            <TextField fullWidth label="Full Name" defaultValue="Aarav Mehta" />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField fullWidth label="Email" defaultValue="aarav@example.com" />
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
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default Settings;
