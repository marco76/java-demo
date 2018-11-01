import { NgModule } from "@angular/core";
import { MatIconModule, MatMenuModule, MatSidenavModule } from "@angular/material";
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: []
})
export class DemoModule {
}
