package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class HaulierInfo {
    String name
    Company company

    Fleet fleet

    static constraints = {
        name nullable: false
        company nullable: true
        fleet nullable: true
    }
}