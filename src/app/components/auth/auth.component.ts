import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr'; 
import { AuthService } from 'src/app/service/auth.service';
import { TopbarService } from 'src/app/service/topbar.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
declare var $: any; // Import jQuery

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formStructure: FormGroup;
  signupForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService ,
    private toastr: ToastrService,
  private topbarService: TopbarService
  ) {
    // Initialize form structures
    this.formStructure = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      image: [''] // You may need to handle file input differently
    });
  }

  ngOnInit(): void {
  }
 
  onSubmit() { 
    this.authService.userLogin(this.formStructure.value).subscribe(
      (res) => {
        if (res.success) {  
          this.topbarService.storedUsername();
          // Handle successful response
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: "success",
            timerProgressBar: false,
            timer: 5000,
            title: 'Signed in successfully'
          });
          $('#loginModal').modal('hide'); // Close login modal
        } else {
          // Handle failed response
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: "error",
            timerProgressBar: false,
            timer: 5000,
            title: 'Failed to sign in'
          });
        }
      },
      (error) => {
        // Handle error response
        console.error("Error:", error);
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: "error",
          timerProgressBar: false,
          timer: 5000,
          title: 'Error signing in'
        });
      }
    );
  }
  
  
  
  onSignUp() {
    // Check if password and confirm password match
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Password and confirm password do not match.",
        icon: "error"
      });
      return; // Stop the execution if passwords don't match
    }
    const successMessages = [
      "Feast your senses!",
      "Ready for a gastronomic journey?",
      "Delight in every dish!",
      "Get your taste buds ready!",
      "Foodie bliss unlocked!",
      "Dig into deliciousness!"
    ];

    const randomIndex = Math.floor(Math.random() * successMessages.length);
    const randomMessage = successMessages[randomIndex];

    // If passwords match, proceed with registration
    this.userService.register(this.signupForm.value).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        Swal.fire({
          title: "Registration Successful!",
          text: randomMessage,
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            $('#signupModal').modal('hide').on('hidden.bs.modal', () => {
              $('#loginModal').modal('show');
            });
          }
        });
      }
    });
  }
  
  
  
}
