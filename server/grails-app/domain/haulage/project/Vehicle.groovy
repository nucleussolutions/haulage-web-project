package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Vehicle {

    String registrationNumber

    //prime mover or trailer
    String type

    //apparently there would be notifications on renewal dates sent to the hauliers
    Date roadTaxRenewalDate

    String otherInfo

    String model

    static constraints = {
        registrationNumber blank: false, nullable: false
        type nullable: false
        otherInfo blank: true
        roadTaxRenewalDate nullable: false
        model nullable: false
    }

    static mapping = {
        autoTimestamp true
    }
}