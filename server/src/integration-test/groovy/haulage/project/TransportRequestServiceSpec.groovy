package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class TransportRequestServiceSpec extends Specification {

    TransportRequestService transportRequestService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new TransportRequest(...).save(flush: true, failOnError: true)
        //new TransportRequest(...).save(flush: true, failOnError: true)
        //TransportRequest transportRequest = new TransportRequest(...).save(flush: true, failOnError: true)
        //new TransportRequest(...).save(flush: true, failOnError: true)
        //new TransportRequest(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //transportRequest.id
    }

    void "test get"() {
        setupData()

        expect:
        transportRequestService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<TransportRequest> transportRequestList = transportRequestService.list(max: 2, offset: 2)

        then:
        transportRequestList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        transportRequestService.count() == 5
    }

    void "test delete"() {
        Long transportRequestId = setupData()

        expect:
        transportRequestService.count() == 5

        when:
        transportRequestService.delete(transportRequestId)
        sessionFactory.currentSession.flush()

        then:
        transportRequestService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        TransportRequest transportRequest = new TransportRequest()
        transportRequestService.save(transportRequest)

        then:
        transportRequest.id != null
    }
}
