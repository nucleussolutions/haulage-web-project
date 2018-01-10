package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class PermissionInterceptor {

  def permissionService

  //todo permissions are strictly for hauliers and super admin only

  PermissionInterceptor() {
    match(controller: 'permission').except(action: 'get')
  }

  boolean before() {
    String userId = request.getHeader('userId')
    if (!userId) {
      false
    } else {
      //find permission that belongs to this user
      Permission userPermission = permissionService.findByUserId(userId)
      if(!userPermission){
        false
      }else {
        if(userPermission.authority == 'Super Admin' || 'Admin'){
          true
        }else{
          false
        }
      }
    }
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
