package haulage.project

import grails.gorm.services.Service

@Service(Job)
abstract class JobService {

    protected abstract Job get(Serializable id)

    protected abstract List<Job> list(Map args)

    protected abstract Long count()

    protected abstract void delete(Serializable id)

    protected abstract Job save(Job job)

    Job updateStatus(Serializable id, JobStatus status) {
        Job job = Job.get(id)
        if (job != null) {

            //todo start date time or end date time based on status

            if(status == JobStatus.STARTED) {
                job.startDateTime = new Date()
            }else if(status == JobStatus.COMPLETE){
                job.endDateTime = new Date()
            }else if(status == JobStatus.PENDING_REASSIGN){
                job.startDateTime = null
                job.endDateTime = null
            }

            job.status = status
            job.save(flush: true)
        }
        return job
    }
}