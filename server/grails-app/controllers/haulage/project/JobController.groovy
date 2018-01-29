package haulage.project

import com.agileorbit.schwartz.QuartzService
import grails.rest.*
import grails.converters.*

class JobController extends RestfulController {
  static responseFormats = ['json', 'xml']

  QuartzService quartzService

  JobController() {
    super(Job)
  }

  @Override
  Object index(Integer max) {
    return super.index(max)
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

}
