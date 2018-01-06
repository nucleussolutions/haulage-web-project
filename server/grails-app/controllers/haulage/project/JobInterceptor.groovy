package haulage.project


class JobInterceptor {


  JobInterceptor() {
    match controller: 'job'
  }

  boolean before() { true }

  boolean after() { true }

  void afterView() {
    // no-op
  }
}
