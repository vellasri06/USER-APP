import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  students: any[] = [];
   private key = 'users';
  save(user:any){
    let users=JSON.parse(localStorage.getItem(this.key)||'[]');
    users.push(user);
    localStorage.setItem(this.key,JSON.stringify(users));
  }
getUser() {
  const data = JSON.parse(localStorage.getItem(this.key) || '[]');
  console.log('Stored Users:', data); // 👈 check this
  return data;
}
  currentStudent: any = null;
  loadData() {
    const data = localStorage.getItem('student');
    if (data) {
      this.students = JSON.parse(data);
    } else {
      this.http.get('assets/users.json').subscribe((res: any) => {
        this.students = res;
        localStorage.setItem('student', JSON.stringify(this.students))
      })
    }
  }
  savedata() {
    localStorage.setItem('student', JSON.stringify(this.students));
  }
  delete(index: number) {
    this.students.splice(index, 1);
    this.savedata();
  }
  edit(index: number, data: any) {
    this.students[index] = data;
    this.savedata();
  }
  logs: string[] = [];

addLog(message: string) {
  this.logs.unshift(message);
  if (this.logs.length > 5) {
    this.logs.pop();
  }
}
}