package haulage.project

class SearchManagerInterceptor {

  def userInfoService

  SearchManagerInterceptor() {
    match(controller: 'search', action: 'transportRequestByForwarder')
    match(controller: 'search', action: 'quoteByForwarder')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)
    if(userId){
      def userPermission = userInfo.permissions.stream().filter({ permission ->
        permission.authority == 'Manager'
      })
      userPermission ? true : false
    }else{
      false
    }
  }
}
