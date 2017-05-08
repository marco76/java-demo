import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  isCollapsed: boolean = true;

  toggleCollapse(): void {
    console.log("aaa");
    this.isCollapsed = !this.isCollapsed;
  }
}
