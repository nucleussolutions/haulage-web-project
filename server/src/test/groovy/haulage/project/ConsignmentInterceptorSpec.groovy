package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class ConsignmentInterceptorSpec extends Specification implements InterceptorUnitTest<ConsignmentInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test consignment interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"consignment")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
