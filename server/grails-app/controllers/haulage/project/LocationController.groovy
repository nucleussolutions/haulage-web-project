package haulage.project


import grails.rest.*
import grails.converters.*
import org.springframework.http.HttpStatus

class LocationController extends RestfulController {

    LocationService locationService

    static responseFormats = ['json', 'xml']
    LocationController() {
        super(Location)
    }
}
