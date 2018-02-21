package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Expense {

  Job job

  static hasMany = [items: ExpenseItem]

  static constraints = {
    job nullable: false
    items nullable: false
  }

  static mapping = {
    autoTimestamp true
  }
}