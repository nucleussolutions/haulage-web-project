package haulage.project


import grails.rest.*
import grails.converters.*

class DriverInfoController extends RestfulController {

    def driverInfoService

    static responseFormats = ['json', 'xml']
    DriverInfoController() {
        super(DriverInfo)
    }

    def count(){
        respond count: driverInfoService.count
    }
}
