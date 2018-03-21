package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
class Consignment {

  String containerNo
  String name
  String size

  //OT,Flat Rack,Reefer,HQ,GP
  String type

  Date acceptTime

  //auto assign based on haulier code
  String consignmentCode

  String status = ConsignmentStatus.PENDING.id

  String taskType

  static belongsTo = [transportRequest: TransportRequest, job: Job]

  String signatureImgUrl

  String signedBy

  static constraints = {
    containerNo nullable: true //this will be updated by the driver
    name blank: false, nullable: false
    type nullable: false, inList: ConsignmentType.values()*.id
    acceptTime nullable: false
    consignmentCode nullable: false
    status nullable: false, inList: ConsignmentStatus.values()*.id
    taskType nullable: false, inList: ConsignmentTaskType.values()*.id
    transportRequest nullable: false
    job nullable: true
    signatureImgUrl nullable: true
    signedBy nullable: true
  }

  static searchable = {
    except = ['acceptTime']
  }
}