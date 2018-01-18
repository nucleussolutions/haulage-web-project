package haulage.project.async

import grails.async.DelegateAsync
import haulage.project.VehicleService

class AsyncVehicleService {
    @DelegateAsync
    VehicleService vehicleService
}
