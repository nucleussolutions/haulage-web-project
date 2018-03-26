package haulage.project


class CompanyInterceptor {

  CompanyInterceptor() {
      match(controller: 'company').except(action: 'delete')
  }

  boolean before() {
    String userId = request.getHeader('userId')
    if(userId){

      def userPermission = Permission.where {
        userInfo.userId == userId
        authority  == 'Super Admin'
      }

      if(userPermission){
        true
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
