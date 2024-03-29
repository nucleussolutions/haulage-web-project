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
    // list based on permissions
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      authority == 'Super Admin'
    }
    // if user has super admin permissions, return all
    if(permission){
      return super.index(max)
    }else{
      // list by haulier company
      // check which haulier company does the user work for
      def userInfo = UserInfo.findByUserId(userId)
      def transportRequests = TransportRequest.findAllByHaulierCompany(userInfo.company)
      def consignments = []
      // loop through consignments and collect them into a list

      transportRequests.forEach({ transportRequest ->
        consignments.addAll(transportRequests.consignments)
      })

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
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      authority == 'Super Admin'
    }
    if(permission){
      respond count: consignmentService.count()
    }else{
      def consignments = Consignment.where {
        transportRequest.haulierId == userId || transportRequest.forwarderId == userId
      }
      respond count: consignments.size()
    }
  }
}
