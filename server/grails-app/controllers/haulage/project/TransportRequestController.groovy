package haulage.project

import com.amazonaws.services.s3.model.CannedAccessControlList
import grails.plugin.awssdk.s3.AmazonS3Service
import grails.rest.*
import grails.converters.*
import org.apache.commons.io.FileUtils
import org.springframework.http.HttpStatus

class TransportRequestController extends RestfulController<TransportRequest> {



  static responseFormats = ['json', 'xml']

  HaulageBucketService haulageBucketService
  AmazonS3Service amazonS3Service

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

    if(!amazonS3Service.listBucketNames().contains('haulage-dev')){
      respond status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'storage folder not found'
    }else{
      byte[] kOnekEightBytes = request.JSON.kOnekEightBase64String.decodeBase64()
      byte[] bookingConfirmationBytes = request.JSON.bookingConfirmationBase64String.decodeBase64()
      byte[] cmoBytes = request.JSON.cmoBase64String.decodeBase64()
      byte[] gatePassBytes = request.JSON.gatePassBase64String.decodeBase64()

      //amazonS3Service.storeFile('my-bucket', 'asset/foo/someKey.jpg', new File('/Users/ben/Desktop/photo.jpg'), CannedAccessControlList.PublicRead)
      def transportRequest = new TransportRequest()

      if(kOnekEightBytes){
        File tmpFile = new File('/tmp/kone-keight.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, kOnekEightBytes)
        rx.Observable.from(haulageBucketService.storeFile('transport-request/rft-number/kone-keight-files/', tmpFile, CannedAccessControlList.PublicRead)).subscribe({
          transportRequest.kOnekEightFormImgUrl = it
        })

        tmpFile.delete()
      }

      if(bookingConfirmationBytes){
        File tmpFile = new File('/tmp/booking-confirmation.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, bookingConfirmationBytes)
        rx.Observable.from(haulageBucketService.storeFile('transport-request/rft-number/booking-confirmation/', tmpFile, CannedAccessControlList.PublicRead)).subscribe({
          transportRequest.bookingConfirmationImgUrl = it
        })

        tmpFile.delete()
      }

      if(cmoBytes){
        File tmpFile = new File('/tmp/cmo.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, cmoBytes)
        rx.Observable.from(haulageBucketService.storeFile('transport-request/rft-number/cmo/', tmpFile, CannedAccessControlList.PublicRead)).subscribe({
          transportRequest.cmoImgUrl = it
        })

        tmpFile.delete()
      }

      if(gatePassBytes){
        File tmpFile = new File('/tmp/gatepass.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, gatePassBytes)
        rx.Observable.from(haulageBucketService.storeFile('transport-request/rft-number/gate-pass/', tmpFile, CannedAccessControlList.PublicRead)).subscribe({
          transportRequest.gatePassImgUrl = it
        })

        tmpFile.delete()
      }

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

      if(customer.hasErrors() || transportRequest.hasErrors()){
        respond status: HttpStatus.BAD_REQUEST, message: 'failed to save RFT, check fields'
      }else{
        //todo save your transportrequest
        transportRequest.save(flush: true, failOnError: true)
      }
    }
  }

  @Override
  def update() {

    println 'custom save executing'

    def transportRequest = TransportRequest.get(request.JSON.id as Long)

    if(transportRequest){
      byte[] kOnekEightBytes = request.JSON.kOnekEightBase64String.decodeBase64()
      byte[] bookingConfirmationBytes = request.JSON.bookingConfirmationBase64String.decodeBase64()
      byte[] cmoBytes = request.JSON.cmoBase64String.decodeBase64()
      byte[] gatePassBytes = request.JSON.gatePassBase64String.decodeBase64()

      //todo call AWS to upload files


      if(kOnekEightBytes){
        File tmpFile = new File('/tmp/kone-keight.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, kOnekEightBytes)

        rx.Observable.from(haulageBucketService.storeFile('transport-request/rft-number/kone-keight-files/', tmpFile, CannedAccessControlList.PublicRead)).subscribe({
          transportRequest.kOnekEightFormImgUrl = it
        })
//        haulageBucketService.storeFile('transport-request/rft-number/kone-keight-files/', tmpFile, CannedAccessControlList.PublicRead)
        tmpFile.delete()
      }

      if(bookingConfirmationBytes){
        File tmpFile = new File('/tmp/booking-confirmation.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, bookingConfirmationBytes)
        haulageBucketService.storeFile('transport-request/rft-number/booking-confirmation/', tmpFile, CannedAccessControlList.PublicRead)
        tmpFile.delete()
      }

      if(cmoBytes){
        File tmpFile = new File('/tmp/cmo.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, cmoBytes)
        rx.Observable.from(haulageBucketService.storeFile('transport-request/rft-number/cmo/', tmpFile, CannedAccessControlList.PublicRead)).subscribe({
          transportRequest.cmoImgUrl = it
        })

        tmpFile.delete()
      }

      if(gatePassBytes){
        File tmpFile = new File('/tmp/gatepass.jpg')
        FileUtils.writeByteArrayToFile(tmpFile, gatePassBytes)
        rx.Observable.from(haulageBucketService.storeFile('transport-request/rft-number/gate-pass/', tmpFile, CannedAccessControlList.PublicRead)).subscribe({
          transportRequest.gatePassImgUrl = it
        })

        tmpFile.delete()
      }

      transportRequest.status = request.JSON.status
      transportRequest.equipment = request.JSON.equipment
      transportRequest.containerRemarks = request.JSON.containerRemarks
      transportRequest.orderRemarks = request.JSON.orderRemarks


      //check if existing customer data is not the same with new fresh data
      def customer = new Customer(request.JSON.customer)
      if(!transportRequest.customer.is(customer)){
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
      transportRequest.shippingAgent =  request.JSON.shippingAgent

      if(transportRequest.hasErrors()){
        respond HttpStatus.BAD_REQUEST, message: 'failed to save RFT, check fields for mandatory inputs'
      }else{
        transportRequest.save(flush: true, failOnError: true)
      }

    }else{
      render status: HttpStatus.NOT_FOUND
    }
  }
}
