package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class HaulierInfoServiceSpec extends Specification {

    HaulierInfoService haulierInfoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new HaulierInfo(...).save(flush: true, failOnError: true)
        //new HaulierInfo(...).save(flush: true, failOnError: true)
        //HaulierInfo haulierInfo = new HaulierInfo(...).save(flush: true, failOnError: true)
        //new HaulierInfo(...).save(flush: true, failOnError: true)
        //new HaulierInfo(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //haulierInfo.id
    }

    void "test get"() {
        setupData()

        expect:
        haulierInfoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<HaulierInfo> haulierInfoList = haulierInfoService.list(max: 2, offset: 2)

        then:
        haulierInfoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        haulierInfoService.count() == 5
    }

    void "test delete"() {
        Long haulierInfoId = setupData()

        expect:
        haulierInfoService.count() == 5

        when:
        haulierInfoService.delete(haulierInfoId)
        sessionFactory.currentSession.flush()

        then:
        haulierInfoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        HaulierInfo haulierInfo = new HaulierInfo()
        haulierInfoService.save(haulierInfo)

        then:
        haulierInfo.id != null
    }
}
