import { YoneticiArayuzuComponent } from './components/yoneticiArayuzu/yoneticiArayuzu.component';
import { KullaniciArayuzuComponent } from './components/kullaniciArayuzu/kullaniciArayuzu.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLogin=()=>redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  { 
    path: 'yonetici' ,
    component:
    YoneticiArayuzuComponent,
    canActivate:[AngularFireAuthGuard],
    data : {
      authGuardPipe:redirectLogin
    }
   }
    ,
  { path: 'login' ,component:LoginComponent },
  { path: 'kullanici' ,component:KullaniciArayuzuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
