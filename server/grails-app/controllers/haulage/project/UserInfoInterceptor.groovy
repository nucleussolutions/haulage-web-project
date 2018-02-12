package haulage.project


class UserInfoInterceptor {

  UserInfoInterceptor() {
    match controller: 'userInfo', action: 'index'
  }

  boolean before() {
    def userId = request.getHeader('userId')
    def permission = Permission.where {
      userInfo.userId == userId
      authority == 'Super Admin'
    }
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
