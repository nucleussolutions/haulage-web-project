import grails.gorm.annotation.Entity
import ratpack.groovy.template.MarkupTemplateModule
import ratpack.jackson.JacksonModule

import static ratpack.groovy.Groovy.groovyMarkupTemplate
import static ratpack.groovy.Groovy.ratpack
import static ratpack.jackson.Jackson.json
import static ratpack.jackson.Jackson.jsonNode
import static ratpack.rx.RxRatpack.observe

import org.grails.datastore.mapping.mongo.MongoDatastore

def datastore = new MongoDatastore(Datum)

ratpack {
  bindings {
//    module JacksonModule
    module MarkupTemplateModule
  }

  handlers {
    get {
      render groovyMarkupTemplate("index.gtpl", title: "My Ratpack App")
    }

    post('submit') {
//      parse(jsonNode())


      //todo first let an interceptor filter the request if the driver id has permission to access this endpoint or not

      //todo after that, just get the datum from the json request

      //todo then use mongodb to store the data

      //todo simple as that
    }

    files { dir "public" }
  }
}

@Entity
class Datum {
  Date timestamp
  String type
  Value value

  def toMap(){
    [timestamp: timestamp, type: type, value: value]
  }
}

@Entity
class Value {
  String jobId
  String driverId
  Double lat
  Double lng
  String activity

  def toMap(){
    [jobId: jobId, driverId: driverId, lat: lat, lng: lng, activity: activity]
  }
}
