package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
class Tariff {

  String area
  String desc
  Location location
  String zone
  BigDecimal tollCharges
  BigDecimal fafPercent
  BigDecimal haulageCharges

  static constraints = {
    desc nullable: false
    location nullable: true
    zone nullable: false
    tollCharges nullable: false
    haulageCharges nullable: false
    fafPercent nullable: false
    area nullable: false
  }

  static searchable = {
    location geoPoint: true
    except = ['haulageCharges', 'fafPercent', 'tollCharges']
  }

  static mapping = {
//    table "`tariff`"
//    version false
//    id column: 'tariff_id'
    desc column: 'description'
//    location column: 'location'
//    zone column: 'zone'
//    tollCharges column: 'toll_charges'
//    fafPercent column: 'faf_percent'
//    haulageCharges column: 'haulage_charges'
  }
}