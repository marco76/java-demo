package io.javademo.examples.blog;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

public class DocumentInfoBean implements Serializable {

    @Getter @Setter private String content;
}
