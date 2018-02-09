package haulage.project

class SearchSuperAdminInterceptor {

  SearchSuperAdminInterceptor() {
    match(controller: 'search').except(action: 'location').except(action: 'transportRequestByHaulier').except(action: 'transportRequestByForwarder').except(action: 'quoteByHaulier').except(action: 'quoteByForwarder')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      def userPermission = Permission.where {
        userInfo.userId == userId
        authority == 'Super Admin'
      }.first()
      userPermission ? true : false
    }else{
      false
    }
  }
}
