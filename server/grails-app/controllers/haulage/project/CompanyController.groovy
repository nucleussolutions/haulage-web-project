package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.gorm.transactions.Transactional
import grails.rest.*
import grails.converters.*
import grails.web.http.HttpHeaders
import groovy.transform.TypeCheckingMode

import static org.springframework.http.HttpStatus.CREATED

@Transactional(readOnly=false)
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class CompanyController extends RestfulController {

  def companyService

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

//  @Override
  def save() {
    if(handleReadOnly()) {
      return
    }
    def instance = new Company()

    instance.validate()
    if (instance.hasErrors()) {
      transactionStatus.setRollbackOnly()
      respond instance.errors, view:'create' // STATUS CODE 422
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
            grailsLinkGenerator.link( resource: this.controllerName, action: 'show',id: instance.id, absolute: true,
                namespace: hasProperty('namespace') ? this.namespace : null ))
        respond instance, [status: CREATED, view:'show']
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
    return super.update()
  }

  @Override
  Object delete() {
    return super.delete()
  }

  def count(){
    respond count: companyService.count()
  }
}
