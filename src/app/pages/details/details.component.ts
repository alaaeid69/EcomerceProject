import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { Iproduct } from '../../shared/iproduct';


@Component({
  selector: 'app-details',
 
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly activatedRoute= inject(ActivatedRoute)
  private readonly productService = inject(ProductService)
  prodoctId:any 
  productDetail :Iproduct ={} as Iproduct
  ngOnInit(): void {
     this.activatedRoute.paramMap.subscribe({
      next:(res)=>{

        this.prodoctId=res.get('id')
        console.log(this.prodoctId)
        this.productService.getSpacificProducts(this.prodoctId).subscribe({
          next:(res) =>{
            this.productDetail = res.data
            console.log(this.productDetail)
          }
        })
      }
     }) 
  }

}
