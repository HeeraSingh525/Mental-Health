import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, GeoComponent } from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import world from 'assets/json/world.json';
import ReactEchart from 'components/base/ReactEhart';

echarts.use([TooltipComponent, GeoComponent, MapChart, CanvasRenderer]);

echarts.registerMap('world', { geoJSON: world });

const SalesMappingChart = ({
  salesMappingChartRef,
  data,
  style,
  minZoomLevel,
  maxZoomLevel,
  ...props
}) => {
  const theme = useTheme();

  const salesMappingChartOption = useMemo(() => {
    const option = {
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: (params) => {
          const { name, value } = params;
          if (value) return `${name} : ${value}`;
          else return `${name} : 0`;
        },
      },

      series: [
        {
          type: 'map',
          map: 'world',
          data,
          roam: true,
          scaleLimit: {
            min: minZoomLevel,
            max: maxZoomLevel,
          },
          left: 0,
          right: 0,
          label: {
            show: false,
          },
          selectedMode: false,
          itemStyle: {
            areaColor: theme.palette.grey.A700,
            borderColor: theme.palette.common.white,
            borderWidth: 0.2,
          },

          emphasis: {
            disabled: true,
          },
        },
      ],
    };
    return option;
  }, [theme, data]);

  return (
    <ReactEchart
      echarts={echarts}
      option={salesMappingChartOption}
      ref={salesMappingChartRef}
      style={style}
      {...props}
    />
  );
};

export default SalesMappingChart;
