package haulage.angular.profile

import grails.converters.JSON
import haulage.project.Company
import haulage.project.Consignment
import haulage.project.ConsignmentTaskType
import haulage.project.ConsignmentType
import haulage.project.Customer
import haulage.project.ForwarderInfo
import haulage.project.HaulierInfo
import haulage.project.Location
import haulage.project.Permission
import haulage.project.Pricing
import haulage.project.QuotationStatus
import haulage.project.Quote
import haulage.project.QuoteItem
import haulage.project.RFTStatus
import haulage.project.RFTType
import haulage.project.TermAndCondition
import haulage.project.TransportRequest
import haulage.project.Vehicle

class BootStrap {

    def init = { servletContext ->
        def company1 = new Company(country: 'Malaysia', address1: 'address1', address2: 'address2', city: 'oeopwqeiwqpe', state: 'uqwiewqeowque', code: 'AGL', name: 'AGL Logistics', officePhone: '1203123921-3', yardPhone: '120312-309', companyImgUrl: 'asdsdklsdk;las', registrationNo: '12932813901283')

        def company2 = new Company(country: 'Malaysia', address1: 'address1', address2: 'address2', city: 'oeopwqeiwqpe', state: 'uqwiewqeowque', code: 'BGL', name: 'AGL Logistics', officePhone: '1203123921-3', yardPhone: '120312-309', companyImgUrl: 'asdsdklsdk;las', registrationNo: '12932813901283')

        def haulierInfo1 = new HaulierInfo(userId: '12-03219-3123', company: company1, name: 'qwpeiwepwqiew').save(flush: true)


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

        JSON.registerObjectMarshaller(Consignment){
            def output = [:]
            output['id'] = it.id
            output['containerNo'] = it.containerNo
            output['name'] = it.name
            output['size'] = it.size
            output['type'] = it.type
            output['acceptTime'] = it.acceptTime
            output['consignmentCode'] = it.consignmentCode
            output['status'] = it.status
            output['taskType'] = it.taskType
            return output
        }



        def consignments = []

        def pickupLadenDropOff = new Location(name: 'asdasdalsdjk', address1: 'asdasdsad', address2: 'asdasdasd', lat: 3.12312323, lng: 31232139830, type: 'depot', city: 'asdasdjasld', state: 'asldskjdlkasd', country: 'sadsadkjl').save(flush: true)

        consignments.add new Consignment(name: 'consignment 1', type: ConsignmentType.FLAT_RACK.id, acceptTime: new Date(), taskType: ConsignmentTaskType.DROP_OFF.id, consignmentCode: '12321312', ladenOrDropOffLocation: pickupLadenDropOff, pickupLocation: pickupLadenDropOff, containerNo: '1231232', size: '232323')
        consignments.add new Consignment(name: 'consignment 2', type: ConsignmentType.GP.id, acceptTime: new Date(), taskType: ConsignmentTaskType.DROP_OFF.id, consignmentCode: '213123', ladenOrDropOffLocation: pickupLadenDropOff, pickupLocation: pickupLadenDropOff, containerNo: '21312312', size: '232323')
        consignments.add new Consignment(name: 'consignment 3', type: ConsignmentType.HQ.id, acceptTime: new Date(), taskType: ConsignmentTaskType.DROP_OFF.id, consignmentCode: '123123', ladenOrDropOffLocation: pickupLadenDropOff, pickupLocation: pickupLadenDropOff, containerNo: '12321313', size: '123123')
        consignments.add new Consignment(name: 'consignment 4', type: ConsignmentType.OT.id, acceptTime: new Date(), taskType: ConsignmentTaskType.DROP_OFF.id, consignmentCode: '1231232', ladenOrDropOffLocation: pickupLadenDropOff, pickupLocation: pickupLadenDropOff, containerNo: '1230281312', size: '123123')

        def customer = new Customer(companyName: 'asldjasdkdlaskjd', personInCharge: 'asdasdasdl', phone: '123123980132', address1: 'asdasdlkj asdlkj', address2: 'asdasdasd', city: 'asdsdasd', state: 'asdasdad', country: 'asdadsad').save(flush: true)

        def testRFT = new TransportRequest()
        testRFT.type = RFTType.DIRECT_IMPORT.id
        testRFT.consignments = consignments
        testRFT.status = RFTStatus.PENDING.id
        testRFT.shippingAgent = 'asldsadjsdl'
        testRFT.forwardingAgent = 'asdjsadlsadkdljk'
        testRFT.hazardous = Boolean.TRUE
        testRFT.dgCode = '123912-3'
        testRFT.vesselEtaOrEtd = new Date()
        testRFT.terminal = new Location(name: 'aksdsldjasd', address1: 'asdldsjasdl', address2: 'asdsadjlsadlksd', city: 'asdsdasd', state: 'asdskjd', country: 'askdjsldasd', type: 'depot')
        testRFT.temperature = 32.12
        testRFT.containerRemarks = 'asldsadjldsjasd'
        testRFT.orderRemarks = 'asdasdlkjasd'
        testRFT.kOnekEightFormImgUrl = 'http://www.google.com'
        testRFT.gatePassImgUrl = 'http://www.google.com'
        testRFT.bookingRefNo = 'asdjasldlsad'
        testRFT.customer = customer
        testRFT.overDimension = true
        testRFT.operatorCode = '12312308'
        testRFT.productDesc = '12p3128321093 aslkdjaskd'
        testRFT.grossWeight = 32.2
        testRFT.otherRefNo = '12321309128390'
        testRFT.shipper = 'asdadasd'
        testRFT.forwarderId = 'qwowqeiowqeiq'
        testRFT.containerVolume = '12321321038'
        testRFT.voyageNo = '123213123'
        testRFT.vesselName = '1232131208'
        testRFT.portOfLoading = 'asdasdadasd'
        testRFT.portOfDischarge = 'asdasdad'
        testRFT.pickupOrDropoffEmptyDepoh = new Location(name: 'aksdsldjasd', address1: 'asdldsjasdl', address2: 'asdsadjlsadlksd', city: 'asdsdasd', state: 'asdskjd', country: 'askdjsldasd', type: 'depot')
        testRFT.backToBack = true
        testRFT.openCargoBoat = true

        testRFT.save(flush: true, failOnError: true)

        def testRFT2 = new TransportRequest()
        testRFT2.consignments = consignments
        testRFT2.type = RFTType.DIRECT_IMPORT.id
        testRFT2.status = RFTStatus.PENDING.id
        testRFT2.shippingAgent = 'qowuewqewqoewe'
        testRFT2.forwardingAgent = 'asldkasd;askds;'
        testRFT2.hazardous = Boolean.TRUE
        testRFT2.dgCode = '123912-3'
        testRFT2.vesselEtaOrEtd = new Date()
        testRFT2.terminal = new Location(name: 'aksdsldjasd', address1: 'asdldsjasdl', address2: 'asdsadjlsadlksd', city: 'asdsdasd', state: 'asdskjd', country: 'askdjsldasd', type: 'depot')
        testRFT2.temperature = 32.12
        testRFT2.bookingRefNo = 'asdjasldlsad'
        testRFT2.customer = customer
        testRFT2.overDimension = false
        testRFT2.operatorCode = '123021380123'
        testRFT2.productDesc = '12p3128321093 aslkdjaskd'
        testRFT2.grossWeight = 32.2
        testRFT2.otherRefNo = '12321309128390'
        testRFT2.shipper = 'asdadasd'
        testRFT2.forwarderId = 'qwowqeiowqeiq'
        testRFT2.containerVolume = '12321321038'
        testRFT2.kOnekEightFormImgUrl = 'http://www.google.com'
        testRFT2.gatePassImgUrl = 'http://www.google.com'
        testRFT2.voyageNo = '123213123'
        testRFT2.vesselName = '1232131208'
        testRFT2.portOfLoading = 'asdasdadasd'
        testRFT2.portOfDischarge = 'asdasdad'
        testRFT2.pickupOrDropoffEmptyDepoh = new Location(name: 'aksdsldjasd', address1: 'asdldsjasdl', address2: 'asdsadjlsadlksd', city: 'asdsdasd', state: 'asdskjd', country: 'askdjsldasd', type: 'depot')
        testRFT2.backToBack = true
        testRFT2.openCargoBoat = true

        testRFT2.save(flush: true, failOnError: true)


        def forwarderPermission = new Permission(email: 'kevin@kevin.com', userId: 'GWQOYWnAxxVPtnUODGCWe8cXllK2', authority: 'Manager', grantedBy: 'OFrQip85jPRRmXkBR544ROU51y93').save(flush: true, failOnError: true)


        def forwarderInfo1 = new ForwarderInfo(userId: 'GWQOYWnAxxVPtnUODGCWe8cXllK2', company: company2, name: 'asdl;asdkd;').save(flush: true, failOnError: true)



        def quoteItem1 = new QuoteItem(desc: 'desc 1', rebatePercent: 20, name: 'quote item 1')
        def quoteItem2 = new QuoteItem(desc: 'desc 2', rebatePercent: 20, name: 'quote item 1')


        def term1 = new TermAndCondition(desc: 'desc 1')
        def term2 = new TermAndCondition(desc: 'desc 1')


        def quote = new Quote(forwarderId: '1123083', haulierId: '123213210', status: QuotationStatus.PENDING_ACCEPTANCE.id, items: [quoteItem1, quoteItem2], terms: [term1, term2], code: '12312321', endDate: new Date()).save(flush: true, failOnError: true)

    }
    def destroy = {
    }
}
