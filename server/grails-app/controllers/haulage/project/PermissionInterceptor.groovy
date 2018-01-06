package haulage.project


class PermissionInterceptor {

  def permissionService

  //todo permissions are strictly for hauliers and super admin only

  PermissionInterceptor() {
    match controller: 'permission'
  }

  boolean before() {
    String userId = params.userId
    if (!userId) {
      false
    } else {
      //find permission that belongs to this user
      Permission userPermission = permissionService.findByUserId(userId)
      if(!userPermission){
        false
      }else {
        if(userPermission.authority == 'Super Admin' || 'Admin'){
          true
        }else{
          false
        }
      }
    }
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
