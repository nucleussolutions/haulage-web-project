package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class LocationInterceptor {

  //todo for super admins only
  def permissionService

  LocationInterceptor() {
    match(controller: 'location').except(action: 'list').except(action: 'get')
  }

  boolean before() {
    if(params.userId){
      Permission userPermission = permissionService.findByUserId(params.userId as String)

      if(userPermission){
        userPermission.authority == 'Super Admin'
      }else {
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
