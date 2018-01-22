package com.driverapp.app

import grails.gorm.annotation.Entity
import grails.gorm.rx.mongodb.RxMongoEntity

@Entity
class Datum implements RxMongoEntity<Datum> {
  Date timestamp
  String type
  Value value

//  def toMap(){
//    [timestamp: timestamp, type: type, value: value]
//  }
}

@Entity
class Value {

  String jobId
  String driverId
  Double lat
  Double lng
  String activity

//  def toMap(){
//    [jobId: jobId, driverId: driverId, lat: lat, lng: lng, activity: activity]
//  }
}
