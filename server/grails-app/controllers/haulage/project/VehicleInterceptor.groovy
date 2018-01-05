package haulage.project


class VehicleInterceptor {

  public VehicleInterceptor() {
    match controller: 'vehicle'
  }

  boolean before() { true }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
