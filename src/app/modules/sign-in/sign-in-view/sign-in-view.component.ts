import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HelperService } from 'src/app/shared/services/helper/helper.service';

@Component({
  selector: 'app-sign-in-view',
  templateUrl: './sign-in-view.component.html',
  styleUrls: ['./sign-in-view.component.scss']
})

export class SignInViewComponent implements OnInit {

  containerClass: string = '';
  signUpForm!: FormGroup;
  signInForm!: FormGroup;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'pattern', message: 'Enter a valid name' },
      { type: 'maxlength', message: 'Name cannot be more than 25 characters long' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' },
      { type: 'email', message: 'Enter a valid email address' },
      { type: 'maxlength', message: 'Email cannot be more than 25 characters long' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'maxlength', message: 'Password cannot be more than 25 characters long' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, one special character, and one number' }
    ],
  };

  name = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _helperService: HelperService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    ) {
  }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z0-9\\s]*$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.required,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$') //this is for the letters (both uppercase and lowercase) , special chars and numbers validation
      ])),
    });

    this.signInForm = this._formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.required,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$') //this is for the letters (both uppercase and lowercase) , special chars and numbers validation
      ])),
    });
  }

  onSignUp() {
    this.containerClass = 'right-panel-active';
  }

  onSignIn() {
    this.containerClass = '';
  }

  addDetails(){
    this._authService
    .postUserData(this.signUpForm.value)
    .subscribe((resp) => {
      this._helperService.openMessageSnackBar(resp.message, '');
    }, (error) => {
      this._helperService.openErrorSnackBar(error, '');
    });
  }

  signIn(){
    this._authService
    .signIn(this.signInForm.value)
    .subscribe((resp) => {
      this.signInForm.reset();
      // Navigate to the redirect url
      this._router.navigateByUrl('dashboard');
      // this._router.navigateByUrl('signed-in-redirect');
    }, (error) => {
      this._helperService.openErrorSnackBar(error, '');
    });
  }
}
