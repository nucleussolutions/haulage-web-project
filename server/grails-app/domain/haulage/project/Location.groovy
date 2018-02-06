package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class Location {

  String name
  String address1
  String address2
  String city
  String state
  String country

  String mailingAddress
  String formattedAddress

  String postalCode

  Double lat
  Double lng

  //terminal, depot and customer location
  String type

  static constraints = {
    name blank: false, nullable: false
    address1 nullable: true
    address2 nullable: true
    mailingAddress nullable: true
    formattedAddress blank: false, nullable: false
    city blank: false, nullable: false
    state blank: false, nullable: false
    country blank: false, nullable: false
    lat nullable: true
    lng nullable: true
    type nullable: true
    postalCode nullable: false
  }

  static searchable = true
}