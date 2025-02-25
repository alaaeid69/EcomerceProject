import { HttpClient} from '@angular/common/http';
import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNumber:WritableSignal<number> = signal(0);

  constructor(private httpClient:HttpClient) { }
  addProductToCart(id:string): Observable<any>{
   return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart' ,
      {
      productId :id
      },

    )
  }

  getLoggedUserCard():Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart'
    )
  }

  removeSpasificProductcard(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  updateCardProductQuentity(id:string , newCount:number):Observable<any>{
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,
      {
        "count" : newCount ,
      }
    )

  }

  clearUserCart():Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` 
    )
  }
}
