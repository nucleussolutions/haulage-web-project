package haulage.project


import grails.rest.*
import grails.converters.*

class TransportRequestController extends RestfulController {

    def transportRequestService

    static responseFormats = ['json', 'xml']
    TransportRequestController() {
        super(TransportRequest)
    }

    def count(){
        respond count: transportRequestService.count()
    }
}
