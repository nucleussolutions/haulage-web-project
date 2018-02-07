package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode


@GrailsCompileStatic(TypeCheckingMode.SKIP)
class TransportRequestInterceptor {

  //kick user out
  def permissionService

  TransportRequestInterceptor() {
    match controller: 'transportRequest'
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId) {
      def userPermission = Permission.where {
        userInfo.userId == userId
      }
      if(userPermission){
        userPermission.authority != 'User'
      }else {
        false
      }
    }else {
      false
    }
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
