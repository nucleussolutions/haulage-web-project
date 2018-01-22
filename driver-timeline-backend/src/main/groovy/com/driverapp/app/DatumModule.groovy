package com.driverapp.app

import com.google.inject.AbstractModule
import com.google.inject.Scopes
import groovy.transform.CompileStatic

@CompileStatic
class DatumModule extends AbstractModule{

  @Override
  protected void configure() {
    bind(DataService).in(Scopes.SINGLETON)
    bind(DatumRenderer).in(Scopes.SINGLETON)
    bind(DatumRestEndpoint).in(Scopes.SINGLETON)
  }
}
