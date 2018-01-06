package haulage.project


class ForwarderInfoInterceptor {

  //todo hauliers and super admin only

  ForwarderInfoInterceptor() {
    match controller: 'forwarderInfo'
  }

  boolean before() {

    if(params.userId){
      Permission userPermission = Permission.findByUserId(params.userId as String)

      if(userPermission){
        if(userPermission.authority == 'Super Admin' || userPermission.authority == 'Admin'){
          true
        }else{
          false
        }
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
