import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', title: 'main-page', component: MainPageComponent },
    { path: 'sign-up', title: 'sign-up', component: SignUpComponent },
    { path: 'login', title: 'login', component: LoginComponent }
];
