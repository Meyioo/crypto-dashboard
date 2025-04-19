import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../sparkline-chart/sparkline-chart.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  imports: [CommonModule, NgApexchartsModule],
  standalone: true,
})
export class LineChartComponent implements OnInit {
  @Input() sparklineData: number[] = [];

  public chartOptions!: Partial<ChartOptions>;

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      tooltip: {
        enabled: true,
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
}
