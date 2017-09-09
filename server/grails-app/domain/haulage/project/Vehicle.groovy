package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Vehicle {

    String internalNumber

    String registrationNumber

    //prime mover or trailer
    String type

    //apparently there would be notifications on renewal dates sent to the hauliers
    Date roadTaxRenewalDate

    Date licenseExpiryDate

    Date spadPermitExpiryDate

    Date insuranceExpiryDate

    Date puspakomExpiryDate

    String otherInfo

    String model

    String licensePlateNumber

    Integer netWeight

    //belongs to haulier, but first check role
    String userId

    static constraints = {
        internalNumber blank: false, nullable: false
        registrationNumber blank: false, nullable: false
        type nullable: false
        otherInfo blank: true
        roadTaxRenewalDate nullable: false
        licenseExpiryDate nullable: false
        puspakomExpiryDate nullable: false
        model nullable: false
        licensePlateNumber nullable: false
        netWeight nullable: false
        spadPermitExpiryDate nullable: false
        insuranceExpiryDate nullable: false
        userId nullable: false
    }

    static mapping = {
        autoTimestamp true
    }
}