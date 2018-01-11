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
      Permission userPermission = permissionService.findByUserId(userId)

      if(userPermission){
        userPermission.authority == 'Super Admin'
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
