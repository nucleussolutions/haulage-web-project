package haulage.project

import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
class PricingInterceptor {

  //todo only allow access to admin and super admin

  def permissionService

  PricingInterceptor() {
    match controller: 'pricing'
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      def userPermission = permissionService.findByUserId(userId)

      if(userPermission){
        if(userPermission.authority == 'Super Admin' || userPermission.authority == 'Admin'){
          true
        }else{
          false
        }
      }else{
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
