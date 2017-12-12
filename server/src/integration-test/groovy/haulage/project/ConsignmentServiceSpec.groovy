package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class ConsignmentServiceSpec extends Specification {

    ConsignmentService consignmentService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Consignment(...).save(flush: true, failOnError: true)
        //new Consignment(...).save(flush: true, failOnError: true)
        //Consignment consignment = new Consignment(...).save(flush: true, failOnError: true)
        //new Consignment(...).save(flush: true, failOnError: true)
        //new Consignment(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //consignment.id
    }

    void "test get"() {
        setupData()

        expect:
        consignmentService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Consignment> consignmentList = consignmentService.list(max: 2, offset: 2)

        then:
        consignmentList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        consignmentService.count() == 5
    }

    void "test delete"() {
        Long consignmentId = setupData()

        expect:
        consignmentService.count() == 5

        when:
        consignmentService.delete(consignmentId)
        sessionFactory.currentSession.flush()

        then:
        consignmentService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Consignment consignment = new Consignment()
        consignmentService.save(consignment)

        then:
        consignment.id != null
    }
}
