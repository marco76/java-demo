package io.javademo.examples.blog;

import io.javademo.common.web.file.ReadFileService;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import java.io.IOException;

@Stateless
public class BuildDocumentInformationService {
    private String DEFAULT_PATH = "/pages/";
    private String TYPE_MARKDOWN = ".md";

    @Inject
    private ReadFileService readFileService;

    public DocumentInfoBean getDocument(@NotNull String name) throws IOException {

        DocumentInfoBean documentInfoBean = new DocumentInfoBean();
        documentInfoBean.setContent(readFileService.getContentFromFile(DEFAULT_PATH +name + TYPE_MARKDOWN));

        return documentInfoBean;
    }
}
