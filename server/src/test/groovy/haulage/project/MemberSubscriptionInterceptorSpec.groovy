package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class MemberSubscriptionInterceptorSpec extends Specification implements InterceptorUnitTest<MemberSubscriptionInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test memberSubscription interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"memberSubscription")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
