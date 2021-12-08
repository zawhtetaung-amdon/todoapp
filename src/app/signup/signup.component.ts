import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
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
    email: this.fb.control(''),
  });
  onSignup() {
    var body = {
      name: this.LoginForm.get('name')?.value.trim(),
      password: this.LoginForm.get('password')?.value.trim(),
      email: this.LoginForm.get('email')?.value.trim(),
    };
    this._service.signup(body).subscribe((data: any) => {
      console.log('logined successfully', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      this.router.navigateByUrl('/home');
    });
  }
  login() {
    this.router.navigateByUrl('');
  }
}
