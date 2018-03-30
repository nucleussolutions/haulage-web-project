package haulage.project


class CompanyInterceptor {

    CompanyInterceptor() {
        match(controller: 'company').matches(action: 'delete')
    }

    boolean before() {
        String userId = request.getHeader('userId')
        if (userId) {

            def userPermission = Permission.where {
                authority == 'Super Admin'
            }

            if (userPermission) {
                true
            } else {
                false
            }

        } else {
            false
        }
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
