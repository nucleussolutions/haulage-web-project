package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class SearchAdminInterceptor {

  def permissionService

  def userInfoService

  SearchAdminInterceptor() {
    match(controller: 'search', action: 'transportRequestByHaulier')
    match(controller: 'search', action: 'quoteByHaulier')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)
    if(userId){
      def userPermission = userInfo.permissions.stream().filter({ permission ->
        permission.authority == 'Admin'
      })
      if(userPermission){
        return true
      }else {
        return false
      }
    }else{
      false
    }
  }
}
