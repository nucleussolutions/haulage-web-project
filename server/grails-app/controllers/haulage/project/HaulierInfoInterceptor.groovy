package haulage.project


class HaulierInfoInterceptor {

    public HaulierInfoInterceptor(){
        match controller: 'haulierInfo'
    }

    boolean before() { true }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
