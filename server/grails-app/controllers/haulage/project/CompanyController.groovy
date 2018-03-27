package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.gorm.transactions.Transactional
import grails.rest.*
import grails.converters.*
import grails.web.http.HttpHeaders
import groovy.transform.TypeCheckingMode
import org.springframework.http.HttpStatus

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.OK

@Transactional(readOnly = false)
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class CompanyController extends RestfulController {

    CompanyService companyService

    HaulageBucketService haulageBucketService

    static responseFormats = ['json', 'xml']

    CompanyController() {
        super(Company)
    }

    @Override
    Object index(Integer max) {
        return super.index(max)
    }

    @Override
    Object show() {
        return super.show()
    }

    @Override
    Object create() {
        return super.create()
    }

    @Override
    def save() {
        if (handleReadOnly()) {
            return
        }
        def instance = new Company()

        instance.validate()
        if (instance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance.errors, view: 'create' // STATUS CODE 422
            return
        }

        // save company image
        // get the company image from here, then upload it to S3
        def companyBase64 = request.JSON.companyImageBase64
        if (companyBase64) {
            // convert companybase64 to file
            byte[] decoded = companyBase64.decodeBase64()
            File file = new File('companylogo.jpg').withOutputStream {
                it.write(decoded)
            }
            instance.companyImgUrl = haulageBucketService.storeFile('/home/company/${request.JSON.registrationNo}/logo/', file)
        }

        saveResource instance

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [classMessageArg, instance.id])
                redirect instance
            }
            '*' {
                response.addHeader(HttpHeaders.LOCATION,
                        grailsLinkGenerator.link(resource: this.controllerName, action: 'show', id: instance.id, absolute: true,
                                namespace: hasProperty('namespace') ? this.namespace : null))
                respond instance, [status: CREATED, view: 'show']
            }
        }
    }

    @Override
    Object edit() {
        return super.edit()
    }

    @Override
    Object patch() {
        return super.patch()
    }

    @Override
    Object update() {
        if (handleReadOnly()) {
            return
        }

        Company instance = companyService.get(params.id)
        if (instance == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        instance.properties = getObjectToBind()

        if (instance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance.errors, view: 'edit' // STATUS CODE 422
            return
        }

        //todo if there is a new companyimage, update it
        def companyBase64 = request.JSON.companyImageBase64
        if (companyBase64) {
            // convert companybase64 to file
            byte[] decoded = companyBase64.decodeBase64()
            File file = new File('companylogo.jpg').withOutputStream {
                it.write(decoded)
            }
            haulageBucketService.deleteFile('/home/company/${request.JSON.registrationNo}/logo/companylogo.jpg')
            instance.companyImgUrl = haulageBucketService.storeFile('/home/company/${request.JSON.registrationNo}/logo/', file)
        }

        updateResource instance

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [classMessageArg, instance.id])
                redirect instance
            }
            '*' {
                response.addHeader(HttpHeaders.LOCATION,
                        grailsLinkGenerator.link(resource: this.controllerName, action: 'show', id: instance.id, absolute: true,
                                namespace: hasProperty('namespace') ? this.namespace : null))
                respond instance, [status: OK]
            }
        }
    }

    def getByRegistrationNo(String registrationNo) {
        println 'registrationNo ' + registrationNo
        if (registrationNo) {
            Company company = companyService.findByRegistrationNo(registrationNo)
            println 'company ' + company
            respond company
        } else {
            response.status = HttpStatus.NOT_FOUND.value()
            respond message: 'company registration number not found'
        }
    }

    def getByCompanyCode(String companyCode) {
        if (companyCode) {
            //todo make case insensitve query for this
            Company company = companyService.findByCode(companyCode)
            println 'company ' + company
            respond company
        } else {
            response.status = HttpStatus.NOT_FOUND.value()
            respond message: 'company code not found'
        }
    }

    //fixme
    def listCompaniesByHaulier() {
        if (params.name) {

            def companies = Company.createCriteria().list {
                ilike("name", "%${params.name}%")
//                permissions {
//                    eq("authority", "Admin")
//                }
            }

            def filteredCompanies = []

            companies.each { company ->
                company.permissions.each {
                    println it.authority
                    if(it.authority == 'Admin'){
                        filteredCompanies.add(company)
                    }
                }
            }


            println filteredCompanies

            respond filteredCompanies
        } else {
            response.status = HttpStatus.NOT_FOUND.value()
            respond message: 'company name not found'
        }
    }

    //fixme
    def listCompaniesByForwarder() {
        if (params.name) {

            def companies = Company.createCriteria().list {
                ilike("name", "%${params.name}%")
//                permissions {
//                    eq("authority", "Manager")
//                }
            }

            def filteredCompanies = []

            companies.each { company ->
                company.permissions.each {
                    println it.authority
                    if(it.authority == 'Manager'){
                        filteredCompanies.add(company)
                    }
                }
            }

            println filteredCompanies

            respond filteredCompanies
        } else {
            response.status = HttpStatus.NOT_FOUND.value()
            respond message: 'company name not found'
        }
    }

    @Override
    Object delete() {
        return super.delete()
    }

    def count() {
        respond count: companyService.count()
    }
}
