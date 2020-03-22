import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenName: string = "superuser";
  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl("Abir", [
          Validators.required,
          this.isForbidden.bind(this)
        ]),
        email: new FormControl(null, [Validators.required, Validators.email])
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([])
    });
    this.signupForm.setValue({
      userData: {
        username: "Abir",
        email: "you@example.com"
      },
      gender: "male",
      hobbies: []
    });
    this.signupForm
      .get("userData.username")
      .valueChanges.subscribe(value => console.log(value));
  }
  getControls() {
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }
  addControl() {
    const new_control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(new_control);
  }
  onSubmit() {
    console.log(this.signupForm);
  }
  isForbidden(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenName.indexOf(control.value) != -1) {
      return { isForbidden: true };
    }
    return null;
  }
}
