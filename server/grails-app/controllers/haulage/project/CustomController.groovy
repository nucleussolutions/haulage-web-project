package haulage.project


import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK


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
      List<Permission> permissions = permissionService.findAllByGrantedBy(userId)

      if (!permissions) {
        response.status = 400
        render([message: 'permissions granted by this user is not found'])
      } else {
        respond permissions, status: OK
      }
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


}
