import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { NotificationMessage, NotificationType } from '../Model/user';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

  sendMessage(message: NotificationMessage) {
    this.notificationSubject.next(message)
  }

  constructor(private toastrService: ToastrService) {

    this.notificationSubject.subscribe(message => {
      switch (message.type) {
        case NotificationType.success:
          this.toastrService.success(message.message);
          break;
        case NotificationType.error:
          this.toastrService.error(message.message)
          break;
        case NotificationType.warning:
          this.toastrService.warning(message.message)
          break;
        case NotificationType.info:
          this.toastrService.info(message.message)
          break;
      }
    }, err => {
      console.log('Error when processing tostr message');

    })
  }
}

