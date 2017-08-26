# Font Awesome

[Font Awesome]("http://fontawesome.io") gives to you hundreds of icons for your website.

## Add the font awesome library with node.js
Using the console :
``` npm install font-awesome --save  ```

or add the dependency directly in package.json

## Add the styles to angular
In .angular-cli.json add the reference to font awesome in the styles:

```json
"styles" : [
"../node_modules/font-awesome/css/font-awesome.css"
```

## Add the icons to you pages
```html
<i class="fa fa-twitter fa-2x menu-icon" aria-hidden="true"></i>
```

Here an example with the twitter icon:

<a href="http://twitter.com/marcomolteni" target="_blank"><i class="fa fa-twitter fa-2x menu-icon" aria-hidden="true"></i></a>
 