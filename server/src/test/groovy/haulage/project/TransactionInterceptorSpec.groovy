package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class TransactionInterceptorSpec extends Specification implements InterceptorUnitTest<TransactionInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test transaction interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"transaction")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
