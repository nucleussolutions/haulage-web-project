package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Pricing)
interface PricingService {

  Pricing get(Serializable id)

  List<Pricing> list(Map args)

  @Cacheable('pricingCount')
  Long count()

  void delete(Serializable id)

  Pricing save(Pricing pricing)

}