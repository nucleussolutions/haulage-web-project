package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class HaulierInfoInterceptorSpec extends Specification implements InterceptorUnitTest<HaulierInfoInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test haulierInfo interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"haulierInfo")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
