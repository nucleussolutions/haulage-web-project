package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class CompanyInterceptorSpec extends Specification implements InterceptorUnitTest<CompanyInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test company interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"company")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
