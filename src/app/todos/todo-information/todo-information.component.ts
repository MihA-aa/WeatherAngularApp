import { Component, Input } from '@angular/core';

import { LocationInformation } from "./../../shared/locationInformation";

@Component({
  selector: 'todo-information',
  templateUrl: './todo-information.component.html',
  styleUrls: ['todo-information.component.css']
})
export class TodoInformationComponent {

  @Input() locationInformation: LocationInformation;
  constructor() { }

}
