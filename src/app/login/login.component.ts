import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _service: NoteService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/home');
    }
  }
  public LoginForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });
  onLogin() {
    var body = {
      name: this.LoginForm.get('name')?.value.trim(),
      password: this.LoginForm.get('password')?.value.trim(),
    };
    this._service.login(body).subscribe((data: any) => {
      console.log('logined successfully', data);
      localStorage.setItem('token', data.token);
      this.router.navigateByUrl('/home');
    });
  }
}
