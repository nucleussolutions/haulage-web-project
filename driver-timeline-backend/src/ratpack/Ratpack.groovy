import com.driverapp.app.DataService
import com.driverapp.app.Datum
import com.driverapp.app.DatumModule
import org.grails.datastore.rx.mongodb.RxMongoDatastoreClient
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import ratpack.groovy.template.MarkupTemplateModule
import ratpack.handling.RequestLogger

import static ratpack.groovy.Groovy.groovyMarkupTemplate
import static ratpack.groovy.Groovy.ratpack

//def datastore = new MongoDatastore(Datum)
//def env = new StandardEnvironment()
def rxDataStore = new RxMongoDatastoreClient('haulage-mongo-database', Datum)

final Logger logger = LoggerFactory.getLogger(Ratpack.class)

ratpack {
  bindings {
//    module JacksonModule
    module MarkupTemplateModule
    module DatumModule
  }

  handlers { DataService dataService ->
    all RequestLogger.ncsa(logger) // log all requests

    get {
      render groovyMarkupTemplate("index.gtpl", title: "My Ratpack App")
    }

    

    files { dir "public" }
  }
}

