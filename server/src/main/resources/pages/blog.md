# How to build a blog with Java EE, Angular and MarkDown

## How the static pages of this website work

Most of the content of this website is written is simple text files using [MarkDown](https://en.wikipedia.org/wiki/Markdown) notation.

You can see the content [here on GitHub](https://github.com/marco76/java-demo/tree/master/server/src/main/resources/documents) and improve them sending pull requests.

With this solution we can store most of the content in the server and we avoid to write the content directly in typescript components or HTML.

The URL of the page that you navigate contains the reference to a document stored on the server.
The content of the file is loaded as string and send as JSON document to the frontend.

![alt text]([p]BACKEND_URL[/p]/images/page-rendering.png)

> Are you a Java Developer and still using PHP or Ruby for your website?
> Show how cool you are and do it in Java!!!

## Java EE code

### The controller

The controller is super easy. It receives a request like `http://javademo.io/page/name-of-the-file` and asks the _DocumentInformationService_ to retrieve the document.

``` java
@Inject
private BuildDocumentInformationService buildDocumentInformationService;

@GET @Path("/file/{name}") @Produces(MediaType.APPLICATION_JSON)
public Response getDocument(@PathParam("name")String documentName) {
  return Response.ok().entity(buildDocumentInformationService.getDocument(documentName)).build();
}
```

The Service/EJB prepares the answer object that will be serialized in JSON.

At the moment we store only the document content but in the future we could add some other information (keywords, category, visibility etc).

The _getContentFromFile_ method of the _ReadFileService_ return the content of the file in format MarkDown. The files are stored in the resources of the project.
In a future version we will read them directly from an external resource (AWS, GitHub etc).

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

If the document is not in the cache the service reads the .md file and returns it as a string.

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

In our deployed application we reduced the number of access to the files and improved the performances using JCache and Hazelcast.
 
You can find here the details:

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
### Angular Controller

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

## Images

To see the images in the document during the development phase and in production without any change in our documents we use some tags that are replaced by Angular it receives the document.

```typescript
 DOCUMENT_VALUES: {'BACKEND_URL': window.location.protocol + '//' + window.location.hostname + ':' + window.location.port},
```

With this solution we can deploy our application in different servers with different URL without references issues.

### ... and Spring
You can find the Spring version here: [http://molteni.io/static-document/how-the-pages-are-rendered](http://molteni.io/static-document/how-the-pages-are-rendered)


### The pages are in GitHub

The big advantage of this solution is that the pages are available in MarkDown format in GitHub and when you see an error you can send to me a PR :P

> The pages are in GitHub and everybody can improve them

The link is published dynamically in every page.

### SEO: What's wrong with this? JSF can help us!
For public blogs JavaScript frameworks are not a good options. Google and other search algorithms fail to analyse Single Page Application's content.

The pages are not indexed. We could pre-render the pages in html but it's not our goal.

An good alternative to JS would be to use JSF :D.

## Improvement for production

This is only a simple example of how a blog can be easily created. A website with millions of visitors would require some optimizations (document database, indexing, seo tuning etc.)


### References
Code source on [GitHub](https://github.com/marco76/java-demo/tree/master/server/src/main/java/io/javademo/examples/blog)

