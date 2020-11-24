import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';

export interface Product {
  name: string;
  id: string;
  current: { count: number; total: number; type: string }; // Let type be string for now too
  incoming: { count: number; date: string }; // Let date be string for now
  prediction: {
    id: string;
    text?: string;
    data: (number | null)[];
    predict: (number | null)[];
    estimate?: number;
    error?: number;
    chart?: any;
  }; // Undetermined type
}

export interface Tab {
  title: string;
  data?: Product[];
}

const MOCK_DATA_MEAT: Product[] = [
  {
    name: 'Lamb Chops',
    id: '1',
    current: { count: 54, total: 200, type: 'kg' },
    incoming: { count: 50, date: 'Nov. 26' },
    prediction: {
      id: '0',
      text: 'GOOD',
      data: [21, 23, 25, 36, 31, null, null],
      predict: [null, null, null, null, 31, 24, 33],
    },
  },
  {
    name: 'Eggs',
    id: '2',
    current: { count: 992, total: 2500, type: 'units' },
    incoming: { count: 300, date: 'Nov. 26' },
    prediction: {
      id: '0',
      text: 'GOOD',
      data: [283, 240, 352, 289, 344, null, null],
      predict: [null, null, null, null, 344, 532, 484],
    },
  },
  {
    name: 'Ground beef',
    id: '3',
    current: { count: 8, total: 65, type: 'kg' },
    incoming: { count: 30, date: 'Nov. 26' },
    prediction: {
      id: '-1',
      text: 'NOT ENOUGH',
      data: [10, 12, 11, 13, 11, null, null],
      predict: [null, null, null, null, 11, 13, 12],
    },
  },
  {
    name: 'Chicken Thighs',
    id: '4',
    current: { count: 312, total: 500, type: 'units' },
    incoming: { count: 120, date: 'Nov. 24' },
    prediction: {
      id: '1',
      text: 'TOO MUCH',
      data: [30, 28, 35, 51, 44, null, null],
      predict: [null, null, null, null, 44, 92, 88],
    },
  },
  {
    name: 'NY Steak',
    id: '5',
    current: { count: 34, total: 300, type: 'units' },
    incoming: { count: 400, date: 'Nov. 27' },
    prediction: {
      id: '-1',
      text: 'NOT ENOUGH',
      data: [28, 35, 41, 94, 68, null, null],
      predict: [null, null, null, null, 68, 78, 104],
    },
  },
  {
    name: '303',
    id: '303',
    current: { count: 131231, total: 140000, type: 'units' },
    incoming: { count: 0, date: '' },
    prediction: {
      id: '-1',
      text: 'NOT ENOUGH',
      data: [162640, 157445, 144224, 132809, 127733, 127733, null],
      predict: [null, null, null, null, null, 127733, 126164],
      estimate: 126164,
      error: 1.02,
    },
  },
  {
    name: '325',
    id: '325',
    current: { count: 28000, total: 30000, type: 'units' },
    incoming: { count: 0, date: '' },
    prediction: {
      id: '1',
      text: 'TOO MUCH',
      data: [32635, 31647, 29120, 28104, 28409, 27719, null],
      predict: [null, null, null, null, null, 27719, 22706],
      estimate: 22706,
      error: 20.56,
    },
  },
  {
    name: '972',
    id: '972',
    current: { count: 184310, total: 200000, type: 'units' },
    incoming: { count: 0, date: '' },
    prediction: {
      id: '1',
      text: 'TOO MUCH',
      data: [255116, 233670, 206396, 201743, 192770, 181891, null],
      predict: [null, null, null, null, null, 181891, 130254],
      estimate: 130254,
      error: 26.98,
    },
  },
  {
    name: '1109',
    id: '1109',
    current: { count: 700000, total: 720000, type: 'units' },
    incoming: { count: 0, date: '' },
    prediction: {
      id: '0',
      text: 'GOOD',
      data: [645898, 621722, 613047, 600842, 634467, 669484, null],
      predict: [null, null, null, null, null, 669484, 702814],
      estimate: 702814,
      error: 4.83,
    },
  },
];

const REAL_ID = ['303', '325', '972', '1109'];

const BASE_LINE = {
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  datasets: [
    {
      data: [null, null, null, null, null, null, null],
      label: 'history',
      borderColor: '#3e95cd',
      fill: false,
      lineTension: 0,
    },
    {
      data: [null, null, null, null, null, null, null],
      label: 'prediction',
      borderColor: '#b70000',
      borderDash: [4, 8],
      fill: false,
      lineTension: 0,
    },
  ],
  options: {
    title: {
      display: true,
      text: 'Inventory prediction',
    },
  },
};

const RESTAURANT_TABS: Tab[] = [
  { title: 'Meat', data: MOCK_DATA_MEAT },
  { title: 'Vegetable', data: undefined },
  { title: 'Dry', data: undefined },
  { title: 'Utilities', data: undefined },
];

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  activeTab?: Tab;
  dataSource?: MatTableDataSource<Product>;
  inventoryTabs = RESTAURANT_TABS;
  displayedColumns: string[] = ['name', 'current', 'incoming', 'prediction'];

  @ViewChild(MatSort) sort: MatSort | null = null;
  constructor() {}

  ngOnInit(): void {
    this.activeTab = RESTAURANT_TABS[0];
    this.dataSource = new MatTableDataSource(this.activeTab.data);
    if (this.activeTab && this.activeTab.data) {
      this.activeTab.data.forEach((e) => {
        this.initPredictionChart(e);
      });
    }
  }

  ngAfterViewInit() {
    this.initSort();
  }

  initSort() {
    if (this.dataSource) {
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'current.count':
            return item.current.count;
          case 'incoming.date':
            return item.incoming.date; // Need to change to proper date, right now it's sorting the string
          case 'prediction':
            return item.prediction.id; // Should change to numerical later
          default:
            // @ts-ignore
            return item[property];
        }
      };
      this.dataSource.sort = this.sort;
    }
  }

  tabChange($event: MatTabChangeEvent) {
    this.activeTab = RESTAURANT_TABS[$event.index];
    this.dataSource = new MatTableDataSource(this.activeTab.data);
    this.initSort();
    if (this.activeTab && this.activeTab.data) {
      this.activeTab.data.forEach((e) => {
        this.initPredictionChart(e);
      });
    }
  }

  initPredictionChart(element: Product) {
    // Start with the base line, base line chart is set here because I don't wanna clone
    if (
      !element.prediction.data ||
      !element.prediction.predict ||
      element.prediction.data.length === 0 ||
      element.prediction.predict.length === 0
    )
      return;
    let chart = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: undefined,
          label: 'record',
          borderColor: '#3f51b5',
          fill: false,
          lineTension: 0,
        },
        {
          data: undefined,
          label: 'prediction',
          borderColor: '#b70000',
          borderDash: [4, 8],
          fill: false,
          lineTension: 0,
        },
      ],
      options: {
        title: {
          display: true,
          text: 'Inventory prediction',
        },
      },
    };
    // @ts-ignore
    chart.datasets[0].data = element.prediction.data;
    // @ts-ignore
    chart.datasets[1].data = element.prediction.predict;
    if (REAL_ID.includes(element.id)) {
      chart.labels = [
        'Week 1',
        'Week 2',
        'Week 3',
        'Week 4',
        'Week 5',
        'Week 6',
        'Week 7',
      ];
    }
    element.prediction.chart = chart;
  }
}
