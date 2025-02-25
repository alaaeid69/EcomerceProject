import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrand } from '../../shared/ibrand';
import { loadingInterceptor } from './../../core/interceptors/loading/loading.interceptor';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent  implements OnInit{
private readonly brandsService =inject(BrandsService);
brands :Ibrand []=[]
isModalOpen = false;
selectedBrand: any;


ngOnInit(): void {
    this.getAllBrands()
}
getAllBrands():void{
this.brandsService.getAllBrands().subscribe({
  next:(res) =>{
    this.brands = res.data
    console.log(res.data)
  }
})
}

openModal(brand: any) {
  this.selectedBrand = brand;
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
  this.selectedBrand = null;
}
}
