import { loadingInterceptor } from './../../core/interceptors/loading/loading.interceptor';
import { Component, inject, OnInit, signal, WritableSignal, } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/icategory';
import { SubcategoriesService } from '../../core/services/subcategoires/subcategories.service';
import { Isubcategory } from '../../shared/isubcategory';



@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
private readonly categoriesService = inject(CategoriesService)
private readonly subcategoriesService =inject(SubcategoriesService)
categories:Icategory [] = []
subcategories :Isubcategory[] =[]
selectedCat:string = ""
ngOnInit(): void {
    this.getAllCategories()
}
getAllCategories():void{
  this.categoriesService.getCategories().subscribe({
    next:(res) =>{
      this.categories = res.data
      console.log(res)
      
    }
  })
}

getSpacificCatDetails(id:string , CatName:string):void{
  this.selectedCat = CatName
 this.subcategoriesService.getAllSubCatOnCategory(id).subscribe({
  next:(res) =>{
    console.log(this.selectedCat)
    this.subcategories = res.data
    console.log(res)
  }
 })
}

}
