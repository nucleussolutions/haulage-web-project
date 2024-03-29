package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
class Job {

  static hasMany = [consignments: Consignment]

  //haulier assign driver
  String haulierId

  String driverId

  String status

  //upon updating the status as started, start date time will be recorded
  Date startDateTime

  //upon updating the status as complete, end date time will be recorded
  Date endDateTime

  Vehicle primeMover
  Vehicle trailer

  static constraints = {
    consignments nullable: false
    haulierId nullable: false
    driverId nullable: false
    status nullable: false, inList: JobStatus.values()*.id
    startDateTime nullable: true
    endDateTime nullable: true
    primeMover nullable: false
    trailer nullable: false
  }

  static mapping = {
    autoTimestamp true
  }

  static searchable = true
}