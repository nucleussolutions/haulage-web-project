package haulage.project


class CompanyInterceptor {

  CompanyInterceptor() {
      match(controller: 'company')
  }

  boolean before() {
    true
  }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
