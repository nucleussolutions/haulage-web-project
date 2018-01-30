package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class MemberSubscription {

  String userId
  Pricing pricing

  Boolean monthlyRecurring = false

  static constraints = {
    userId nullable: false
    pricing nullable: false
    monthlyRecurring nullable: false
  }

  static mapping = {
    autoTimestamp true
  }

  static searchable = true

}