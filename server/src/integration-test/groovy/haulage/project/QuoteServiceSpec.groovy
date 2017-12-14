package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class QuoteServiceSpec extends Specification {

    QuoteService quoteService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Quote(...).save(flush: true, failOnError: true)
        //new Quote(...).save(flush: true, failOnError: true)
        //Quote quote = new Quote(...).save(flush: true, failOnError: true)
        //new Quote(...).save(flush: true, failOnError: true)
        //new Quote(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //quote.id
    }

    void "test get"() {
        setupData()

        expect:
        quoteService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Quote> quoteList = quoteService.list(max: 2, offset: 2)

        then:
        quoteList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        quoteService.count() == 5
    }

    void "test delete"() {
        Long quoteId = setupData()

        expect:
        quoteService.count() == 5

        when:
        quoteService.delete(quoteId)
        sessionFactory.currentSession.flush()

        then:
        quoteService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Quote quote = new Quote()
        quoteService.save(quote)

        then:
        quote.id != null
    }
}
