package haulage.project


import grails.rest.*
import grails.converters.*

class CompanyController extends RestfulController {
    static responseFormats = ['json', 'xml']
    CompanyController() {
        super(Company)
    }
}
