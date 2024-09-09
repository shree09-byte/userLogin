import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainPageComponent } from "./main-page/main-page.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainPageComponent, SignUpComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'userLogin';
}
