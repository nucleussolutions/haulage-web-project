package haulage.project

class SearchManagerInterceptor {

  SearchManagerInterceptor() {
    match(controller: 'search', action: 'transportRequestByForwarder')
    match(controller: 'search', action: 'quoteByForwarder')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      def userPermission = Permission.where {
        userInfo.userId == userId
      }
      userPermission && userPermission.authority == 'Manager'
    }else{
      false
    }
  }
}
