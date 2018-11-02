package io.springdemo.controller.document;

import io.springdemo.examples.readdocumentation.CacheManagerService;
import io.springdemo.examples.readdocumentation.ReadDocumentationService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;

@RestController()
@CrossOrigin(origins = "*")
@Slf4j
public class DocumentController {

    private static final String DOCUMENT_SUFFIX = ".md";
    private ReadDocumentationService readDocumentationService;
    private CacheManagerService cacheManagerService;

    public DocumentController(ReadDocumentationService readDocumentationService, CacheManagerService cacheManagerService) {
        this.readDocumentationService = readDocumentationService;
        this.cacheManagerService = cacheManagerService;
    }

    @ApiOperation(value = "Return the MarkDown text for a given filename from GitHub",
            notes = "The text returned is in MD format.")
    @RequestMapping(value = "/rest/document/git/{name}", method = RequestMethod.GET)
    public ResponseEntity<String> getGitDocument(@PathVariable String name) throws MalformedURLException {
        log.info("Document requested: {}", name);
        return ResponseEntity.ok(readDocumentationService.readGitFile(name + DOCUMENT_SUFFIX));
    }

    @ApiOperation(value = "Return the MarkDown text for a given filename",
            notes = "The text returned is in MD format.")
    @RequestMapping(value = "/rest/document/{name}", method = RequestMethod.GET)
    public ResponseEntity<String> getCloudDocument(@PathVariable String name) throws MalformedURLException {
        log.info("Document requested: {}", name);
        return ResponseEntity.ok(readDocumentationService.readCloudFile(name + DOCUMENT_SUFFIX));
    }



    @GetMapping("/rest/document/cache/clear")
    public void clearCache(){
        log.info("Clear cache requested");
        cacheManagerService.cleanCache();
    }
}