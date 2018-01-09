package haulage.project

class SearchSuperAdminInterceptor {

  SearchSuperAdminInterceptor() {
    //secure all endpoints in search except for location
    match(controller: 'search').except(action: 'location').except(action: 'transportRequestByHaulier').except(action: 'transportRequestByForwarder').except(action: 'quoteByHaulier').except(action: 'quoteByForwarder')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      def userPermission = Permission.findByUserId(userId)
      userPermission && userPermission.authority == 'Super Admin'
    }else{
      false
    }
  }
}
