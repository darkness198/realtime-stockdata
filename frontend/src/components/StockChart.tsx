import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartData,
  ChartOptions,
  LineControllerChartOptions
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import Chart from 'chart.js/auto';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

interface StockChartProps {
  stock: {
    symbol: string;
    data: ChartData<'line', { x: Date; y: number }[], string>;
  };
}

// Renders a line chart for the selected stock with zoom functionality
const StockChart: React.FC<StockChartProps> = ({ stock }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<"line", { x: Date; y: number }[], string> | null>(null);

  useEffect(() => {
    if (chartRef.current && !chartInstanceRef.current ) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const newChart = new Chart(ctx, {
          type: 'line',
          data: stock.data,
          options: options
        });
        chartInstanceRef.current = newChart
      }
    } 
  }, [stock]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0] = stock.data.datasets[0]
      chartInstanceRef.current.update();
    }
  }, [chartInstanceRef.current, stock]);

  // Chart.js options for the line chart
  const options: ChartOptions<'line'> & LineControllerChartOptions = {
    scales: {
   
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }

            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }

            return label;
          },
          afterLabel: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const xAxis = chartInstanceRef.current?.scales.x;
            const currentPointIndex = tooltipItem.dataIndex;
            const previousPointIndex = currentPointIndex > 0 ? currentPointIndex - 1 : 0;
            const currentPoint = dataset.data[currentPointIndex] as any;
            const previousPoint = dataset.data[previousPointIndex] as any;
            const currentPointX = currentPoint && currentPoint.x instanceof Date ? xAxis?.getPixelForValue(currentPoint.x.getTime()) : null;
            const previousPointX = previousPoint && previousPoint.x instanceof Date ? xAxis?.getPixelForValue(previousPoint.x.getTime()) : null;
            const change = currentPointX && previousPointX ? ((currentPointX - previousPointX) / previousPointX) * 100 : 0;

            if (!isNaN(change)) {
              return [`Change: ${change.toFixed(2)}%`];
            }
            return [];
          },
          beforeLabel: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const xAxis = chartInstanceRef.current?.scales.x;
            const currentPointIndex = tooltipItem.dataIndex;
            const nextPointIndex =
              currentPointIndex < dataset.data.length - 1 ? currentPointIndex + 1 : dataset.data.length - 1;
            const currentPoint = dataset.data[currentPointIndex] as any;
            const nextPoint = dataset.data[nextPointIndex] as any;
            const currentPointX = currentPoint && currentPoint.x instanceof Date ? xAxis?.getPixelForValue(currentPoint.x.getTime()) : null;
            const nextPointX = nextPoint && nextPoint.x instanceof Date ? xAxis?.getPixelForValue(nextPoint.x.getTime()) : null;
            const change = currentPointX && nextPointX ? ((nextPointX - currentPointX) / currentPointX) * 100 : 0;

            if (!isNaN(change)) {
              return [`Change: ${change.toFixed(2)}%`];
            }
            return [];
          },
          title: (tooltipItems) => {
            const point = tooltipItems[0];
            const datasetLabel = point.dataset.label || '';
            const value = point.formattedValue || '';
            const date = new Date(point.parsed.x).toLocaleDateString();

            return `${datasetLabel}: ${value} (${date})`;
          },
        },
      },
    },
    spanGaps: true,
    showLine: true
  };

  return (
    <div>
      <canvas ref={chartRef} />
      <button
        onClick={() => {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
            const newChart = new Chart(chartRef.current!, {
              type: 'line',
              data: stock.data,
              options: options
            });
            chartInstanceRef.current = newChart
          }
        }}
      >
        Reset Zoom
      </button>
    </div>
  );
};

export default StockChart;

