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

      def userInfo = UserInfo.findByUserId(userId)

      def userPermission = userInfo.permissions.stream().filter({ permission ->
        permission.authority == 'Super Admin' || permission.authority == 'Admin'
      })

      if(userPermission){
        true
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
