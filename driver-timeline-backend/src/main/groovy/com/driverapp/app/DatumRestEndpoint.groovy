package com.driverapp.app

import ratpack.groovy.handling.GroovyChainAction
import static ratpack.jackson.Jackson.jsonNode
//import static ratpack.rx.RxRatpack.observe


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

        post{
          parse(jsonNode()).observe().flatMap { input ->
            Datum datum = new Datum()
            datum.driverId = input.get('driverId') as String
            datum.jobId = input.get('jobId') as String
            datum.type = 'driver_updates'
            Value value = input.get('value') as Value
            datum.value = value
            dataService.insert(datum).subscribe{
              println it
            }
          }
        }
      }
    }
  }
}
