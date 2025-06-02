import { SvgIconProps } from '@mui/material';
import OrderIcon from 'components/icons/OrderIcon';
// import SalesIcon from 'components/icons/SalesIcon';

export interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColor: string;
  iconBackgroundColor: string;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
}

export const sales: SaleItem[] = [
  {
    label: 'Flagged Conversations',
    value: '150',
    growth: '+8%',
    bgColor: 'error.lighter',
    iconBackgroundColor: 'error.main',
    icon: 'mdi:account-convert',
  },
  {
    label: 'Continuing Conversations',
    value: '300+',
    growth: '+5%',
    bgColor: 'warning.lighter',
    iconBackgroundColor: 'error.dark',
    svgIcon: OrderIcon,
  },
  {
    label: 'Bot Response Accuracy',
    value: '96%',
    growth: '+1.2%',
    bgColor: 'success.lighter',
    iconBackgroundColor: 'success.darker',
    icon: 'mdi:responsive',
  },
  {
    label: 'Mood Change Trend',
    value: '8',
    growth: '+0.5%',
    bgColor: 'secondary.lighter',
    iconBackgroundColor: 'secondary.main',
    icon: 'mdi:mood',
  },
];
