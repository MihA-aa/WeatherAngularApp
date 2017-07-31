import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Location } from "./../../shared/location";

@Component({
  moduleId: module.id,
  selector: 'todo-item',
  templateUrl: 'todo-item.component.html',
  styleUrls: ['todo-item.component.css']
})
export class TodoItemComponent {
  @Input() location: Location;
  @Output() delete = new EventEmitter();
  @Output() show = new EventEmitter();

  onShow() {
    this.show.emit(this.location);
  }

  onDelete() {
    this.delete.emit(this.location);
  }
}
