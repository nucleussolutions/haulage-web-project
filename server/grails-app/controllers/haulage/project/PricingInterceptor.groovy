package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class PricingInterceptor {

  //todo only allow access to admin and super admin

  def permissionService

  def userInfoService

  PricingInterceptor() {
    match controller: 'pricing' except(action: 'index') except(action: 'listAll')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)
    if(userId){
      def userPermission = userInfo.permissions.stream().filter({ permission ->
        permission.authority == 'Super Admin'
      })

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
