package haulage.project

import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
class SearchAdminInterceptor {

  def permissionService

  SearchAdminInterceptor() {
    match(controller: 'search', action: 'transportRequestByHaulier')
    match(controller: 'search', action: 'quoteByHaulier')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      Permission userPermission = permissionService.findByUserId(userId)
      userPermission && userPermission.authority == 'Admin'
    }else{
      false
    }
  }
}
