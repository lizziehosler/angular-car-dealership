import { Car } from './../models/car';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as S3 from 'aws-sdk/clients/s3';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carApi: string;

  constructor(private http: HttpClient) {
    this.carApi = `${environment.apiUrl}api/v1/cars`;
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.carApi}/index`);
  }

  getCarById(params) {
    return this.http.get<any>(`${this.carApi}/getCarById?id=${params.id}`);
  }
  getUploadCredentials() {
    return this.http.get<any>(`${this.carApi}/get_upload_credentials`);
  }
  createCar(params) {
    return this.http.post<any>(`${this.carApi}/create`, params);
  }

  uploadCarImage(file, name, accessKey, secretKey) {
    const buf = Buffer.from(
      file.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    const bucket = new S3({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      region: 'us-east-2',
    });
    const params = {
      Bucket: 'code-labs-one-movie-images',
      Key: 'images/' + name,
      Body: buf,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: 'image/png',
    };
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return { success: false, error: err };
      } else {
        console.log('Successfully uploaded file.', data);
        return { success: true, file: data.location };
      }
    });
  }

  updateCar(params) {
    return this.http.patch<any>(`${this.carApi}/update`, params)
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.carApi}/destroy?id=${id}`)
  }

}
