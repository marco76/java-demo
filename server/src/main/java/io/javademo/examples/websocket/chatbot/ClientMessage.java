package io.javademo.examples.websocket.chatbot;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.websocket.Decoder;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;
import java.io.StringReader;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ClientMessage implements Decoder.Text<ClientMessage>, Encoder.Text<ClientMessage> {

    @NotNull
    @Size(min = 2, max = 255,
            message = "Message must be between 2 and 255 characters.")
    private String message;

    @Override
    public void init(EndpointConfig config) {
    }

    @Override
    public ClientMessage decode(String value) {
        try (JsonReader jsonReader = Json.createReader(
                new StringReader(value))) {
            JsonObject jsonObject = jsonReader.readObject();

            message = jsonObject.getString("message");
        }

        return this;
    }

    @Override
    public boolean willDecode(String string) {
        return true;
    }

    @Override
    public String encode(ClientMessage chatMessage) {
        JsonObject jsonObject = Json.createObjectBuilder()
                .add("message", chatMessage.message)
                .add("timestamp",
                        new SimpleDateFormat("MM/dd/yyyy h:mm:ss a z")
                                .format(new Date()))
                .build();

        return jsonObject.toString();
    }

    @Override
    public void destroy() {
        // Nothing to do.
    }

    @Override
    public String toString() {
        return "ChatMessage{" + "message=" + message + '}';
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
