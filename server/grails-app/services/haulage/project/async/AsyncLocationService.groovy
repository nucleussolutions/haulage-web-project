package haulage.project.async

import grails.async.DelegateAsync
import grails.gorm.transactions.Transactional
import haulage.project.LocationService

//@Transactional
class AsyncLocationService {
  @DelegateAsync
  LocationService locationService
}
