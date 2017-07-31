import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Location } from "./../../shared/location";

@Component({
  moduleId: module.id,
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['todo-list.component.css']
})
export class TodoListComponent {
    @Input() locations: Location[];
    @Output() delete: EventEmitter<Location> = new EventEmitter();
    @Output() show: EventEmitter<Location> = new EventEmitter();

    onDelete(location: Location) {
        this.delete.emit(location);
    }

    onShow(location: Location) {
        this.show.emit(location);
    }
}
