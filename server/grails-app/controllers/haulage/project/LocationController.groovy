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

    def getByType(){
        if(params.type){
            respond locationService.findByType(params.type as String)
        }else{
            respond status: HttpStatus.NOT_FOUND, message: 'location not found'
        }
    }
}
