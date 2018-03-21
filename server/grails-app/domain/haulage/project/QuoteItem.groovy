package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
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