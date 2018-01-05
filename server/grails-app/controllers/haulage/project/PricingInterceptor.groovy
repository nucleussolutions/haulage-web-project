package haulage.project


class PricingInterceptor {

  //todo only allow access to admin and super admin

  public PricingInterceptor() {
    match controller: 'pricing'
  }

  boolean before() { true }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
