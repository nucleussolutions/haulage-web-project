package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class QuoteItem {
    String name
    String desc
    Double rebatePercent

    static constraints = {
        name nullable: false
        desc nullable: false
        rebatePercent nullable: false
    }
}