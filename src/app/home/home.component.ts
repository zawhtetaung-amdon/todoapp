import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _service: NoteService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  title = 'my-notes';
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    }
    this.getNote();
  }
  public todoList: any;
  public formFlag: boolean = false;
  getNote() {
    this._service.getNote().subscribe((data: any) => {
      this.todoList = data;
      console.log('list is ', this.todoList);
    });
  }
  public Todoform = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    content: this.fb.control('', [Validators.required]),
  });
  public Updateform = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    content: this.fb.control('', [Validators.required]),
  });
  onSubmit() {
    var body = {
      title: this.Todoform.get('title')?.value.trim(),
      content: this.Todoform.get('content')?.value.trim(),
      completed: false,
    };
    this._service.createNote(body).subscribe((data: any) => {
      console.log('created', data);
      this.Todoform.reset();
      this.ngOnInit();
    });
  }
  toggleForm() {
    this.formFlag = !this.formFlag;
  }
  checkList(id: any) {
    this._service.checkList(id).subscribe((data: any) => {
      this.ngOnInit();
    });
  }
  deleteList(id: any) {
    this._service.deleteItem(id).subscribe((data: any) => {
      this.ngOnInit();
    });
  }
  public updateFlag: boolean = false;
  public current: any;
  updateList(data: any) {
    this.updateFlag = !this.updateFlag;
    this.current = data;

    this.Updateform.controls['title'].setValue(data.title);
    this.Updateform.controls['content'].setValue(data.content);
  }
  onUpdate() {
    var body = {
      title: this.Updateform.get('title')?.value.trim(),
      content: this.Updateform.get('content')?.value.trim(),
      completed: false,
    };
    this._service.updateNote(body, this.current._id).subscribe((data: any) => {
      console.log('created', data);
      this.Todoform.reset();
      this.ngOnInit();
    });
  }
}
