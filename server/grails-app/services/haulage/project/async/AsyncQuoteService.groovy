package haulage.project.async

import grails.async.DelegateAsync
import grails.gorm.transactions.Transactional
import haulage.project.QuoteService

//@Transactional
class AsyncQuoteService {
    @DelegateAsync
    QuoteService quoteService
}
