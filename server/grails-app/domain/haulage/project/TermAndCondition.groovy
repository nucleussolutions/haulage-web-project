package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class TermAndCondition {

    String desc

    static constraints = {
        desc nullable: false
    }
}