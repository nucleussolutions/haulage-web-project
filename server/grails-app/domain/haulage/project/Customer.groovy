package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
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
    email email: true, nullable: false
    phone nullable: false
    address1 nullable: false
    address2 nullable: false
    city nullable: false
    state nullable: false
    country nullable: false
    personInCharge nullable: false
    companyName nullable: false
  }
}
