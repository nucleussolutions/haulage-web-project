package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Job {

    Consignment consignment

    //haulier assign driver
    User driver

    static constraints = {
        consignment nullable: false
        driver nullable: false
    }

    static mapping = {
        autoTimestamp true
    }
}