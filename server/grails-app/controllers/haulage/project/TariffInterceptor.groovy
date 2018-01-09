package haulage.project

import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
class TariffInterceptor {

  //super admin only

  def permissionService

  TariffInterceptor() {
    match controller: 'tariff'
  }

  boolean before() {

    if(params.userId){
      Permission userPermission = Permission.findByUserId(params.userId as String)
      if(userPermission){
        userPermission.authority == 'Super Admin'
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
