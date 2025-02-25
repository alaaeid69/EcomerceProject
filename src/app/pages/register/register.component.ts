import { Component, inject } from '@angular/core';
import {ReactiveFormsModule ,FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
private readonly authService= inject(AuthService)
private readonly router =inject(Router)

isLoading:boolean = false;
mgsError:string ="";
success: string = "";

register :FormGroup = new FormGroup({
name : new FormControl(null ,[Validators.required , Validators.minLength(3) ,Validators.maxLength(20)]),
email : new FormControl(null ,[Validators.required ,Validators.email]),
password : new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
rePassword : new FormControl (null,[Validators.required,]),
phone :new FormControl(null ,[Validators.required ,Validators.pattern(/^01[125][1-9]{8}$/)]),

} ,{validators : this.conforimPassword})

submitForm():void{
  this.isLoading =true
  if(this.register.valid){
    this.authService.sendRegisterForm(this.register.value).subscribe({
      next:(res) =>{
        if(res.message  === 'success')
        {
         setTimeout(() => {
          this.router.navigate(['/login']);
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
  else{
    this.register.markAllAsTouched()
  }
 

}

conforimPassword(group:AbstractControl){
let password = group.get('password')?.value ;
let rePassword = group.get('rePassword')?.value;
 return password === rePassword ? null : {mismatch : true}
}

}
