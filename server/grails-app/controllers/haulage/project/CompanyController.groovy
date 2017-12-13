package haulage.project


import grails.rest.*
import grails.converters.*

class CompanyController extends RestfulController {

    def companyService

    static responseFormats = ['json', 'xml']
    CompanyController() {
        super(Company)
    }

    def count(){
        respond count: companyService.count()
    }
}
