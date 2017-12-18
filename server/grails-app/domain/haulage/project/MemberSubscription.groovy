package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class MemberSubscription {

  String userId
  Pricing pricing

  Boolean monthlyRecurring

  static constraints = {
    userId nullable: false
    pricing nullable: false
    monthlyRecurring nullable: false
  }

  static mapping = {
    autoTimestamp true
  }

  static searchable = true

}