import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL = '';
  constructor(public http: HttpClient) { }

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

}
