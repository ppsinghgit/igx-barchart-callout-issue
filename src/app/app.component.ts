import {
  DashboardModel,
  DashboardCollection,
  ShowChartsInput,
  WeeklyPurchaseProgressItem,
} from './dashboard.model';
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';
import { Subject } from 'rxjs';

import { ISelectionEventArgs } from '@infragistics/igniteui-angular';
import {
  IgxDataChartComponent,
  SeriesViewerScrollbarMode,
} from 'igniteui-angular-charts';
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  dashboardModel: DashboardModel;
  dashboardCollection: DashboardCollection;
  selectedPieChartData: any;
  pieChartComplianceCount = 0;
  pieChartNonComplianceCount = 0;
  isDisableFilterButton = true;
  pieChartBrushes = ['#00B050', '#DFEAFE'];
  barChartBrushes = ['#00B050', '#DFEAFE'];
  selectionType = 'Single';
  selectedState: any[];
  ifNoRowSelected = true;

  // eslint-disable-next-line new-cap
  @ViewChild('valueTooltip', { static: true })
  private valueTooltip: TemplateRef<object>;

  filterDataLoaded = new Subject<void>();

  public weeklyProgressReportRawData: WeeklyPurchaseProgressItem[];
  public weeklyProgressReportAllDataAfterCalc: WeeklyPurchaseProgressItem[];
  public weeklyProgressReportDisplayData: WeeklyPurchaseProgressItem[];
  public weeklyProgressReportRebateSections: string[];
  public weeklyProgressDropdownValueSelected = 'All Rebate Categories';

  // eslint-disable-next-line new-cap
  @ViewChild('weeklyPurchaseChart', { static: true })
  private weeklyPurchaseChart: IgxDataChartComponent;

  totalEnrolledStores: number;
  totalStoresOnTrackToCompliance: number;
  ontrackPercentage: number;
  isModalDataNeedsToBeLoaded = true;
  selectedTabInCharts = 1; // 1 map, 2 rebate category, 3 line chart
  // eslint-disable-next-line new-cap
  @Input()
  showChartsInput: ShowChartsInput;
  totalEnrolledStoreBarChart: number;

  // eslint-disable-next-line require-jsdoc
  constructor() {
    this.dashboardModel = new DashboardModel();
    this.dashboardCollection = new DashboardCollection();
  }

  // eslint-disable-next-line require-jsdoc, @typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.dashboardCollection.PieChart = [];
    this.dashboardCollection.BarChart = [];
    this.selectedState = [];
    this.getPieBarCharts();
  }

  // eslint-disable-next-line require-jsdoc
  public clientScreenHeight() {
    const factor =
      window.innerHeight < 700
        ? 1
        : window.innerHeight < 750
        ? 0.64
        : window.innerHeight < 800
        ? 0.67
        : window.innerHeight < 900
        ? 0.69
        : window.innerHeight < 1000
        ? 0.72
        : window.innerHeight < 1200
        ? 0.78
        : 0.85;
    let height = window.innerHeight * factor;

    if (
      window.innerWidth > 700 &&
      window.innerWidth < 850 &&
      window.innerHeight > 1000 &&
      window.innerHeight < 1200
    ) {
      height = window.innerHeight;
    }
    return { height: height + 'px' };
  }

  // eslint-disable-next-line require-jsdoc
  public selectTabOnClick(selection: number) {
    this.selectedTabInCharts = selection;
  }
  private getPieBarCharts() {
    sessionStorage.setItem('isSpinnerRequired', 'yes');

    let ChartData = {
      PieChartData: [],
      BarChartData: [
        {
          RebateCategoryCount: 16087,
          NoOfStoresOnTrack: 5740,
          BarChartAdditionalData: {
            TotalRecords: 16700,
            RebateCategory: 'ABCD',
            RebateCategoryCount: 16087,
            NoOfStoresOnTrack: 5740,
            OnTrackPercentage: 36,
          },
        },
        {
          RebateCategoryCount: 15462,
          NoOfStoresOnTrack: 5698,
          BarChartAdditionalData: {
            TotalRecords: 16700,
            RebateCategory: 'XYZ',
            RebateCategoryCount: 15462,
            NoOfStoresOnTrack: 5698,
            OnTrackPercentage: 37,
          },
        },
        {
          RebateCategoryCount: 16700,
          NoOfStoresOnTrack: 1010,
          BarChartAdditionalData: {
            TotalRecords: 16700,
            RebateCategory: 'KLM',
            RebateCategoryCount: 16700,
            NoOfStoresOnTrack: 1010,
            OnTrackPercentage: 6,
          },
        },
        {
          RebateCategoryCount: 737,
          NoOfStoresOnTrack: 0,
          BarChartAdditionalData: {
            TotalRecords: 16700,
            RebateCategory: 'LKJAH',
            RebateCategoryCount: 737,
            NoOfStoresOnTrack: 0,
            OnTrackPercentage: 0,
          },
        },
        {
          RebateCategoryCount: 2375,
          NoOfStoresOnTrack: 92,
          BarChartAdditionalData: {
            TotalRecords: 16700,
            RebateCategory: 'HAHH',
            RebateCategoryCount: 2375,
            NoOfStoresOnTrack: 92,
            OnTrackPercentage: 4,
          },
        },
        {
          RebateCategoryCount: 4283,
          NoOfStoresOnTrack: 396,
          BarChartAdditionalData: {
            TotalRecords: 16700,
            RebateCategory: 'LTB',
            RebateCategoryCount: 4283,
            NoOfStoresOnTrack: 396,
            OnTrackPercentage: 9,
          },
        },
        {
          RebateCategoryCount: 4049,
          NoOfStoresOnTrack: 429,
          BarChartAdditionalData: {
            TotalRecords: 16700,
            RebateCategory: 'NTAJ',
            RebateCategoryCount: 4049,
            NoOfStoresOnTrack: 429,
            OnTrackPercentage: 11,
          },
        },
        {
          RebateCategoryCount: 16700,
          NoOfStoresOnTrack: 15348,
          BarChartAdditionalData: {
            TotalRecords: 16700,
            RebateCategory: 'JTO',
            RebateCategoryCount: 16700,
            NoOfStoresOnTrack: 15348,
            OnTrackPercentage: 92,
          },
        },
      ],
    };
    this.buildPieCharts(ChartData);
  }

  public onSeriesAdded(e: any) {
    if (e.args.series) {
      e.args.series.tooltipTemplate = this.valueTooltip;
    }
  }

  public chartsHeightByScreen() {
    const clientHeight = window.innerHeight;
    const chartHeight = clientHeight * 0.8;
    return { height: chartHeight + 'px' };
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private buildPieCharts(data: Object) {
    sessionStorage.setItem('isSpinnerRequired', 'no');
    if (data) {
      this.dashboardCollection.PieChart = data['PieChartData'];
      this.dashboardCollection.BarChart = data['BarChartData'];
      this.barChartBrushes = ['#DFEAFE', '#00B050'];

      // RESET PIE COUNTS
      this.pieChartNonComplianceCount = 0;
      this.pieChartComplianceCount = 0;
      this.selectedPieChartData = null;
      // Setting Pie Chart Colors as per no of rows and order of N/Y

      const pieCharts = this.dashboardCollection.PieChart;
      if (this.checkIfDataExists(pieCharts)) {
        this.pieChartBrushes =
          pieCharts.length === 1
            ? pieCharts[0].OnTrackStatus === '0'
              ? ['#DFEAFE']
              : ['#00B050']
            : pieCharts[0].OnTrackStatus === '0'
            ? ['#DFEAFE', '#00B0502']
            : ['#00B050', '#DFEAFE'];
        this.totalEnrolledStores = 0;
        for (let i = 0; i < pieCharts.length; i++) {
          this.totalEnrolledStores =
            this.totalEnrolledStores + pieCharts[i].StoreCount;
          if (pieCharts[i].OnTrackStatus === '0') {
            this.pieChartNonComplianceCount = pieCharts[i].StoreCount;
            pieCharts[i].OnTrackPercentageText = '';
          } else if (pieCharts[i].OnTrackStatus === '1') {
            this.pieChartComplianceCount = pieCharts[i].StoreCount;
            const pieChartCompliancePercentage =
              pieCharts[i].OnTrackPercentage.toString();
            this.totalStoresOnTrackToCompliance = pieCharts[i].StoreCount;
            this.ontrackPercentage = pieCharts[i].OnTrackPercentage;
            pieCharts[i].OnTrackPercentageText =
              pieChartCompliancePercentage + '%';
            this.selectedPieChartData = pieCharts[i];
          }
        }
      }
      if (this.checkIfDataExists(this.dashboardCollection.BarChart)) {
        this.totalEnrolledStoreBarChart =
          this.dashboardCollection.BarChart[0].BarChartAdditionalData.TotalRecords;

        // eslint-disable-next-line prefer-spread
        const maximum = Math.max.apply(
          Math,
          this.dashboardCollection.BarChart.map(function (o) {
            return o.BarChartAdditionalData.RebateCategoryCount;
          })
        );

        for (let i = 0; i < this.dashboardCollection.BarChart.length; i++) {
          let yDifference = 0;
          let yCalc = 0;
          let yFinal = 0;
          let enrolledStores = 0;
          let onTrackStores = 0;
          let proportion = 0;
          let finalOffsetEnrolledStores = 0;
          const item = this.dashboardCollection.BarChart[i];
          this.dashboardCollection.BarChart[i].RebateCategory =
            this.dashboardCollection.BarChart[
              i
            ].BarChartAdditionalData.RebateCategory;

          // calculating x-offset for callouts
          item.BarChartAdditionalData.EnrolledStoresX = i;
          item.BarChartAdditionalData.OnTrackStoresX = i;

          enrolledStores = item.BarChartAdditionalData.RebateCategoryCount;
          onTrackStores = item.BarChartAdditionalData.NoOfStoresOnTrack;
          proportion = (onTrackStores * 100) / enrolledStores;

          yDifference = enrolledStores - onTrackStores;
          yCalc = yDifference * 0.15;

          yFinal = onTrackStores / 3;

          // ontrack percentage calculation

          if (proportion > 70) {
            finalOffsetEnrolledStores = (onTrackStores * 100) / enrolledStores;
            if (finalOffsetEnrolledStores > 60) {
              item.BarChartAdditionalData.EnrolledStoresY = maximum;
            } else {
              // eslint-disable-next-line max-len
              item.BarChartAdditionalData.EnrolledStoresY =
                item.BarChartAdditionalData.RebateCategoryCount;
            }
            item.BarChartAdditionalData.OnTrackStoresY = onTrackStores / 2.8;
            item.BarChartAdditionalData.onTrackPercentageY = 0;

            // final text values of callout
            item.BarChartAdditionalData.FormattedEnrolledStores =
              String(enrolledStores);
            item.BarChartAdditionalData.FormattedOnTrackStores =
              String(onTrackStores) +
              ' (' +
              item.BarChartAdditionalData.OnTrackPercentage +
              '%)';
            // item.BarChartAdditionalData.FormattedOnTrackPercentage = '';
          } else if (proportion > 70 && proportion <= 80) {
            // eslint-disable-next-line max-len
            item.BarChartAdditionalData.EnrolledStoresY =
              item.BarChartAdditionalData.RebateCategoryCount;
            item.BarChartAdditionalData.OnTrackStoresY = yFinal;
            item.BarChartAdditionalData.onTrackPercentageY = 0;

            // final text values of callout
            item.BarChartAdditionalData.FormattedEnrolledStores =
              String(enrolledStores);
            item.BarChartAdditionalData.FormattedOnTrackStores =
              String(onTrackStores) +
              ' (' +
              item.BarChartAdditionalData.OnTrackPercentage +
              '%)';
            // item.BarChartAdditionalData.FormattedOnTrackPercentage = '';
          } else if (proportion > 25 && proportion <= 70) {
            item.BarChartAdditionalData.EnrolledStoresY = onTrackStores + yCalc;
            item.BarChartAdditionalData.OnTrackStoresY = yFinal;
            item.BarChartAdditionalData.onTrackPercentageY =
              yFinal - yFinal * 0.5;

            // final text values of callout
            item.BarChartAdditionalData.FormattedEnrolledStores =
              String(enrolledStores);
            item.BarChartAdditionalData.FormattedOnTrackStores =
              String(onTrackStores) +
              ' (' +
              item.BarChartAdditionalData.OnTrackPercentage +
              '%)';
            // item.BarChartAdditionalData.FormattedOnTrackPercentage = '';
          } else if (proportion <= 25) {
            item.BarChartAdditionalData.EnrolledStoresY = maximum * 0.25;
            item.BarChartAdditionalData.OnTrackStoresY = maximum * 0.15;
            item.BarChartAdditionalData.onTrackPercentageY = 0;

            // final text values of callout
            item.BarChartAdditionalData.FormattedEnrolledStores =
              String(enrolledStores);
            item.BarChartAdditionalData.FormattedOnTrackStores =
              String(onTrackStores) +
              ' (' +
              item.BarChartAdditionalData.OnTrackPercentage +
              '%)';
            // item.BarChartAdditionalData.FormattedOnTrackPercentage = '';
          }
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkIfDataExists(item: any): boolean {
    return item && (typeof item !== 'number' || !isNaN(item as number));
  }
}
