package haulage.project


import grails.rest.*
import grails.converters.*

class QuoteController extends RestfulController {

  def quoteService

  static responseFormats = ['json', 'xml']

  QuoteController() {
    super(Quote)
  }

  def count(){
    respond count: quoteService.count()
  }
}
