package io.javademo.examples.websocket.chatbot;

/**
 * Created by marcomolteni on 09.04.17.
 */
public class Message {

    private String message;
    private String author;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
