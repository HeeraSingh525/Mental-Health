import { InputAdornment, TextField } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const Search = (props) => {
  return (
    <TextField
      id="input-with-searchIcon-textfield"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconifyIcon
              icon="gravity-ui:magnifier"
              sx={{ color: 'primary.main', fontSize: 32, mr: 1 }}
            />
          </InputAdornment>
        ),
      }}
      type="text"
      variant="filled"
      placeholder="Search here..."
      hiddenLabel
      fullWidth
      {...props}
    />
  );
};

export default Search;
