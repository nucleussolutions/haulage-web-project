package haulage.project

import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
class VehicleInterceptor {

  // vehicle can only be accessed by the haulier and super admin
  def permissionService

  VehicleInterceptor() {
    match controller: 'vehicle'
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      Permission userPermission = permissionService.findByUserId(userId)
      if(userPermission){
        if(userPermission.authority == 'Super Admin' || userPermission.authority == 'Admin'){
          true
        }else{
          false
        }
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
