package haulage.project

class SearchManagerInterceptor {

  SearchManagerInterceptor() {
    match(controller: 'search', action: 'transportRequestByForwarder')
    match(controller: 'search', action: 'quoteByForwarder')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    if(userId){
      Permission userPermission = Permission.findByUserId(userId)
      userPermission && userPermission.authority == 'Manager'
    }else{
      false
    }
  }
}
