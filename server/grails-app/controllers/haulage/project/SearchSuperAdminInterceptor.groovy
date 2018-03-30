package haulage.project

class SearchSuperAdminInterceptor {

  def userInfoService

  SearchSuperAdminInterceptor() {
    match(controller: 'search').except(action: 'location').except(action: 'transportRequestByHaulier').except(action: 'transportRequestByForwarder').except(action: 'quoteByHaulier').except(action: 'quoteByForwarder').except(action: 'company').except(action:'companyByRegNo').except(action: 'haulierCompany').except(action: 'forwarderCompany')
  }

  boolean before() {
    def userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)
    if(userId){
      def userPermission = userInfo.permissions.stream().filter({ permission ->
        permission.authority == 'Super Admin'
      })
      userPermission ? true : false
    }else{
      false
    }
  }
}
