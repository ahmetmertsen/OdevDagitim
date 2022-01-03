import { Odev } from './../../models/odev';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from './../../models/sonuc';
import { Kayit } from './../../models/kayit';
import { FbServiceService } from './../../services/fbService.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Sonuc2 } from './../../models/sonuc2';

@Component({
  selector: 'app-yoneticiArayuzu',
  templateUrl: './yoneticiArayuzu.component.html',
  styleUrls: ['./yoneticiArayuzu.component.css']
})
export class YoneticiArayuzuComponent implements OnInit {
  kayitlar:any;
  odevler:any;
  secKayit:Kayit=new Kayit();
  secOdev:Odev=new Odev();
  sonuc:Sonuc=new Sonuc();
  sonuc2:Sonuc2=new Sonuc2();
  constructor(
    public fbServis : FbServiceService,
    public router:Router
  ) { }

  ngOnInit() {
    this.KayitListele();
    this.OdevListele();
    this.secKayit.key==null;
    this.secOdev.key==null;
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
  KayitDuzenle(kayit:Kayit){
    Object.assign(this.secKayit,kayit);
  }
  KayitSil(kayit:Kayit){
    this.fbServis.KayitSil(kayit.key).then(()=>{
      this.sonuc.islem=true;
      this.sonuc.mesaj="Kayit Silindi";
    });
  }
  
  Kaydet() {
    var tarih = new Date();
    this.secKayit.duzTarih=tarih.getTime().toString();
    if(this.secKayit.key==null){
      this.secKayit.kayTarih=tarih.getTime().toString();
      this.fbServis.KayitEkle(this.secKayit).then(() => {
         this.sonuc.islem=true;
         this.sonuc.mesaj="Kayit Eklendi";
      });
    }
    else {
      this.fbServis.KayitDuzenle(this.secKayit).then(() => {
        this.sonuc.islem=true;
        this.sonuc.mesaj="Kayit Düzenlendi";
     });
    }
  }
  Vazgec() {
    this.secKayit=new Kayit();
    this.secKayit.key==null;
  }
  OturumKapat() {
    this.fbServis.OturumKapat().then(()=>{
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }



  OdevListele() {
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
  OdevDuzenle(odev:Odev){
    Object.assign(this.secOdev,odev);
  }
  OdevSil(odev:Odev){
    this.fbServis.OdevSil(odev.key).then(()=>{
      this.sonuc2.islem2=true;
      this.sonuc2.mesaj2="Ödev Silindi";
    });
  }
  
  OdevKaydet() {
    if(this.secOdev.key==null){
      this.fbServis.OdevEkle(this.secOdev).then(() => {
         this.sonuc2.islem2=true;
         this.sonuc2.mesaj2="Ödev Eklendi";
      });
    }
    else {
      this.fbServis.OdevDuzenle(this.secOdev).then(() => {
        this.sonuc2.islem2=true;
        this.sonuc2.mesaj2="Ödev Düzenlendi";
     });
    }
  }
  odevVazgec() {
    this.secOdev=new Odev();
    this.secOdev.key==null;
  }

}