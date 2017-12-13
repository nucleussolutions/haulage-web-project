package haulage.project


import grails.rest.*
import grails.converters.*

class TariffController extends RestfulController {

  def tariffService

  static responseFormats = ['json', 'xml']

  TariffController() {
    super(Tariff)
  }

  def count(){
    respond count: tariffService.count()
  }
}
