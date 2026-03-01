import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule ,ReactiveFormsModule],
  declarations: [ AppComponent, HelloComponent, RegistrationFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
