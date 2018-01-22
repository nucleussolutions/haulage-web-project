package com.driverapp.app

import ratpack.groovy.handling.GroovyChainAction

class DatumRestEndpoint extends GroovyChainAction {

  private final DataService dataService

  DatumRestEndpoint(DataService dataService) {
    this.dataService = dataService
  }

  @Override
  void execute() throws Exception {
    all {
      byMethod {
        get {
          dataService.all().subscribe {
            render json(it)
          }
        }
      }
    }
  }
}
