package haulage.project

import com.agileorbit.schwartz.QuartzService
import grails.rest.*
import grails.converters.*

class JobController extends RestfulController {
  static responseFormats = ['json', 'xml']

  def jobService
  def quartzService

  JobController() {
    super(Job)
  }

  @Override
  Object index(Integer max) {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
    }.first()
    if(permission){
      return super.index(max)
    }else{
      //return jobs based on haulier id
      def jobs = Job.where {
        haulierId == userId
      }
      return jobs
    }
  }

  @Override
  Object show() {
    return super.show()
  }

  @Override
  Object create() {
    return super.create()
  }

  @Override
  Object save() {
    //modify here to schedule
    return super.save()
  }

  @Override
  Object edit() {
    return super.edit()
  }

  @Override
  Object patch() {
    return super.patch()
  }

  @Override
  Object update() {
    //modify here as well for reschedule
    return super.update()
  }

  @Override
  Object delete() {
    return super.delete()
  }

  def count(){
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      authority == 'Super Admin'
    }.first()
    if(permission){
      respond count: jobService.count()
    }else{
      respond count: jobService.countByHaulierId(userId)
    }
  }

}
