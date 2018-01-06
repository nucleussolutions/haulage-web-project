package haulage.project


class LocationInterceptor {

  //todo for super admins only
  def permissionService

  LocationInterceptor() {
    match controller: 'location'
  }

  boolean before() {
    if(params.userId){
      Permission userPermission = permissionService.findByUserId(params.userId as String)

      if(userPermission){
        if(userPermission.authority == 'Super Admin'){
          true
        }else{
          false
        }
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
