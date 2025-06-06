import { Link, Stack, Typography } from '@mui/material';
import Logo from '../../../components/icons/Logo';
import { rootPaths } from '../../../routes/paths';

const LogoHeader = (props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      columnGap={3}
      component={Link}
      href={rootPaths.root}
      {...props}
    >
      <Logo sx={{ fontSize: 56 }} />
      <Typography variant="h2" color="primary.darker">
        TheraBot
      </Typography>
    </Stack>
  );
};

export default LogoHeader;
