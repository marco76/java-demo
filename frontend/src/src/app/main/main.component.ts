import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  category: string = null;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // get the category parameter
    this.category = this.route.snapshot.paramMap.get('category');

    //
    this.route.params.subscribe(params => {
      this.category = params['category'];
      // this.initialiseState(); // reset and set based on new parameter this time
      console.log('category ', this.category);
    });
  }

}
