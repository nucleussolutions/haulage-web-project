package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.rest.*
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
@ToString(includeNames = true, includePackage = false)
class TransportRequest {

  //uncouple import, direct import, uncouple export or direct export
  String type

  //trailer or s/loader
  String equipment

  Location terminal
  Date vesselEtaOrEtd
  String vesselName
  String voyageNo

  String portOfLoading

  String portOfDischarge

  String shippingAgent
  String forwardingAgent

  String operatorCode

  Double grossWeight
  Boolean overDimension
  Double temperature
  //true false
  Boolean hazardous

  //product name/description
  String productDesc

  //or consignee
  String shipper
  String orderRemarks
  String containerRemarks
  String dgCode
  String kOnekEightFormImgUrl
  String gatePassImgUrl
  String bookingConfirmationImgUrl
  String cmoImgUrl

  //create consignment in the rft can only be done by the haulier, not the forwarder
  static hasMany = [consignments: Consignment]

  Customer customer

  String status = RFTStatus.PENDING

  Location pickupOrDropoffEmptyDepoh

  static belongsTo = [forwarderCompany: Company, haulierCompany: Company]

  //to record who issued the rft
  String forwarderId


  //to record who approved it
  String haulierId

  //can do back to back shipment, somehow needs to generify the name of this variable
  Boolean backToBack

  //can do open cargo boat/ or local term as tongkang, somehow needs to generify the name of this variable
  Boolean openCargoBoat

  static constraints = {
    type nullable: false, inList: RFTType.values()*.id
    equipment nullable: true
    terminal nullable: false
    vesselName blank: false, nullable: false
    voyageNo blank: false, nullable: false
    vesselEtaOrEtd nullable: false
    shippingAgent nullable: false
    forwardingAgent nullable: false
    operatorCode blank: true
    hazardous nullable: false

    grossWeight nullable: false
    overDimension nullable: false
    temperature nullable: true
    productDesc nullable: false
    shipper nullable: false
    orderRemarks nullable: true
    containerRemarks nullable: true
    dgCode nullable: false

    kOnekEightFormImgUrl nullable: true
    gatePassImgUrl nullable: true
    bookingConfirmationImgUrl nullable: true
    cmoImgUrl nullable: true
    consignments nullable: false
    forwarderId nullable: false
    haulierId nullable: true

    forwarderCompany nullable: false
    haulierCompany nullable: false

    customer nullable: false
    status nullable: false, inList: RFTStatus.values()*.id

    portOfLoading nullable: false
    portOfDischarge nullable: false

    pickupOrDropoffEmptyDepoh nullable: false

    backToBack nullable: false
    openCargoBoat nullable: false
  }

  // static embedded = ['customer']

  static mapping = {
    autoTimestamp true
  }

  static searchable = {
    except = ['customer']
  }
}