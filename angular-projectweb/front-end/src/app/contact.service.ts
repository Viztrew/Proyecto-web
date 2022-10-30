import { Injectable } from '@angular/core';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  sendData(data:Contact){
    console.log(JSON.stringify(data));
  }
}
