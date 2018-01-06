package haulage.project.async

import grails.async.DelegateAsync
import grails.gorm.transactions.Transactional
import haulage.project.JobService

class AsyncJobService {
  @DelegateAsync
  JobService jobService
}
