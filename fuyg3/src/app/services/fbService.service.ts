import { Odev } from './../models/odev';
import { Kayit } from './../models/kayit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class FbServiceService {
  private dbKayit = '/Kayitlar';
  private dbOdev = '/Odevler';
  kayitRef: AngularFireList<Kayit>;
  odevRef: AngularFireList<Odev>;
  
  constructor (
  public db: AngularFireDatabase,
  public afAuth: AngularFireAuth
  ) 
  {
  this.kayitRef = db.list(this.dbKayit);
  this.odevRef = db.list(this.dbOdev);
  }

  OturumAc(mail:string,parola:string) {
    return this.afAuth.signInWithEmailAndPassword(mail,parola);
  }
  OturumKapat() {
    return this.afAuth.signOut(); 
  }

  /* kayıtlar service başlangıç */
  KayitListele() {
    return this.kayitRef;
  }
  KayitEkle(kayit:Kayit) {
    return this.kayitRef.push(kayit);
  }
  KayitDuzenle(kayit:Kayit) {
    return this.kayitRef.update(kayit.key ,kayit);
  }
  KayitSil(key : string) {
    return this.kayitRef.remove(key);
  }
  /* kayıtlar service bitiş */
  
  /* odevler service başlangıç */
  OdevListele() {
    return this.odevRef;
  }
  OdevEkle(odev:Odev) {
    return this.odevRef.push(odev);
  }
  OdevDuzenle(odev:Odev) {
    return this.odevRef.update(odev.key ,odev);
  }
  OdevSil(key : string) {
    return this.odevRef.remove(key);
  }
  /* odevler service bitiş */
}