// src/pages/Settings.tsx

import React, { useState } from 'react';
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
} from '@mui/material';

const Settings = () => {
  // const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const handleSave = () => {
    console.log('Settings saved.');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Profile Section */}
        <Typography variant="h6" gutterBottom>
          Profile Settings
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Full Name" defaultValue="Aarav Mehta" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" defaultValue="aarav@example.com" />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Notification Preferences */}
        <Typography variant="h6" gutterBottom>
          Notification Preferences
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

        {/* Theme */}
        {/* <Typography variant="h6" gutterBottom>
          Theme
        </Typography> */}
        {/* <FormControlLabel
          control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
          label={darkMode ? 'Dark Mode' : 'Light Mode'}
        />

        <Divider sx={{ my: 3 }} /> */}

        {/* Save Button */}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default Settings;
