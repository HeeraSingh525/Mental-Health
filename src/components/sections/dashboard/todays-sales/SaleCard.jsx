import { Card, CardContent, Stack, Typography } from '@mui/material';
import IconifyIcon from '../../../../components/base/IconifyIcon';

const SaleCard = ({ item }) => {
  const { value, label, bgColor, iconBackgroundColor, icon, svgIcon: SvgIcon } = item;

  const Icon = icon ? (
    <IconifyIcon icon={icon} sx={{ fontSize: 20, color: 'common.white' }} />
  ) : SvgIcon ? (
    <SvgIcon sx={{ fontSize: 24 }} />
  ) : null;

  return (
    <Card
      sx={{
        borderRadius: 4,
        bgcolor: bgColor,
        height: '100%',
      }}
    >
      <CardContent sx={(theme) => ({ p: { xs: `${theme.spacing(2.5)} !important` } })}>
        <Stack
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: iconBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          {Icon}
        </Stack>

        <Typography variant="h3" color="primary.darker" mb={1}>
          {value}
        </Typography>
        <Typography variant="h6" color="grey.800" component="p" mb={1}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SaleCard;
