package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class Customer {

  String companyName
  String personInCharge
  String phone
  String address1
  String address2
  String city
  String state
  String country
  String email

  static constraints = {
    email email: true
  }
}
