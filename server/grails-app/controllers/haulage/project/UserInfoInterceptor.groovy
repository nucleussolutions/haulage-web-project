package haulage.project


class UserInfoInterceptor {

  def userInfoService

  UserInfoInterceptor() {
    match controller: 'userInfo', action: 'index'
  }

  boolean before() {
    def userId = request.getHeader('userId')
    UserInfo userInfo = userInfoService.findByUserId(userId)
    def permission = userInfo.permissions.stream().filter({ permission ->
      permission.authority == 'Super Admin'
    })
    if (permission) {
      true
    } else {
      false
    }
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
