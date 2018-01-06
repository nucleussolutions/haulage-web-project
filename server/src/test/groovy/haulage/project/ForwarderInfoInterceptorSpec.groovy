package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class ForwarderInfoInterceptorSpec extends Specification implements InterceptorUnitTest<ForwarderInfoInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test forwarderInfo interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"forwarderInfo")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
