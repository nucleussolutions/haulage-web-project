package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class DriverInfoInterceptorSpec extends Specification implements InterceptorUnitTest<DriverInfoInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test driverInfo interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"driverInfo")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
