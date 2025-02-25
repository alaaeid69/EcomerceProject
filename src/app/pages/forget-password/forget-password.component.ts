import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule , TranslatePipe , ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly authService = inject(AuthService) 
  private readonly router = inject(Router)
  stepNumber:number =1
verifyEmail:FormGroup = new FormGroup({
  email:new FormControl(null , [Validators.required , Validators.email])
})

verifyCode:FormGroup = new FormGroup({
  resetCode:new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{6,}$/)])
})
restPassword:FormGroup = new FormGroup({
  email:new FormControl(null , [Validators.required , Validators.email]),
  newPassword : new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),

})

verfiyEmailSubmet():void {
  this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
    next:(res) =>{
      if(res.statusMsg === 'success'){
        this.stepNumber = 2
        console.log(this.stepNumber);
      }
      console.log(res);
    }
  })
}
verfiyCodeSubmit():void {
    this.authService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res) =>{
         if(res.status === 'Success'){
          this.stepNumber = 3 ;
        }
        console.log(res);
      }
    })
}
RestPasswordSubmit():void {
  this.authService.setRestPassword(this.restPassword.value).subscribe({
    next:(res) =>{
      localStorage.setItem("token" , res.token)
  
      this.router.navigate(['/home'])
      console.log(res);
    }
  })
}
}

