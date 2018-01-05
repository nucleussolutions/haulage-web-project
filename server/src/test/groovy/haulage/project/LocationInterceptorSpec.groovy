package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class LocationInterceptorSpec extends Specification implements InterceptorUnitTest<LocationInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test location interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"location")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
