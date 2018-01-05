package haulage.project


class TransactionInterceptor {

    boolean before() { true }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
