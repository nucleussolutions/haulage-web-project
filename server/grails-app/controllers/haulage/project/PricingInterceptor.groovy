package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class PricingInterceptor {

  //todo only allow access to admin and super admin

  def permissionService

  PricingInterceptor() {
    match controller: 'pricing' except(action: 'index') except(action: 'listAll')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      def userPermission = Permission.where {
        userInfo.userId == userId
        authority == 'Super Admin'
      }.first()

      if(userPermission){
        true
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
