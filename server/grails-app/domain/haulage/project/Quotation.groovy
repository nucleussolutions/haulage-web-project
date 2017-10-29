package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Quotation {

  String haulierId

  String forwarderId

  Double rebatePercent

  QuotationStatus status = QuotationStatus.PENDING_ACCEPTANCE

  String termsAndConditions

  //alerts to renew the quotation is valid because this enables hauliers to call the forwarder

  static constraints = {
    haulierId nullable: false
    forwarderId nullable: false
    rebatePercent nullable: false
    status nullable: false
    termsAndConditions nullable: false
  }

  static mapping = {
    autoTimestamp true
  }
}