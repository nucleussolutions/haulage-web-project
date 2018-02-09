package haulage.project


//class CompanyInterceptor {
//
//  CompanyInterceptor() {
//    match(controller: 'company').except(action: 'save').except(action: 'index').except(action: 'show')
//  }
//
//  boolean before() {
//    def userId = request.getHeader('userId')
//    if (userId) {
//      def permission = Permission.where {
//        userInfo.userId == userId
//        authority == 'Super Admin'
//      }
//
//      if(permission){
//        true
//      }else{
//        false
//      }
//
//    } else {
//      false
//    }
//  }
//
//  boolean after() { true }
//
//  void afterView() {
//    // no-op
//  }
//}
