import { Component, Input } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent {
  isOpen = false;
  message = '';
  messages: string[] = [];

  constructor(private socket: Socket) {}

  sendMessage() {
    this.socket.emit('message', this.message);
    this.message = '';
  }

  ngOnInit() {
    this.socket.fromEvent<string>('message').subscribe((message) => {
      console.log(this.messages)
      this.messages.push(message);
    });
  }

  closeChat() {
    this.isOpen = false;
  }

}
