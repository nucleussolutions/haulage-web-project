package haulage.project

import grails.converters.JSON
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class TransportRequestController {

    TransportRequestService transportRequestService

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
