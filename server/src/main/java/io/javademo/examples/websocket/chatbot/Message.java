package io.javademo.examples.websocket.chatbot;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by marcomolteni on 09.04.17.
 */
public class Message {

    @Getter @Setter private String message;
    @Getter @Setter private String author;
}
