package haulage.project


import grails.rest.*
import grails.converters.*

class PricingController extends RestfulController {

  def pricingService

  static responseFormats = ['json', 'xml']

  PricingController() {
    super(Pricing)
  }

  def count() {
    respond count: pricingService.count()
  }
}
