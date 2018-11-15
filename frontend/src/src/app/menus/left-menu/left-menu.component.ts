import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material';
import { CloudMenu } from './CloudMenu';
import { JavaEEMenu } from './JavaEEMenu';
import { SpringMenu } from './SpringMenu';
import { AngularMenu } from './AngularMenu';
import { TypeDoc } from './TypeDoc';
import { JDK11Menu } from './JDK11Menu';
import { MicroProfileMenu } from './MicroProfileMenu';


@Component({
  selector: 'app-lateral-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LeftMenuMatComponent implements OnChanges, OnInit {

  @Input() category: string;
  subject: string;
  cat: string;

  selectedCategory: { name: string, links: Array<any> };

  ngOnInit() {
    this.cat = this.route.snapshot.paramMap.get('category');
  }

  ngOnChanges() {
    if ('javaee' === this.category) {
      this.selectedCategory = JavaEEMenu.menu;
      this.subject = 'Java EE / Jakarta EE'
    } else if ('spring' === this.category) {
      this.subject = 'Spring';
      this.selectedCategory = SpringMenu.menu;
    }
    else if ('angular' === this.category) {
      this.subject = 'Angular';
      this.selectedCategory = AngularMenu.menu;
    }
    else if ('cloud' === this.category) {
      this.subject = 'Cloud';
      this.selectedCategory = CloudMenu.menu;
    }
    else if ('java11' === this.category) {
      this.selectedCategory = JDK11Menu.menu;
      this.subject = 'Java 11';
    }
    else if ('microprofile' === this.category) {
      this.selectedCategory = MicroProfileMenu.menu;
      this.subject = "MicroProfile"
    }
    else {
      this.subject = null;
      this.selectedCategory = null;
    }
  }

  getRouter(item: any, category: string): string {

    switch (item.type) {
      case TypeDoc.COMPONENT :
        return item.routerLink;
      case TypeDoc.GIT :
        return `/git/${category}/${item.routerLink}`;
      default :
        return `/doc/${category}/${item.routerLink}`;
    }
  }


  // the event is emitted and set to the parent
  @Output() onRouteClicked = new EventEmitter<String>();
  showAll = true;


  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  routeTo(routerLink: String) {
    this.onRouteClicked.emit(routerLink);
    this.router.navigate([routerLink]);
  }

  onChange(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.showAll = true;
    } else {
      this.showAll = false;
    }
  }
}
