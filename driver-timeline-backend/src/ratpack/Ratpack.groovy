import grails.gorm.annotation.Entity
import ratpack.groovy.template.MarkupTemplateModule

import static ratpack.groovy.Groovy.groovyMarkupTemplate
import static ratpack.groovy.Groovy.ratpack

ratpack {
  bindings {
    module MarkupTemplateModule
  }

  handlers {
    get {
      render groovyMarkupTemplate("index.gtpl", title: "My Ratpack App")
    }

    post {
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
}

@Entity
class Value {
  String jobId
  String driverId
  Double lat
  Double lng
  String activity
}
