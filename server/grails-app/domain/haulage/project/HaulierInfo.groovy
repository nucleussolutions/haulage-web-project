package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class HaulierInfo {

    String userId
    String name
    Company company

    static constraints = {
        name nullable: false
        company nullable: false
        userId nullable: false, unique: true
    }
}