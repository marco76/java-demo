# Style your application

Material Design *requires* a style defined for the application and it comes with 4 predefined styles.
The styles are available in ```node_modules/@angular/material/prebuilt-themes/```;

To apply one of the style is enough to add an import line to your style.css, e.g.:
```@import "~@angular/material/prebuilt-themes/indigo-pink.css";```

To know more about the styles and themes in material design you can read the documentation of angularjs

The technical guide for Angular is here:

- https://material.angular.io/guide/theming
- https://material.angular.io/guide/theming-your-components


## Convert the project from css to sass

Many example use Sass for the styling but the default projects created with Angular CLI use css.

If you didn't generate the project for Sass, e.g. ``` ng new BeautifulProject --style=sass ``` you can still change adapt the existing project.

- in .angular-cli.json update the line ```"styleExt":"css"``` with ```"styleExt":"scss"```
- your theme name should start with an underscore and end with .scss, e.g. ```_beautiful-theme.scss```
- rename the default ```styles.css``` in ```styles.scss```
- in ```styles.scss``` import your theme: ```@import './path/beautiful-theme';```. You don't need the underscore and the suffix for the import. 

## Choose some colors

To choose some colors for your palette you can find websites with graphical references to them

Official Material Design Palette: https://material.io/guidelines/style/color.html#color-color-palette

[materialpalette.com](https://www.materialpalette.com) offer a preview of the applied palettes.

## Example

Our new style is very simple

``` sass
// Import all the tools needed to customize the theme and extract parts of it
@import '~@angular/material/theming';

@include mat-core();

$sample-app-primary: mat-palette($mat-teal);
$sample-app-accent:  mat-palette($mat-amber, A200, A100, A400);
$sample-app-warn: mat-palette($mat-red);

$sample-app-theme: mat-light-theme($sample-app-primary, $sample-app-accent, $sample-app-warn);

// we apply the theme
@include angular-material-theme($sample-app-theme);

.extra-theme {
  $extra-primary: mat-palette($mat-teal);
  $extra-accent:  mat-palette($mat-yellow, 400);

  $extra-theme: mat-light-theme($extra-primary, $extra-accent);

  @include angular-material-theme($extra-theme);
}
```

We save the code as _app/styles/_sample-app-theme.scss_

In our .angular-cli.json we add the new theme in the _styles_ array

```javascript
"styles": [
        "styles.scss",
        "styles/_sample-app-theme.scss",
        ...
      ],
```

We created 2 themes in one class. This is not a good practice but we wanted to show the possibility.

With this sample code ...

```html
  <md-chip-list>
    <md-chip color="primary" selected="true">Primary main theme</md-chip>
    <md-chip color="accent" selected="true">Accent main theme</md-chip>
  </md-chip-list>
  <br>
  <md-chip-list class="extra-theme">
    <md-chip color="primary" selected="true">Primary extra theme</md-chip>
    <md-chip color="accent" selected="true">Accent extra theme</md-chip>
  </md-chip-list>
</md-card-content>
```
... we can se how the colors are rendered:

  <md-chip-list>
    <md-chip color="primary" selected="true">Primary main theme</md-chip>
    <md-chip color="accent" selected="true">Accent main theme</md-chip>
  </md-chip-list>
  <br>
  <md-chip-list class="extra-theme">
    <md-chip color="primary" selected="true">Primary extra theme</md-chip>
    <md-chip color="accent" selected="true">Accent extra theme</md-chip>
  </md-chip-list>
</md-card-content>

