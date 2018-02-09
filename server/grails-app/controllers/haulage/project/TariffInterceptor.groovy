package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class TariffInterceptor {

  //super admin only

  def permissionService

  TariffInterceptor() {
    match(controller: 'tariff').except(action: 'list').except(action: 'get')
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
