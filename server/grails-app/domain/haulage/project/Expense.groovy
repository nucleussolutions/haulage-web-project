package haulage.project


import grails.rest.*
import groovy.transform.ToString

@Resource(readOnly = false, formats = ['json', 'xml'])
@ToString(includeNames = true, includePackage = false)
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