package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
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

    static belongsTo = [TransportRequest]

    static constraints = {
        containerNo blank: false, nullable: false
        name blank: false, nullable: false
        type nullable: false, inList: ConsignmentType.values()*.id
        acceptTime nullable: false
        consignmentCode nullable: false
        status nullable: false, inList: ConsignmentStatus.values()*.id
        taskType nullable:false, inList: ConsignmentTaskType.values()*.id
    }
}