package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
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