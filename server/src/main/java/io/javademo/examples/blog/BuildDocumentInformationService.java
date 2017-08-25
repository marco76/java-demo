package io.javademo.examples.blog;

import io.javademo.common.web.file.ReadFileService;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class BuildDocumentInformationService {
    private String DEFAULT_PATH = "pages/";
    private String TYPE_MARKDOWN = ".md";

    @Inject
    private ReadFileService readFileService;

    public DocumentInfoBean getDocument(String name){

        DocumentInfoBean documentInfoBean = new DocumentInfoBean();
        documentInfoBean.setContent(readFileService.getContentFromFile(DEFAULT_PATH +name + TYPE_MARKDOWN));

        return documentInfoBean;
    }
}
