package haulage.project

import groovyx.net.http.ContentType
import groovyx.net.http.HTTPBuilder
import groovyx.net.http.HttpResponseException

import static javax.servlet.http.HttpServletResponse.*

class CustomRestInterceptor {

    CustomRestInterceptor() {
        matchAll();
    }

    boolean before() {
        // perform authentication with firebase
        String token = session.token ?: request.getHeader('token')
        String apiKey = session.apiKey ?: request.getHeader('apiKey')
        if(!token && !apiKey) { // Please note you could also have your own custom validation logic here
            response.status = SC_UNAUTHORIZED
            return false
        }else {
            def http = new HTTPBuilder( 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key='+apiKey)

            def postBody = [idToken: token] // will be url-encoded

            try {
                http.post(body: postBody, requestContentType: ContentType.JSON) { resp, reader ->

                    println 'status code '+resp.statusLine.statusCode

                    if(resp.statusLine.statusCode == 200 || resp.statusLine.statusCode == 201){
                        response.status = SC_ACCEPTED
                        return true
                    }else {
                        response.status = resp.statusLine.statusCode
                        return false
                    }
                }

                http.handler.failure = { resp ->
                    "Unexpected failure: ${resp.statusLine}"
                    response.status = resp.statusLine.statusCode
                    return false
                }

                http.handler.'400' = { resp ->
                    response.status = resp.statusLine.statusCode
                    return false
                }
            }catch (HttpResponseException e){
                response.status  = e.statusCode
                return false
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