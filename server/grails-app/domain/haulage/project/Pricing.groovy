package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class Pricing {

  BigDecimal price
  BigDecimal pricePerMove
  Integer minPrimeMover
  Integer maxPrimeMover
  Integer discountPercent = 0

  Boolean published = false

  static constraints = {
    discountPercent range: 0..99
    price nullable: false
    pricePerMove nullable: false
    minPrimeMover nullable: true
    maxPrimeMover nullable: true
    published nullable: false
  }

  static mapping = {
    autoTimestamp true
  }
}