# How to build a blog with Java EE and MarkDown

## How the static pages of this website works

Most of the content of this website is written is simple text files using [MarkDown](https://en.wikipedia.org/wiki/Markdown) notation.

You can see the content [here on GitHub](https://github.com/marco76/java-demo/tree/master/server/src/main/resources/documents) and improve them sending pull requests.

With this solution we can store most of the content in the server and we avoid to write the content directly in the typescript classes.

When you navigate between pages the url of the page contains the reference to a document stored on the server.
The content of the file is loaded as string and send as JSON document to the frontend.

![alt text]([p]BACKEND_URL[/p]/images/page-rendering.png)

> Are you a Java Developer and still using PHP or Ruby for your website?
> Show how cool you are and do it in Java!!!

## Improvement for production

This is only a simple example of how a blog can be easily created. A production application requires the use of cache and/or a document server.

## Java EE code

### The controller

The controller is super easy. It receive a request like `http://javademo.io/file/home` and asks the DocumentInformationService to retrieve the document data.

``` java
@Inject
private BuildDocumentInformationService buildDocumentInformationService;

@GET @Path("/file/{name}") @Produces(MediaType.APPLICATION_JSON)
public Response getDocument(@PathParam("name")String documentName) {
  return Response.ok().entity(buildDocumentInformationService.getDocument(documentName)).build();
}
```

The Service/EJB prepares the answer object that will be serialized in JSON.
For the text content it asks to anoter service that will look for and read the file from the filesystems.

``` java
@Stateless
public class BuildDocumentInformationService {
    private String DEFAULT_PATH = "/pages/";
    private String TYPE_MARKDOWN = ".md";

    @Inject
    private ReadFileService readFileService;

    public DocumentInfoBean getDocument(@NotNull String name){

        DocumentInfoBean documentInfoBean = new DocumentInfoBean();
        documentInfoBean.setContent(readFileService.getContentFromFile(DEFAULT_PATH +name + TYPE_MARKDOWN));

        return documentInfoBean;
    }
}
```

### Read the .md document

As we said each, at the moment, for each request we read the MarkDown file in the classpath.

The BufferedReader retrieve the String lines of the document.
With functional programming we can easily read the file, join together the lines adding a carriage return char between them:
`bufferedReader.lines().map(Object::toString).collect(Collectors.joining("\n"));`

``` java
@Stateless
public class ReadFileService {

private static final String UTF_8 = "UTF-8";

public String getContentFromFile(String path) throws IOException {

     String result;

    // try-with-resources close the resource automatically
    try (BufferedReader bufferedReader = new BufferedReader(
        new InputStreamReader(getClass().getClassLoader()
            .getResourceAsStream(path), UTF_8))) {
         result = bufferedReader.lines().map(Object::toString).collect(Collectors.joining("\n"));
    }

    return result;
}
```

## Cache the pages

In our deployed application we reduced the access to the file and imporved the performances using JCache and Hazelcast. You can find here the details:

[Configuration of JCache and Hazelcast]([p]BACKEND_URL[/p]/page/cache-jcache)

### Next steps

- store the documents in a documents database (MongoDB, ElasticSearch)
- dynamically load the pages every x hours from GitHub

## Angular

### The HTML

For the rendering we use an external library: [angular2-markdown](https://www.npmjs.com/package/angular2-markdown)

``` typescript
<div class="col-md-9">
  <markdown [data]="markdown"></markdown>
</div>
```
### Controller

The controller receives the name of the document as parameter and prepares the link to the REST resource on the server to call.

``` typescript
constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {

      this.gitDocument = params.get('document');
      if (!this.gitDocument) {
        this.gitDocument="home"
      }
      this.githubReference = `${environment.GIT_DOCUMENTS_URL}${this.gitDocument}`;

      return this.requestService.sendGet('/rest/blog/file/' + this.gitDocument)
    })
      .subscribe(
        result => {this.markdown = DocumentationComponent.setVariables(result.text.content)},
        error => { console.log(error._body) }
      );
  }
```

### ... and Spring
You can find the Spring version here: [http://molteni.io/static-document/how-the-pages-are-rendered](http://molteni.io/static-document/how-the-pages-are-rendered)

### SEO: What's wrong with this? JSF can help us!
For public blogs JavaScript frameworks are not a good options. Google and other search algorithms fail to analyse Single Page Application's content.

The pages are not indexed. We could pre-render the pages in html but it's not our goal.

An good alternative to JS would be to use JSF :D.

