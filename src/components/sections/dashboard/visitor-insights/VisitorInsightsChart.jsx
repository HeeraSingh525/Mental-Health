import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEchart from '../../../../components/base/ReactEhart';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const VisitorInsightsChart = ({ chartRef, data, style }) => {
  const theme = useTheme();

  const visitorInsightsChartOption = useMemo(() => {
    const option = {
      color: [
        theme.palette.secondary.darker,
        theme.palette.error.darker,
        theme.palette.success.darker,
      ],

      tooltip: {
        trigger: 'axis',
        confine: true,
        axisPointer: {
          lineStyle: {
            color: theme.palette.error.main,
          },
        },
      },

      legend: {
        show: false,
      },

      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontFamily: theme.typography.button.fontFamily,
          fontSize: theme.typography.fontSize / 1.4,
          color: theme.palette.grey[200],
        },
        axisLine: {
          show: false,
        },
      },

      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: theme.typography.caption.fontSize,
          color: theme.palette.grey.A200,
        },
        splitLine: {
          lineStyle: {
            color: theme.palette.grey.A400,
          },
        },
      },

      grid: {
        top: 8,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true,
      },

      series: [
        {
          name: 'Loyal Users',
          type: 'line',
          data: data['loyal customers'],
          smooth: true,
          symbol: 'circle',
          showSymbol: false,
          symbolSize: 14,

          lineStyle: {
            width: 4,
          },
        },
        {
          name: 'New Users',
          type: 'line',
          data: data['new customers'],
          smooth: true,
          symbol: 'circle',
          showSymbol: false,
          symbolSize: 14,
          lineStyle: {
            width: 4,
          },
        },
        {
          name: 'Unique Users',
          type: 'line',
          data: data['unique customers'],
          smooth: true,
          symbol: 'circle',
          showSymbol: false,
          symbolSize: 14,
          lineStyle: {
            width: 4,
          },
        },
      ],
    };
    return option;
  }, [theme, data]);

  return (
    <ReactEchart
      echarts={echarts}
      option={visitorInsightsChartOption}
      ref={chartRef}
      style={style}
    />
  );
};

export default VisitorInsightsChart;
