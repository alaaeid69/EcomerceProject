import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';

import { Iproduct } from '../../shared/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipe/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,  FormsModule ,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly productService = inject(ProductService)
  private readonly  categoriesService =inject(CategoriesService)
  private readonly cartService = inject(CartService)
  private readonly toastrService=inject(ToastrService)
  products :Iproduct[] = []
  categories:Icategory [] =[]
  


  ngOnInit(): void {
    this.getAllProucts()
    this.getALLCategories()
}

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
    items:1,
    nav: true
  }
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rtl:true,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

 
  getAllProucts(){
    this.productService.getProducts().subscribe({
      next:(res) =>{
     this.products = res.data
      }
    })
  }
  
  getALLCategories(){
    this.categoriesService.getCategories().subscribe({
      next:(res)=>{
        this.categories = res.data
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
