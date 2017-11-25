import * as AWS from "aws-sdk/global";
import * as S3 from "aws-sdk/clients/s3";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

export class S3Service {
  constructor(){
    
  }

  private getS3(): any {
    AWS.config.update({
      region: environment.s3bucketRegion,
    });

    let clientParams:any = {
      region: environment.s3bucketRegion,
      apiVersion: '2012-10-17',
      params: {Bucket: environment.s3bucketName}
    };
    if (environment.s3Endpoint) {
      clientParams.endpoint = environment.s3Endpoint;
    }
    return new S3(clientParams);
  }

  public addkOnekEightFile(file: File): Observable<any> {
    let subject = new Subject<any>();
    this.getS3().upload({
      // Key: photoKey,
      ContentType: file.type,
      Body: file,
      StorageClass: 'STANDARD',
      ACL: 'private'
    }, (err, data) => {
      if (err) {
        console.log('There was an error uploading your photo: ', err);
        subject.error(err);
      }else{
        console.log('Successfully uploaded photo.');
        subject.next(data);
      }
    });
    return subject.asObservable();
  }

  public addBookingConfirmationFile(file: File): Observable<any> {

    let subject = new Subject<any>();

    this.getS3().upload({
      // Key: photoKey,
      ContentType: file.type,
      Body: file,
      StorageClass: 'STANDARD',
      ACL: 'private'
    }, (err, data) => {
      if (err) {
        console.log('There was an error uploading your photo: ', err);
        subject.error(err);
      }else{
        subject.next(data);
        console.log('Successfully uploaded photo.');
      }
    });

    return subject.asObservable();

  }

  public addCmoFile(file: File): Observable<any> {
    let subject = new Subject<any>();
    this.getS3().upload({
      // Key: photoKey,
      ContentType: file.type,
      Body: file,
      StorageClass: 'STANDARD',
      ACL: 'private'
    }, (err, data) => {
      if (err) {
        console.log('There was an error uploading your photo: ', err);
        subject.error(err);
      }else{
        console.log('Successfully uploaded photo.');
        subject.next(data);
      }
    });
    return subject.asObservable();
  }

  public addGatePassFile(file: File): Observable<any> {
    let subject = new Subject<any>();

    this.getS3().upload({
      // Key: photoKey,
      ContentType: file.type,
      Body: file,
      StorageClass: 'STANDARD',
      ACL: 'private'
    }, function (err, data) {
      if (err) {
        console.log('There was an error uploading your photo: ', err);
        subject.error(err);
      }else{
        console.log('Successfully uploaded photo.');
        subject.next(data);
      }
    });

    return subject.asObservable();
  }

}