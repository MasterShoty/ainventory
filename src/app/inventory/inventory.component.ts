import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

export interface Product {
  name: string;
  current: { count: number; type: string }; // Let type be string for now too
  incoming: { count: number; date: string }; // Let date be string for now
  prediction: string;
}

export interface Tab {
  title: string;
  data?: Product[];
}

const MOCK_DATA_MEAT: Product[] = [
  {
    name: 'Lamb Chops',
    current: { count: 25, type: 'kg' },
    incoming: { count: 5, date: 'Nov. 26' },
    prediction: 'GOOD',
  },
  {
    name: 'Eggs',
    current: { count: 10, type: 'pkg' },
    incoming: { count: 20, date: 'Nov. 26' },
    prediction: 'GOOD',
  },
  {
    name: 'Ground beef',
    current: { count: 4, type: 'kg' },
    incoming: { count: 3, date: 'Nov. 26' },
    prediction: 'LACKING',
  },
  {
    name: 'Chicken Thighs',
    current: { count: 40, type: 'units' },
    incoming: { count: 120, date: 'Nov. 24' },
    prediction: 'EXCESS',
  },
  {
    name: 'NY Steak',
    current: { count: 10, type: 'units' },
    incoming: { count: 30, date: 'Nov. 27' },
    prediction: 'LACKING',
  },
];

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
  dataSource?: Product[];
  inventoryTabs = RESTAURANT_TABS;
  displayedColumns: string[] = ['name', 'current', 'incoming', 'prediction'];
  constructor() {}

  ngOnInit(): void {
    this.activeTab = RESTAURANT_TABS[0];
  }

  tabChange($event: MatTabChangeEvent) {
    this.activeTab = RESTAURANT_TABS[$event.index];
  }
}
