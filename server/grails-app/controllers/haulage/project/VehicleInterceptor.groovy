package haulage.project


class VehicleInterceptor {

  //todo vehicle can only be accessed by the haulier and super admin

  VehicleInterceptor() {
    match controller: 'vehicle'
  }

  boolean before() {
    true
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
