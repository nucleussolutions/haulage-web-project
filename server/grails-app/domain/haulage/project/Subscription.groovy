package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Subscription {

    String userId
    Pricing pricing

    Boolean monthlyRecurring

    static constraints = {
        userId nullable: false
        pricing nullable: false
        monthlyRecurring nullable: false
    }
}