import grails.gorm.annotation.Entity
import org.grails.datastore.rx.mongodb.RxMongoDatastoreClient
import org.springframework.core.env.StandardEnvironment
import ratpack.groovy.template.MarkupTemplateModule
import ratpack.jackson.JacksonModule

import static ratpack.groovy.Groovy.groovyMarkupTemplate
import static ratpack.groovy.Groovy.ratpack
import static ratpack.jackson.Jackson.json
import static ratpack.jackson.Jackson.jsonNode
import static ratpack.rx.RxRatpack.observe

import org.grails.datastore.mapping.mongo.MongoDatastore

//def datastore = new MongoDatastore(Datum)
//def env = new StandardEnvironment()
def rxDataStore = new RxMongoDatastoreClient('haulage-mongo-database', Datum)

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
//      parse(jsonNode()).observe().


      //todo first let an interceptor filter the request if the driver id has permission to access this endpoint or not

      //todo after that, just get the datum from the json request

      //todo then use mongodb to store the data

      //todo simple as that
    }

    get('data') {

    }

    files { dir "public" }
  }
}

