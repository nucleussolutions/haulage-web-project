package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Transaction {
    //belongs to which user, most likely haulier
    TransactionStatus status
    MemberSubscription subscription

    static constraints = {
        status nullable: false, inList: TransactionStatus.values()*.id
        subscription nullable: false
    }

    static mapping = {
        autoTimestamp true
    }
}