package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class UserInfoInterceptorSpec extends Specification implements InterceptorUnitTest<UserInfoInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test userinfo interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"userinfo")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
