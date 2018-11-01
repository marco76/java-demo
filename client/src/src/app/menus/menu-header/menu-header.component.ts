import {Component, EventEmitter, Output} from "@angular/core";
import {AuthenticationService} from "../../common/http/authentication.service";

@Component({
  templateUrl: "./menu-header.component.html",
  selector: "menu-header",
  providers: [AuthenticationService],
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent{
  isCollapsed: boolean = true;
  authenticationService: AuthenticationService;

  @Output() menuEmitter = new EventEmitter<string>();

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private _authenticationService : AuthenticationService) {
    this.authenticationService = _authenticationService;
  }

  selectMenu(menuName : string){
    this.menuEmitter.emit(menuName)
  }
}
