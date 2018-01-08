package haulage.project

import grails.compiler.GrailsCompileStatic

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

@GrailsCompileStatic
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
        permissions = permissionService.findAllByGrantedBy(userId)
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

  def locationCount() {
    respond count: locationService.count()
  }

  def haulierInfoCount() {
    respond count: haulierInfoService.count()
  }

  def forwarderInfoCount() {
    respond count: forwarderInfoService.count()
  }

  def consignmentCount() {
    respond count: consignmentService.count()
  }

  def tariffCount() {
    respond count: tariffService.count()
  }

  def memberSubscriptionCount() {
    respond count: memberSubscriptionService.count()
  }

  def transactionCount() {
    respond count: transactionService.count()
  }

  def driverInfoCount() {
    respond count: driverInfoService.count()
  }

  def quoteCount() {
    respond count: quoteService.count()
  }

  def companyCount() {
    respond count: companyService.count()
  }

  def pricingCount() {
    respond count: pricingService.count()
  }

  def vehicleCount() {
    respond count: vehicleService.count()
  }

  def transportRequestCount() {
    respond count: transportRequestService.count()
  }

  def jobCount(){
    respond count: jobService.count()
  }

  def permissionCount(){
    respond count: permissionService.count()
  }

  def jobsByDriverId(String driverId){
    if(driverId){
      respond jobService.findAllByDriverId(driverId)
    }else{
      respond status: NOT_FOUND, message: 'driver id not found'
    }
  }

  def jobsByHaulierId(String haulierId){
    if(haulierId){
      respond jobService.findAllByHaulierId(haulierId)
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
      respond vehicleService.findAllByUserId(haulierId)
    }else{
      respond status: NOT_FOUND, message: 'haulier id not found'
    }
  }

  def quotesByHaulier(String haulierId){
    if(haulierId){
      respond quoteService.findAllByHaulierId(haulierId)
    }else{
      respond status: NOT_FOUND, message: 'haulier id not found'
    }
  }

  def quotesByForwarder(String forwarderId){
    if(forwarderId){
      respond quoteService.findAllByForwarderId(forwarderId)
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
        respond Consignment.findAllByTransportRequest(transportRequest)
      }else{
        respond status: NOT_FOUND , message: 'rft not found'
      }
    }else{
      respond status: NOT_FOUND, message: 'rft id not found'
    }
  }
}
