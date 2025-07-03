import { Button, Stack, Typography } from '@mui/material';
import IconifyIcon from '../../components/base/IconifyIcon';

const LegendToggleButton = ({
  name,
  icon,
  svgIcon: SvgIcon,
  color,
  value,
  legend,
  onHandleLegendToggle,
}) => {
  const Icon = icon ? (
    <IconifyIcon icon={icon} sx={{ color }} />
  ) : SvgIcon ? (
    <SvgIcon sx={{ color }} />
  ) : null;

  return (
    <Stack>
      <Button
        size="small"
        startIcon={Icon}
        onClick={() => onHandleLegendToggle(name)}
        sx={{ opacity: legend[name] ? 0.5 : 1, '&:hover': { bgcolor: 'transparent' } }}
        disableRipple
      >
        <Typography variant="button" whiteSpace="nowrap" alignSelf="end" sx={{ color: 'grey.200' }}>
          {name}
        </Typography>
      </Button>
      {value && (
        <Typography variant="subtitle2" sx={{ height: 20, ml: 4, fontWeight: 'fontWeightMedium' }}>
          {value}
        </Typography>
      )}
    </Stack>
  );
};

export default LegendToggleButton;
