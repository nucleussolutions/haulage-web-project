package haulage.project

import grails.compiler.GrailsCompileStatic
import groovyx.net.http.ContentType
import groovyx.net.http.HTTPBuilder
import groovyx.net.http.HttpResponseException

import static javax.servlet.http.HttpServletResponse.*

@GrailsCompileStatic
class CustomRestInterceptor {

  int order = HIGHEST_PRECEDENCE

  CustomRestInterceptor() {
    matchAll()
  }

  boolean before() {
    // perform authentication with firebase
    String token = session.token ?: request.getHeader('token')
    String apiKey = session.apiKey ?: request.getHeader('apiKey')
    if (!token && !apiKey) { // Please note you could also have your own custom validation logic here
      response.status = SC_UNAUTHORIZED
      false
    } else {

      println 'request.method ' + request.method

      println 'request url ' + request.requestURL

      if (request.method == "OPTIONS") {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200")
        response.setHeader("Access-Control-Allow-Credentials", "true")
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
        response.setHeader("Access-Control-Max-Age", "3600")
      }

      def http = new HTTPBuilder('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=' + apiKey)

      def postBody = [idToken: token] // will be url-encoded

      try {
        http.post(body: postBody, requestContentType: ContentType.JSON) { resp, reader ->

          println 'status code ' + resp.statusLine.statusCode

          if (resp.statusLine.statusCode == 200 || resp.statusLine.statusCode == 201) {


            response.status = SC_ACCEPTED
            true
          } else {
            response.status = resp.statusLine.statusCode
            false
          }
        }

        http.handler.failure = { resp ->
          "Unexpected failure: ${resp.statusLine}"
          response.status = resp.statusLine.statusCode
          false
        }

        http.handler.'400' = { resp ->
          response.status = resp.statusLine.statusCode
          false
        }
      } catch (HttpResponseException e) {
        response.status = e.statusCode
        false
      }
    }
  }

  boolean after() {
    true
  }

  void afterView() {
    // no-op
  }
}
