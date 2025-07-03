import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEchart from '../../../../components/base/ReactEhart';

echarts.use([TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

const VolumeVsServiceChart = ({ chartRef, data, style, ...rest }) => {
  const theme = useTheme();

  const volumeVsServiceChartOption = useMemo(() => {
    const option = {
      color: [theme.palette.success.main, theme.palette.info.main],
      legend: {
        show: false,
      },

      tooltip: {
        confine: true,
      },

      xAxis: {
        show: false,
        data: ['', '', '', '', '', '', ''],
        boundaryGap: false,
      },

      yAxis: {
        type: 'value',
        show: false,
      },

      grid: {
        top: 0,
        bottom: 0,
        left: -20,
        right: 10,
        containLabel: true,
      },

      series: [
        {
          name: 'Services',
          type: 'bar',
          data: data.services,
          itemStyle: {
            borderRadius: 2,
          },

          stack: 'total',
          barWidth: '20%',
        },
        {
          name: 'Volume',
          type: 'bar',
          data: data.volume,
          itemStyle: {
            borderRadius: 2,
          },
          stack: 'total',
          barWidth: '20%',
        },
      ],
    };
    return option;
  }, [theme, data]);

  return (
    <ReactEchart
      echarts={echarts}
      option={volumeVsServiceChartOption}
      ref={chartRef}
      style={style}
      {...rest}
    />
  );
};

export default VolumeVsServiceChart;
