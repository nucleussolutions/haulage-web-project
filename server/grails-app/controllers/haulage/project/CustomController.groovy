package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class CustomController {

  def permissionService
  def locationService
  def driverInfoService
  def consignmentService
  def quoteService
  def vehicleService
  def jobService

  static responseFormats = ['json', 'xml']

  def permissionByGrantedBy(String userId) {
    println 'userId ' + userId

    if (!userId) {
      render([status: NOT_FOUND, message: 'user id not found'])
    } else {

      def userInfo = UserInfo.findByUserId(userId)

      def userPermission = userInfo.permissions.stream().filter({permission ->
        permission.authority == 'Super Admin'
      })

      def permissions

      if(userPermission){
        permissions = Permission.list()
      }else{
        permissions = permissionService.findAllByGrantedBy(userId, [offset: params.offset])
      }

      if (!permissions) {
        respond status: NOT_FOUND, message: 'permissions granted by this user is not found'
      } else {
        respond permissions, status: OK
      }
    }
  }

  def permissionCountByGrantedBy(String userId){
    if(userId){
      respond count: permissionService.countByGrantedBy(userId)
    }else{
      respond status: NOT_FOUND, message: 'user id not found'
    }
  }

  def locationByType() {
    if (params.type) {
      respond locationService.findByType(params.type as String)
    } else {
      respond status: NOT_FOUND, message: 'location not found'
    }
  }

  def jobsByDriverId(String driverId){
    if(driverId){
      respond jobService.findAllByDriverId(driverId, [offset: params.offset])
    }else{
      respond status: NOT_FOUND, message: 'driver id not found'
    }
  }

  def jobsByHaulierId(String haulierId){
    if(haulierId){
      respond jobService.findAllByHaulierId(haulierId, [offset: params.offset])
    }else{
      respond status: NOT_FOUND, message: 'haulier id not found'
    }
  }

  def jobsCountByHaulierId(String haulierId){
    if(haulierId){
      respond count: jobService.countByHaulierId(haulierId)
    }else{
      respond status: NOT_FOUND, message: 'haulier id not found'
    }
  }

  def vehiclesByHaulier(String haulierId){
    if(haulierId){
      respond vehicleService.findAllByUserId(haulierId, [offset: params.offset])
    }else{
      respond status: NOT_FOUND, message: 'haulier id not found'
    }
  }

  def quotesByHaulier(String haulierId){
    if(haulierId){
      respond quoteService.findAllByHaulierId(haulierId, [offset: params.offset])
    }else{
      respond status: NOT_FOUND, message: 'haulier id not found'
    }
  }

  def quotesByForwarder(String forwarderId){
    if(forwarderId){
      respond quoteService.findAllByForwarderId(forwarderId, [offset: params.offset])
    }else {
      respond status: NOT_FOUND, message: 'forwarder id not found'
    }
  }

  def consignmentsByRFT(Long rftId){
    if(rftId){
      TransportRequest transportRequest = TransportRequest.findById(rftId)
      if(transportRequest){
        respond consignmentService.findAllByTransportRequest(transportRequest, [offset: params.offset])
      }else{
        respond status: NOT_FOUND , message: 'rft not found'
      }
    }else{
      respond status: NOT_FOUND, message: 'rft id not found'
    }
  }

  def driversByHaulier(String haulierId){
    if(haulierId){
      respond driverInfoService.findAllByHaulierId(haulierId, [offset: params.offset])
    }else{
      respond status: NOT_FOUND, message: 'haulier id not found'
    }
  }

}
