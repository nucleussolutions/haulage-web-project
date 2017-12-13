package haulage.project


import grails.rest.*
import grails.converters.*

class JobController extends RestfulController {

  def jobService

  static responseFormats = ['json', 'xml']

  JobController() {
    super(Job)
  }

  def count() {
    respond count: jobService.count()
  }
}
