package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class HaulierInfo {
    String name
    Company company

    static constraints = {
        name nullable: false
        company nullable: false
    }
}