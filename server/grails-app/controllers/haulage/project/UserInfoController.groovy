package haulage.project

import com.amazonaws.services.s3.transfer.Upload
import grails.gorm.transactions.Transactional
import grails.plugin.awssdk.s3.AmazonS3Service
import grails.rest.*
import grails.converters.*
import grails.web.http.HttpHeaders
import org.apache.commons.io.FileUtils

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

class UserInfoController extends RestfulController {

  UserInfoService userInfoService
  AmazonS3Service s3Service
  HaulageBucketService haulageBucketService

  static responseFormats = ['json', 'xml']

  UserInfoController() {
    super(UserInfo)
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

  @Transactional
  def save() {
//    return super.save()
    if (handleReadOnly()) {
      return
    }
    def instance = new UserInfo()
    instance.userId = request.JSON.userId
    instance.name = request.JSON.name

    if (request.JSON.company) {
      instance.company = new Company()
      instance.company.name = request.JSON.company.name

      if (request.JSON.company.companyImageBase64) {
        // convert companybase64 to file
        byte[] decoded = request.JSON.company.companyImageBase64.decodeBase64()
        File file = new File('companylogo.jpg').withOutputStream {
          it.write(decoded)
        }
        instance.companyImgUrl = haulageBucketService.storeFile('/home/company/${request.JSON.company.registrationNo}/logo/', file)
      }
//      instance.company.companyImgUrl
      instance.company.address1 = request.JSON.company.address1
      instance.company.address2 = request.JSON.company.address2
      instance.company.city = request.JSON.company.city
      instance.company.state = request.JSON.state
      instance.company.country = request.JSON.country
    }

    if (request.JSON.driverInfo) {
      instance.driverInfo = new DriverInfo()
      instance.driverInfo.haulierId = request.JSON.driverInfo.haulierId
      instance.driverInfo.emergencyContactPhone = request.JSON.driverInfo.emergencyContactPhone
      instance.driverInfo.emergencyContactName = request.JSON.driverInfo.emergencyContactName
      instance.driverInfo.northPortPassExpiry = request.JSON.driverInfo.northPortPassExpiry
      instance.driverInfo.westPortPassExpiry = request.JSON.driverInfo.westPortPassExpiry
      instance.driverInfo.northPortPassNo = request.JSON.driverInfo.northPortPassNo
      instance.driverInfo.westPortPassNo = request.JSON.driverInfo.westPortPassNo
      instance.driverInfo.licenseExpiry = request.JSON.driverInfo.licenseExpiry

      if(request.JSON.driverInfo.icBackImageBase64){
        byte[] decoded = request.JSON.driverInfo.icBackImageBase64.decodeBase64()
        File file = new File('icBack.jpg').withOutputStream {
          it.write(decoded)
        }
        instance.driverInfo.icBackImgUrl = haulageBucketService.storeFile('/home/driver/${request.JSON.driverInfo.icNumber}/icBack/', file)
      }

      if(request.JSON.driverInfo.icFrontImageBase64) {
        byte[] decoded = request.JSON.driverInfo.icFrontImageBase64.decodeBase64()
        File file = new File('icFront.jpg').withOutputStream {
          it.write(decoded)
        }
        instance.driverInfo.icFrontImgUrl = haulageBucketService.storeFile('/home/driver/${request.JSON.driverInfo.icNumber}/icFront/', file)
      }

      instance.driverInfo.icNumber = request.JSON.driverInfo.icNumber
      instance.driverInfo.phone = request.JSON.driverInfo.phone
      instance.driverInfo.licenseClass = request.JSON.driverInfo.licenseClass
      instance.driverInfo.passportNumber = request.JSON.driverInfo.passportNumber
//      instance.driverInfo.passportImgUrl =

      if(request.JSON.driverInfo.passportImageBase64){
        byte[] decoded = request.JSON.driverInfo.passportImageBase64.decodeBase64()
        File file = new File('passportimage.jpg').withOutputStream {
          it.write(decoded)
        }
        instance.driverInfo.passportImgUrl = haulageBucketService.storeFile('/home/driver/${request.JSON.driverInfo.icNumber}/passport/', file)
      }

      instance.driverInfo.address1 = request.JSON.driverInfo.address1
      instance.driverInfo.address2 = request.JSON.driverInfo.address2
      instance.driverInfo.city = request.JSON.driverInfo.city
      instance.driverInfo.state = request.JSON.driverInfo.state
      instance.driverInfo.country = request.JSON.driverInfo.country
    }


    instance.validate()
    if (instance.hasErrors()) {
      transactionStatus.setRollbackOnly()
      respond instance.errors, view: 'create' // STATUS CODE 422
      return
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

  @Transactional
  def update() {
//    return super.update()
    if(handleReadOnly()) {
      return
    }

    UserInfo instance = userInfoService.get(params.id as Long)
    if (instance == null) {
      transactionStatus.setRollbackOnly()
      notFound()
      return
    }

    instance.properties = getObjectToBind()

    if(request.JSON.driverInfo.icBackImageBase64){
      byte[] decoded = request.JSON.driverInfo.icBackImageBase64.decodeBase64()
      File file = new File('icBack.jpg').withOutputStream {
        it.write(decoded)
      }
      //todo delete existing file
      haulageBucketService.deleteFile(instance.driverInfo.icBackImgUrl)
      instance.driverInfo.icBackImgUrl = haulageBucketService.storeFile('/home/driver/${request.JSON.driverInfo.icNumber}/icBack/', file)
    }

    if(request.JSON.driverInfo.icFrontImageBase64) {
      byte[] decoded = request.JSON.driverInfo.icFrontImageBase64.decodeBase64()
      File file = new File('icFront.jpg').withOutputStream {
        it.write(decoded)
      }
      //todo delete existing file
      haulageBucketService.deleteFile(instance.driverInfo.icFrontImgUrl)
      instance.driverInfo.icFrontImgUrl = haulageBucketService.storeFile('/home/driver/${request.JSON.driverInfo.icNumber}/icFront/', file)
    }

    if(request.JSON.driverInfo.passportImageBase64){
      byte[] decoded = request.JSON.driverInfo.passportImageBase64.decodeBase64()
      File file = new File('passportimage.jpg').withOutputStream {
        it.write(decoded)
      }
      //todo delete existing file by using the file key
      haulageBucketService.deleteFile(instance.driverInfo.passportImgUrl)
      instance.driverInfo.passportImgUrl = haulageBucketService.storeFile('/home/driver/${request.JSON.driverInfo.icNumber}/passport/', file)
      println 'instance.driverInfo.passportImgUrl '+instance.driverInfo.passportImgUrl
//      Upload upload = haulageBucketService.transferFile('/home/driver/${request.JSON.driverInfo.icNumber}/passport/', file)
    }

    if (instance.hasErrors()) {
      transactionStatus.setRollbackOnly()
      respond instance.errors, view:'edit' // STATUS CODE 422
      return
    }

    updateResource instance
    request.withFormat {
      form multipartForm {
        flash.message = message(code: 'default.updated.message', args: [classMessageArg, instance.id])
        redirect instance
      }
      '*'{
        response.addHeader(HttpHeaders.LOCATION,
            grailsLinkGenerator.link( resource: this.controllerName, action: 'show',id: instance.id, absolute: true,
                namespace: hasProperty('namespace') ? this.namespace : null ))
        respond instance, [status: OK]
      }
    }
  }

  @Transactional
  def delete() {
    if(handleReadOnly()) {
      return
    }

    def instance = userInfoService.get(params.id)
    if (instance == null) {
      transactionStatus.setRollbackOnly()
      notFound()
      return
    }

    //todo delete all the files
    if(instance.driverInfo){
      if(instance.driverInfo.icFrontImgUrl){
        haulageBucketService.deleteFile(instance.driverInfo.icFrontImgUrl)
      }

      if(instance.driverInfo.icBackImgUrl){
        haulageBucketService.deleteFile(instance.driverInfo.icBackImgUrl)
      }

      if(instance.driverInfo.passportImgUrl){
        haulageBucketService.deleteFile(instance.driverInfo.passportImgUrl)
      }
    }

    deleteResource instance

    request.withFormat {
      form multipartForm {
        flash.message = message(code: 'default.deleted.message', args: [classMessageArg, instance.id])
        redirect action:"index", method:"GET"
      }
      '*'{ render status: NO_CONTENT } // NO CONTENT STATUS CODE
    }

  }

  def count() {
    respond count: userInfoService.count()
  }

  def getByUserId() {
    def userId = request.getHeader('userId')
    def userInfo = userInfoService.findByUserId(userId)
    respond userInfo
  }

  def getHauliers() {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    def userInfos
    if (permission) {
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Admin')
        }
      }

    } else {
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('grantedBy', userId)
          'in'('authority', 'Admin')
        }
      }
    }
    println 'userInfos ' + userInfos
    respond userInfos
  }

  def countHauliers() {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    def userInfos
    if (permission) {
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Admin')
        }
      }

      println userInfos
    } else {
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('grantedBy', userId)
          'in'('authority', 'Admin')
        }
      }
      println userInfos
    }
    respond count: userInfos.size()
  }

  def countForwarders() {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    def userInfos
    if (permission) {
      // display all forwarders
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Manager')
        }
      }
    } else {
      //list forwarders granted by the hauliers themselves
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Manager')
          'in'('grantedBy', userId)
        }
      }
    }
    respond count: userInfos.size()
  }

  def getForwarders() {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    def userInfos
    if (permission) {
      // display all forwarders
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Manager')
        }
      }
    } else {
      //list forwarders granted by the hauliers themselves
      userInfos = UserInfo.createCriteria().list(max: params.limit, offset: params.offset) {
        permissions {
          'in'('authority', 'Manager')
          'in'('grantedBy', userId)
        }
      }
    }
    respond userInfos
  }
}
