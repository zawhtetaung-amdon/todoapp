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
  // public baseUrl = 'http://localhost:3000/';

  getNote(data: any) {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return this.http.get(this.baseUrl + 'notes?userId=' + data, {
      headers: headers,
    });
  }
  createNote(data: any) {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const body = data;
    console.log(body);
    return this.http.post(this.baseUrl + 'notes', body, { headers: headers });
  }
  login(data: any) {
    const headers = { 'content-type': 'application/json' };
    const body = data;
    console.log(body);
    return this.http.post(this.baseUrl + 'users/login', body, {
      headers: headers,
    });
  }
  signup(data: any) {
    const headers = { 'content-type': 'application/json' };
    const body = data;
    console.log(body);
    return this.http.post(this.baseUrl + 'users/register', body, {
      headers: headers,
    });
  }
  updateNote(data: any, id: any) {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const body = data;
    console.log(body);
    return this.http.put(this.baseUrl + 'notes-update/' + id, body, {
      headers: headers,
    });
  }
  checkList(id: any, userId: any) {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    var body = {
      userId: userId,
    };
    return this.http.put(this.baseUrl + 'notes/' + id, body, {
      headers: headers,
    });
  }
  deleteItem(id: any, userId: any) {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };

    return this.http.delete(this.baseUrl + 'notes/' + id + '/' + userId, {
      headers: headers,
    });
  }
}
