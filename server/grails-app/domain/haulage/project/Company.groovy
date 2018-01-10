package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class Company {

  String name
  String registrationNo
  String address1
  String address2
  String city
  String state
  String country
  String officePhone
  String yardPhone
  String companyImgUrl
  String code
  String email

  static constraints = {
    name nullable: false, blank: false
    registrationNo nullable: false, blank: false
    address1 nullable: false, blank: false
    address2 nullable: false, blank: true
    city nullable: false, blank: false
    state nullable: false, blank: false
    country nullable: false, blank: false
    officePhone nullable: false, blank: false
    yardPhone nullable: false, blank: false
    companyImgUrl nullable: true
    code nullable: false, blank: false, unique: true
    email nullable: false, email: true
  }

  static searchable = true
}