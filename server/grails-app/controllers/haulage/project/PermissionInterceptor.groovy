package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class PermissionInterceptor {

  def permissionService

  //todo permissions are strictly for hauliers and super admin only

  PermissionInterceptor() {
    match(controller: 'permission')
  }

  boolean before() {
//    String userId = request.getHeader('userId')
//    if (!userId) {
//      false
//    } else {
//      //find permission that belongs to this user
//      def userPermission = Permission.where {
//        userInfo.userId == userId
//        authority  == 'Super Admin' || authority == 'Admin'
//      }
//      if(!userPermission){
//        false
//      }else {
//        true
//      }
//    }
    true
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
