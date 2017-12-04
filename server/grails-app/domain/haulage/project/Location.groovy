package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Location {

    String name
    String address1
    String address2
    String city
    String state
    String country

    String mailingAddress
    String formattedAddress

    String postalCode

    Double lat
    Double lng

    //terminal, depot and customer location
    String type

    static constraints = {
        name blank: false, nullable: false
        address1 blank: false, nullable: false
        address2 blank: false, nullable: false
        mailingAddress nullable: true
        formattedAddress blank: false, nullable: false
        city blank: false, nullable: false
        state blank: false, nullable: false
        country blank: false, nullable: false
        lat nullable: true
        lng nullable: true
        type nullable: false
        postalCode nullable: false
    }
}