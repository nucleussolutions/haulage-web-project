package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class DriverInfo {

    //belongs to which driver
    String userId

    String name
    String icNumber
    String passportNumber
    String icFrontImgUrl
    String icBackImgUrl
    String passportImgUrl
    String phone
    String licenseClass
    Date licenseExpiry

    String westPortPassNo
    Date westPortPassExpiry
    String northPortPassNo
    Date northPortPassExpiry

    String emergencyContactName
    String emergencyContactPhone

    String address1
    String address2
    String city
    String state
    String country

    String haulierId

    static constraints = {
        name nullable: false, blank: false
        //but the front end will be implemented as required
        icNumber nullable: false, blank: true

        //but the front end will be implemented as required
        passportNumber nullable: false, blank: true

        phone nullable: false, blank: false
        licenseClass nullable: false, blank: false
        licenseExpiry nullable: false
        westPortPassNo nullable: false, blank: false
        northPortPassNo nullable: false, blank: false

        westPortPassExpiry nullable: false
        northPortPassExpiry nullable: false
        emergencyContactName nullable: false
        emergencyContactPhone nullable: false

        //photo upload as required field in the frontend
        icFrontImgUrl nullable: false, blank: true
        icBackImgUrl nullable: false, blank: true

        passportImgUrl nullable: false, blank: true

        address1 blank: true
        address2 blank: true
        city blank: true
        state blank: true
        country blank: true
        userId nullable: false

        //can belong to a haulier, or just none which could mean freelance
        haulierId blank: true
    }
}