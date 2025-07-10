import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoHeader from '../../layouts/main-layout/sidebar/LogoHeader';
import PasswordTextField from '../../components/common/PasswordTextField';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

const checkBoxLabel = { inputProps: { 'aria-label': 'Checkbox' } };

const SignIn = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // or 'error'
    vertical: 'top',
    horizontal: 'right',
  });

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://172.236.30.193:8008/api/admin/login', {
        email: data.email,
        password: data.password,
      });

      const { token } = response.data.data;
      // console.log('Login successful', response.data);
      if (token) {
        localStorage.setItem('authToken', token);
        navigate('/');
      } else {
        handleClickAlert({
          message: 'Oops! That email or password doesn’t seem right. Please try again.',
          severity: 'error',
        });
      }
    } catch (error) {
      handleClickAlert({
        message:
          error.response?.data?.message ||
          'Oops! That email or password doesn’t seem right. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
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

      <LogoHeader sx={{ justifyContent: 'center', mb: 5 }} />

      <Paper sx={{ p: 5 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          spacing={1}
        >
          <Typography variant="h3">Sign in</Typography>
        </Stack>

        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
            />

            <PasswordTextField
              id="password"
              label="Password"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            mt={1}
            spacing={0.5}
          >
            <FormControlLabel
              control={<Checkbox {...checkBoxLabel} color="primary" />}
              label={<Typography variant="subtitle1">Remember me</Typography>}
            />
          </Stack>

          <Button type="submit" size="large" variant="contained" sx={{ mt: 2 }} fullWidth>
            Sign in
          </Button>
          <div id="CustomBox"></div>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
