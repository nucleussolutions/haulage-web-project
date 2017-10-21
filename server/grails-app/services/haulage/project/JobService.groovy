package haulage.project

import grails.gorm.services.Service

@Service(Job)
interface JobService {

    Job get(Serializable id)

    List<Job> list(Map args)

    Long count()

    void delete(Serializable id)

    Job save(Job job)
}