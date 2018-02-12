package haulage.project

import grails.compiler.GrailsCompileStatic
import grails.gorm.transactions.Transactional
import grails.rest.*
import grails.converters.*
import groovy.transform.TypeCheckingMode
import org.springframework.http.HttpStatus

@Transactional(readOnly = false)
@GrailsCompileStatic(TypeCheckingMode.SKIP)
class ConsignmentController extends RestfulController {
  static responseFormats = ['json', 'xml']

  ConsignmentService consignmentService

  ConsignmentController() {
    super(Consignment)
  }

  @Override
  Object index(Integer max) {
    //todo list based on permissions
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
    //todo if user has super admin permissions, return all
    if(permission){
      return super.index(max)
    }else{
      //todo list by haulier
      def consignments = Consignment.where {
        transportRequest.haulierId == userId
      }
      return consignments
    }
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
  Object save() {
    return super.save()
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

  def listByStatusAndHaulier() {
    //expect status and userid to come in, status via query params and user id via request header
    def haulierId = request.getHeader('userId')
    if (!haulierId) {
      respond status: HttpStatus.BAD_REQUEST, message: 'user id not found'
      return
    }

    if (params.status) {
      def consignments = Consignment.where {
        status == params.status
        transportRequest.haulierId == userId
      }
      respond consignments
    } else {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    }
  }

//  def listByStatusAndForwarder() {
//    //expect status and userid to come in, status via query params and user id via request header
//    def forwarderId = request.getHeader('userId')
//    if (!forwarderId) {
//      respond status: HttpStatus.BAD_REQUEST, message: 'user id not found'
//      return
//    }
//
//    if (params.status) {
//      def consignments = Consignment.where {
//        status == params.status
//        transportRequest.forwarderId == forwarderId
//      }
//      respond consignments
//    } else {
//      respond status: HttpStatus.NOT_FOUND, message: 'not found'
//    }
//  }

  def listByStatusAndUserType() {
    def userId = request.getHeader('userId')
    def userType = params.userType
    def status = params.status
    if (!userId) {
      respond status: HttpStatus.BAD_REQUEST, message: 'user id not found'
      return
    }

    if (!userType) {
      respond status: HttpStatus.BAD_REQUEST, message: 'user type not found'
      return
    }

    if (!status) {
      respond status: HttpStatus.NOT_FOUND, message: 'not found'
    } else {
      def consignments = Consignment.withCriteria {
        like('status', params.status)
        like(userType == 'forwarder' ? 'transportRequest.forwarderId' : 'transportRequest.haulierId', userId)
      }
      respond consignments
    }
  }

  def count() {
    println 'test consignment count'
    respond count: consignmentService.count()
  }
}
