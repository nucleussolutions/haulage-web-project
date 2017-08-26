package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class User {

    String name
    String email
    String password
    String phone
    //forwarder, haulier, driver, and potentially customers?
    String type

    String icNumber
    String frontIcUrl
    String backIcUrl

    String licenseNumber
    Date licenseExpiry

    String haulierCode



}