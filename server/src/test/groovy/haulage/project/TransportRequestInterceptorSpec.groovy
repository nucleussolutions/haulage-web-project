package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class TransportRequestInterceptorSpec extends Specification implements InterceptorUnitTest<TransportRequestInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test transportRequest interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"transportRequest")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
