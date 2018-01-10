package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode
import org.springframework.http.HttpStatus

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class QuoteInterceptor {

  def permissionService

  //todo access to only forwarder and haulier only
  QuoteInterceptor(){
    match controller: 'quote'
  }

  boolean before() {

    if(params.userId){
      def userPermission = permissionService.findByUserId(params.userId as String)

      if(userPermission){
        if(userPermission.authority == 'User'){
          respond HttpStatus.METHOD_NOT_ALLOWED, message: 'forbidden user/driver'
          false
        }else{
          true
        }
      }else{
        respond status: HttpStatus.NOT_FOUND, message: 'user permission not found'
        false
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
