package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class TariffInterceptor {

  //super admin only

  def permissionService

  def userInfoService

  TariffInterceptor() {
    match(controller: 'tariff').except(action: 'list').except(action: 'get')
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
      }else {
        false
      }
    }else{
      false
    }
    true
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
