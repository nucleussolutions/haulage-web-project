package haulage.project

import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
class TransactionInterceptor {

  def permissionService

  TransactionInterceptor() {
    match controller: 'transaction'
  }

  boolean before() {
    String userId = request.getHeader('userId')
    if(userId){
      Permission userPermission = permissionService.findByUserId(userId)
      if(userPermission){
        userPermission.authority == 'Super Admin'
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
