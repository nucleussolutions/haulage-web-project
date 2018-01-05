package haulage.project


class TariffInterceptor {

    public TariffInterceptor() {
        match controller: 'tariff'
    }

    boolean before() { true }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
