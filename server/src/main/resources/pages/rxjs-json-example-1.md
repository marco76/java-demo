# RxJS: read a JSON response an publish it in a dynamic table

![image error??]([p]BACKEND_URL[/p]/images/observables-flatmap.png)

In this example we show how to manipulate JSON data and show the result in a table.

We show only the frontend development and we simulate a JSON answer from a REST service using RxJS.

## Angular code

We need to import Observable from rxjs:

``` typescript
import {Observable} from "rxjs/Observable";
```

We store the simulated JSON answer in a string :

``` typescript
originalJSON : string =  '[{"name":"Marco", "familyName":"Molteni"},{"name":"Will", "familyName":"Smith"}]';
```

This is very similar to the answers you will get from your backend.

We will see how to manipulate more complex objects in a future post.

Our observable is really simple:

``` javascript
 Observable.of(JSON.parse(this.userJSON))
        .flatMap(result => result)
        .subscribe(data => this.addDataToTable(data));
```

`Observable.of(JSON.parse(this.jsonPeopleExample))` :
 - reads the JSON string in the variable
 - creates a JSON object array that represents the content
 - transforms the array in an Observable

`.flatMap(result => result)`: [flatMap](http://reactivex.io/documentation/operators/flatmap.html) receives an array of objects and it 'sends one by one' them as Observable to the Observer. In our case we don't need to manipulate the object, we simply pass it to the next function in the chain.

`.subscribe(object, index)`: with subscribe we wait the data from the Observable. When we receive it the function `next`is automatically called.

In our case for every object received we call the function `addDataToTable`, this function store the field's names of the object in a data [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) (unique values) and add the line to the array that will be represented in the HTML table.

``` typescript
addDataToTable(result: any) {
  Object.keys(result).map(result =>this.resultDataTableFields.add(result));
  this.resultDataTable.push(result);
}
```
We dynamically create the table using the simply showing every field name of each object in the array
``` html
<table class="table table-striped">
    <tr>
        <th *ngFor="let field of resultDataTableFields">
            {{field}}
        </th>
    </tr>
    <tr *ngFor="let data of resultDataTable">
        <td *ngFor="let field of resultDataTableFields">
            {{data[field]}}
        </td>
    </tr>
</table>
```