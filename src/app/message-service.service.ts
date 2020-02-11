import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageNomSourcee = new BehaviorSubject('default message');
  currentMessage = this.messageNomSourcee.asObservable();
  private messagePrenomSource = new BehaviorSubject('default message');
  currentMessage1 = this.messagePrenomSource.asObservable();
  private messageImageSource = new BehaviorSubject('default message');
  currentMessage2 = this.messageImageSource.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.messageNomSourcee.next(message)
  }
  changeMessage2(message: string) {
    this.messagePrenomSource.next(message)
  }
  changeMessage3(message: string) {
    this.messageImageSource.next(message)
  }
}
