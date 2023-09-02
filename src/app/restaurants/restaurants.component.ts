import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantSearchResult } from '../model/restaurantSearchResult.model';
import { FormControl } from '@angular/forms';
import { Restaurant } from '../model/restaurant.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent implements OnInit {
  restaurants: RestaurantSearchResult = new RestaurantSearchResult();
  restaurantsNiz: Restaurant[] = [];
  count: number = 0;

  params = {
    page: 1,
    pageSize: 12,
    sort: '',
    sortDirection: '',
    filter: {
      priceFrom: 1,
      priceTo: 5,
      cuisine: '',
    },
  };
  priceFromControl = new FormControl(1);
  priceToControl = new FormControl(5);

  constructor(
    private service: RestaurantService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      let cuisine = params['cuisine'];

      if (cuisine == 'all') {
        cuisine = '';
      }

      this.params.filter.cuisine = cuisine;
      this.params.page = 1;
      this.getRestaurants();
    });
  }

  getRestaurants() {
    this.service
      .getAll(this.params)
      .subscribe((restaurants: RestaurantSearchResult) => {
        // console.log(restaurants);
        this.restaurants = restaurants;
      });
  }

  onPriceChanged() {
    this.params.filter.priceFrom = this.priceFromControl.value || 1;
    this.params.filter.priceTo = this.priceToControl.value || 5;
    this.params.page = 1;
    this.getRestaurants();
  }
}
