import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  colors: string[];
  labels: string[] | number[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-sparkline-chart',
  templateUrl: './sparkline-chart.component.html',
  styleUrls: ['./sparkline-chart.component.css'],
  imports: [CommonModule, NgApexchartsModule],
  standalone: true,
})
export class SparklineChartComponent implements OnInit {
  @Input() sparklineData: number[] = [];

  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      chart: {
        type: 'line',
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return '';
            },
          },
        },
        marker: {
          show: false,
        },
      },
      series: [
        {
          name: 'chart-line-sparkline',
          data: this.sparklineData,
        },
      ],
    };
  }

  ngOnInit(): void {
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: 'chart-line-sparkline',
          data: this.sparklineData,
        },
      ],
    };
  }
}
