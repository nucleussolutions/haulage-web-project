package haulage.project.async

import grails.async.DelegateAsync
import haulage.project.TariffService

class AsyncTariffService {
    @DelegateAsync
    TariffService tariffService
}
