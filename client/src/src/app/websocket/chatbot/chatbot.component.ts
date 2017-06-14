import { Component, OnInit } from '@angular/core';
import { ChatbotService } from './chatbot.service';
import { Message } from "./Message";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  providers: [ChatbotService]
})
export class ChatbotComponent implements OnInit {

  constructor(private chatbotService : ChatbotService) { }
  messages : Message[];
  lastMessage : string;
  text : string = "";
  text2 : string = "";
  imgUser = "assets/images/elf_1.svg";
  imgComputer = "assets/images/pc.svg";


  ngOnInit() {
    this.setText();
    this.messages = [];
    this.chatbotService.getMessages().subscribe(result => {
        this.messages.push(result)
      },
      error => {
        console.log(error._body);
      }
    );
  }

  onSubmit() {
    let message = new Message();
    message.author = "client";
    message.message = this.lastMessage;
    this.chatbotService.messages.next(message);
    this.lastMessage = '';
  }


  reset(){
    this.messages = [];
  }

  setText(){
    this.text=  `
This code allows to create a the WebSocket used for this chat: 
<pre><code class="java highlight">@ServerEndpoint(value = "chatbot",
        encoders = {ClientMessage.class},
        decoders = {ClientMessage.class})
// with a @Singleton we create a multi-client chat
public class ChatBotServer {
  private final Set&lt;Session&gt; peers;

  public ChatBotServer() {
    peers = new HashSet&lt;&gt;();
  }

  @OnOpen
  public void onOpen(Session peer) {
    peers.add(peer);
  }

  @OnClose
  public void onClose(Session peer)  {
    peers.remove(peer);
  }

  @OnMessage
  public void onMessage(@Valid ClientMessage message,
   Session session) {
      
   for (Session peer : peers) {
       peer.getBasicRemote().sendObject(message);
   }

   createAnswer(message, session);
}</code></pre>

The response message is produced in the <i>createAnswer</i> method with the follow code:
<pre><code class="java highlight">ClientMessage clientMessage = new ClientMessage();
clientMessage.setMessage(answer);
session.getBasicRemote()
  .sendText(clientMessage.encode(clientMessage));</code></pre>
`;

    this.text2=  `
We use a custom <i>class</i> for our messages, we need to <a href ="https://docs.oracle.com/javaee/7/tutorial/websocket007.htm">encode and decode them</a>.
<pre><code class="java highlight">public class ClientMessage implements 
Decoder.Text&lt;ClientMessage&gt;,
Encoder.Text&lt;ClientMessage&gt; {

@NotNull @Size(min = 2, max = 255)
private String message;
private String author = "server";

@Override
public void init(EndpointConfig config) {}

@Override
public ClientMessage decode(String value) {
  try (JsonReader jsonReader = Json.createReader(
  new StringReader(value))) {
  JsonObject jsonObject = jsonReader.readObject();

  message = jsonObject.getString("message");
  author = jsonObject.getString("author");
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
  .add("author", chatMessage.author)
  .build();

  return jsonObject.toString();
 }
}</code></pre>
`
  }

}
