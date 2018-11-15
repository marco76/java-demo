import { Component, OnInit } from '@angular/core';
import {Article} from "./Article";
import {ArticleList} from "./ArticleList";
import {Router} from "@angular/router";

@Component({
  selector: 'app-last-articles',
  templateUrl: './last-articles.component.html',
  styleUrls: ['./last-articles.component.css']
})
export class LastArticlesComponent implements OnInit {

  articleList : Array<Article>;

  constructor( private router: Router) { }

  ngOnInit() {
    this.articleList = ArticleList.getArticles;
  }

  goPage(link : string) {
    this.router.navigate([link]);
  }

}
