package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class JobInterceptorSpec extends Specification implements InterceptorUnitTest<JobInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test job interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"job")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
