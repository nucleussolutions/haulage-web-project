package haulage.project

import groovyx.net.http.AsyncHTTPBuilder
import groovyx.net.http.ContentType
import groovyx.net.http.HTTPBuilder
import groovyx.net.http.Method
import org.springframework.beans.factory.annotation.Autowired
import static groovyx.net.http.Method.*

import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED
import static javax.servlet.http.HttpServletResponse.SC_ACCEPTED


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

            http.request( POST ) {
//                uri.path = '/'
                requestContentType = ContentType.JSON
                body =  [idToken : token]

                response.success = { resp ->
                    println "POST response status: ${resp.statusLine}"
                    assert resp.statusLine.statusCode == 200

                    println 'response body '+resp.data

                    response.status = SC_ACCEPTED
                    return true
                }
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
