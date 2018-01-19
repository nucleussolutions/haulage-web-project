package haulage.project.async

import grails.async.DelegateAsync
import grails.gorm.transactions.Transactional
import haulage.project.PricingService

class AsyncPricingService {
    @DelegateAsync
    PricingService pricingService
}
