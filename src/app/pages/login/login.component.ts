import { Component, inject } from '@angular/core';
import {ReactiveFormsModule ,FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , TranslatePipe , RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private readonly authService= inject(AuthService)
private readonly router =inject(Router)

isLoading:boolean = false;
mgsError:string ="";
success: string = "";

login :FormGroup = new FormGroup({

email : new FormControl(null ,[Validators.required ,Validators.email]),
password : new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
})

submitForm():void{
  this.isLoading =true
  if(this.login.valid){
    this.authService.sendLoginForm(this.login.value).subscribe({
      next:(res) =>{
        if(res.message  === 'success')
        {
         setTimeout(() => {
          
         localStorage.setItem('token', res.token)

         this.authService.getUserData()
          this.router.navigate(['/home']);
         }, 1000);
          
          this.success = res.message
        }
        this.isLoading = false
      },
      error:(err) =>{
        this.mgsError = err.error.message;
        
        console.log(this.mgsError)
        this.isLoading =false
      }
    })
  }
 

}
}
