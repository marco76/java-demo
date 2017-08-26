import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { LeftMenuService } from "./left-menu.service";


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  providers: [LeftMenuService]
})
export class LeftMenuComponent {

  isCollapsed: boolean[]=[false,true,true,true,true,true,true, true, true];

  // the event is emitted and set to the parent
  @Output() onRouteClicked = new EventEmitter<String>();

  menuContent = [];

  constructor(private router: Router, private menuService: LeftMenuService) {
    this.menuContent = menuService.getMenuContent();
  }

  public collapsed(event:any):void {
  }

  public expanded(event:any):void {
  }
    routeTo(routerLink: String, index : number) {
    this.onRouteClicked.emit(routerLink);
    this.router.navigate([routerLink]);
  }

}
// https://bootsnipp.com/snippets/featured/accordion-list-group-menu
