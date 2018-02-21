package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class ExpenseItem {
  String merchantName

  String category

  String comment

  Date txDate

  String receiptUrl

  static belongsTo = [Expense]

  static constraints = {
    category nullable: false
    comment nullable: true
    txDate nullable: false
    merchantName nullable: false
    receiptUrl nullable: false
  }
}