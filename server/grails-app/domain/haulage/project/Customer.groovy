package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Customer {

    String companyName
    String personInCharge
    String phone
    String address1
    String address2
    String city
    String state
    String country

    static constraints = {
        companyName nullable: false
        personInCharge nullable: false
        phone nullable: false
        address1 nullable: false
        address2 nullable: false
        city nullable: false
        state nullable: false
        country nullable: false
    }
}