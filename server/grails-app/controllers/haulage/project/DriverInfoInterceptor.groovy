package haulage.project


class DriverInfoInterceptor {

    DriverInfoInterceptor(){
        match controller: 'driverInfo'
    }

    boolean before() { true }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
