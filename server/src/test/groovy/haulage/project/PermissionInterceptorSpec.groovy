package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class PermissionInterceptorSpec extends Specification implements InterceptorUnitTest<PermissionInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test permission interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"permission")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
