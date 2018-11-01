import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlatmapComponent } from "../../flatmap/flatmap.component";
import { ConferenceTableComponent } from "../../jee/jpa/conference/conference-table/conference-table.component";
import { DashboardComponent } from "../../cases/d3/dashboard.component";
import { LoginComponent } from "../../jee/security/login/login.component";
import { BvSimpleOneComponent } from "../../jee/bv/bv-simple-one/bv-simple-one";
import { MainComponent } from "../../main/main.component";
import { DocumentationComponent } from "../../documentation/documentation.component";
import { LeftMenuMatComponent } from "../../menus/left-menu/left-menu.component";
import { HelloComponent } from "../../minimalistic/hello/hello.component";
import { ExcelExport } from "../../extra/excel/excel-export";
import { BvPositiveNegativeZero } from "../../jee/bv/bv-positive-zero/bv-positive-zero";
import { BvDateComponent } from "../../jee/bv/bv-date/bv-date.component";
import { ChatbotComponent } from "../../jee/websocket/chatbot/chatbot.component";
import { StaticPageComponent } from "../../static-page/static-page.component";
import { BvRepeatableComponent } from "../../jee/bv/bv-repeatable/bv-repeatable.component";
import { CacheFileComponent } from "../../extra/cache-file/cache-file.component";
import { HomeComponent } from "../../home/home.component";
import { JsrStatusComponent } from "../../jee/jsr-status/jsr-status.component";
import { ConferenceComponent } from "../../jee/jpa/conference/conference.component";
import { BvListEmail } from "../../jee/bv/bv-list-email/bv-list-email.component";
import { ObserverComponent } from "../../jee/cdi/event/event.component";
import { QuizHelloComponent } from "../../jee/quiz/hello/quiz-hello.component";
import { KotlinHelloComponent } from "../../jee/kotlin/hello/hello.component";
import { LeftMenuComponent } from "../../documentation/left-menu/left-menu.component";
import { MaterialDatatableComponent } from "../../angular/material-datatable/material-datatable.component";

const appRoutes: Routes = [
  {path: '', component: MainComponent, children: [{path: '', component: HomeComponent, outlet: 'main'}]},
  {
    path: 'cat/:category', component: MainComponent, children: [
      {path: '', component: HomeComponent, outlet: 'main'},
      {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
    ]
  },
  {
    path: 'doc/:category/:document', component: MainComponent, children: [
      {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'},
      {path: '', component: StaticPageComponent, outlet: 'main'}
    ]
  },
  {
    path: 'git/:category/:document', component: MainComponent, children: [
      {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'},
      {path: '', component: StaticPageComponent, outlet: 'main'}
    ]
  },
  {path: 'home', component: MainComponent},
  {path: ':category/bv', component: MainComponent, children: [
      {path: '', component: BvSimpleOneComponent, outlet: 'main'},
      {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
    ]},
  {path: ':category/bv-date', component: MainComponent, children:[
      {path: '', component: BvDateComponent, outlet: 'main'},
      {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
    ]},

  {path: ':category/bv-repeatable', component: MainComponent, children:[
      {path: '', component: BvRepeatableComponent, outlet: 'main'},
      {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
    ]},
  {path: ':category/bv-list-email', component: MainComponent, children:[
    {path: '', component: BvListEmail, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: ':category/extra-cache', component: MainComponent, children:[
    {path: '', component: CacheFileComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: ':category/chatbot', component: MainComponent, children:[
    {path: '', component: ChatbotComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: ':category/cdi-weather', component: MainComponent, children:[
    {path: '', component: ObserverComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: ':category/hello', component: MainComponent, children:[
    {path: '', component: HelloComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: 'conferences', component: ConferenceTableComponent},
  {path: ':category/jpa-conferences', component: MainComponent, children:[
    {path: '', component: ConferenceComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: ':category/excel-export', component: MainComponent, children:[
    {path: '', component: ExcelExport, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: ':category/quiz-hello', component: MainComponent, children:[
    {path: '', component: QuizHelloComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: ':category/dashboard', component: MainComponent, children:[
    {path: '', component: DashboardComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: ':category/kotlin-hello', component: MainComponent, children:[
    {path: '', component: KotlinHelloComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: ':category/security', component: MainComponent, children:[
    {path: '', component: LoginComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: 'guides', component: DocumentationComponent},
  {path: ':category/bv-positive-negative-zero', component: MainComponent, children:[
    {path: '', component: BvPositiveNegativeZero, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: 'left-menu', component: LeftMenuComponent},
  {path: 'page/:document', component: DocumentationComponent},
  {path: 'flatmap', component: FlatmapComponent},
  {path: ':category/jsr-status', component: MainComponent, children:[
    {path: '', component: JsrStatusComponent, outlet: 'main'},
    {path: '', component: LeftMenuMatComponent, outlet: 'menuleft'}
  ]},
  {path: 'static-document/:document', component: StaticPageComponent},
  {path: 'angular/datatable', component: MaterialDatatableComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
