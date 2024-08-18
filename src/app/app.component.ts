import { Component } from '@angular/core';  
import { Router } from '@angular/router'; // Import the Router module
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rmsClient';
  
  constructor(
    private toastr: ToastrService,

  ) {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  } 
}


