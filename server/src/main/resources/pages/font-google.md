# Google Fonts

During your design phase you will have to choose a good font for your website.

With Material Design there is not a lot of flexibility for the design. The choice has to be consistent for all your components.
You cannot simply update the css style thinking that all your components will change style. The MD directives override your style, forcing it ('!important') your website risks to be inconsistent.
 
[Google Fonts](https://fonts.google.com/) hundreds of fonts available for free

[Angular Material Typography](https://material.angular.io/guide/typography) explains how the typography works in Angular Material

[Material Design specifications](https://material.io/guidelines/style/typography.html)

## Add a font to your website and ...

You can add the font of your choice directly in the CSS as described in the Angular Material guide:

``` html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```


## ... apply it!

It is important to remember that this font is not automatically used by Material Design. You have to decide where to use it.

A recommended solution is to apply it on a root component of your website:

This example is copied from the MD guide:

``` html
<!-- By default, Angular Material applies no global styles to native elements. -->
<h1>This header is unstyled</h1>

<!-- Applying the mat-tyography class adds styles for native elements. -->
<section class="mat-typography">
  <h1>This header will be styled</h1>
</section>
``` 
 