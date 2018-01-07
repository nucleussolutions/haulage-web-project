package haulage.project

import grails.compiler.GrailsCompileStatic


@GrailsCompileStatic
class TransportRequestInterceptor {

  //kick user out
  def permissionService

  TransportRequestInterceptor() {
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId) {
      Permission userPermission = permissionService.findByUserId(params.userId as String)
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
