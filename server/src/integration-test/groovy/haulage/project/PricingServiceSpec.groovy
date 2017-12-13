package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class PricingServiceSpec extends Specification {

    PricingService pricingService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Pricing(...).save(flush: true, failOnError: true)
        //new Pricing(...).save(flush: true, failOnError: true)
        //Pricing pricing = new Pricing(...).save(flush: true, failOnError: true)
        //new Pricing(...).save(flush: true, failOnError: true)
        //new Pricing(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //pricing.id
    }

    void "test get"() {
        setupData()

        expect:
        pricingService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Pricing> pricingList = pricingService.list(max: 2, offset: 2)

        then:
        pricingList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        pricingService.count() == 5
    }

    void "test delete"() {
        Long pricingId = setupData()

        expect:
        pricingService.count() == 5

        when:
        pricingService.delete(pricingId)
        sessionFactory.currentSession.flush()

        then:
        pricingService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Pricing pricing = new Pricing()
        pricingService.save(pricing)

        then:
        pricing.id != null
    }
}
