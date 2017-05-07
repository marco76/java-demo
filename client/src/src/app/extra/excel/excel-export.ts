import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.css']
})
export class ExcelExport implements OnInit {

  code : string = '';
  codeRest : string = '';
  constructor() { }

  ngOnInit() {
  this.code = `
  The REST service is very simple:
  <ul><li>We need to produce a ByteArrayOutputStream from data provider (e.g. a file).</li></ul>
  <ul><li>We assign the OutputStream to a new InputStream and we send it as response of our REST service.</li></ul>
  <pre><code class="java highlight">@GET @Path("/excel") @Produces(MediaType.APPLICATION_OCTET_STREAM)
public Response getAllConferencesExcel() throws IOException {

    ByteArrayOutputStream byteArrayOutputStream =
        conferenceExcelService.getListAsExcel();
    ByteArrayInputStream byteArrayInputStream =
        new ByteArrayInputStream(byteArrayOutputStream
        .toByteArray());

return Response.ok(byteArrayInputStream,
    MediaType.APPLICATION_OCTET_STREAM_TYPE)
    .build();
}
</code></pre>

The OutputStream is produced by Apache POI:
 <pre><code class="java highlight">ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
Workbook workbook = createExcelSheet(conferenceList);
workbook.write(outputStream);
</code></pre>
`;

    this.codeRest = `
    In Angular we have to read the stream and download it, it's important to indicate in the Header that the response type is ResponseContentType.ArrayBuffer:
    <pre><code class="javascript highlight">sendGetType(url:string, type : ResponseContentType) : Observable<any> {
    let hOctet = new Headers({ 'Content-Type': 'application/json' });
    hOctet.append('Accept', 'application/octet-stream');
    hOctet.append('X-Requested-With', 'XMLHttpRequest');

    let options = new RequestOptions(
        { headers: hOctet, responseType : type}
    );

    return this.http
      .get(this.serverUrl + url, options)
      .map((response: Response) => {
        return response;
      }).catch((error) =>
        Observable.of(this.buildErrorAnswer(error))
      );
    }
  
  downloadExcel() {
    this.requestService.sendGetType("/rest/jpa/conference/excel",
        ResponseContentType.ArrayBuffer)
        .subscribe(
            result => {
            this.downloadFile(result._body,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") },
            error => { console.log(error._body) })
  }

  downloadFile(data, format){
    let blob = new Blob([data], {type: format});

    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, "conferences.xls");

    } else {
      let element = window.document.createElement('a');
      element.href=window.URL.createObjectURL(blob);
      element.download = "text.xls";
      element.click();
      document.body.removeChild(element);
    }
  }
  </code></pre>`
  }
}
