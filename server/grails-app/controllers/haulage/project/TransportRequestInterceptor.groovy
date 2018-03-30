package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode


@GrailsCompileStatic(TypeCheckingMode.SKIP)
class TransportRequestInterceptor {

  //kick user out
  def permissionService

  def userInfoService

  TransportRequestInterceptor() {
    match controller: 'transportRequest'
  }

  boolean before() {
    def userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)
    if(userId) {
      def userPermission = userInfo.permissions.stream().filter({ permission ->
        permission.authority == 'User'
      })
      if(userPermission){
        false
      }else {
        true
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
