package haulage.project


import grails.rest.*
import grails.converters.*

class VehicleController extends RestfulController {

    def vehicleService

    static responseFormats = ['json', 'xml']
    VehicleController() {
        super(Vehicle)
    }

    def count(){
        respond count: vehicleService.count()
    }
}
