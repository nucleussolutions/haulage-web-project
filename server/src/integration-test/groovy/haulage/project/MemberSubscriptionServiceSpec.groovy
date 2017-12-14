package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class MemberSubscriptionServiceSpec extends Specification {

    MemberSubscriptionService memberSubscriptionService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new MemberSubscription(...).save(flush: true, failOnError: true)
        //new MemberSubscription(...).save(flush: true, failOnError: true)
        //MemberSubscription memberSubscription = new MemberSubscription(...).save(flush: true, failOnError: true)
        //new MemberSubscription(...).save(flush: true, failOnError: true)
        //new MemberSubscription(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //memberSubscription.id
    }

    void "test get"() {
        setupData()

        expect:
        memberSubscriptionService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<MemberSubscription> memberSubscriptionList = memberSubscriptionService.list(max: 2, offset: 2)

        then:
        memberSubscriptionList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        memberSubscriptionService.count() == 5
    }

    void "test delete"() {
        Long memberSubscriptionId = setupData()

        expect:
        memberSubscriptionService.count() == 5

        when:
        memberSubscriptionService.delete(memberSubscriptionId)
        sessionFactory.currentSession.flush()

        then:
        memberSubscriptionService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        MemberSubscription memberSubscription = new MemberSubscription()
        memberSubscriptionService.save(memberSubscription)

        then:
        memberSubscription.id != null
    }
}
