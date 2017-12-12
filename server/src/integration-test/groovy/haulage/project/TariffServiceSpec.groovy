package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class TariffServiceSpec extends Specification {

    TariffService tariffService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Tariff(...).save(flush: true, failOnError: true)
        //new Tariff(...).save(flush: true, failOnError: true)
        //Tariff tariff = new Tariff(...).save(flush: true, failOnError: true)
        //new Tariff(...).save(flush: true, failOnError: true)
        //new Tariff(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //tariff.id
    }

    void "test get"() {
        setupData()

        expect:
        tariffService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Tariff> tariffList = tariffService.list(max: 2, offset: 2)

        then:
        tariffList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        tariffService.count() == 5
    }

    void "test delete"() {
        Long tariffId = setupData()

        expect:
        tariffService.count() == 5

        when:
        tariffService.delete(tariffId)
        sessionFactory.currentSession.flush()

        then:
        tariffService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Tariff tariff = new Tariff()
        tariffService.save(tariff)

        then:
        tariff.id != null
    }
}
