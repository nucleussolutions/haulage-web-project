package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic
class Job {

  static hasMany = [consignments: Consignment]

  //haulier assign driver
  String haulierId

  String driverId

  JobStatus status

  //upon updating the status as started, start date time will be recorded
  Date startDateTime

  //upon updating the status as complete, end date time will be recorded
  Date endDateTime

  static constraints = {
    consignments nullable: false
    haulierId nullable: false
    driverId nullable: false
    status nullable: false, inList: JobStatus.values()*.id
    startDateTime nullable: true
    endDateTime nullable: true
  }

  static mapping = {
    autoTimestamp true
  }

  static searchable = true
}