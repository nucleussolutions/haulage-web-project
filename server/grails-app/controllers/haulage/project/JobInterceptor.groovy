package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class JobInterceptor {

  def permissionService

  JobInterceptor() {
    match controller: 'job'
  }

  boolean before() {
    def userId = request.getHeader('userId')

    if(userId){
      Permission userPermission = permissionService.findByUserId(userId)
      if(userPermission){
        userPermission.authority != 'Manager'
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
