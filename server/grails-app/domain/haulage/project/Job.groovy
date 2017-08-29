package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Job {

    Consignment consignment

    //haulier assign driver
    static belongsTo = [User]

    static constraints = {
        consignment nullable: false
    }

    static mapping = {
        autoTimestamp true
    }
}