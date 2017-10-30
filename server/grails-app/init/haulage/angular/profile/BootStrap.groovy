package haulage.angular.profile

import grails.converters.JSON
import haulage.project.Company
import haulage.project.Consignment
import haulage.project.ConsignmentType
import haulage.project.ForwarderInfo
import haulage.project.HaulierInfo
import haulage.project.Location
import haulage.project.Permission
import haulage.project.Pricing
import haulage.project.RFTStatus
import haulage.project.RFTType
import haulage.project.TransportRequest
import haulage.project.Vehicle

class BootStrap {

    def init = { servletContext ->
        def company1 = new Company(country: 'Malaysia', address1: 'address1', address2: 'address2', city: 'oeopwqeiwqpe', state: 'uqwiewqeowque', code: 'AGL', name: 'AGL Logistics', officePhone: '1203123921-3', yardPhone: '120312-309', companyImgUrl: 'asdsdklsdk;las', registrationNo: '12932813901283')

        def company2 = new Company(country: 'Malaysia', address1: 'address1', address2: 'address2', city: 'oeopwqeiwqpe', state: 'uqwiewqeowque', code: 'BGL', name: 'AGL Logistics', officePhone: '1203123921-3', yardPhone: '120312-309', companyImgUrl: 'asdsdklsdk;las', registrationNo: '12932813901283')

        def haulierInfo1 = new HaulierInfo(userId: '12-03219-3123', company: company1, name: 'qwpeiwepwqiew').save(flush: true)

        def forwarderInfo1 = new ForwarderInfo(userId: '12083123902-3', company: company2, name: 'asdl;asdkd;').save(flush: true)

        def location1 = new Location(name: 'North Port', city: 'petaling jaya', state: 'petaling jaya', country: 'malaysia', type: 'customer location', address1: 'ajsdlasdj', address2: 'aksdjsdjsald').save(flush: true)
        def location2 = new Location(name: 'North Port', city: 'petaling jaya', state: 'petaling jaya', country: 'malaysia', type: 'customer location', address1: 'jasdlkadjlas', address2: 'akjsdlasdjslad').save(flush: true)

        def primeMover1 = new Vehicle(type: 'primeMover', userId: '1231203901283', insuranceExpiryDate: new Date(), registrationNumber: '1290831208312').save(flush:true)

        def trailer1 = new Vehicle(type: 'trailer', userId: '1290312893128', registrationNumber: '128391238012', insuranceExpiryDate: new Date(), spadPermitExpiryDate: new Date(), puspakomExpiryDate: new Date()).save(flush: true)

        def primeMover2 = new Vehicle(type: 'primeMover', userId: '1209381203821', insuranceExpiryDate: new Date(), roadTaxRenewalDate: new Date(), puspakomExpiryDate: new Date(), otherInfo: '', model: 'asdasdasd', registrationNumber: 'adsdasd', spadPermitExpiryDate: new Date(), netWeight: 40, internalNumber: '231231232', licensePlateNumber: 'asdasdasd', licenseExpiryDate: new Date()).save(flush: true, failOnError: true)

        def trailer2 = new Vehicle(type: 'trailer', userId: '12093281321', insuranceExpiryDate: new Date(), roadTaxRenewalDate: new Date(), puspakomExpiryDate: new Date(), otherInfo: '', model: 'asdklasdklasd', registrationNumber: 'asdasdasd', spadPermitExpiryDate: new Date(), netWeight: 40, internalNumber: '21312312', licensePlateNumber: '123123123', licenseExpiryDate: new Date()).save(flush: true)

        def pricing1 = new Pricing(minPrimeMover: 1, maxPrimeMover: 5, price: 120.1, pricePerMove: 20, discountPercent: 0).save(flush: true)
        def pricing2 = new Pricing(minPrimeMover: 1, maxPrimeMover: 5, price: 120.1, pricePerMove: 20, discountPercent: 0).save(flush: true)
        def pricing3 = new Pricing(minPrimeMover: 1, maxPrimeMover: 5, price: 120.1, pricePerMove: 20, discountPercent: 0).save(flush: true)
        def pricing4 = new Pricing(minPrimeMover: 1, maxPrimeMover: 5, price: 120.1, pricePerMove: 20, discountPercent: 0).save(flush: true)

        def kevinAdminPermission = new Permission(email: 'kevintanhongann@gmail.com', userId: 'Wcd1ixuFLLStcm0GN4YylfU1nNx2', authority: 'Super Admin', grantedBy: 'OFrQip85jPRRmXkBR544ROU51y93').save(flush: true)
        def jordanAdminPermission = new Permission(email: 'jordan@nucleus.my', userId: 'OFrQip85jPRRmXkBR544ROU51y93', authority: 'Super Admin', grantedBy: 'Wcd1ixuFLLStcm0GN4YylfU1nNx2').save(flush: true)

        def interceptorPermission = new Permission(email: 'interceptorz3r0@gmail.com', userId:'1rCeH7yNVzX8OB7dMyFcURPkwi33', authority: 'Admin', grantedBy: 'OFrQip85jPRRmXkBR544ROU51y93').save(flush: true)

        JSON.registerObjectMarshaller(Permission){
            def output = [:]
            output['userId'] = it.userId
            output['authority'] = it.authority
            output['email'] = it.email
            return output
        }

        def consignments = []

        def pickupLadenDropOff = new Location(name: 'asdasdalsdjk', address1: 'asdasdsad', address2: 'asdasdasd', lat: 3.12312323, lng: 31232139830, type: 'depot').save(flush: true)

        consignments.add new Consignment(name: 'consignment 1', type: ConsignmentType.FLAT_RACK, acceptTime: new Date())
        consignments.add new Consignment(name: 'consignment 2', type: ConsignmentType.GP, acceptTime: new Date())
        consignments.add new Consignment(name: 'consignment 3', type: ConsignmentType.HQ, acceptTime: new Date())
        consignments.add new Consignment(name: 'consignment 4', type: ConsignmentType.OT, acceptTime: new Date())

        def testRFT = new TransportRequest()
        testRFT.type = RFTType.DIRECT_IMPORT
        testRFT.consignments = consignments
        testRFT.status = RFTStatus.PENDING
        testRFT.shippingAgent = 'asldsadjsdl'
        testRFT.forwardingAgent = 'asdjsadlsadkdljk'
        testRFT.hazardous = Boolean.TRUE
        testRFT.dgCode = '123912-3'
        testRFT.vesselEtaOrEtd = new Date()
        testRFT.terminal = new Location(name: 'aksdsldjasd', address1: 'asdldsjasdl', address2: 'asdsadjlsadlksd', city: 'asdsdasd', state: 'asdskjd', country: 'askdjsldasd')
        testRFT.temperature = 32.12
        testRFT.containerRemarks = 'asldsadjldsjasd'
        testRFT.orderRemarks = 'asdasdlkjasd'
        testRFT.kOnekEightFormImgUrl = 'http://www.google.com'
        testRFT.gatePassImgUrl = 'http://www.google.com'

        testRFT.save(flush: true, failOnError: true)

        def testRFT2 = new TransportRequest()
        testRFT2.type = RFTType.NORMAL_IMPORT
        testRFT2.status = RFTStatus.PENDING
        testRFT2.shippingAgent = 'qowuewqewqoewe'
        testRFT2.forwardingAgent = 'asldkasd;askds;'
        testRFT2.hazardous = Boolean.TRUE
        testRFT2.dgCode = '123912-3'
        testRFT2.vesselEtaOrEtd = new Date()
        testRFT2.terminal = new Location(name: 'aksdsldjasd', address1: 'asdldsjasdl', address2: 'asdsadjlsadlksd', city: 'asdsdasd', state: 'asdskjd', country: 'askdjsldasd')
        testRFT2.temperature = 32.12


        testRFT2.save(flush: true, failOnError: true)


    }
    def destroy = {
    }
}
