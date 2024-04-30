import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, TaskForm } from 'src/app/Model/user';
import { TaskService } from 'src/app/service/task.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskformComponent implements OnInit,OnChanges {


  form!: FormGroup
  taskService: TaskService = inject(TaskService)
  sharedService: SharedService = inject(SharedService)
  constructor() {

  }
  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      dueDate: new FormControl('pending', Validators.required),
      status: new FormControl(null, Validators.required),
    })


  }

  @Input() editModal = false
  @Input() showModal = false
  @Input() currrentTaskId!: string
  @Input() editRes!: Task
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>(true)
  @Output() closeEditModal: EventEmitter<boolean> = new EventEmitter<boolean>(true)

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editRes'] && changes['editRes'].currentValue) {
      this.form.patchValue({
        title: this.editRes.title,
        description: this.editRes.description,
        dueDate: this.editRes.due_date,
        status: this.editRes.task_status
      });
    }
  }

  toggleModal() {
    console.log("toggle clickedd");

    this.showModal = false;
    this.closeModal.emit(false)
    this.form.reset()

    if (this.editModal) {
      this.form.reset()
      this.editModal = false;
      this.closeEditModal.emit(false)


    }
  }

  // toggleEditModal() {
  //  

  // }


  onFormSubmitted() {

    const task: TaskForm = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      dueDate: this.form.get('dueDate')?.value,
      status: this.form.get('status')?.value,
    }
    if (!this.form.valid) {
      console.log("fill all the field");
      return
    }
    else if (this.currrentTaskId) {
      this.taskService.updateTask(this.currrentTaskId, task).subscribe(({
        next: (res) => {
          console.log(res);

        },
        error: (err) => {
          console.log(err);
}
      }))
    } else {
      this.taskService.createTask(task).subscribe((response) => {
        this.sharedService.updateFormSubmitted(true);
        console.log(response);
        this.form.reset()
        this.showModal = false
      },
        (error) => {
          console.log(error);
        }
      )

    }



  }






}

