package haulage.project

import grails.compiler.GrailsCompileStatic
import groovy.transform.TypeCheckingMode

@GrailsCompileStatic(TypeCheckingMode.SKIP)
class MemberSubscriptionInterceptor {

  //so far subscription plans are editable since the haulier may change subscriptions

  //user and forwarder cannot change subscriptions

  def permissionService

  MemberSubscriptionInterceptor() {
    match(controller: 'memberSubscription').except(action: 'save').except(action: 'update')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      def userPermission = Permission.where {
        userInfo.userId == userId
      }
      if(userPermission){
        userPermission.authority == 'Super Admin' || userPermission.authority == 'Admin'
      }else{
        false
      }
    }else {
      false
    }
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
