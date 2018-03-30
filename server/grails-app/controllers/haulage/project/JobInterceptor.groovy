package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class JobInterceptor {

  def permissionService

  def userInfoService

  JobInterceptor() {
    match controller: 'job'
  }

  boolean before() {
    def userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)

    if(userId){
      def userPermission = userInfo.permissions.stream().filter({ permission ->
        permission.authority == 'Super Admin' || permission.authority == 'Admin'
      })
      if(userPermission){
        true
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
