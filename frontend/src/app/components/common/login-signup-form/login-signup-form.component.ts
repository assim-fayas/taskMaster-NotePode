import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../customFormValidations/validator';
import { User } from 'src/app/Model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-signup-form',
  templateUrl: './login-signup-form.component.html',
  styleUrls: ['./login-signup-form.component.css']
})
export class LoginSignupFormComponent implements OnInit {
  formType = "Login Form"
  buttonText = "Login"
  form!: FormGroup
  authService: AuthService = inject(AuthService)
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, CustomValidators.emailPatternValidator]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), CustomValidators.noSpaceAllowed, CustomValidators.atLeastOneSpecialCharValidator])

    })

  }

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>(true)
  // @Output() openSignupModal: EventEmitter<string> = new EventEmitter<string>(this.formType) 
  @Input() fromTypeSelect: string = "Login Form"
  onCloseClicked() {
    this.closeModal.emit(false)
  }

  changeformType() {
    if (this.formType == "Signup Form") {

      this.formType = "Login Form"
      this.buttonText = "Login"
      console.log("changed to Login");
      console.log(this.formType);
      this.form.reset()
    } else {
      this.formType = "Signup Form"
      this.buttonText = "Signup"
      console.log("changed to signup");
      console.log(this.formType);
      this.form.reset()
    }



  }


  OnFormSubmitted() {
    if (!this.form.valid) {
      console.log("please compleate the form");
      return
    } else {
      const user: User = {
        password: this.form.get('password')?.value,
        email: this.form.get('email')?.value,
      };
      this.authService.signUpAndloginService(this.formType, user).subscribe((res) => {
        this.form.reset()

      }, (error) => {
        console.log(error);

      })
      console.log(this.form.value);
      console.log(this.formType);
    }

  }








}
