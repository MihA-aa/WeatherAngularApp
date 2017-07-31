import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Location } from "./location";
import { locations } from "./data";
import 'rxjs/Rx';
import { Observable } from "rxjs";

interface ILocation {
  latitude: number,
  longitude: number,
  city: string,
  state: string
}


@Injectable()
export class SharedService {
  locations: Location[] = JSON.parse(localStorage.getItem("locations"));

  weatherURL1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
  weatherURL2 = "%2C%20";
  weatherURL3 = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  googleMapURL1 = "https://maps.googleapis.com/maps/api/geocode/json?language=en&latlng=";
  googleMapURL2 = ",";
  googleMapURL3 = "&key=AIzaSyCA8ETgVvEYi1gux7q-g5KeLntW6QZouMk";
  location: ILocation;

  constructor(private _http: Http) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    } else {
      Observable.throw("Geolocation is not supported by this browser.")
    };
  }

  getLocations(): Location[] {
    return this.locations;
  }

  createLocation(location: Location) {
    this.addToLocalStorage(location);
    this.locations.push(location);
  }

  isExist(location: Location): boolean {
    return this.locations.some(x => x.city === location.city && x.state === location.state);

  }

  deleteLocation(location: Location) {
    let index = this.locations.indexOf(location);
    if (index > -1) {
      this.removeFromLocalStorage(index);
      this.locations.splice(index, 1);
    }
  }

  findWeather(location: Location) {
    return this._http.get(this.weatherURL1 + location.city + this.weatherURL2 + location.state + this.weatherURL3)
      .map(response => {
        { return response.json() };
      })
      .catch(error => Observable.throw(error.json()));
  }

  getUserInformation() {
    let url = this.googleMapURL1 + this.location.latitude + this.googleMapURL2
      + this.location.longitude + this.googleMapURL3;
    return this._http.get(url)
      .map(response => {
        { return response.json() };
      })
      .catch(error => Observable.throw(error.json()));
  }

  setPosition(position) {
    this.location = position.coords;
  }

  addToLocalStorage(location: Location) {
    var storedLocations = JSON.parse(localStorage.getItem("locations"))
    storedLocations.push(location);
    localStorage.setItem("locations", JSON.stringify(storedLocations));
  }

  removeFromLocalStorage(index: number) {
    var storedLocations = JSON.parse(localStorage.getItem("locations"))
    storedLocations.splice(index, 1);
    localStorage.setItem("locations", JSON.stringify(storedLocations));
  }
}