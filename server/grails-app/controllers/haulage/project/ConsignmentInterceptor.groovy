package haulage.project


class ConsignmentInterceptor {

  ConsignmentInterceptor() {
    match controller: 'consignment'
  }

  boolean before() {
    def userId = request.getHeader('userId')

    if(userId){
      def userPermission = Permission.findByUserId(userId)
      if(userPermission){
        userPermission.authority != 'User'
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
