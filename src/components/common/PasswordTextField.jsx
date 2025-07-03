import { forwardRef, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import IconifyIcon from '../../components/base/IconifyIcon';

const PasswordTextField = forwardRef((props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TextField
      type={isPasswordVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handlePasswordVisibility}>
              {isPasswordVisible ? (
                <IconifyIcon icon="material-symbols-light:visibility-outline-rounded" />
              ) : (
                <IconifyIcon icon="material-symbols-light:visibility-off-outline-rounded" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      ref={ref}
      {...props}
    />
  );
});

export default PasswordTextField;
