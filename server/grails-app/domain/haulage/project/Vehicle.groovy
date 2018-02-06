package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class Vehicle {

    String internalNumber

    String registrationNumber

    //prime mover or trailer
    String type

    //prime mover type or trailer type
    String subType

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
        otherInfo blank: true, nullable: true
        roadTaxRenewalDate nullable: false
        licenseExpiryDate nullable: false
        puspakomExpiryDate nullable: false
        model nullable: false
        licensePlateNumber nullable: false
        netWeight nullable: false
        spadPermitExpiryDate nullable: false
        insuranceExpiryDate nullable: false
        userId nullable: false
        subType nullable: true
    }

    static mapping = {
        autoTimestamp true
    }

    static searchable = true
}