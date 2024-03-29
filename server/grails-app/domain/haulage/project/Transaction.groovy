package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
class Transaction {
  //belongs to which user, most likely haulier
  String status
  MemberSubscription subscription

  String code

  static constraints = {
    status nullable: false, inList: TransactionStatus.values()*.id
    subscription nullable: false
    code nullable: true
  }

  static mapping = {
    autoTimestamp true
  }


}