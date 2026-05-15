import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { KmPipe } from './km.pipe';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdduserComponent } from './adduser/adduser.component';
import { Routes,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkingCountPipe } from './working-count.pipe';
import { GenderCountPipe } from './gender-count.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StandardComponent } from './standard/standard.component';
const routes:Routes=[
   {path:'',component:UsersComponent},
   {path:'login',component:LoginComponent},
   {path:'register',component:RegisterComponent},
   {path:'adduser',component:AdduserComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    KmPipe,
    AdduserComponent,
    WorkingCountPipe,
    GenderCountPipe,
    LoginComponent,
    RegisterComponent,
    StandardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
