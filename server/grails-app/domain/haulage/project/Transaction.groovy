package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.TypeCheckingMode

@Resource(readOnly = false, formats = ['json', 'xml'])
@GrailsCompileStatic(TypeCheckingMode.SKIP)
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