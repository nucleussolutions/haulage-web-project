package haulage.project


class UserInfoInterceptor {

    UserInfoInterceptor() {
//        match controller: 'userInfo'
    }

    boolean before() {
        true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
