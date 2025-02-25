import { Component, inject, OnInit } from '@angular/core'
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService=inject(CartService)
  cartDetails:Icart ={} as Icart
 ngOnInit(): void {
     this.getProductData();
 }

 
 getProductData(){
this.cartService.getLoggedUserCard().subscribe({
  next: (res) => {
    this.cartDetails=res.data
    console.log(res.data);
  }
})
}

removeItem(id:string) :void{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.removeSpasificProductcard(id).subscribe({
        next:(res) =>{
         this.cartDetails = res.data
         this.cartService.cartNumber.set(res.numOfCartItems)
         console.log(res)
         
        }
       })
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        
      });
    }
  });
}
 

updateCount(id:string , count:number):void {
  this.cartService.updateCardProductQuentity(id,count).subscribe({
    next:(res) =>{
      this.cartDetails = res.data
      console.log(res)
    }
  })

}

clearCart():void{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.clearUserCart().subscribe({
        next:(res) =>{
          if(res.message='success'){
            this.cartDetails = {} as Icart
            this.cartService.cartNumber.set(0)
          }
         
          console.log(res)
        }
      })
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",

      });
    }
  });
}
}
