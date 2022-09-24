import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageUtilService } from '../../services/image-util.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  pictureCamera: string;
  pictureLoaded: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: StorageService,
              public clienteService: ClienteService,
              public camera: Camera,
              public imgUtil: ImageUtilService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
          .subscribe(response => {
              this.cliente = response as ClienteDTO;
              this.getImageIfExists();
          },
          error => {
            if(error.status === 403){
              this.navCtrl.setRoot('HomePage');
            }
          })
      } else {
        this.navCtrl.setRoot('HomePage');
      };
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
        .subscribe(response => {
          this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
        },
        error => {});
  }

  openInputPicture() {
    const input = document.getElementById('my_file');
    input.click();
  }

  onChangeInputPicture(event){
    this.imgUtil.dataBlobToBase64(event.target.files[0])
      .then((data: string) => {
        this.pictureLoaded = data;
      });
  }

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options)
        .then((imageData) => {
          this.pictureCamera = 'data:image/png;base64,' + imageData;
          this.cameraOn = false;
        }, (error) => {});
  }

  sendPicture() {

    let picture = this.pictureCamera || this.pictureLoaded;

    this.clienteService.uploadPicture(picture)
      .subscribe((response) => {
        this.pictureCamera = null;
        this.pictureLoaded = null;
        this.loadData();
      },
      error => {});
  }

  cancel() {
    this.pictureCamera = null;
    this.pictureLoaded = null;
  }
}
