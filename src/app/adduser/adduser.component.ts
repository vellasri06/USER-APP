import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  showPopup = false;
previewData: any = null;
isEdit = false;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    distance: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    working: new FormControl(false, Validators.required)
  });
  constructor(public s: UserService, private router: Router) { }
  ngOnInit() {
    if (this.s.currentStudent) {
      this.form.patchValue(this.s.currentStudent);
    }
  }
  
  submit() {
  const data = this.form.value;
  const normalizedData = {
    name: data.name,
    dob: data.dob,
    distance: data.distance,
    city: data.city,
    gender: data.gender,
    working: data.working
  };
  if (this.s.currentStudent) {
    const index = this.s.students.indexOf(this.s.currentStudent);
    this.s.students[index] = normalizedData;
    this.s.currentStudent = null;
  } else {
    this.s.students.push(normalizedData);
  }
  this.s.savedata();
  this.form.reset();
  this.router.navigate(['/']);
}
  cancel(){
    this.router.navigate(['/'])
  }
  openPopup() {
  this.showPopup = true;
}

confirmSubmit() {
  this.showPopup = false;
  this.submit(); // ✅ calling your ORIGINAL function
}

closePopup() {
  this.showPopup = false;
}
}