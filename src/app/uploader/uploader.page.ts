import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { firestore } from 'firebase/app';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL = '';
  desc = '';
  @ViewChild('filebutton', {static: false}) filebutton;

  constructor(public http: HttpClient,
              public afStore: AngularFirestore,
              public user: UserService) { }

  ngOnInit() {
  }

  fileChanged(event) {
    const files = event.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', 'd34138240f8db9e80c57');

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event);
      this.imageURL = JSON.parse(JSON.stringify(event)).file;
    });
  }

  createPost() {
    const image = this.imageURL;
    const desc = this.desc;

    this.afStore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion({image})
    });

    this.afStore.doc(`posts/${image}`).set({
      desc,
      author: this.user.getUsername(),
      likes: []
    });

  }

  uploadFile() {
    this.filebutton.nativeElement.click();
  }

}
