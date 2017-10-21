package haulage.project

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class JobServiceSpec extends Specification {

    JobService jobService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Job(...).save(flush: true, failOnError: true)
        //new Job(...).save(flush: true, failOnError: true)
        //Job job = new Job(...).save(flush: true, failOnError: true)
        //new Job(...).save(flush: true, failOnError: true)
        //new Job(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //job.id
    }

    void "test get"() {
        setupData()

        expect:
        jobService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Job> jobList = jobService.list(max: 2, offset: 2)

        then:
        jobList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        jobService.count() == 5
    }

    void "test delete"() {
        Long jobId = setupData()

        expect:
        jobService.count() == 5

        when:
        jobService.delete(jobId)
        sessionFactory.currentSession.flush()

        then:
        jobService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Job job = new Job()
        jobService.save(job)

        then:
        job.id != null
    }
}
