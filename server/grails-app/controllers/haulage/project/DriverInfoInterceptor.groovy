package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class DriverInfoInterceptor {

  def permissionService

  DriverInfoInterceptor() {
    match controller: 'driverInfo'
  }

  boolean before() {
    def userId = request.getHeader('userId')

    if (userId) {
      Permission userPermission = permissionService.findByUserId(userId)

      if(userPermission){
        userPermission.authority == 'Super Admin' || userPermission.authority == 'Admin'
      }else{
        false
      }
    } else {
      false
    }
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
