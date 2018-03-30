package haulage.project


class ConsignmentInterceptor {

  ConsignmentInterceptor() {
    match controller: 'consignment'
  }

  boolean before() {
    true
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
