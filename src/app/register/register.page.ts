import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username  = '';
  password  = '';
  cpassword = '';

  constructor(public afAuth: AngularFireAuth, public alert: AlertController,
              public route: Router,
              public afStore: AngularFirestore,
              public user: UserService,
              public alertController: AlertController) { }

  ngOnInit() {
  }

  async register() {
    const {username, password, cpassword} = this;
    if (password !== cpassword) {
      this.showAlert('Error!', 'Passwords do not match');
      return console.error('Passwords don\'t match');
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username.trim(), password);
      this.route.navigate(['/tabs']);


      this.afStore.doc(`users/${res.user.uid}`).set({
        username
      });

      this.user.setUser({
        username,
        uid: res.user.uid
      });

      this.presentAlert('Sucess!', 'You are registered!');
      this.route.navigate(['/tabs']);

    } catch (err) {
      this.presentAlert('Error!', err.message);
    }

  }

  async showAlert(header: string, message: string) {
    const alert = this.alert.create({
      header,
      message,
      buttons: ['OK']
    });
    await (await alert).present();
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
  }

}
