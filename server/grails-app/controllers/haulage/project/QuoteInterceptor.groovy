package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode
import org.springframework.http.HttpStatus

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class QuoteInterceptor {

  def permissionService

  //todo access to only super admin, forwarder and haulier only
  QuoteInterceptor(){
    match controller: 'quote'
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      def userPermission = Permission.where {
        userInfo.userId == userId
        authority == 'User'
      }
      println 'permission '+userPermission
      if(userPermission){
        false
      }else{
        true
      }
    }else{
      respond status: HttpStatus.NOT_FOUND, message: 'user id not found'
      false
    }
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
