package haulage.project


import grails.rest.*
import grails.converters.*

class TransactionController extends RestfulController {

  def transactionService

  static responseFormats = ['json', 'xml']

  TransactionController() {
    super(Transaction)
  }

  def count(){
    respond count: transactionService.count()
  }
}


