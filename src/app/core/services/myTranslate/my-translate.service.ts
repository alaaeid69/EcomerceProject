import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly renderer2 = inject(RendererFactory2).createRenderer(null ,null)
  constructor(private translateService:TranslateService,
     @Inject(PLATFORM_ID) private id:object,
    
    ) {
 
  if(isPlatformBrowser(this.id)){   
    //set Defoult
   this.translateService.setDefaultLang('en')
    //get  lang local
    const savedLang = localStorage.getItem('lang');
    //use lang
    if(savedLang){
this.translateService.use(savedLang !)
    }
   }
   this.changeDirection()
  }

  changeDirection(){
    if(localStorage.getItem('lang') === 'en'){
      
     document.documentElement.dir = 'ltr';
}
  else if (localStorage.getItem('lang') === 'ar') {
  document.documentElement.dir = 'rtl';

}
  }
  chageLangTranslate(lang:string):void {
   localStorage.setItem('lang' ,lang);
   this.translateService.use(lang);
   this.changeDirection()
  }
  
}

