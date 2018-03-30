package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class VehicleInterceptor {

  // vehicle can only be accessed by the haulier and super admin
  def permissionService


  def userInfoService

  VehicleInterceptor() {
    match controller: 'vehicle'
  }

  boolean before() {
    String userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)
    if(userId){

      def userPermission = userInfo.permissions.stream().filter({ permission ->
        permission.authority == 'Super Admin' || permission.authority == 'Admin'
      })
      if(userPermission){
        true
      }else{
        false
      }
    }else{
      false
    }
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
