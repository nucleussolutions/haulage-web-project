package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Quote {

  String haulierId

  String forwarderId

  String status

  static embedded = ['items', 'terms']

  static hasMany = [items: QuoteItem, terms: TermAndCondition]

  //this will be auto generated by the system according to our system's designated formatting
  String code

  //todo alerts to renew the quotation is valid because this enables hauliers to call the forwarder
  Date endDate

  static constraints = {
    haulierId nullable: false
    forwarderId nullable: false
    status nullable: false, inList: QuotationStatus.values()*.id
    code nullable: false
    terms nullable: false
    items nullable: false
    endDate nullable: false
  }


  static mapping = {
    autoTimestamp true
  }
}

class QuoteItem {
  String name
  String desc
  Double rebatePercent
}

class TermAndCondition {
  String desc
}