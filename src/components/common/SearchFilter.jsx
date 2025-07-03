import { TextField } from '@mui/material';
import IconifyIcon from '../../components/base/IconifyIcon';

const SearchFilter = ({ apiRef, ...props }) => {
  const handleFilter = (event) => {
    const value = event.target.value;
    const searchText = value.toLowerCase();
    apiRef.current.setQuickFilterValues([searchText]);
  };

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <IconifyIcon
            icon="gravity-ui:magnifier"
            sx={{ color: 'primary.main', fontSize: 32, mr: 1 }}
          />
        ),
      }}
      type="search"
      variant="filled"
      placeholder="Search..."
      onChange={handleFilter}
      {...props}
    />
  );
};

export default SearchFilter;
