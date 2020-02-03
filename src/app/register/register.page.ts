import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username  = '';
  password  = '';
  cpassword = '';

  constructor(public afAuth: AngularFireAuth, public alert: AlertController, public route: Router) { }

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
    } catch (err) {
      console.dir(err);
      this.showAlert('Error!', err.message);
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

}
