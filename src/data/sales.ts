// src/data/sales.ts

import { SvgIconProps } from '@mui/material';

export interface SaleItem {
  label: string;
  key: string; // ✅ unique key for matching
  value: string;
  bgColor: string;
  iconBackgroundColor: string;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
}

export const sales: SaleItem[] = [
  {
    key: 'TotalUsers',
    label: 'Active User Base',
    value: '0',
    bgColor: 'error.lighter',
    iconBackgroundColor: 'error.main',
    icon: 'mdi:account-convert',
  },
  {
    key: 'ActiveConversations',
    label: 'Active Conversations',
    value: '0',
    bgColor: 'warning.lighter',
    iconBackgroundColor: 'error.dark',
    icon: 'mdi:account-convert',
  },
  {
    key: 'accuracy',
    label: 'Bot Response Accuracy',
    value: '0',
    bgColor: 'success.lighter',
    iconBackgroundColor: 'success.darker',
    icon: 'mdi:responsive',
  },
  {
    key: 'mood',
    label: 'Mood Change Trend',
    value: '0',
    bgColor: 'secondary.lighter',
    iconBackgroundColor: 'secondary.main',
    icon: 'mdi:mood',
  },
];
