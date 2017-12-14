package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Quote)
interface QuoteService {

    Quote get(Serializable id)

    List<Quote> list(Map args)

    @Cacheable('quoteCount')
    Long count()

    void delete(Serializable id)

    Quote save(Quote quote)

}