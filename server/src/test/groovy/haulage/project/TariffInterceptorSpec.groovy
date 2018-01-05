package haulage.project

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class TariffInterceptorSpec extends Specification implements InterceptorUnitTest<TariffInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test tariff interceptor matching"() {
        when:"A request matches the interceptor"
        withRequest(controller:"tariff")

        then:"The interceptor does match"
        interceptor.doesMatch()
    }
}
