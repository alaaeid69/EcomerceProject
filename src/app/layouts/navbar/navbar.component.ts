import { Component, computed, inject, input, OnInit, WritableSignal, signal, Signal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive , TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  private readonly authService= inject(AuthService)
  readonly myTranslateService= inject(MyTranslateService)
  private readonly translateService = inject(TranslateService)
  private readonly cartService = inject(CartService)
isLogin =input<boolean>(true)
countNum:Signal<number> = computed( () => this.cartService.cartNumber()) 
ngOnInit() {
  initFlowbite();

  this.cartService.getLoggedUserCard().subscribe({
    next:(res) =>{
      this.cartService.cartNumber.set( res.numOfCartItems);
    }
  })
 
}
logout(){
this.authService.logOut()
}
changeLang(lang:string):void{
this.myTranslateService.chageLangTranslate(lang)
}

currentLang(lang:string){
return this.translateService.currentLang==lang;
}
}
