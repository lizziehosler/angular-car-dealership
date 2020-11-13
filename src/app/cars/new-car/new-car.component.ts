import Swal from 'sweetalert2';
import { DealershipService } from './../../dealership.service';
import { CarService } from './../../shared/services/car.service';
import { UserService } from './../../shared/services/user.service';
import { Subscription, Observable } from 'rxjs';
import { User } from './../../shared/models/user';
import { Dealership } from './../../shared/models/dealership';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.scss']
})
export class NewCarComponent implements OnInit, OnDestroy {
  form: FormGroup
  formValues: any
  submitting = false
  hasError = false
  errorMsg: string
  currentUser: User
  // Dealership dropdown vars
  dealerships$: Observable<Dealership[]>;
  dealership: Dealership
  selectedDealershipId: number
  // s3 keys
  accessKey: string
  secretKey: string
  // Image Cropper Vars
  imageChangedEvent: any = ''
  croppedImage: any = ''
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef
  @ViewChild('cropper', { static: false }) cropper: ElementRef
  @ViewChild(ImageCropperComponent, { static: false })
  imageCropper: ImageCropperComponent

  private subs = new Subscription()

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private carService: CarService,
    private dealershipService: DealershipService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.getS3Keys()
    this.createFormControls()
    this.createForm()
    this.dealerships$ = this.dealershipService.getAllDealerships();
  }

  getS3Keys() {
    this.subs.add(
      this.carService.getUploadCredentials().subscribe(data => {
        if (data) {
          this.accessKey = data.accessKey
          this.secretKey = data.secretKey
        }
      }, error => {
        if (error) {
          console.error(error)
        }
      })
    )
  }

  createFormControls() {
    this.formValues = {
      color: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      price: [null, Validators.required],
      mileage: [null, Validators.required],
      year: [null, Validators.required],
      img: ['', Validators.required],
      notes: ['', Validators.required],
      dealership_id: ['', Validators.required]
    }
  }

  createForm() {
    this.form = this.fb.group(this.formValues)
  }

  submitForm() {
    this.hasError = false
    this.submitting = true
    if (this.form.invalid) {
      this.hasError = true
      this.submitting = false
      return
    }
    const imgUploadSuccess = this.uploadImage()
    if (imgUploadSuccess) {
      const form = this.form.value
      const params = {
        color: form.color,
        make: form.make,
        model: form.model,
        price: form.price,
        mileage: form.mileage,
        year: form.year,
        image: form.img,
        notes: form.notes,
        dealership_id: form.dealership_id
      }
      this.subs.add(
        this.carService.createCar(params).subscribe( data => {
          if (data) {
            this.submitting = false,
            Swal.fire({
              icon: 'success',
              title: 'A new car has been successfully added!',
              showConfirmButton: false,
              timer: 2000
            }).then(()=> {
              this.form.reset()
            })
          }
        }, error => {
          if (error) {
            console.error(error)
            this.submitting = false
            this.hasError = true
            this.errorMsg = 'Something went wrong while trying to create that car!'
          }
        })
        )

      } else {
      this.submitting = false
      this.hasError = true
      this.errorMsg = 'Something went wrong while trying to upload your movie image!'
      return;
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onSelectImage($event: ImageCroppedEvent) {
    this.imageChangedEvent = $event;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // ngx-image-cropper-methods

  onImageCropChanged(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  onImageCropClicked() {
    this.form.get('img').setValue(this.croppedImage);
    this.imageChangedEvent = null;
  }

  uploadImage() {
    let model;
    model = this.form.get('model').value; // grabbing the title value from form
    model = model.replace(/s/g, '-'); // replaces spaces in title w/ '-'
    model = model.toLowerCase(); // Lower Case the title
    const name = model
      ? model
      : this.generateRandomString(14, '0123456789abcd'); // sets img name key or assigns random string
    this.carService.uploadCarImage(this.croppedImage, name, this.accessKey, this.secretKey);
    this.form
      .get('img')
      .setValue(
        'https://code-labs-one-movie-images.s3.us-east-2.amazonaws.com/images/' +
      name
      );
    return true;
  }

  generateRandomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  cancel() {
    this.form.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
