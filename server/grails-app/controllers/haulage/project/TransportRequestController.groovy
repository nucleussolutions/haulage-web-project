package haulage.project

import com.amazonaws.services.s3.model.CannedAccessControlList
import grails.converters.JSON
import grails.core.GrailsApplication
import grails.plugin.awssdk.s3.AmazonS3Service
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class TransportRequestController {

    TransportRequestService transportRequestService

    AmazonS3Service s3Service

    GrailsApplication grailsApplication

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond transportRequestService.list(params), model:[transportRequestCount: transportRequestService.count()]
    }

    def show(Long id) {
        JSON.use('deep'){
            render transportRequestService.get(id) as JSON
        }
    }

    def save(TransportRequest transportRequest) {
        if (transportRequest == null) {
            render status: NOT_FOUND
            return
        }

        File kOnekEightFormImgFile = params.kOnekEightFormImg

        File gatePassImgFile = params.gatePassImg

        File bookingConfirmationImgFile = params.bookingConfirmationImg

        File cmoImgFile = params.cmoImg

        def bucketNames = s3Service.listBucketNames()

        if(!bucketNames.contains('haulage-dev')){
            s3Service.createBucket('haulage-dev', 'us-east')
        }

        if(kOnekEightFormImgFile){
            s3Service.storeFile('haulage-dev', 'path to kone', kOnekEightFormImgFile, CannedAccessControlList.PublicRead)
        }

        if(gatePassImgFile){
            s3Service.storeFile('haulage-dev', 'path to gatepass', gatePassImgFile, CannedAccessControlList.PublicRead)
        }

        if(bookingConfirmationImgFile){
            s3Service.storeFile('haulage-dev', 'path to booking confirmation image file', bookingConfirmationImgFile, CannedAccessControlList.PublicRead)
        }

        if(cmoImgFile){
            s3Service.storeFile('haulage-dev', 'path to cmo image file', cmoImgFile, CannedAccessControlList.PublicRead)
        }

        try {
            transportRequestService.save(transportRequest)
        } catch (ValidationException e) {
            respond transportRequest.errors, view:'create'
            return
        }

        respond transportRequest, [status: CREATED, view:"show"]
    }

    def update(TransportRequest transportRequest) {
        if (transportRequest == null) {
            render status: NOT_FOUND
            return
        }

        def kOnekEightFormImgFile = params.kOnekEightFormImg

        if(kOnekEightFormImgFile){
            s3Service.storeFile('haulage-dev', 'path to kone', kOnekEightFormImgFile, CannedAccessControlList.PublicRead)
        }

        def gatePassImgFile = params.gatePassImg

        if(gatePassImgFile){
            s3Service.storeFile('haulage-dev', 'path to gatepass', gatePassImgFile, CannedAccessControlList.PublicRead)
        }

        def bookingConfirmationImgFile = params.bookingConfirmationImg

        if(bookingConfirmationImgFile){
            s3Service.storeFile('haulage-dev', 'path to booking comfirmation', bookingConfirmationImgFile, CannedAccessControlList.PublicRead)
        }

        def cmoImgFile = params.cmoImg

        if(cmoImgFile){
            s3Service.storeFile('haulage-dev', 'path to cmo', cmoImgFile, CannedAccessControlList.PublicRead)
        }

        try {
            transportRequestService.save(transportRequest)
        } catch (ValidationException e) {
            respond transportRequest.errors, view:'edit'
            return
        }

        respond transportRequest, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        transportRequestService.delete(id)

        render status: NO_CONTENT
    }
}
