package haulage.project


class MemberSubscriptionInterceptor {

  //so far subscription plans are editable since the haulier may change subscriptions

  //user and forwarder cannot change subscriptions

  def permissionService

  MemberSubscriptionInterceptor() {
    match controller: 'memberSubscription'
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      Permission userPermission = permissionService.findByUserId(userId)
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
