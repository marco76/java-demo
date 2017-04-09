import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cache-file',
  templateUrl: './cache-file.component.html',
  styleUrls: ['./cache-file.component.css']
})
export class CacheFileComponent implements OnInit {

  code : string = '';
  codeRest : string = '';
  constructor() { }

  ngOnInit() {
  this.code = `
  The data is reloaded every day from an external JSON file
  <pre><code class="java highlight">@Schedule(hour = "2", persistent = false)
@PostConstruct
private void loadData() {
    try {
        cachedData = readUrl();
    } catch (IOException e) {
    cachedData = readClassPathFile();
    }
}</code></pre>`;

    this.codeRest = `
    The file is read with the following code:
    <pre><code class="java highlight">URL url = new URL(STATUS_URL);
Stream<String> lines = new BufferedReader(
    new InputStreamReader(url.openStream(), "UTF-8"))
    .lines();
return lines.map(Object::toString)
    .collect(Collectors.joining());</code></pre>`
  }
}
