package com.driverapp.app

import groovy.util.logging.Slf4j
import rx.Observable

@Slf4j
class DataService {

  Observable<List<Datum>> all() {
    Datum.list()
  }

  Observable<List<Datum>> findAllByJobId(String jobId){
    Datum.where {
      value.jobId == jobId
    }.list()
  }

  Observable<List<Datum>> findAllByDriverId(String driverId){
    Datum.where {
      value.driverId == driverId
    }.list()
  }

  Observable<Datum> insert(Datum datum){
    datum.save()
  }
}
