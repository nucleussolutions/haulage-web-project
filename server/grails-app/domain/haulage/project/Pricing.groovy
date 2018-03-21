package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
class Pricing {

  String name
  String description

  BigDecimal price
  BigDecimal pricePerMove
  Integer minPrimeMover
  Integer maxPrimeMover
  Integer discountPercent = 0

  Boolean published = false

  static constraints = {
    discountPercent range: 0..99, nullable: false
    price nullable: false
    pricePerMove nullable: false
    minPrimeMover nullable: true
    maxPrimeMover nullable: true
    published nullable: false
    description nullable: false
    name nullable: false
  }

  static mapping = {
    autoTimestamp true
  }
}