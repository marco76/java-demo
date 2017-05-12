import { Component, OnInit } from '@angular/core';
import { PrettyJsonPipe } from "../../common/pretty-json/prettyJson.pipe";
import ResponseInfo from "../../common/technical-info/ResponseInfo";
import { RequestService } from "../../common/http/request.service";
import { URLSearchParams } from "@angular/http"
import * as d3 from "d3";
import * as d3scale from "d3-scale";
import Model from "./Model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [RequestService, PrettyJsonPipe]
})
export class DashboardComponent implements OnInit {

  responseInfo : ResponseInfo;
  code :string = "";
  request : any;
  data :number [] = [];
  error : any;

  model : Model = new Model();

  constructor(private requestService : RequestService, private prettyJson : PrettyJsonPipe) { }

   buildChart() {
     let self = this;
     let width = 500;
     let barHeight = 20 *10/this.data.length;
     let x = undefined;
     let chart = undefined;
     let bar = undefined;


     x = d3scale.scaleLinear()
       .domain([0,  this.model.maxValue])
       .range([0, width]);




     chart = d3.select(".chart")
       .style("width", width)
       .attr("height", barHeight * this.data.length);

      bar = chart.selectAll("g")
       .data(this.data)
       .enter().append("g")
       .attr("transform", function(d, i) {
          return "translate(0," + i * barHeight + ")";
       });

     bar.append("rect")
       .attr("width", x)
       .attr("fill", function(d) {
         if (d > self.model.maxValue/3*2) {
           return '#55a191';
         } else if (d>self.model.maxValue/3) {
           return "#E3CF57";
         }
         return '#B0171F';
       })
       .attr("height", barHeight - 1);

     bar.append("text")
       .attr("x", function(d) {
         return x(d) - 20;
       })
       .attr("y", barHeight / 2)
       .attr("dy", ".35em")
       .attr("fill", function(d) {
           return "white";
       })
       .text(function(d) {
         return d;
       });
  }

  ngOnInit() {
    this.code =
      ` 
<pre><code class="java highlight">@GET @Path("simple-chart")
public String getSimpleData (

  @NotNull @Min(5) @Max(20)
  @QueryParam("size") Integer size,
  
  @NotNull @Min(5) @Max(100)
  @QueryParam("maxValue") Integer maxValue) {
  
  return JsonbBuilder.newBuilder().build()
  .toJson(new Random().ints(size, 0, maxValue)
  .toArray());
}</code></pre>

In a future example we will stream dinamically the results with SSE.
`}

onSubmit(){
  let form = new URLSearchParams();
  form.append('maxValue', this.model.maxValue.toString());
  form.append('size', this.model.elements.toString());
  console.log(form);
  this.requestService.sendGetForm('/rest/dashboard/simple-chart', form).subscribe(
    result => {console.log(result);this.responseInfo = result; this.data = result.text;

      this.clearChart();
    if(this.responseInfo.error == true) {
       this.error = this.formatToJson( this.responseInfo.text);

    } else {
      this.error = undefined;
      this.buildChart();
    }
    });

}
  formatToJson(json : any) : string {
    return  `<pre><code class="json highlight">` +
      this.prettyJson.transform(json)+ `</code></pre>`;
  }

clearChart(){
  d3.select(".chart").selectAll("*").remove();
}

}
