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
  private messages : string[];
  private lastMessage : string;

  ngOnInit() {
    this.messages = [];
    this.chatbotService.getMessages().subscribe(result => {
        this.messages.push(result.message)
      },
      error => {
        console.log(error._body);
      }
    );
  }

  onSubmit() {
    this.chatbotService.messages.next({"author":"", "message": this.lastMessage});
    this.lastMessage = '';
  }


}
