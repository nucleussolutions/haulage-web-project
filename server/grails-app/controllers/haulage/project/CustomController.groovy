package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class CustomController {

  def permissionService
  def locationService
  def haulierInfoService
  def driverInfoService
  def companyService
  def consignmentService
  def forwarderInfoService
  def quoteService
  def pricingService
  def tariffService

  def memberSubscriptionService
  def transactionService

  def vehicleService

  def transportRequestService

  def jobService

  static responseFormats = ['json', 'xml']

  def permissionByUserId(String userId) {
    println 'userId ' + userId
    if (!userId) {
      render([status: NOT_FOUND, message: 'user id not found'])
    } else {
      def permission = permissionService.findByUserId(userId)
      if (!permission) {
        response.status = 400
        render([message: 'user permission not found'])
      } else {
        respond permission, status: OK
      }
    }
  }

  def permissionByGrantedBy(String userId) {
    println 'userId ' + userId

    if (!userId) {
      render([status: NOT_FOUND, message: 'user id not found'])
    } else {

      //todo check if super admin display all
      Permission userPermission = permissionService.findByUserId(userId)

      def permissions

      if(userPermission.authority == 'Super Admin'){
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

  def haulierByUserId(String userId){
    println 'haulierByUserId '+userId

    def haulierInfo = haulierInfoService.findByUserId(userId)
    if(haulierInfo){
      respond haulierInfo
    }else{
      respond status: NOT_FOUND, message: 'haulier info not found'
    }
  }

  def forwarderByUserId(String userId){
    println 'forwarderByUserId '+userId

    def forwarderInfo = forwarderInfoService.findByUserId(userId)
    if(forwarderInfo){
      respond forwarderInfo
    }else{
      respond status: NOT_FOUND, message: 'forwarder info not found'
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

//  def consignmentsByHaulier(String haulierId){
//    if(haulierId){
//
//
//    }else{
//      respond status: NOT_FOUND, message: 'haulier id not found'
//    }
//  }
//
//  def consignmentsByForwarder(String forwarderId){
//    if(forwarderId){
//    }else{
//      respond status: NOT_FOUND, message: 'forwarder id not found'
//    }
//  }

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
