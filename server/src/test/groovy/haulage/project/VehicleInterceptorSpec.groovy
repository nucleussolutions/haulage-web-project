package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class VehicleInterceptorSpec extends Specification implements InterceptorUnitTest<VehicleInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test vehicle interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"vehicle")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
