package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class HaulierInfoInterceptor {

  //todo dont allow driver to access this, as well as forwarder to create a haulier
  def permissionService


  HaulierInfoInterceptor() {
    match controller: 'haulierInfo', action: 'list'
  }

  boolean before() {
    String userId = request.getHeader('userId')
    if(userId){
      Permission userPermission = permissionService.findByUserId(userId)
      if(userPermission){
        userPermission.authority != 'User'
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
