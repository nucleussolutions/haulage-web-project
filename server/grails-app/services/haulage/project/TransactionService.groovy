package haulage.project

import grails.gorm.services.Service
import grails.plugin.cache.Cacheable

@Service(Transaction)
interface TransactionService {

    Transaction get(Serializable id)

    List<Transaction> list(Map args)

    @Cacheable('transactionCount')
    Long count()

    void delete(Serializable id)

    Transaction save(Transaction transaction)

}