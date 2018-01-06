package haulage.project


class PermissionInterceptor {

  def permissionService

  //todo permissions are strictly for hauliers and super admin only

  PermissionInterceptor() {
    match controller: 'permission'
  }

  boolean before() {
    String userId = params.userId
    if(userId){

    }else{
      permissionService.findByUserId(userId)

    }
    true
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
