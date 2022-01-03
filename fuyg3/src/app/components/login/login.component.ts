import { Sonuc } from './../../models/sonuc';
import { Router } from '@angular/router';
import { FbServiceService } from './../../services/fbService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 sonuc : Sonuc = new Sonuc();
  constructor(
    public fbservice : FbServiceService,
    public router : Router
  ) { }

  ngOnInit() {
  }
  GirisYap(mail:string,parola:string) {
    this.fbservice.OturumAc(mail,parola).then(d=>{
      if (d.user) {
        localStorage.setItem("user",JSON.stringify(d.user));
        this.router.navigate(['/kullanici']);
      }
    },err=> {
      this.sonuc.islem=false;
      this.sonuc.mesaj="E-posta Adresi veya Parola Geçersizdir! ";
    });
  }

  yGirisYap(mail:string,parola:string) {
    this.fbservice.OturumAc(mail,parola).then(d=>{
      if (d.user) {
        localStorage.setItem("user",JSON.stringify(d.user));
        this.router.navigate(['/yonetici']);
      }
    },err=> {
      this.sonuc.islem=false;
      this.sonuc.mesaj="E-posta Adresi veya Parola Geçersizdir! ";
    });
  }

}
