import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  implements OnInit{
  private readonly formBuilder= inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly ordersService=inject(OrdersService)
checkoutForm !:FormGroup ;
cartId:string ="";

ngOnInit(): void {
   this.getInfo()
   this.getCartId();
}

getInfo():void{
  this.checkoutForm = this.formBuilder.group({
    details:[null,[Validators.required]],
    phone:[null ,[ Validators.required ,Validators.pattern(/^01[125][0-9]{8}$/)]],
    city:[null , [Validators.required]],
  })
}
getCartId(){
 this.cartId = this.activatedRoute.snapshot.paramMap.get('id')!
 

}
submitForm():void{
  
this.ordersService.CheckoutPayment(this.cartId ,this.checkoutForm.value).subscribe({
  next:(res) =>{
    console.log(res)
    if(res.status == 'success')
    {
      open(res.session.url , "_self")
    }
  }
})
}

}
