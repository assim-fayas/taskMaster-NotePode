import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showModal: boolean = false


  showModalView($event: any) {
    this.showModal = true;
  }

  handleUserLogin(loggedIn: boolean) {
    console.log("User login status:", loggedIn);
    // Handle login/logout logic here
  }

  closeModal($event: any) {
    this.showModal = false
  }


}

