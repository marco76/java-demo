import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {FlatmapComponent} from "../../flatmap/flatmap.component";
import {ConferenceTableComponent} from "../../jee/jpa/conference/conference-table/conference-table.component";
import {DashboardComponent} from "../../cases/d3/dashboard.component";
import {LoginComponent} from "../../jee/security/login/login.component";
import {BvSimpleOneComponent} from "../../jee/bv/bv-simple-one/bv-simple-one";
import {MainComponent} from "../../main/main.component";
import {DocumentationComponent} from "../../documentation/documentation.component";
import {LeftMenuMatComponent} from "../../menus/left-menu/left-menu.component";
import {HelloComponent} from "../../minimalistic/hello/hello.component";
import {ExcelExport} from "../../extra/excel/excel-export";
import {BvPositiveNegativeZero} from "../../jee/bv/bv-positive-zero/bv-positive-zero";
import {BvDateComponent} from "../../jee/bv/bv-date/bv-date.component";
import {ChatbotComponent} from "../../jee/websocket/chatbot/chatbot.component";
import {StaticPageComponent} from "../../static-page/static-page.component";
import {BvRepeatableComponent} from "../../jee/bv/bv-repeatable/bv-repeatable.component";
import {CacheFileComponent} from "../../extra/cache-file/cache-file.component";
import {HomeComponent} from "../../home/home.component";
import {JsrStatusComponent} from "../../jee/jsr-status/jsr-status.component";
import {ConferenceComponent} from "../../jee/jpa/conference/conference.component";
import {BvListEmail} from "../../jee/bv/bv-list-email/bv-list-email.component";
import {ObserverComponent} from "../../jee/cdi/event/event.component";
import {QuizHelloComponent} from "../../jee/quiz/hello/quiz-hello.component";
import {KotlinHelloComponent} from "../../jee/kotlin/hello/hello.component";
import {LeftMenuComponent} from "../../documentation/left-menu/left-menu.component";
import {MaterialDatatableComponent} from "../../angular/material-datatable/material-datatable.component";
import {AvExampleComponent} from "../../angular/av-example/av-example.component";

const appRoutes : Routes = [
  { path: '', component: MainComponent, children: [{path: '',component: HomeComponent, outlet: 'main'}]},
  { path: 'cat/:category', component: MainComponent, children: [
      {path: '',component: HomeComponent, outlet: 'main'},
      {path: '', component: LeftMenuMatComponent, outlet:'menuleft'}
    ]},
  { path: 'doc/:category/:document', component: MainComponent, children: [
      {path: '', component: LeftMenuMatComponent, outlet:'menuleft'},
      {path: '',component: StaticPageComponent, outlet: 'main'}
    ]},
  { path: 'git/:category/:document', component: MainComponent, children: [
      {path: '', component: LeftMenuMatComponent, outlet:'menuleft'},
      {path: '',component: StaticPageComponent, outlet: 'main'}
    ]},
  { path: 'home', component: MainComponent},
  { path: 'bv', component: BvSimpleOneComponent },
  { path: 'bv-date', component: BvDateComponent },
  { path: 'bv-repeatable', component: BvRepeatableComponent },
  { path: 'bv-list-email', component: BvListEmail },
  { path: 'extra-cache', component: CacheFileComponent},
  { path: 'chatbot', component: ChatbotComponent},
  { path: 'cdi-weather', component: ObserverComponent},
  { path: 'hello', component: HelloComponent},
  { path: 'conferences', component:ConferenceTableComponent},
  { path: 'jpa-conferences', component : ConferenceComponent},
  { path: 'excel-export', component: ExcelExport},
  { path: 'quiz-hello', component: QuizHelloComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'kotlin-hello', component: KotlinHelloComponent},
  { path: 'security', component: LoginComponent},
  { path: 'guides', component: DocumentationComponent},
  { path: 'bv-positive-negative-zero', component: BvPositiveNegativeZero},
  { path: 'left-menu', component: LeftMenuComponent},
  { path: 'page/:document', component: DocumentationComponent },
  { path: 'flatmap', component: FlatmapComponent},
  { path: 'jsr-status', component: JsrStatusComponent},
  { path: 'static-document/:document', component: StaticPageComponent },
  { path: 'angular/datatable', component: MaterialDatatableComponent },
  { path: 'angular/av-components-demo', component: AvExampleComponent }


];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
