package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class ForwarderInfoServiceSpec extends Specification {

    ForwarderInfoService forwarderInfoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new ForwarderInfo(...).save(flush: true, failOnError: true)
        //new ForwarderInfo(...).save(flush: true, failOnError: true)
        //ForwarderInfo forwarderInfo = new ForwarderInfo(...).save(flush: true, failOnError: true)
        //new ForwarderInfo(...).save(flush: true, failOnError: true)
        //new ForwarderInfo(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //forwarderInfo.id
    }

    void "test get"() {
        setupData()

        expect:
        forwarderInfoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<ForwarderInfo> forwarderInfoList = forwarderInfoService.list(max: 2, offset: 2)

        then:
        forwarderInfoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        forwarderInfoService.count() == 5
    }

    void "test delete"() {
        Long forwarderInfoId = setupData()

        expect:
        forwarderInfoService.count() == 5

        when:
        forwarderInfoService.delete(forwarderInfoId)
        sessionFactory.currentSession.flush()

        then:
        forwarderInfoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        ForwarderInfo forwarderInfo = new ForwarderInfo()
        forwarderInfoService.save(forwarderInfo)

        then:
        forwarderInfo.id != null
    }
}
