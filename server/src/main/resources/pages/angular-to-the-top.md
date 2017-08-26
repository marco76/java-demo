# Angular routing - Where is the top of the page?

![alt text]([p]BACKEND_URL[/p]/images/angular-viewport.png)

You built 2 Angular pages and you are navigating from the first to the second.
What happened? The second page title doesn't show and you see only the bottom of the page.

As you can see in the image the default behaviour of Angular is to show the data of the target page but it maintains the current page viewport coordinates.

If it's a bug or a feature it's not interesting for us. What we expect is to see the top of the page when we navigate to it.

## Quick fix


To show the text pages of this website we use the same Angular component (static-page.component.ts), the solution is in our case simple:


``` typescript
constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // ... code ...
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      });
    }
```

at every call of the content we scroll to the top of the page.
On the stackoverflow link you can find alternative solutions.

## Links
Angular Bug: [Changing route doesn't scroll to top in the new page #7791](https://github.com/angular/angular/issues/7791)

Here you can find the stackoverflow reference: [Angular 2 Scroll to top on Route Change](https://stackoverflow.com/questions/39601026/angular-2-scroll-to-top-on-route-change)
                                               
[NavigationEnd](https://angular.io/api/router/NavigationEnd)