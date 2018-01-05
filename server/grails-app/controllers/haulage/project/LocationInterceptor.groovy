package haulage.project


class LocationInterceptor {

    public LocationInterceptor() {
        match controller: 'location'
    }

    boolean before() { true }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
