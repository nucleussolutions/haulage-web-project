package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

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
          false
        }else{
          true
        }
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
