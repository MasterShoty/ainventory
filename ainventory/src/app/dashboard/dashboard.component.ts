import { Component, OnInit } from '@angular/core';

const MOCK_BAR = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Monthly Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
  ],
};

const MOCK_PIE = {
  labels: ['Meat', 'Vegetables', 'Dry', 'Utilities'],
  datasets: [
    {
      data: [65, 59, 80, 81],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
      ],
    },
  ],
};

const MOCK_LINE = {
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
      data: [28, 35, 41, 94, 140, 270, 226],
      label: 'Entrees',
      borderColor: '#8e5ea2',
      fill: false,
    },
    {
      data: [31, 11, 10, 13, 22, 78, 104],
      label: 'Appetizers',
      borderColor: '#3e95cd',
      fill: false,
    },
    {
      data: [16, 17, 17, 40, 54, 65, 73],
      label: 'Desserts',
      borderColor: '#3cba9f',
      fill: false,
    },
  ],
  options: {
    title: {
      display: true,
      text: 'Sales by type',
    },
  },
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mockBar = MOCK_BAR;
  mockPie = MOCK_PIE;
  mockLine = MOCK_LINE;
  constructor() {}

  ngOnInit(): void {}
}
