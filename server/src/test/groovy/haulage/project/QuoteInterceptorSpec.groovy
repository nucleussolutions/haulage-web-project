package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class QuoteInterceptorSpec extends Specification implements InterceptorUnitTest<QuoteInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test quote interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"quote")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
