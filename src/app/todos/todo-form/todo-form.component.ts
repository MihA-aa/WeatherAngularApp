import { Component, Output, EventEmitter } from '@angular/core';

import { Location } from "./../../shared/location";

@Component({
    moduleId: module.id,
    selector: 'todo-form',
    templateUrl: './todo-form.component.html',
    styles: []
})
export class TodoFormComponent {
    id_city: string = "";
    id_state: string = "";
    @Output() create: EventEmitter<Location> = new EventEmitter()
    @Output() getUserLocation = new EventEmitter()

    onGetUserLocation() {
      this.getUserLocation.emit();
    }

    onSubmit() {
      this.create.emit(new Location(this.id_city.replace(" ", ""), this.id_state.replace(" ", "")));
    }

}
