import groovy.util.logging.Slf4j
import ratpack.groovy.template.MarkupTemplateModule
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import sun.net.www.http.HttpClient

import static ratpack.groovy.Groovy.byMethod
import static ratpack.groovy.Groovy.groovyMarkupTemplate
import static ratpack.groovy.Groovy.ratpack
import ratpack.http.client.HttpClient
import ratpack.http.client.RequestSpec
import ratpack.http.client.StreamedResponse
final Logger logger = LoggerFactory.getLogger(Ratpack.class)

ratpack {
  bindings {
    module MarkupTemplateModule
  }


  handlers {

//    get {
//      render groovyMarkupTemplate("index.gtpl", title: "My Ratpack App")
//    }

//    prefix('api') {
//      post('auth/login') {
//        URI proxyUri = new URI(request.rawUri)
//        proxyUri.host = 'localhost'
//        proxyUri.scheme = 'http'
//        proxyUri.port = 3000
//        httpClient.requestStream(proxyUri) { RequestSpec spec ->
//          spec.headers.copy(request.headers)
//        }.then { StreamedResponse responseStream ->
//          responseStream.forwardTo(response)
//        }
//      }
//    }

    all { HttpClient httpClient ->
      URI proxyUri = new URI(request.rawUri)
      proxyUri.host = 'localhost'
      proxyUri.scheme = 'http'
      proxyUri.port = 4200
      println 'proxyUri '+proxyUri.toString()
      httpClient.requestStream(proxyUri) { RequestSpec spec ->
        println 'requestSpec '+spec
        spec.headers.copy(request.headers)
      }.then { StreamedResponse responseStream ->
        println 'responseStream '+responseStream
        println 'response '+response
        responseStream.forwardTo(response)
      }
    }

    files { dir "public" }
  }
}
