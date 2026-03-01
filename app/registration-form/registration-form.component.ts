import { Component } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
}

@Component({
  selector: "registration-form",
  templateUrl: "./registration-form.component.html"
})

export class RegistrationFormComponent {
  onSubmit(formValue) {
    console.log(formValue);
  }
}