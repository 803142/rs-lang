import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { login } from 'src/app/redux/actions/auth.actions';
import { AppState } from 'src/app/redux/app.state';
import { Observable } from 'rxjs';
import { isLoginSelector } from 'src/app/redux/selectors/auth.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../common/services/auth.service';
import { LoadingService } from '../../../common/services/spinner.service';

const myNameValidator = (control: FormControl) => {
  const condition = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+/-/_/@/$/!/%/*/?/&/#/./,/;/:/{/}/])[0-9a-zA-Z+/-/_/@/$/!/%/*/?/&/#/./,/;/:/[/{/}/]{8,}/.test(
    control.value,
  );
  if (!condition) {
    return { password: 'does not match the condition' };
  }
  return null;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, myNameValidator]],
  });

  isAuth$: Observable<boolean>;

  loading = false;

  constructor(
    public auth: AuthService,
    private store: Store<AppState>,
    private location: Location,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    public loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.store.select(isLoginSelector).subscribe((data) => {
      if (data) {
        this.dialogRef.close();
      }
    });
    this.listenPutLoading();
  }

  onSubmit(): void {
    if (!this.userData.invalid) {
      this.store.dispatch(login({ user: this.userData.value, reg: false }));
    }
  }

  listenPutLoading(): void {
    this.loadingService.loadingPostSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  goBack() {
    this.location.back();
  }

  getErrorEmailMessage() {
    if (this.userData.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userData.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPasswordMessage() {
    if (this.userData.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userData.controls.password.hasError('password') ? 'Not a valid password' : '';
  }
}
