package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Quotation {

  String haulierId

  String forwarderId

  Double rebateAmount

  //alerts to renew the quotation is valid because this enables hauliers to call the forwarder

  static constraints = {
    haulierId nullable: false
    forwarderId nullable: false
    rebateAmount nullable: false
  }

  static mapping = {
    autoTimestamp true
  }
}