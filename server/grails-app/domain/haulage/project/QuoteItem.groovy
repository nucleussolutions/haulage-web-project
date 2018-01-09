package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic
class QuoteItem {
  String name
  String desc
  Double rebatePercent

  static constraints = {
    name nullable: false
    desc nullable: false
    rebatePercent nullable: false
  }
}