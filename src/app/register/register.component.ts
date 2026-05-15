import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public s: UserService, private r: Router) { }
  showPass = false;
showConf = false;

form = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  pass: new FormControl('', [Validators.required, Validators.minLength(4)]),
  conf: new FormControl('', [Validators.required])
});

submit() {
  if (this.form.invalid) return;

  const f = this.form.value;

  if (f.pass !== f.conf) {
    alert('Passwords do not match');
    return;
  }

  const user = {
    id: Date.now(),
    name: f.name,
    email: f.email,
    password: f.pass
  };

  this.s.save(user);
  this.form.reset();
  this.r.navigate(['login']);
}
}
