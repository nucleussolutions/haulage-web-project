package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Quote)
interface QuoteService {

  Quote get(Serializable id)

  List<Quote> list(Map args)

  List<Quote> findAllByHaulierIdOrForwarderId(String haulierId, String forwarderId)

  @Cacheable('quoteCount')
  Long count()

  @Cacheable('quoteCountByHaulierIdOrForwarderId')
  Long countByHaulierIdOrForwarderId(String haulierId, String forwarderId)

  void delete(Serializable id)

  List<Quote> findAllByHaulierId(String haulierId, Map args)

  List<Quote> findAllByForwarderId(String forwarderId, Map args)

  Quote save(Quote quote)

}