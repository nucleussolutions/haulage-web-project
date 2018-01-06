package haulage.project


class VehicleInterceptor {

  // vehicle can only be accessed by the haulier and super admin
  def permissionService

  VehicleInterceptor() {
    match controller: 'vehicle'
  }

  boolean before() {
    if(params.userId){
      Permission userPermission = permissionService.findByUserId(params.userId)
      if(userPermission){
        if(userPermission.authority == 'Super Admin' || userPermission.authority == 'Admin'){
          true
        }else{
          false
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
