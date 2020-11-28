import { Component, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

const TYPES = {
  A: 'Alcoholic',
  PG: 'Perishable Goods',
  S: 'Shelf-stable',
};

const RECIPES = [
  {
    name: 'Moscow Mule',
    ingredients: [
      { amount: '1.5', unit: 'oz', name: 'Vodka', type: 'A' },
      { amount: '1/6', unit: 'oz', name: 'Lime juice', type: 'PG' },
      { amount: '4', unit: 'oz', name: 'Ginger beer', type: 'A' },
    ],
    trendsrc: '',
  },
  {
    name: 'Daiquiri',
    ingredients: [
      { amount: '1.5', unit: 'oz', name: 'White rum', type: 'A' },
      { amount: '1/6', unit: 'oz', name: 'Lime juice', type: 'PG' },
      { amount: '1/2', unit: 'oz', name: 'Simple syrup', type: 'S' },
    ],
    trendsrc: '',
  },
  {
    name: 'Manhattan Cocktail',
    ingredients: [
      { amount: '2', unit: 'oz', name: 'Canadian Rye', type: 'A' },
      { amount: '1', unit: 'oz', name: 'Sweet Vermouth', type: 'A' },
      { amount: '2', unit: 'dash', name: 'Angostura bitters', type: 'A' },
      { amount: '1', unit: '', name: 'Brandied Cherry', type: 'PG' },
    ],
    trendsrc: '',
  },
  {
    name: 'Aperol Spritz',
    ingredients: [
      { amount: '3', unit: 'oz', name: 'Aperol', type: 'A' },
      { amount: '3', unit: 'oz', name: 'Prosecco', type: 'A' },
      { amount: '1', unit: 'dash', name: 'Club Soda', type: 'S' },
      { amount: '1', unit: '', name: 'Orange Slice', type: 'PG' },
    ],
    trendsrc: '',
  },
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  recipes = RECIPES;
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Set the src for google trends
    this.recipes.forEach((e) => {
      let srcname = e.name.replace(/\s/g, '%20');
      console.log(srcname);
      'https://trends.google.com:443/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22' +
        srcname +
        '%22%2C%22geo%22%3A%22CA%22%2C%22time%22%3A%222018-10-27%202020-11-27%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&amp;tz=300&amp;eq=date%3Dtoday%25205-y%26geo%3DCA%26q%3D';
      console.log(
        e.trendsrc ===
          'https://trends.google.com:443/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22Moscow%20Mule%22%2C%22geo%22%3A%22CA%22%2C%22time%22%3A%222018-10-27%202020-11-27%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&amp;tz=300&amp;eq=date%3Dtoday%25205-y%26geo%3DCA%26q%3D'
      );
    });
  }
}
