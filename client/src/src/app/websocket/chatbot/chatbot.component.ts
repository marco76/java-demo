import { Component, OnInit } from '@angular/core';
import { ChatbotService } from './chatbot.service';
import {Message} from "./Message";

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

  ngOnInit() {
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
}
