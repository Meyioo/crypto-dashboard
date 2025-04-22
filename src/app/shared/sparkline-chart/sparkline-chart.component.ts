import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

export interface ChartOptions {
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
}

@Component({
  selector: 'app-sparkline-chart',
  templateUrl: './sparkline-chart.component.html',
  styleUrls: ['./sparkline-chart.component.css'],
  imports: [CommonModule, NgApexchartsModule],
  standalone: true,
})
export class SparklineChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private readonly chart?: ChartComponent;
  @Input() public sparklineData: number[] = [];

  public chartOptions!: Partial<ChartOptions>;

  public ngOnInit(): void {
    this.chartOptions = {
      tooltip: {
        enabled: false,
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sparklineData']) {
      this.chart?.updateSeries([
        {
          name: 'chart-line-sparkline',
          data: this.sparklineData,
        },
      ]);
    }
  }
}
