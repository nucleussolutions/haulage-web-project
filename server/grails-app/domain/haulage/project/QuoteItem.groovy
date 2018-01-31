package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class QuoteItem {
  String name
  String desc
  Double rebatePercent

  static constraints = {
    name nullable: false
    desc nullable: false
    rebatePercent nullable: false
  }

  static mapping = {
//    table "`quote_item`"
    desc column: 'description'
  }
}