package haulage.project.async

import grails.async.DelegateAsync
import haulage.project.QuoteService

class AsyncQuoteService {
    @DelegateAsync
    QuoteService quoteService
}
