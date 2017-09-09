package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Job {

    Consignment consignment

    //haulier assign driver
    String haulierId

    String driverId

    static constraints = {
        consignment nullable: false
        haulierId nullable: false
        driverId nullable: false
    }

    static mapping = {
        autoTimestamp true
    }
}