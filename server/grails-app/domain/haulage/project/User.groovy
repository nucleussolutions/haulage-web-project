package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class User {
    String email
    String password
    //forwarder, haulier, driver, and potentially customers?

    String type

    ForwarderInfo forwarderInfo

    HaulierInfo haulierInfo

    DriverInfo driverInfo

    static constraints = {

    }
}