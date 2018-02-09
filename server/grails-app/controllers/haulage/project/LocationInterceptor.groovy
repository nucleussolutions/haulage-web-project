package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class LocationInterceptor {

  //todo for super admins only
  def permissionService

  LocationInterceptor() {
    match(controller: 'location').except(action: 'index').except(action: 'show')
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
      falsen
    }
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
