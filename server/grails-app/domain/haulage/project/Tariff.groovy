package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Tariff {

    String desc
    Location location

    static constraints = {
        desc nullable: false
        location nullable: false
    }
}