package haulage.project


class PricingInterceptor {

  //todo only allow access to admin and super admin

  def permissionService

  PricingInterceptor() {
    match controller: 'pricing'
  }

  boolean before() {
    if(params.userId){
      def userPermission = permissionService.findByUserId(params.userId)

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
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
