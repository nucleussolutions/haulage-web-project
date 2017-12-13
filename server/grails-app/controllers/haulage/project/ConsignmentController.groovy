package haulage.project


import grails.rest.*
import grails.converters.*

class ConsignmentController extends RestfulController {

    def consignmentService

    static responseFormats = ['json', 'xml']
    ConsignmentController() {
        super(Consignment)
    }

    def count(){
        respond count: consignmentService.count()
    }
}
