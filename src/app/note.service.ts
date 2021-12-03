import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  public baseUrl = 'https://todoapp-werkz.herokuapp.com/';

  getNote() {
    return this.http.get(this.baseUrl + 'notes');
  }
  createNote(data: any) {
    const headers = { 'content-type': 'application/json' };
    const body = data;
    console.log(body);
    return this.http.post(this.baseUrl + 'notes', body, { headers: headers });
  }
  updateNote(data: any, id: any) {
    const headers = { 'content-type': 'application/json' };
    const body = data;
    console.log(body);
    return this.http.put(this.baseUrl + 'notes-update/' + id, body, {
      headers: headers,
    });
  }
  checkList(id: any) {
    const headers = { 'content-type': 'application/json' };
    return this.http.put(this.baseUrl + 'notes/' + id, { headers: headers });
  }
  deleteItem(id: any) {
    const headers = { 'content-type': 'application/json' };
    return this.http.delete(this.baseUrl + 'notes/' + id, { headers: headers });
  }
}
