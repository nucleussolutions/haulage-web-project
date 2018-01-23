package haulage.project

import com.amazonaws.services.s3.model.CannedAccessControlList
import grails.compiler.GrailsCompileStatic
import grails.rest.RestfulController
import groovy.transform.TypeCheckingMode
import org.apache.commons.io.FileUtils
import org.springframework.http.HttpStatus

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class TransportRequestController extends RestfulController<TransportRequest> {
  static responseFormats = ['json', 'xml']

//  AmazonS3Service amazonS3Service
  def haulageBucketService
  def asyncTransportRequestService

// We need to provide the constructors, so the
  // Resource transformation works.
  TransportRequestController(Class<TransportRequest> domainClass) {
    this(domainClass, false)
  }

  TransportRequestController(Class<TransportRequest> domainClass, boolean readOnly) {
    super(domainClass, readOnly)
  }

  @Override
  def save() {

    println 'custom save executing'

    if (!amazonS3Service.listBucketNames().contains('haulage-dev')) {
      respond status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'storage folder not found'
    } else {
      byte[] kOnekEightBytes = request.JSON.kOnekEightBase64String.decodeBase64()
      byte[] bookingConfirmationBytes = request.JSON.bookingConfirmationBase64String.decodeBase64()
      byte[] cmoBytes = request.JSON.cmoBase64String.decodeBase64()
      byte[] gatePassBytes = request.JSON.gatePassBase64String.decodeBase64()

      def transportRequest = new TransportRequest()



      transportRequest.vesselName = request.JSON.vesselName
      transportRequest.vesselEtaOrEtd = request.JSON.vesselEtaOrEtd
      transportRequest.forwarderId = request.JSON.forwarderId
      transportRequest.haulierId = request.JSON.haulierId
      transportRequest.status = RFTStatus.PENDING
      transportRequest.backToBack = request.JSON.backToBack
      transportRequest.overDimension = request.JSON.overDimension
      transportRequest.forwardingAgent = request.JSON.forwardingAgent
      transportRequest.hazardous = request.JSON.hazardous
      transportRequest.equipment = request.JSON.equipment
      transportRequest.containerRemarks = request.JSON.containerRemarks
      transportRequest.portOfDischarge = request.JSON.portOfLoading
      transportRequest.portOfDischarge = request.JSON.portOfDischarge
      transportRequest.shipper = request.JSON.shipper
      transportRequest.shippingAgent = request.JSON.shippingAgent

      def customer = new Customer(request.JSON.customer)
      transportRequest.customer = customer

      if (customer.hasErrors() || transportRequest.hasErrors()) {
        respond status: HttpStatus.BAD_REQUEST, message: 'failed to save RFT, check fields'
      } else {
        // save your transportrequest
        asyncTransportRequestService.save(transportRequest).onComplete { transportRequestResult ->
//          respond status: HttpStatus.ACCEPTED, transportRequestResult
          transportRequest = transportRequestResult
        }.onError { Throwable err ->
          respond status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'failed in saving transportrequest ' + err.message
        }
      }

      if (kOnekEightBytes) {
        File tmpFile = new File('/tmp/kone-keight.jpg')


        FileUtils.writeByteArrayToFile(tmpFile, kOnekEightBytes)
        transportRequest.kOnekEightFormImgUrl = haulageBucketService.storeFile("transport-request/{transportRequest.id}/kone-keight-files/", tmpFile, CannedAccessControlList.PublicRead)
//        amazonS3Service.storeFile('transport-request/rft-number/kone-keight-files/', tmpFile, CannedAccessControlList.PublicRead).onComplete {
//          transportRequest.kOnekEightFormImgUrl = it
//        }.onError { Throwable err ->
//          println 'error occurred in storing kone keight file ' + err.message
//        }
        tmpFile.delete()
      }

      if (bookingConfirmationBytes) {
        File tmpFile = new File('/tmp/booking-confirmation.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, bookingConfirmationBytes)
        transportRequest.bookingConfirmationImgUrl = haulageBucketService.storeFile('transport-request/{transportRequest.id}/booking-confirmation/', tmpFile, CannedAccessControlList.PublicRead)
//        amazonS3Service.storeFile('transport-request/rft-number/booking-confirmation/', tmpFile, CannedAccessControlList.PublicRead).onComplete {
//          transportRequest.bookingConfirmationImgUrl = it
//        }.onError { Throwable err ->
//          println 'error occurred in storing booking confirmation file ' + err.message
//        }

        tmpFile.delete()
      }

      if (cmoBytes) {
        File tmpFile = new File('/tmp/cmo.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, cmoBytes)
        transportRequest.cmoImgUrl = haulageBucketService.storeFile('transport-request/{transportRequest.id}/cmo/', tmpFile, CannedAccessControlList.PublicRead)
//        asyncHaulageBucketService.storeFile('transport-request/rft-number/cmo/', tmpFile, CannedAccessControlList.PublicRead).onComplete {
//          transportRequest.cmoImgUrl = it
//        }.onError { Throwable err ->
//          println 'error occurred in storing cmo file ' + err.message
//        }

        tmpFile.delete()
      }

      if (gatePassBytes) {
        File tmpFile = new File('/tmp/gatepass.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, gatePassBytes)
        transportRequest.gatePassImgUrl = haulageBucketService.storeFile('transport-request/{transportRequest.id}/gate-pass/', tmpFile, CannedAccessControlList.PublicRead)
//        amazonS3Service.storeFile('transport-request/rft-number/gate-pass/', tmpFile, CannedAccessControlList.PublicRead).onComplete {
//          transportRequest.gatePassImgUrl = it
//        }.onError { Throwable err ->
//          println 'error occurring in storing gate pass file ' + err.message
//        }

        tmpFile.delete()
      }

      if (customer.hasErrors() || transportRequest.hasErrors()) {
        respond status: HttpStatus.BAD_REQUEST, message: 'failed to save RFT, check fields'
      } else {
        // save your transportrequest
        asyncTransportRequestService.save(transportRequest).onComplete { transportRequestResult ->
          respond status: HttpStatus.ACCEPTED, transportRequestResult
        }.onError { Throwable err ->
          respond status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'failed in saving transportrequest ' + err.message
        }
      }
    }
  }

  @Override
  def update() {

    println 'custom save executing'

    def transportRequest = TransportRequest.get(request.JSON.id as Long)

    if (transportRequest) {
      byte[] kOnekEightBytes = request.JSON.kOnekEightBase64String.decodeBase64()
      byte[] bookingConfirmationBytes = request.JSON.bookingConfirmationBase64String.decodeBase64()
      byte[] cmoBytes = request.JSON.cmoBase64String.decodeBase64()
      byte[] gatePassBytes = request.JSON.gatePassBase64String.decodeBase64()

      transportRequest.status = request.JSON.status
      transportRequest.equipment = request.JSON.equipment
      transportRequest.containerRemarks = request.JSON.containerRemarks
      transportRequest.orderRemarks = request.JSON.orderRemarks

      //check if existing customer data is not the same with new fresh data
      def customer = new Customer(request.JSON.customer)
      if (!transportRequest.customer.is(customer)) {
        transportRequest.customer = customer
      }

      transportRequest.orderRemarks = request.JSON.orderRemarks
      transportRequest.grossWeight = request.JSON.grossWeight
      transportRequest.dgCode = request.JSON.dgCode
      transportRequest.vesselName = request.JSON.vesselName
      transportRequest.vesselEtaOrEtd = request.JSON.vesselEtaOrEtd

      transportRequest.forwardingAgent = request.JSON.forwardingAgent

      transportRequest.backToBack = request.JSON.backToBack
      transportRequest.hazardous = request.JSON.hazardous
      transportRequest.overDimension = request.JSON.overDimension

      transportRequest.equipment = request.JSON.equipment
      transportRequest.consignments = request.JSON.consignments
      transportRequest.shipper = request.JSON.shipper
      transportRequest.shippingAgent = request.JSON.shippingAgent

      if (transportRequest.hasErrors()) {
        respond HttpStatus.BAD_REQUEST, message: 'failed to save RFT, check fields for mandatory inputs'
      } else {
        asyncTransportRequestService.save(transportRequest).onComplete { transportRequestResult ->
//          respond status: HttpStatus.ACCEPTED, transportRequestResult
          transportRequest =  transportRequestResult
        }.onError { Throwable err ->
          respond status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'error saving transport request ' + err.message
        }
      }



      if (kOnekEightBytes) {
        File tmpFile = new File('/tmp/kone-keight.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, kOnekEightBytes)
        transportRequest.kOnekEightFormImgUrl = haulageBucketService.storeFile('transport-request/{transportRequest.id}/kone-keight-files/', tmpFile, CannedAccessControlList.PublicRead)
//        asyncHaulageBucketService.storeFile('transport-request/rft-number/kone-keight-files/', tmpFile, CannedAccessControlList.PublicRead).onComplete {
//          transportRequest.kOnekEightFormImgUrl = it
//        }.onError { Throwable err ->
//          println 'error occurred in storing kone keight file ' + err.message
//        }
        tmpFile.delete()
      }

      if (bookingConfirmationBytes) {
        File tmpFile = new File('/tmp/booking-confirmation.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, bookingConfirmationBytes)
        transportRequest.bookingConfirmationImgUrl = haulageBucketService.storeFile('transport-request/{transportRequest.id}/booking-confirmation/', tmpFile, CannedAccessControlList.PublicRead)
//        amazonS3Service.storeFile('transport-request/rft-number/booking-confirmation/', tmpFile, CannedAccessControlList.PublicRead).onComplete {
//          transportRequest.bookingConfirmationImgUrl = it
//        }.onError { Throwable err ->
//          println 'failed to store booking confirmation file ' + err.message
//        }
        tmpFile.delete()
      }

      if (cmoBytes) {
        File tmpFile = new File('/tmp/cmo.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, cmoBytes)
        transportRequest.cmoImgUrl = haulageBucketService.storeFile('transport-request/{transportRequest.id}/cmo/', tmpFile, CannedAccessControlList.PublicRead)
//        asyncHaulageBucketService.storeFile('transport-request/rft-number/cmo/', tmpFile, CannedAccessControlList.PublicRead).onComplete {
//          transportRequest.cmoImgUrl = it
//        }.onError {
//          println 'error occurred in storing cmo file ' + err.message
//        }
        tmpFile.delete()
      }

      if (gatePassBytes) {
        File tmpFile = new File('/tmp/gatepass.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, gatePassBytes)
        transportRequest.gatePassImgUrl = haulageBucketService.storeFile('transport-request/{transportRequest.id}/gate-pass/', tmpFile, CannedAccessControlList.PublicRead)
//        amazonS3Service.storeFile('transport-request/rft-number/gate-pass/', tmpFile, CannedAccessControlList.PublicRead).onComplete {
//          transportRequest.gatePassImgUrl = it
//        }.onError { Throwable err ->
//          respond status: HttpStatus.INTERNAL_SERVER_ERROR, message: err.message
//        }
        tmpFile.delete()
      }

      if (transportRequest.hasErrors()) {
        respond HttpStatus.BAD_REQUEST, message: 'failed to save RFT, check fields for mandatory inputs'
      } else {
        asyncTransportRequestService.save(transportRequest).onComplete { transportRequestResult ->
          respond status: HttpStatus.ACCEPTED, transportRequestResult
        }.onError { Throwable err ->
          respond status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'error saving transport request ' + err.message
        }
      }

    } else {
      render status: HttpStatus.NOT_FOUND
    }
  }
}
