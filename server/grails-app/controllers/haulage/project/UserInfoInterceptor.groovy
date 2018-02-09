package haulage.project


class UserInfoInterceptor {

    UserInfoInterceptor() {
        match controller: 'userInfo'
    }

    boolean before() {
//        def userId = request.getHeader('userId')
//        if(userId){
//            def permission = Permission.findByAuthority('Super Admin')
//            permission ? true : false
//        }else {
//            false
//        }
        true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
