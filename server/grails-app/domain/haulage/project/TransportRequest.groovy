package haulage.project


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class TransportRequest {

    String containerVolume

    //normal import, direct import, normal export or direct export
    String type

    //trailer or s/loader
    String equipment

    String bookingRefNo
    String otherRefNo

    Location terminal
    Date vesselEtaOrEtd
    String vesselName
    String voyageNo

    //mundra/port klang
    Location polPod

    String shippingAgent
    String forwardingAgent

    String operatorCode

    Double grossWeight
    Boolean overDimension
    Double temperature
    //true false
    Boolean hazardous

    String productDesc
    String shipper
    String orderRemarks
    String containerRemarks
    String dgCode
    String kOnekEightFormImgUrl
    String gatePassImgUrl
    String bookingConfirmationImgUrl
    String cmoImgUrl

    static hasMany = [consignments: Consignment]

    //forwarder id or in the rft form's case it's requestor
    String forwarderId

    Customer customer

    static constraints = {
        containerVolume blank: false, nullable: false
        type nullable: false, blank: false
        equipment nullable: true
        bookingRefNo blank: true
        otherRefNo blank: true
        terminal nullable: false
        vesselName blank: false, nullable: false
        voyageNo blank: false, nullable: false
        vesselEtaOrEtd nullable: false
        polPod nullable: false
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
        cmoImgUrl nullable: false
        consignments nullable: false
        forwarderId nullable: false
        customer nullable: false
    }

    static embedded = ['customer']

    static mapping = {
        autoTimestamp true
    }
}

class Customer {
    String companyName
    String personInCharge
    String phone
    String address1
    String address2
    String city
    String state
    String country
}