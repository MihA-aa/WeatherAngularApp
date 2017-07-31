import { Component, OnInit } from '@angular/core';

import { Location } from "./../shared/location";
import { SharedService } from "./../shared/shared.service";

import { LocationInformation } from "./../shared/locationInformation";

@Component({
  moduleId: module.id,
  selector: 'main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {
  locations: Location[];
  locationInformation: LocationInformation;

  constructor(private sharedService: SharedService) {
    this.locations = [];
  }

  ngOnInit() {
    this.locations = this.sharedService.getLocations();
  }

  getUserLocation() {
    this.sharedService.getUserInformation()
      .subscribe(
      lstresult => {
        let city = lstresult["results"][0]["address_components"][3]["long_name"];
        let state = lstresult["results"][0]["address_components"][4]["long_name"];
        this.create(new Location(city, state));
      },
      error => {
        alert("Error. The getUserInformation result JSON value is as follows: \n" + error);
      }
      );
  }

  create(location: Location) {
    this.sharedService.findWeather(location)
      .subscribe(
      lstresult => {
        try {
          this.setInformation(lstresult);
          if (!this.sharedService.isExist(location))
            this.sharedService.createLocation(location);
        }
        catch (e) {
          alert("Something was wrong: \n" + (<Error>e).message)
        }
      },
      error => {
        alert("Error. The findWeather result JSON value is as follows: \n" + error);
      }
      );
  }

  delete(location: Location) {
    this.sharedService.deleteLocation(location);
  }

  setInformation(lstresult: any) {
    let temp = Number(lstresult["query"]["results"]["channel"]["item"]["condition"]["temp"]);
    this.locationInformation = new LocationInformation(
      lstresult["query"]["results"]["channel"]["location"]["city"],
      lstresult["query"]["results"]["channel"]["location"]["country"],
      lstresult["query"]["results"]["channel"]["location"]["region"],
      lstresult["query"]["results"]["channel"]["location"]["country"],
      lstresult["query"]["results"]["channel"]["item"]["condition"]["date"],
      lstresult["query"]["results"]["channel"]["item"]["condition"]["text"],
      Math.round((temp - 32) / (9 / 5)))
  }

  show(location: Location) {
    this.sharedService.findWeather(location)
      .subscribe(lstresult => {
        this.setInformation(lstresult);
      });
  }
}
