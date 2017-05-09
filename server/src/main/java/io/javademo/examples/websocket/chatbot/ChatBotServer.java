package io.javademo.examples.websocket.chatbot;

import javax.json.Json;
import javax.json.JsonObject;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;


@ServerEndpoint(value = "/chatbot",
        encoders = {ClientMessage.class}, decoders = {ClientMessage.class})
// with singleton common chat we want a one-to-one
//@Singleton
public class ChatBotServer {
    private static final Logger LOGGER = Logger
            .getLogger(ChatBotServer.class.getName());

    private final Set<Session> peers;

    public ChatBotServer() {
        peers = new HashSet<>();
    }

    @OnOpen
    public void onOpen(Session peer) {
        LOGGER.log(Level.INFO, "Opened session: {0}", peer);
        peers.add(peer);
    }

    @OnClose
    public void onClose(Session peer) {
        LOGGER.log(Level.INFO, "Closed session: {0}", peer);
        peers.remove(peer);
    }

    @OnMessage
    public void onMessage(@Valid ClientMessage message, Session session) {
        LOGGER.log(Level.INFO, "Received message {0} from peer {1}",
                new Object[]{message, session});

        for (Session peer : peers) {
            try {
                LOGGER.log(Level.INFO, "Broadcasting message {0} to peer {1}",
                        new Object[]{message, peer});

                peer.getBasicRemote().sendObject(message);
            } catch (IOException | EncodeException ex) {
                LOGGER.log(Level.SEVERE, "Error sending message", ex);
            }
        }

        createAnswer(message, session);
    }

    private void createAnswer(ClientMessage message, Session session) {
         if (message.getMessage() == null) {
             return;
         }

         List<String> answerList =this.findAnswer(message.getMessage().toLowerCase());
         if (answerList.isEmpty()) {
             ClientMessage clientMessage = new ClientMessage();
             clientMessage.setMessage("I don't understand, I know only few sentences. Try again next week");
             clientMessage.setAuthor("server");
             try {
                 session.getBasicRemote().sendText(clientMessage.encode(clientMessage));
             } catch (IOException e) {
                 e.printStackTrace();
             }

         } else {
             if (answerList.size() == 1) {
                 ClientMessage clientMessage = new ClientMessage();
                 clientMessage.setMessage(answerList.get(0));
                 try {
                     session.getBasicRemote().sendText(clientMessage.encode(clientMessage));
                 } catch (IOException e) {
                     e.printStackTrace();
                 }
             } else {
                 for (String answer : answerList) {
                     try {
                         Thread.sleep(1000);
                     } catch (InterruptedException e) {
                         e.printStackTrace();
                     }
                     ClientMessage clientMessage = new ClientMessage();
                     clientMessage.setMessage(answer);
                     try {
                         session.getBasicRemote().sendText(clientMessage.encode(clientMessage));
                     } catch (IOException e) {
                         e.printStackTrace();
                     }
                 }
         }
         }


    }

    @OnError
    public void onError(Session session, Throwable error) {
        try {
            if (error.getCause() instanceof ConstraintViolationException) {
                JsonObject jsonObject = Json.createObjectBuilder()
                        .add("error",
                                ((ConstraintViolationException) error.getCause())
                                        .getConstraintViolations().iterator().next()
                                        .getMessage())
                        .build();
                session.getBasicRemote().sendText(jsonObject.toString());
            } else {
                LOGGER.log(Level.SEVERE, null, error);
            }
        } catch (IOException ex) {
            LOGGER.log(Level.SEVERE, null, ex);
        }
    }

    public List<String> findAnswer (String message) {
        List<String> answer = new ArrayList<>(2);

        if (message.contains("hi")) {
            answer.add("Hello! How are you?");
            return answer;
        }
        if (message.contains( "and you")) {
            answer.add("Very well thanks!");
            return answer;
        }
        if (message.contains("weather")) {
            answer.add("No idea, but takes an umbrella with you, who knows?");
            return answer;
        }
        if (message.contains("joke")) {
            if (message.contains("oop") || message.contains("object")) {
                answer.add("Whats the object-oriented way to become wealthy?");
                answer.add("...");
                answer.add("Inheritance");
                return answer;
            }
            answer.add("Hmmm ... wait ...");
            answer.add("how many programmers does it take to change a light bulb?");
            answer.add("...");
            answer.add("none, that's a hardware problem");
        }

        return answer;
    }
}
