package haulage.project


import grails.rest.*
import grails.converters.*

class ExpenseController extends RestfulController {

  static responseFormats = ['json', 'xml']

  ExpenseController() {
    super(Expense)
  }

}
