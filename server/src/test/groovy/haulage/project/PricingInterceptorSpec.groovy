package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class PricingInterceptorSpec extends Specification implements InterceptorUnitTest<PricingInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test pricing interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"pricing")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
