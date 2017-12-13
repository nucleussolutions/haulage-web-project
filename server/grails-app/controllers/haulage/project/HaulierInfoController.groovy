package haulage.project


import grails.rest.*
import grails.converters.*

class HaulierInfoController extends RestfulController {

  def haulierInfoService

  static responseFormats = ['json', 'xml']

  HaulierInfoController() {
    super(HaulierInfo)
  }

  def count() {
    respond count: haulierInfoService.count()
  }
}
