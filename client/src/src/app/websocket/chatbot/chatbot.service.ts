import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {WebSocketService} from './websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Message} from "./Message";

const CHAT_URL = 'ws://localhost:8080/chatbot';

@Injectable()
export class ChatbotService {

  public messages: Subject<Message>  = new Subject<Message>();

  constructor(private wsService: WebSocketService) {

    this.messages  = <Subject<Message>>this.wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): Message => {
        console.log(response);
        let data = JSON.parse(response.data);
        return {
          author : data.author,
          message: data.message,
          newDate: data.newDate
        }
      });
  }

  getMessages() : Subject<Message> {
    console.log(this.messages);
    return this.messages;
  }
}
