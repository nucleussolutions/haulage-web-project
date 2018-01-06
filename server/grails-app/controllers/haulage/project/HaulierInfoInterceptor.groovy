package haulage.project


class HaulierInfoInterceptor {

  HaulierInfoInterceptor() {
    match controller: 'haulierInfo'
  }

  boolean before() { true }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
