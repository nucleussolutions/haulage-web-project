package haulage.project


import grails.rest.*
import grails.converters.*

class ForwarderInfoController extends RestfulController {

  def forwarderInfoService

  static responseFormats = ['json', 'xml']

  ForwarderInfoController() {
    super(ForwarderInfo)
  }

  def count() {
    respond count: forwarderInfoService.count
  }
}
