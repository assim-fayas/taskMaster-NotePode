import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

authservice:AuthService=inject(AuthService)
  @Output() formType: EventEmitter<string> = new EventEmitter<string>()
  @Output() userLoginned: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>(false)

constructor(private authService:AuthService){}
ngOnInit() {
  
}

  onLoginClicked() {
    this.userLoginned.emit(true);
    this.showModal.emit(true);
    this.formType.emit('Login Form');
  }

  onLogoutClicked() {
    this.userLoginned.emit(false);
    this.showModal.emit(false);
    this.formType.emit('SignUp Form');

  }


}
