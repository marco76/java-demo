import { Component } from '@angular/core';
import {AuthenticationService} from "./common/http/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent {
  title = 'app works!';
  isCollapsed: boolean = true;
  authenticationService: AuthenticationService;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private _authenticationService : AuthenticationService) {
    this.authenticationService = _authenticationService;
  }
}
