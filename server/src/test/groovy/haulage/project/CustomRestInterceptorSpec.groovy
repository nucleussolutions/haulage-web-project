package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class CustomRestInterceptorSpec extends Specification implements InterceptorUnitTest<CustomRestInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test customRest interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"customRest")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
