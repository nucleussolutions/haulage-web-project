package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class VehicleInterceptor {

  // vehicle can only be accessed by the haulier and super admin
  def permissionService

  VehicleInterceptor() {
    match controller: 'vehicle'
  }

  boolean before() {
    String userId = request.getHeader('userId')
    if(userId){
      def userPermission = Permission.where {
        userInfo.userId == userId
        authority == 'Super Admin' || authority == 'Admin'
      }
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
