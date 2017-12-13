package haulage.project


import grails.rest.*
import grails.converters.*

class VehicleController extends RestfulController {
    static responseFormats = ['json', 'xml']
    VehicleController() {
        super(Vehicle)
    }
}
