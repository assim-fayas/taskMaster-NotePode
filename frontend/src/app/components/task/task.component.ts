import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/Model/user';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
[x: string]: any;

  tasks: Task[] = []
  taskService: TaskService = inject(TaskService)
  activeRoute: ActivatedRoute = inject(ActivatedRoute)
  sharedService: SharedService = inject(SharedService)
  private subscription!: Subscription;
  currrentTaskId = ''
  showModal = false
  editModal = false
  editRes!: Task
  activeFilterButton = 'All'
  searchText: string = ''
  page: string = '1'
  

  ngOnInit() {
    this.tasks = this.activeRoute.snapshot.data['tasks']


    this.subscription = this.sharedService.formSubmitted$.subscribe(submitted => {
      if (submitted) {
        this.fetchAllTasks()
      }
    });


    // this.searchInput.pipe(
    //   debounceTime(300), // Throttle input events
    //   // distinctUntilChanged() // Only emit if the value has changed
    // ).subscribe(value => {
    //   this.search(value);
    // });

  }


  activateFilterButton(value: string) {
    this.activeFilterButton = value
    this.fetchAllTasks()

  }

  toggleModal() {
    this.showModal = !this.showModal
    console.log(this.showModal);

  }
  toggleEditModal() {
    this.editModal = !this.editModal
  }



  onEdit(id: string) {
    console.log("edit clicked");



    this.currrentTaskId = id

    this.taskService.fetchTask(this.currrentTaskId).subscribe({
      next: (res) => {
        console.log("formmm single", res);
        this.editRes = res
        if (this.editRes) {

          this.editModal = true
          this.toggleModal()
        }
      }, error: (err) => {
        console.log(err);

      }
    })




  }
  onDelete(id: string) {
    this.taskService.deleteTAsk(id).subscribe({
      next: (res) => {

        console.log(res);
        this.fetchAllTasks()


      }, error: (err) => {
        console.log(err);

      }
    })

  }

  fetchAllTasks() {
    this.taskService.fetchAllTask(this.page, this.searchText, this.activeFilterButton).subscribe({
      next: (res: Task[]) => {
        console.log(res);

        this.tasks = res  //.push(...res)

        console.log(this.tasks);


      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  // searchInput: Subject<string> = new Subject<string>()
  onInputChange(event: any) {

    this.searchText = event.target.value

    this.fetchAllTasks()
   

  }
  search(value: string) {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


taskStatusChanged(id:string,status:string){
this.taskService.changeStatus(id,status).subscribe({
  next:(res)=>{
console.log(res);
this.fetchAllTasks()
},
error:(err)=>{
console.log(err);
  
}
})


  }


}
