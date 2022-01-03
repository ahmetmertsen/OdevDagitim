import { Odev } from './../../models/odev';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from './../../models/sonuc';
import { Kayit } from './../../models/kayit';
import { FbServiceService } from './../../services/fbService.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Component({
  selector: 'app-kullaniciArayuzu',
  templateUrl: './kullaniciArayuzu.component.html',
  styleUrls: ['./kullaniciArayuzu.component.css']
})
export class KullaniciArayuzuComponent implements OnInit {
  kayitlar:any;
  odevler:any;
  secKayit:Kayit=new Kayit();
  secOdev:Odev=new Odev();
  sonuc:Sonuc=new Sonuc();
  constructor(
    public fbServis : FbServiceService,
    public router:Router
  ) { }

  ngOnInit() {
    this.KayitListele();
    this.OdevListele();
  }
  KayitListele(){
    this.fbServis.KayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kayitlar = data; 
      });
  }
  OdevListele(){
    this.fbServis.OdevListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.odevler = data; 
      });
  }

  OturumKapat() {
    this.fbServis.OturumKapat().then(()=>{
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }
}
