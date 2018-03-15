package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

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
  String postalCode

  static hasMany = [permissions: Permission]

  static constraints = {
    name nullable: false, blank: false
    registrationNo nullable: false, unique: true
    address1 nullable: false, blank: false
    address2 nullable: false, blank: true
    city nullable: false, blank: false
    state nullable: false, blank: false
    country nullable: false, blank: false
    officePhone nullable: false, blank: false
    yardPhone nullable: true
    companyImgUrl nullable: true
    code nullable: false, blank: false, unique: true
    email nullable: false, email: true
    postalCode nullable: true
    permissions nullable: true
  }

  static searchable = true

  static mapping = {
  }
}