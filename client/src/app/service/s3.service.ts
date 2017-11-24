import * as AWS from "aws-sdk/global";
import S3 = require("aws-sdk/clients/s3");
import {environment} from "../../environments/environment";

export class S3Service {
  constructor(){
    
  }

  private getS3(): any {
    AWS.config.update({
      region: environment.s3bucketRegion,
    });

    let clientParams:any = {
      region: environment.s3bucketRegion,
      apiVersion: '2006-03-01',
      params: {Bucket: environment.s3bucketName}
    };
    if (environment.s3Endpoint) {
      clientParams.endpoint = environment.s3Endpoint;
    }
    return new S3(clientParams);
  }

  public addkOnekEightFile(file: File): Promise<any> {

    if (!file) {
      console.log('Please choose a file to upload first.');
      return;
    }

    return new Promise((resolve, reject) => {
      this.getS3().upload({
        // Key: photoKey,
        ContentType: file.type,
        Body: file,
        StorageClass: 'STANDARD',
        ACL: 'private'
      }, function (err, data) {
        if (err) {
          console.log('There was an error uploading your photo: ', err);
          reject(err);
        }
        console.log('Successfully uploaded photo.');
        resolve(data);
      });
    });
  }

  public addBookingConfirmationFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getS3().upload({
        // Key: photoKey,
        ContentType: file.type,
        Body: file,
        StorageClass: 'STANDARD',
        ACL: 'private'
      }, function (err, data) {
        if (err) {
          console.log('There was an error uploading your photo: ', err);
          reject(err);
        }
        resolve(data);
        console.log('Successfully uploaded photo.');
      });
    });
  }

  public addCmoFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {

      this.getS3().upload({
        // Key: photoKey,
        ContentType: file.type,
        Body: file,
        StorageClass: 'STANDARD',
        ACL: 'private'
      }, function (err, data) {
        if (err) {
          console.log('There was an error uploading your photo: ', err);
          reject(err);
        }
        resolve(data);
        console.log('Successfully uploaded photo.');
      });

    });
  }

  public addGatePassFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getS3().upload({
        // Key: photoKey,
        ContentType: file.type,
        Body: file,
        StorageClass: 'STANDARD',
        ACL: 'private'
      }, function (err, data) {
        if (err) {
          console.log('There was an error uploading your photo: ', err);
          reject(err);
        }
        resolve(data);
        console.log('Successfully uploaded photo.');
      });
    });
  }

}