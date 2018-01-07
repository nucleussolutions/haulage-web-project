package haulage.project


class ForwarderInfoInterceptor {

  // hauliers and super admin only
  def permissionService

  ForwarderInfoInterceptor() {
    match controller: 'forwarderInfo'
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

    true
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
