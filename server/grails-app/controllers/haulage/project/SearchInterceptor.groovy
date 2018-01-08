package haulage.project

import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
class SearchInterceptor {

  SearchInterceptor() {
    match controller: 'search'

    match controller: 'search', action: 'transportRequest'

  }

  boolean before() {



    false
  }


}
