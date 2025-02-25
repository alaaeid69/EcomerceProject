
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { Iproduct } from '../../shared/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipe/search/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';

import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService)
    private readonly cartService = inject(CartService)
    private readonly toastrService=inject(ToastrService)
    private readonly wishListService=inject(WishListService)
  
 
  products :Iproduct[] = [] ;
  searchPorduct:string =""
  ngOnInit(): void {
      this.getAllProducts()
  }

getAllProducts():void{
  this.productService.getProducts().subscribe({
    next:(res) =>{
      this.products = res.data
      console.log(res.data)
    }
  })
}


addToCart(id:string){
  this.cartService.addProductToCart(id).subscribe({
    next:(res) =>{
      if(res.status ='success'){
        this.toastrService.success( res.message,'Fresh Cart' )
        this.cartService.cartNumber.set(res.numOfCartItems);
        console.log(this.cartService.cartNumber())
      }
      console.log(res)
    }
  })
}

}
