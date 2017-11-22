package haulage.project

import com.amazonaws.services.s3.model.CannedAccessControlList
import grails.converters.JSON
import grails.plugin.awssdk.s3.AmazonS3Service
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class TransportRequestController {

    TransportRequestService transportRequestService

    AmazonS3Service s3Service

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

        s3Service.storeFile('haulage-dev', 'path to booking confirmation image file', bookingConfirmationImgFile, CannedAccessControlList.PublicRead)

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

        def gatePassImgFile = params.gatePassImg

        def bookingConfirmationImgFile = params.bookingConfirmationImg

        def cmoImgFile = params.cmoImg

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
