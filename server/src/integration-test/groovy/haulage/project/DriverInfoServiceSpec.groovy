package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class DriverInfoServiceSpec extends Specification {

    DriverInfoService driverInfoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new DriverInfo(...).save(flush: true, failOnError: true)
        //new DriverInfo(...).save(flush: true, failOnError: true)
        //DriverInfo driverInfo = new DriverInfo(...).save(flush: true, failOnError: true)
        //new DriverInfo(...).save(flush: true, failOnError: true)
        //new DriverInfo(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //driverInfo.id
    }

    void "test get"() {
        setupData()

        expect:
        driverInfoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<DriverInfo> driverInfoList = driverInfoService.list(max: 2, offset: 2)

        then:
        driverInfoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        driverInfoService.count() == 5
    }

    void "test delete"() {
        Long driverInfoId = setupData()

        expect:
        driverInfoService.count() == 5

        when:
        driverInfoService.delete(driverInfoId)
        sessionFactory.currentSession.flush()

        then:
        driverInfoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        DriverInfo driverInfo = new DriverInfo()
        driverInfoService.save(driverInfo)

        then:
        driverInfo.id != null
    }
}
