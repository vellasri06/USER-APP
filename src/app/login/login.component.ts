import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPass = false;
showConf = false; // only for register
  constructor(public s: UserService, private r: Router) { }
  form = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  })
  submit() {
    const data = this.form.value;

    const users = this.s.getUser();
    console.log(users);

    const user = users.find((u: any) =>
      u.email === data.email && u.password === data.pass
    );

    if (user) {
      alert('Login Success');
      this.r.navigate(['/']);
    } else {
      alert('Invalid Credentials');
    }
  }
}
