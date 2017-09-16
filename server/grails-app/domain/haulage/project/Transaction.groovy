package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Transaction {
    //belongs to which user, most likely haulier
    String status
    Subscription subscription

    static constraints = {
        status nullable: false
        subscription nullable: false
    }

    static mapping = {
        autoTimestamp true
    }
}