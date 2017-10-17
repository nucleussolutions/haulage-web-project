package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Job {

    static hasMany = [consignments: Consignment]

    //haulier assign driver
    String haulierId

    String driverId

    String status

    static constraints = {
        consignments nullable: false
        haulierId nullable: false
        driverId nullable: false
        status nullable: false
    }

    static mapping = {
        autoTimestamp true
    }
}