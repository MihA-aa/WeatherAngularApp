import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
 
import { AppComponent } from './app.component';
import { SharedService } from "./shared//shared.service";
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoItemComponent } from './todos/todo-item/todo-item.component';
import { MainComponent } from './main/main.component';
import { TodoFormComponent } from './todos/todo-form/todo-form.component';
import { TodoInformationComponent } from './todos/todo-information/todo-information.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    MainComponent,
    TodoFormComponent,
    TodoInformationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }