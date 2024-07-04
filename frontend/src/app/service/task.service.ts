import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskForm } from '../Model/user';
import { Task } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private http: HttpClient = inject(HttpClient)
  private readonly url = environment.api
user=new Subject<string>()
  createTask(task: TaskForm) {
    return this.http.post(`${this.url}/addTask`, task, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(() => error) 

        })
      )
  }

  fetchAllTask(page: string, searchText: string, activeFilterButton: string) {
    const params = new HttpParams().set('search', searchText).set('filter', activeFilterButton).set('page', page).set('limit', '3')
    return this.http.get<Task[]>(`${this.url}/listTask`, { params }).pipe((map(response => {
      return response
    }),
      catchError((error) => {
        return throwError(() => error)
      })
    ))
  }

  fetchTask(id: string) {
    return this.http.get<Task>(`${this.url}/editTask/${id}`).pipe(map(response => {
      return response
    }),
      catchError((error) => {
        return throwError(() => error)
      }))

  }

  updateTask(id: string, task: TaskForm) {
    return this.http.patch(`${this.url}/updateTask/${id}`, task).pipe(map(response => {
      return response
    }),
      catchError((error) => {
        return throwError(() => error)
      }))
  }

  changeStatus(id:string,status:string){
    return this.http.patch(`${this.url}/changeStatus/${id}`,{status}).pipe(
      map(response=>{
        return response
      }),
      catchError((error)=>{
        return throwError(()=>error)
      })
    )

  }





  deleteTAsk(id: string) {
    return this.http.delete(`${this.url}/deleteTask/${id}`).pipe(map(response => {
      return response
    }),
      catchError((error) => {
        return throwError(() => error)
      }))

  }



}
