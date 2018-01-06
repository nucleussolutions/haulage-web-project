package haulage.project

import groovy.transform.CompileStatic


@CompileStatic
class TransportRequestInterceptor {

  //kick user out
  def permissionService

  boolean before() {
    if(params.userId) {
      Permission userPermission = Permission.findByUserId(params.userId as String)
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
