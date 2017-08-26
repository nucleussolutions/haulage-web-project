package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Consignment {

    String containerNo
    String name
    String size
    String type
    Location pickupLadenDropoff
    Date acceptTime

    //auto assign based on haulier code
    String consignmentCode

    static belongsTo = [TransportRequest]

    static constraints = {
        containerNo blank: false, nullable: false
        name blank: false, nullable: false
        type blank: false, nullable: false
        pickupLadenDropoff nullable: false
        acceptTime nullable: false
        consignmentCode nullable: false
    }
}