import {Component} from "@angular/core";
import {AuthenticationService} from "../common/http/authentication.service";

@Component({
  templateUrl: "./menu-header.component.html",
  selector: "menu-header",
  providers: [AuthenticationService]
})
export class MenuHeaderComponent{
  isCollapsed: boolean = true;
  authenticationService: AuthenticationService;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private _authenticationService : AuthenticationService) {
    this.authenticationService = _authenticationService;
  }
}
